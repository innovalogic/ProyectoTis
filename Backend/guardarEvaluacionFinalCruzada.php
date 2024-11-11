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
    !empty($data->tipoEvaluacionCruzada) &&
    !empty($data->idGrupoEmpresa) &&
    !empty($data->idDocente) &&
    !empty($data->idevaluador) &&// Verificar que idevaluador esté presente
    !empty($data->tipoevaluador) 
) {
    try {
        // Consulta para guardar la evaluación cruzada en la base de datos
        $query = 'INSERT INTO "evaluacionfinal" (
            "tipoevaluacion_idtipoevaluacion",
            "grupoempresa_idgrupoempresa",
            "grupoempresa_docente_iddocente",
            "idevaluador",
            "tipoevaluador"
        ) VALUES (
            :tipoEvaluacionCruzada,
            :idGrupoEmpresa,
            :idDocente,
            :idevaluador,
            :tipoevaluador
        )';

        $stmt = $pdo->prepare($query);

        // Vincular los parámetros con los valores correspondientes
        $stmt->bindParam(':tipoEvaluacionCruzada', $data->tipoEvaluacionCruzada);
        $stmt->bindParam(':idGrupoEmpresa', $data->idGrupoEmpresa);
        $stmt->bindParam(':idDocente', $data->idDocente);
        $stmt->bindParam(':idevaluador', $data->idevaluador);
        $stmt->bindParam(':tipoevaluador', $data->tipoevaluador);

        // Ejecutar la consulta y verificar si se realizó correctamente
        if ($stmt->execute()) {
            $lastEvaluacionId = $pdo->lastInsertId();
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Evaluación cruzada guardada exitosamente', 'lastEvaluacionId' => $lastEvaluacionId]);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al guardar la evaluación cruzada']);
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
