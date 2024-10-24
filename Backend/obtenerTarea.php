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
if (!isset($data->idGrupoEmpresa )) {
    echo json_encode(['error' => 'Falta idGrupoEmpresa']);
    exit();
}
if (!isset($data->HU_idHU)) {
    echo json_encode(['error' => 'Falta idHU']);
    exit();
}

$idGrupoEmpresa = $data->idGrupoEmpresa;
$HU_idHU = $data->HU_idHU;

try {
    // Consulta para obtener los HU filtradas por idGrupoEmpresa
    $stmt3 = $pdo->prepare('SELECT "idTarea", titulo, responsable, "fechaEntrega", "HU_idHU", estado
	                            FROM "Tarea"
	                            where "HU_idHU"= :HU_idHU 
                                and "HU_Sprint_GrupoEmpresa_idGrupoEmpresa"= :idGrupoEmpresa');
    $stmt3->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
    $stmt3->bindParam(':HU_idHU', $HU_idHU, PDO::PARAM_INT);
    $stmt3->execute();
    $tareas = $stmt3->fetchAll(PDO::FETCH_ASSOC);

    if (!$tareas) {
        echo json_encode(['success' => false, 'message' => 'No se encontraron tareas']);
        exit();
    }

    // Respuesta en formato JSON
    echo json_encode([
        'success' => true, // Aquí incluimos la clave success
        'Tarea'=> $tareas
    ]);
} catch (PDOException $e) {
    echo json_encode(['success'=> false, 'error' => $e->getMessage()]);
    exit();
}
?>