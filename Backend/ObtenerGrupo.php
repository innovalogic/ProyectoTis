<?php
// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin:*"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

include_once 'db.php';

// Manejar solicitudes OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/**
 * Obtener estudiantes desde la base de datos.
 *
 * @param PDO $pdo Instancia de PDO para la conexión a la base de datos.
 * @return array Resultado de la consulta.
 */
function getEstudiantes($pdo) {

    $query = 'SELECT "idGrupoEmpresa","nombreEmpresa", "nombreCortoEmpresa", "correoEmpresa", "logoEmpresa", "idDocente","idEstudianteScrum" FROM "GrupoEmpresa" WHERE "idEstudianteScrum" = 1;';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Ejecutar la lógica principal
try {
    ob_clean(); // Limpiar el buffer de salida antes de enviar la respuesta
    $result = getEstudiantes($pdo);
    echo json_encode(['success' => true, 'datos' => $result]); // Cambia 'data' a 'datos'
} catch (PDOException $e) {
    // Devolver error detallado para fines de depuración (puedes cambiar esto en producción)
    http_response_code(500); // Código de estado HTTP 500 para error interno del servidor
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Manejo de excepciones generales
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error inesperado: ' . $e->getMessage()]);
}
?>
