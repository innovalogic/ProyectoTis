<?php
// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->tipoEvaluacionAutoevaluacion) &&
    !empty($data->idGrupoEmpresa) &&
    !empty($data->idDocente) 
) {
    try {
        // Consulta para guardar la evaluación AutoEvaluacion en la base de datos
        $query = 'INSERT INTO "evaluacionfinal" (
            "tipoevaluacion_idtipoevaluacion",
            "grupoempresa_idgrupoempresa",
            "grupoempresa_docente_iddocente"
        ) VALUES (
            :tipoEvaluacionAutoevaluacion,
            :idGrupoEmpresa,
            :idDocente
        )';

        $stmt = $pdo->prepare($query);

        // Vincular los parámetros con los valores correspondientes
        $stmt->bindParam(':tipoEvaluacionAutoevaluacion', $data->tipoEvaluacionAutoevaluacion);
        $stmt->bindParam(':idGrupoEmpresa', $data->idGrupoEmpresa);
        $stmt->bindParam(':idDocente', $data->idDocente);

        // Ejecutar la consulta y verificar si se realizó correctamente
        if ($stmt->execute()) {
            $lastEvaluacionId = $pdo->lastInsertId();
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Evaluación AutoEvaluacion guardada exitosamente', 'lastEvaluacionId' => $lastEvaluacionId]);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al guardar la evaluación AutoEvaluacion']);
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
