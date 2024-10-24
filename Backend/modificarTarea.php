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
    !empty($data->titulo) &&
    !empty($data->fechaEntrega) &&
    !empty($data->responsable) &&
    !empty($data->idTarea)
) {
    $titulo = $data->titulo;
    $fechaEntrega = $data->fechaEntrega;
    $responsable = $data->responsable;
    $idTarea = $data->idTarea;

    try {
        $query = 'UPDATE "Tarea"
	            SET titulo=:titulo, responsable=:responsable, "fechaEntrega"=:fechaEntrega
	            WHERE "idTarea"=:idTarea';

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':responsable', $responsable);
        $stmt->bindParam(':fechaEntrega', $fechaEntrega);
        $stmt->bindParam(':idTarea', $idTarea);

        if ($stmt->execute()) {
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Tarea modificada']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al modificar la Tarea']);
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