<?php
// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php'; // Asegúrate de tener la conexión a la base de datos

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->idGrupo)) {
    $idGrupo = $data->idGrupo; 

    try {
        // Preparar la consulta
        $query = 'UPDATE "GrupoEmpresa" SET "planificado" = true WHERE "idGrupoEmpresa" = :idGrupo';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':idGrupo', $idGrupo);

        if ($stmt->execute()) {
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Planificación guardada con éxito']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al guardar la planificación']);
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