<?php
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php'; 

try {
    $stmt = $pdo->prepare('SELECT idcriterios, criterio, tipoevaluacion_idtipoevaluacion
	FROM criterios');

    if ($stmt->execute()) {
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        ob_end_clean();

        if ($result) {
            echo json_encode(['success' => true, 'criterios' => $result]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se encontraron registros']);
        }
    } else {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Error al realizar la consulta']);
    }

} catch (PDOException $e) {
    echo json_encode(['success'=> false, 'error' => $e->getMessage()]);
    exit();
}
?>
