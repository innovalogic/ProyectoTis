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
    !empty($data->enlace) &&
    !empty($data->Sprint_idSprint) &&
    !empty($data->Sprint_GrupoEmpresa_idGrupoEmpresa)
) {
    try {

        $query = 'INSERT INTO informefinal( enlace, sprint_idsprint, sprint_grupoempresa_idgrupoempresa)
	                VALUES ( :enlace, :Sprint_idSprint, :Sprint_GrupoEmpresa_idGrupoEmpresa)';
        $stmtTE = $pdo->prepare($query);
        $stmtTE->bindParam(':enlace', $data->enlace);
        $stmtTE->bindParam(':Sprint_idSprint', $data->Sprint_idSprint);
        $stmtTE->bindParam(':Sprint_GrupoEmpresa_idGrupoEmpresa', $data->Sprint_GrupoEmpresa_idGrupoEmpresa);

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