<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conexión a la base de datos
include_once 'db.php';

// Recibir el cuerpo de la solicitud JSON
$data = json_decode(file_get_contents("php://input"));

// Verificar si el idGrupoEmpresa fue enviado
if (!isset($data->idGrupoEmpresa)) {
    echo json_encode(['error' => 'Falta idGrupoEmpresa']);
    exit();
}

if (!isset($data->nomSprint)) {
    echo json_encode(['error' => 'Falta nombre Sprint']);
    exit();
}

$idGrupoEmpresa = $data->idGrupoEmpresa;
$nomSprint =  $data->nomSprint;

try {


    $querysprint = "SELECT \"idSprint\"
                FROM \"Sprint\"
                WHERE \"GrupoEmpresa_idGrupoEmpresa\"=:idGrupoEmpresa and \"nomSprint\"=:nomSprint";
        $stmtsprint = $pdo->prepare($querysprint);
        $stmtsprint->bindParam(':idGrupoEmpresa', $idGrupoEmpresa);
        $stmtsprint->bindParam(':nomSprint', $nomSprint);
        $stmtsprint->execute();

        // Verificar si se encontró el codigosis
        $sprintData = $stmtsprint->fetch(PDO::FETCH_ASSOC);
        if (!$sprintData) {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'idSprint no encontrado']);
            exit();
        }
        $Sprint_idSprint = $sprintData['idSprint'];



    // Consulta para obtener los responsables filtrados por idGrupoEmpresa
    $stmt1 = $pdo->prepare('SELECT CONCAT("nombreEstudiante", \' \', "apellidoEstudiante") AS nombre_completo
                            FROM "Estudiante"
                            WHERE "idGrupoEmpresa" = :idGrupoEmpresa');
    $stmt1->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
    $stmt1->execute();
    $responsables = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    // Consulta para obtener las actividades filtradas por idGrupoEmpresa
    $stmt2 = $pdo->prepare('SELECT "idHU", titulo, responsable, "fechaEntrega" 
                            FROM "HU"
                            WHERE "Sprint_GrupoEmpresa_idGrupoEmpresa" = :idGrupoEmpresa and "Sprint_idSprint" = :Sprint_idSprint ');
    $stmt2->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
    $stmt2->bindParam(':Sprint_idSprint', $Sprint_idSprint, PDO::PARAM_INT);
    $stmt2->execute();
    $historiasdeu = $stmt2->fetchAll(PDO::FETCH_ASSOC);


    // Respuesta en formato JSON
    echo json_encode([
        'responsables' => $responsables,
        'historiasdeu' => $historiasdeu
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
