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
    !empty($data->nomSprint)
) {
    try {
        $query = 'INSERT INTO public."Sprint"("fechaInicio", "fechaFin", "GrupoEmpresa_idGrupoEmpresa", "nomSprint")
	                            VALUES (:startDate, :endDate, 1, :nomSprint)';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':startDate', $data->fechaInicio);
        $stmt->bindParam(':endDate', $data->fechaFin);
        $stmt->bindParam(':nomSprint', $data->nomSprint);

        if ($stmt->execute()) {
            // Limpia cualquier salida previa antes de enviar la respuesta JSON
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Sprint registrada']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al registrar el Sprint']);
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