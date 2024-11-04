<?php

// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

// Decodificar la entrada JSON
$data = json_decode(file_get_contents("php://input"));
error_log("Datos recibidos: " . print_r($data, true)); // Esta línea se agregó

// Verificar que los datos necesarios estén presentes
if (!empty($data->imageUrl) && (!empty($data->idEstudiante) || !empty($data->idDocente))) {
    // Log de los valores específicos
    error_log("imageUrl: " . $data->imageUrl); // Registra solo el imageUrl
    error_log("idEstudiante: " . $data->idEstudiante); // Registra solo el idEstudiante
    error_log("idDocente: " . $data->idDocente); // Registra solo el idDocente

    try {
        // Verificar si se debe actualizar el Estudiante o el Docente
        if (!empty($data->idEstudiante)) {
            // Paso 1: Buscar si el estudiante existe
            $queryCheck = 'SELECT COUNT(*) FROM "Estudiante" WHERE "idEstudiante" = :idEstudiante';
            $stmtCheck = $pdo->prepare($queryCheck);
            $stmtCheck->bindParam(':idEstudiante', $data->idEstudiante);
            $stmtCheck->execute();
            $estudianteExiste = $stmtCheck->fetchColumn() > 0;

            if ($estudianteExiste) {
                // Paso 2: Si el estudiante existe, actualiza su imageUrl
                $queryUpdate = 'UPDATE "Estudiante" SET "imageUrl" = :imageUrl WHERE "idEstudiante" = :idEstudiante';
                $stmtUpdate = $pdo->prepare($queryUpdate);
                $stmtUpdate->bindParam(':imageUrl', $data->imageUrl);
                $stmtUpdate->bindParam(':idEstudiante', $data->idEstudiante);

                if ($stmtUpdate->execute()) {
                    ob_end_clean();
                    echo json_encode(['success' => true, 'message' => 'Imagen de perfil del estudiante actualizada correctamente.']);
                    return; // Terminar ejecución después de actualizar el estudiante
                } else {
                    ob_end_clean();
                    echo json_encode(['success' => false, 'message' => 'Error al actualizar la imagen de perfil del estudiante.']);
                    return;
                }
            } else {
                ob_end_clean();
                echo json_encode(['success' => false, 'message' => 'Estudiante no encontrado.']);
                return;
            }
        }

        // Verificar si se debe actualizar el Docente
        if (!empty($data->idDocente)) {
            // Paso 1: Buscar si el docente existe
            $queryCheck = 'SELECT COUNT(*) FROM "Docente" WHERE "idDocente" = :idDocente';
            $stmtCheck = $pdo->prepare($queryCheck);
            $stmtCheck->bindParam(':idDocente', $data->idDocente);
            $stmtCheck->execute();
            $docenteExiste = $stmtCheck->fetchColumn() > 0;

            if ($docenteExiste) {
                // Paso 2: Si el docente existe, actualiza su imageUrl
                $queryUpdate = 'UPDATE "Docente" SET "imageUrl" = :imageUrl WHERE "idDocente" = :idDocente';
                $stmtUpdate = $pdo->prepare($queryUpdate);
                $stmtUpdate->bindParam(':imageUrl', $data->imageUrl);
                $stmtUpdate->bindParam(':idDocente', $data->idDocente);

                if ($stmtUpdate->execute()) {
                    ob_end_clean();
                    echo json_encode(['success' => true, 'message' => 'Imagen de perfil del docente actualizada correctamente.']);
                } else {
                    ob_end_clean();
                    echo json_encode(['success' => false, 'message' => 'Error al actualizar la imagen de perfil del docente.']);
                }
            } else {
                ob_end_clean();
                echo json_encode(['success' => false, 'message' => 'Docente no encontrado.']);
            }
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
