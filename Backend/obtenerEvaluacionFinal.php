<?php
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php'; 

$data = json_decode(file_get_contents("php://input")); 
var_dump($data);
if (!empty($data->grupoempresa_idgrupoempresa)) { 
    $grupoempresa_idgrupoempresa = $data->grupoempresa_idgrupoempresa;

    try {
        $stmt = $pdo->prepare('SELECT idevaluacionfinal, tipoevaluacion_idtipoevaluacion, idevaluado, idevaluador, tipoevaluador, grupoempresa_docente_iddocente, "notaPromedio"
	    FROM evaluacionfinal
	    where grupoempresa_idgrupoempresa=:grupoempresa_idgrupoempresa');
    
        if ($stmt->execute(['grupoempresa_idgrupoempresa' => $grupoempresa_idgrupoempresa])) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            ob_end_clean();
    
            if ($result) {
                echo json_encode(['success' => true, 'evaluacionFinal' => $result]);
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
} else {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>