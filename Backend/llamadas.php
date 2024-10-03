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
    $stmt2 = $pdo->prepare('SELECT titulo, "Sprint_idSprint"
                            FROM "HU"
                            WHERE "Sprint_GrupoEmpresa_idGrupoEmpresa" = :idGrupoEmpresa');
    $stmt2->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
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
