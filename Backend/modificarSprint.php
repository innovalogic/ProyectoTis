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
    !empty($data->fechaInicio) &&
    !empty($data->fechaFin) &&
    !empty($data->idSprint)
) {
    $fechaInicio = $data->fechaInicio;
    $fechaFin = $data->fechaFin;
    $idSprint = $data->idSprint;

    try {
        $query = 'UPDATE "Sprint"
	            SET "fechaInicio"=:fechaInicio, "fechaFin"=:fechaFin
	            WHERE "idSprint"=:idSprint';

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':fechaInicio', $fechaInicio);
        $stmt->bindParam(':fechaFin', $fechaFin);
        $stmt->bindParam(':idSprint', $idSprint);

        if ($stmt->execute()) {
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Sprint modificada']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al modificar el Sprint']);
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