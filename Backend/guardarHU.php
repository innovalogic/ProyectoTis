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
    !empty($data->sprint) &&
    !empty($data->titulo) &&
    !empty($data->responsable) &&
    !empty($data->fecha)
) {
    try {

        $querySprint = 'SELECT "idSprint"
	                    FROM "Sprint"
	                    where  "GrupoEmpresa_idGrupoEmpresa" = 1 and "nomSprint" = :sprint';
        $stmtSprint = $pdo->prepare($querySprint);
        $stmtSprint->bindParam(':sprint', $data->sprint);
        $stmtSprint->execute();

        // Verificar si se encontró el sprint
        $sprintData = $stmtSprint->fetch(PDO::FETCH_ASSOC);
        if (!$sprintData) {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Sprint no encontrado']);
            exit();
        }

        // Obtener el ID del sprint
        $sprintId = $sprintData['idSprint'];


        $query = 'INSERT INTO "HU"( titulo, responsable, "fechaEntrega", "Sprint_idSprint", "Sprint_GrupoEmpresa_idGrupoEmpresa")
	                            VALUES (:titulo, :responsable, :fecha, :sprintId, 1)';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':titulo', $data->titulo);
        $stmt->bindParam(':responsable', $data->responsable);
        $stmt->bindParam(':fecha', $data->fecha);
        $stmt->bindParam(':sprintId', $sprintId);

        if ($stmt->execute()) {
            // Limpia cualquier salida previa antes de enviar la respuesta JSON
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'HU registrada']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al registrar la HU']);
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