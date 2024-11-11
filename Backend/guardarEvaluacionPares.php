<?php
// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

// Recibir los datos desde el cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"));

if (!empty($data)) {
    try {
        // Empezar la transacción para insertar múltiples registros de evaluación
        $pdo->beginTransaction();

        // Preparar la consulta para insertar evaluaciones finales
        $query = 'INSERT INTO "evaluacionfinal" (
            "tipoevaluacion_idtipoevaluacion",
            "grupoempresa_idgrupoempresa",
            "grupoempresa_docente_iddocente",
            "idevaluado", 
            "idevaluador",
            "tipoevaluador"
        ) VALUES (
            :tipoEvaluacionAutoevaluacion,
            :idGrupoEmpresa,
            :idDocente,
            :idEstudiante,
            :idEvaluador,
            :tipoevaluador
        )';

        $stmt = $pdo->prepare($query);

        // Recorrer cada estudiante y su evaluador
        foreach ($data as $evaluacion) {
            // Vincular los parámetros con los valores correspondientes para cada evaluación
            $stmt->bindParam(':tipoEvaluacionAutoevaluacion', $evaluacion->tipoEvaluacionAutoevaluacion);
            $stmt->bindParam(':idGrupoEmpresa', $evaluacion->idGrupoEmpresa);
            $stmt->bindParam(':idDocente', $evaluacion->idDocente);
            $stmt->bindParam(':idEstudiante', $evaluacion->idEstudiante);
            $stmt->bindParam(':idEvaluador', $evaluacion->idEvaluador);
            $stmt->bindParam(':tipoevaluador', $evaluacion->tipoevaluador);

            // Ejecutar la consulta
            if (!$stmt->execute()) {
                // Si algo sale mal, revertir la transacción
                $pdo->rollBack();
                ob_end_clean();
                echo json_encode(['success' => false, 'message' => 'Error al guardar la evaluación para el estudiante ID: ' . $evaluacion->idEstudiante]);
                exit;
            }
        }

        // Si todo sale bien, confirmar la transacción
        $pdo->commit();

        ob_end_clean();
        echo json_encode(['success' => true, 'message' => 'Evaluaciones guardadas exitosamente']);

    } catch (PDOException $e) {
        // En caso de error, revertir la transacción y enviar el error
        $pdo->rollBack();
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
    }
} else {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>
