<?php
// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php'; // Asegúrate de tener la conexión a la base de datos

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->idevaluador) && !empty($data->notaPromedio) && !empty($data->tipoevaluacion_idtipoevaluacion) && !empty($data->grupoempresa_idgrupoempresa) && !empty($data->idevaluado)) { 
    $idevaluado = $data->idevaluado;
    $idevaluador = $data->idevaluador;
    $notaPromedio = $data->notaPromedio;
    $tipoevaluacion_idtipoevaluacion = $data->tipoevaluacion_idtipoevaluacion;
    $grupoempresa_idgrupoempresa = $data->grupoempresa_idgrupoempresa;

    try {
        // Preparar la consulta
        $query = 'UPDATE evaluacionfinal
	                SET  "notaPromedio"= :notaPromedio, idevaluado=:idevaluado, idevaluador=:idevaluador
	                WHERE  tipoevaluacion_idtipoevaluacion= :tipoevaluacion_idtipoevaluacion AND grupoempresa_idgrupoempresa= :grupoempresa_idgrupoempresa';

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':idevaluado', $idevaluado);
        $stmt->bindParam(':idevaluador', $idevaluador);       
        $stmt->bindParam(':notaPromedio', $notaPromedio);
        $stmt->bindParam(':tipoevaluacion_idtipoevaluacion', $tipoevaluacion_idtipoevaluacion);
        $stmt->bindParam(':grupoempresa_idgrupoempresa', $grupoempresa_idgrupoempresa);
        if ($stmt->execute()) {
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Nota final guardada con éxito']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al guardar la Nota final']);
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