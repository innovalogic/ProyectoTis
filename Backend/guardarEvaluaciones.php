<?php
ob_start();
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

// Obtener los datos de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Iniciar la transacción
$pdo->beginTransaction();
try {
    foreach ($data as $evaluacion) {
        // Verificar si la evaluación ya existe en la base de datos
        $selectSql = "SELECT 1 FROM evaluacionsemanal 
                      WHERE \"idEstudiante\" = :idEstudiante 
                      AND semana = :semana"; 
                      
        $selectStmt = $pdo->prepare($selectSql);
        $selectStmt->bindParam(':idEstudiante', $evaluacion['idEstudiante']);
        $selectStmt->bindParam(':semana', $evaluacion['semana']);
        $selectStmt->execute();

        if ($selectStmt->rowCount() > 0) {
            // Si la evaluación ya existe, actualizarla
            $updateSql = "UPDATE evaluacionsemanal 
                          SET calificacion = :calificacion, comentario = :comentario, estudiante = :estudiante, tarea = :tarea, 
                              grupo = :grupo, \"fechaEntrega\" = :fechaEntrega, \"HU_idHU\" = :HU_idHU, 
                              \"HU_Sprint_idSprint\" = :HU_Sprint_idSprint, \"HU_Sprint_GrupoEmpresa_idGrupoEmpresa\" = :HU_Sprint_GrupoEmpresa_idGrupoEmpresa, 
                              \"idDocente\" = :idDocente 
                          WHERE \"idEstudiante\" = :idEstudiante AND semana = :semana AND \"idTarea\" = :idTarea";
            $updateStmt = $pdo->prepare($updateSql);
        } else {
            // Si la evaluación no existe, insertar una nueva
            $updateSql = "INSERT INTO evaluacionsemanal (semana, \"idEstudiante\", estudiante, tarea, calificacion, comentario, grupo, \"fechaEntrega\", \"idTarea\", \"HU_idHU\", \"HU_Sprint_idSprint\", \"HU_Sprint_GrupoEmpresa_idGrupoEmpresa\", \"idDocente\") 
                          VALUES (:semana, :idEstudiante, :estudiante, :tarea, :calificacion, :comentario, :grupo, :fechaEntrega, :idTarea, :HU_idHU, :HU_Sprint_idSprint, :HU_Sprint_GrupoEmpresa_idGrupoEmpresa, :idDocente)";
            $updateStmt = $pdo->prepare($updateSql);
        }

        // Enlazar los parámetros comunes
        $updateStmt->bindParam(':semana', $evaluacion['semana']);
        $updateStmt->bindParam(':idEstudiante', $evaluacion['idEstudiante']);
        $updateStmt->bindParam(':estudiante', $evaluacion['Estudiante']);
        $updateStmt->bindParam(':tarea', $evaluacion['tarea']);
        $updateStmt->bindParam(':calificacion', $evaluacion['calificacion']);
        $updateStmt->bindParam(':comentario', $evaluacion['comentario']);
        $updateStmt->bindParam(':grupo', $evaluacion['grupo']);
        $updateStmt->bindParam(':fechaEntrega', $evaluacion['fechaEntrega']);
        $updateStmt->bindParam(':idTarea', $evaluacion['idTarea']);
        $updateStmt->bindParam(':HU_idHU', $evaluacion['HU_idHU']);
        $updateStmt->bindParam(':HU_Sprint_idSprint', $evaluacion['HU_Sprint_idSprint']);
        $updateStmt->bindParam(':HU_Sprint_GrupoEmpresa_idGrupoEmpresa', $evaluacion['HU_Sprint_GrupoEmpresa_idGrupoEmpresa']);
        $updateStmt->bindParam(':idDocente', $evaluacion['idDocente']);

        // Ejecutar la consulta (sea de inserción o actualización)
        $updateStmt->execute();
    }

    // Confirmar la transacción
    $pdo->commit();
    echo json_encode(["status" => "success", "message" => "Evaluaciones guardadas correctamente."]);
} catch (Exception $e) {
    // Si hay un error, revertir la transacción
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
