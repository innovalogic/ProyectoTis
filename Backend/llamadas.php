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

$idGrupoEmpresa = $data->idGrupoEmpresa;

try {
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
                            WHERE "Sprint_GrupoEmpresa_idGrupoEmpresa" = :idGrupoEmpresa');
    $stmt2->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
    $stmt2->execute();
    $historiasdeu = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    // Consulta para obtener los Sprints filtradas por idGrupoEmpresa
    $stmt3 = $pdo->prepare('SELECT "idSprint", "nomSprint"
                            FROM "Sprint"
                            WHERE "GrupoEmpresa_idGrupoEmpresa"= :idGrupoEmpresa');
    $stmt3->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
    $stmt3->execute();
    $sprint = $stmt3->fetchAll(PDO::FETCH_ASSOC);

    // Respuesta en formato JSON
    echo json_encode([
        'responsables' => $responsables,
        'historiasdeu' => $historiasdeu,
        'sprints'=> $sprint
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
