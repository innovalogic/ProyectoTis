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
    // Consulta para obtener los Sprints filtradas por idGrupoEmpresa
    $stmt3 = $pdo->prepare('SELECT "idSprint", "fechaInicio", "fechaFin", "nomSprint", estado
	                        FROM "Sprint"
	                        WHERE "GrupoEmpresa_idGrupoEmpresa"=:idGrupoEmpresa');
    $stmt3->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
    $stmt3->execute();
    $sprint = $stmt3->fetchAll(PDO::FETCH_ASSOC);


    if (!$sprint) {
        echo json_encode(['success' => false, 'message' => 'No se encontraron los datos de sprints']);
        exit();
    }

    // Respuesta en formato JSON
    echo json_encode([
        'success' => true, // Aquí incluimos la clave success
        'sprint'=> $sprint,
    ]);
} catch (PDOException $e) {
    echo json_encode(['success'=> false, 'error' => $e->getMessage()]);
    exit();
}
?>
