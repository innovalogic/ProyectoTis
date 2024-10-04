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
    !empty($data->fecha) &&
    !empty($data->idGrupoEmpresa)
) {
    try {

        $querySprint = 'SELECT "idSprint"
	                    FROM "Sprint"
	                    where  "GrupoEmpresa_idGrupoEmpresa" = :idGrupoEmpresa and "nomSprint" = :sprint';
        $stmtSprint = $pdo->prepare($querySprint);
        $stmtSprint->bindParam(':sprint', $data->sprint);
        $stmtSprint->bindParam(':idGrupoEmpresa', $data->idGrupoEmpresa);
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
	                VALUES (:titulo, :responsable, :fecha, :sprintId, :idGrupoEmpresa)';
        $stmtHU = $pdo->prepare($query);
        $stmtHU->bindParam(':titulo', $data->titulo);
        $stmtHU->bindParam(':responsable', $data->responsable);
        $stmtHU->bindParam(':fecha', $data->fecha);
        $stmtHU->bindParam(':sprintId', $sprintId);
        $stmtHU->bindParam(':idGrupoEmpresa', $data->idGrupoEmpresa);

        if ($stmtHU->execute()) {// Limpia cualquier salida previa antes de enviar la respuesta JSON
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