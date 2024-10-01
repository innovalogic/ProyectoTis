<?php
ob_start();
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$dataRaw = file_get_contents("php://input");
var_dump($dataRaw); // Verificar los datos crudos
$data = json_decode($dataRaw);

if (is_null($data)) {
    echo json_encode(['success' => false, 'message' => 'Formato JSON inválido']);
    exit();
}
if (
    !empty($data->pertenece) &&
    !empty($data->titulo) &&
    !empty($data->responsable) &&
    !empty($data->fecha)
) {
    
    try {
        $queryPertenece = 'SELECT "idHU", "Sprint_idSprint", "Sprint_GrupoEmpresa_idGrupoEmpresa"
	                    FROM "HU"
	                    where titulo =:pertenece';
        $stmtPertenece = $pdo->prepare($queryPertenece);
        $stmtPertenece->bindParam(':pertenece', $data->pertenece);
        $stmtPertenece->execute();

        // Verificar si se encontró el sprint
        $perteneceData = $stmtPertenece->fetch(PDO::FETCH_ASSOC);
        if (!$perteneceData) {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Datos no encontrado']);
            exit();
        }
        $idHU = $perteneceData['idHU'];
        $sprintId = $perteneceData['Sprint_idSprint'];
        $grupoEmpresaId = $perteneceData['Sprint_GrupoEmpresa_idGrupoEmpresa'];

        // Ahora puedes usar esas variables como quieras
        echo "ID HU: $idHU, Sprint ID: $sprintId, Grupo Empresa ID: $grupoEmpresaId";

        $query = 'INSERT INTO "Tarea"(titulo, responsable, "fechaEntrega", "HU_idHU", "HU_Sprint_idSprint", "HU_Sprint_GrupoEmpresa_idGrupoEmpresa")
	                            VALUES (:titulo, :responsable, :fecha, :idHU, :sprintId, :grupoEmpresaId)';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':titulo', $data->titulo);
        $stmt->bindParam(':responsable', $data->responsable);
        $stmt->bindParam(':fecha', $data->fecha);
        $stmt->bindParam(':idHU', $idHU);
        $stmt->bindParam(':sprintId', $sprintId);
        $stmt->bindParam(':grupoEmpresaId', $grupoEmpresaId);

        if ($stmt->execute()) {
            // Limpia cualquier salida previa antes de enviar la respuesta JSON
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Tarea registrada']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al registrar la Tarea']);
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