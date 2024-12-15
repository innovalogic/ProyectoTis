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

// Verificar si se ha subido un archivo y si no hay errores
if (!isset($_FILES['archivo']) || $_FILES['archivo']['error'] !== UPLOAD_ERR_OK) {
    error_log("Error en el archivo subido. FILES: " . print_r($_FILES, true));
    echo json_encode(['error' => 'No se ha subido ningún archivo válido.']);
    exit();
}

// Verificar si se ha recibido el nombre del archivo
if (!isset($_POST['nombreArchivo'])) {
    error_log("No se recibió el parámetro 'nombreArchivo'. POST: " . print_r($_POST, true));
    echo json_encode(['error' => 'Falta el parámetro nombreArchivo.']);
    exit();
}

// Obtener el nombre del archivo recibido
$nombreArchivo = $_POST['nombreArchivo'];

// Validar que el archivo sea de tipo .sql
$fileExtension = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));
if ($fileExtension !== 'sql') {
    echo json_encode(['error' => 'Solo se permiten archivos .sql']);
    exit();
}

// Log de depuración para ver detalles del archivo subido y el nombre
error_log("Archivo subido: " . print_r($_FILES['archivo'], true));
error_log("Nombre del archivo recibido: " . $nombreArchivo);

// Convertir el archivo a binario
$archivoBinario = file_get_contents($_FILES['archivo']['tmp_name']);

// Log para verificar si el archivo binario fue cargado correctamente
error_log("Archivo binario cargado: " . strlen($archivoBinario) . " bytes.");

// Preparar la consulta para insertar el archivo, su nombre y la fecha de creación
try {
    $stmtArchivo = $pdo->prepare('INSERT INTO "Backups" ("nombreArchivo", "fechaCreacion", archivo) VALUES (:nombreArchivo, NOW(), :archivo)');
    
    // Vincular los parámetros de la consulta
    $stmtArchivo->bindParam(':nombreArchivo', $nombreArchivo);
    $stmtArchivo->bindParam(':archivo', $archivoBinario, PDO::PARAM_LOB);
    $stmtArchivo->execute();

    // Respuesta de éxito
    http_response_code(200);
    echo json_encode(['mensaje' => 'Archivo y/o enlace actualizados exitosamente.']);
} catch (PDOException $e) {
    // Manejar errores de base de datos
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
    exit();
} catch (Exception $e) {
    // Otros errores
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
