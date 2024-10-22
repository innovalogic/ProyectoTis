<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'db.php'; // Asegúrate de tener una conexión $pdo establecida

// Recuperar los parámetros del POST
$tareaSeleccionada = $_POST['tareaSeleccionada'] ?? null;
$HuSeleccionado = $_POST['HuSeleccionado'] ?? null;
$sprintSeleccionado = $_POST['sprintSeleccionado'] ?? null;
$idEstudiante = $_POST['idEstudiante'] ?? null;
$enlace = $_POST['enlace'] ?? null;  // Obtener el enlace

// Verificación de que los parámetros necesarios están presentes
if (!$tareaSeleccionada || !$HuSeleccionado || !$sprintSeleccionado || !$idEstudiante) {
    echo json_encode(['error' => 'Faltan parámetros: ' . json_encode($_POST)]);
    exit();
}

try {
    // Logear los datos para depuración
    error_log("sprintSeleccionado: " . $sprintSeleccionado);
    error_log("HuSeleccionado: " . $HuSeleccionado);
    error_log("idEstudiante: " . $idEstudiante);
    error_log("enlace: " . $enlace);

    // Preparar la consulta para el enlace, si existe
    if ($enlace) {
        $stmtEnlace = $pdo->prepare('UPDATE "Tarea"
        SET "enlace" = :enlace
        WHERE "Tarea"."HU_idHU" IN (
            SELECT "HU"."idHU"
            FROM "HU", "Sprint", "Estudiante"
            WHERE "HU"."Sprint_idSprint" = "Sprint"."idSprint"
              AND "Estudiante"."idGrupoEmpresa" = "Sprint"."GrupoEmpresa_idGrupoEmpresa"
              AND "Sprint"."nomSprint" = :sprintNombre
              AND "HU"."titulo" = :HuNombre
              AND "Estudiante"."idEstudiante" = :idEstudiante
        )
        AND "Tarea"."titulo" = :tareaNombre;
        ');

        $stmtEnlace->bindParam(':enlace', $enlace, PDO::PARAM_STR);
        $stmtEnlace->bindParam(':sprintNombre', $sprintSeleccionado, PDO::PARAM_STR);
        $stmtEnlace->bindParam(':HuNombre', $HuSeleccionado, PDO::PARAM_STR);
        $stmtEnlace->bindParam(':tareaNombre', $tareaSeleccionada, PDO::PARAM_STR);
        $stmtEnlace->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);

        $stmtEnlace->execute();
    }

    if (isset($_FILES['archivo']) && $_FILES['archivo']['error'] === UPLOAD_ERR_OK) {
        // Verificar el tipo MIME del archivo
        $mimeType = mime_content_type($_FILES['archivo']['tmp_name']);
        if (!in_array($mimeType, ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])) {
            throw new Exception('El archivo debe ser un PDF o DOC.');
        }
    
        // Convertir el archivo a binario
        $archivoBinario = file_get_contents($_FILES['archivo']['tmp_name']);
        
        // Obtener el nombre del archivo
        $nombreArchivo = $_FILES['archivo']['name']; // Nombre del archivo subido
        // Log para depuración
error_log("Archivo subido: " . $nombreArchivo);
    
        // Log para depuración
        error_log("Archivo subido: " . $nombreArchivo);
    
        // Preparar la consulta para actualizar el archivo y el nombre del archivo
        $stmtArchivo = $pdo->prepare('UPDATE "Tarea"
        SET "archivos" = :archivo, "nombreArchivo" = :nombreArchivo
        WHERE "Tarea"."HU_idHU" IN (
            SELECT "HU"."idHU"
            FROM "HU", "Sprint", "Estudiante"
            WHERE "HU"."Sprint_idSprint" = "Sprint"."idSprint"
              AND "Estudiante"."idGrupoEmpresa" = "Sprint"."GrupoEmpresa_idGrupoEmpresa"
              AND "Sprint"."nomSprint" = :sprintNombre
              AND "HU"."titulo" = :HuNombre
              AND "Estudiante"."idEstudiante" = :idEstudiante
        )
        AND "Tarea"."titulo" = :tareaNombre;
        ');
    
        // Vincular parámetros
        $stmtArchivo->bindParam(':archivo', $archivoBinario, PDO::PARAM_LOB);
        $stmtArchivo->bindParam(':nombreArchivo', $nombreArchivo, PDO::PARAM_STR); // Nombre del archivo
        $stmtArchivo->bindParam(':sprintNombre', $sprintSeleccionado, PDO::PARAM_STR);
        $stmtArchivo->bindParam(':HuNombre', $HuSeleccionado, PDO::PARAM_STR);
        $stmtArchivo->bindParam(':tareaNombre', $tareaSeleccionada, PDO::PARAM_STR);
        $stmtArchivo->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);
    
        // Ejecutar la consulta
        $stmtArchivo->execute();
    }
    

    // Respuesta de éxito
    http_response_code(200);
    echo json_encode(['mensaje' => 'Archivo y/o enlace actualizados exitosamente.']);

} catch (PDOException $e) {
    // Errores de la base de datos
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
    exit();
} catch (Exception $e) {
    // Otros errores, como los de archivo
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
