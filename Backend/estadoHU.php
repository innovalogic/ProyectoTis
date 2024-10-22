<?php
// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php'; // Asegúrate de tener la conexión a la base de datos

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->idGrupoEmpresa) && !empty($data->idHU) && !empty($data->estado)) {
    $idGrupoEmpresa = $data->idGrupoEmpresa; 
    $idHU = $data->idHU;
    $estado = $data->estado;

    try {
        // Preparar la consulta
        $query = 'UPDATE "HU"
            SET "estado" = :estado
            WHERE "idHU" = :idHU AND "Sprint_GrupoEmpresa_idGrupoEmpresa" = :idGrupoEmpresa';

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':idHU', $idHU);
        $stmt->bindParam(':idGrupoEmpresa', $idGrupoEmpresa);
        if ($stmt->execute()) {
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Estado guardada con éxito']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al guardar el estado']);
        }

    } catch (PDOException $e) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
    }
} else {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>