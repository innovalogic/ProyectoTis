<?php
ob_start();
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));
var_dump($data); // Para verificar qué datos están llegando

if (
    !empty($data->criterio) &&
    !empty($data->tipoevaluacion_idtipoevaluacion)
) {
    try {

        $query = 'INSERT INTO criterios(criterio, tipoevaluacion_idtipoevaluacion)
	                VALUES ( :criterio, :tipoevaluacion_idtipoevaluacion)';
        $stmtTE = $pdo->prepare($query);
        $stmtTE->bindParam(':criterio', $data->criterio);
        $stmtTE->bindParam(':tipoevaluacion_idtipoevaluacion', $data->tipoevaluacion_idtipoevaluacion);

        if ($stmtTE->execute()) {// Limpia cualquier salida previa antes de enviar la respuesta JSON
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Criterio guardado']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al guardar el criterio']);
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