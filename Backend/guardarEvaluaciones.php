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

// Preparar la declaración SQL
$sql = "INSERT INTO evaluacionsemanal (semana, \"idEstudiante\", estudiante, tarea, calificacion, comentario, grupo,\"fechaEntrega\", \"idTarea\", \"HU_idHU\", \"HU_Sprint_idSprint\", \"HU_Sprint_GrupoEmpresa_idGrupoEmpresa\",\"idDocente\") 
        VALUES (:semana, :idEstudiante, :estudiante, :tarea, :calificacion, :comentario, :grupo,:fechaEntrega , :idTarea, :HU_idHU, :HU_Sprint_idSprint, :HU_Sprint_GrupoEmpresa_idGrupoEmpresa,:idDocente)";

$stmt = $pdo->prepare($sql);

// Iniciar la transacción
$pdo->beginTransaction();
try {
    foreach ($data as $evaluacion) {
        // Bind parameters
        $stmt->bindParam(':semana', $evaluacion['semana']);
        $stmt->bindParam(':idEstudiante', $evaluacion['idEstudiante']);
        $stmt->bindParam(':estudiante', $evaluacion['Estudiante']);
        $stmt->bindParam(':tarea', $evaluacion['tarea']);
        $stmt->bindParam(':calificacion', $evaluacion['calificacion']);
        $stmt->bindParam(':comentario', $evaluacion['comentario']);
        $stmt->bindParam(':grupo', $evaluacion['grupo']);
        $stmt->bindParam(':fechaEntrega', $evaluacion['fechaEntrega']);
        $stmt->bindParam(':idTarea', $evaluacion['idTarea']);
        $stmt->bindParam(':HU_idHU', $evaluacion['HU_idHU']);
        $stmt->bindParam(':HU_Sprint_idSprint', $evaluacion['HU_Sprint_idSprint']);
        $stmt->bindParam(':HU_Sprint_GrupoEmpresa_idGrupoEmpresa', $evaluacion['HU_Sprint_GrupoEmpresa_idGrupoEmpresa']);
        $stmt->bindParam(':idDocente', $evaluacion['idDocente']);
        
        // Ejecutar la consulta
        $stmt->execute();
    }

    // Confirmar la transacción
    $pdo->commit();
    echo json_encode(["status" => "success", "message" => "Evaluaciones guardadas correctamente."]);
} catch (Exception $e) {
    // Si hay un error, revertir la transacción
    $pdo->rollBack();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
