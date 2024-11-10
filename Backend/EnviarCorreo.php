<?php
// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

// Manejar solicitudes OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Función para obtener los correos electrónicos de los estudiantes
function getCorreosEstudiantes($pdo) {
    $query = 'SELECT "emailEstudiante" FROM "Estudiante"';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_COLUMN); // Devuelve solo los correos
}

// Función para enviar correos electrónicos
function enviarCorreo($destinatario, $asunto, $mensaje) {
    $headers = "From: notificaciones@ejemplo.com\r\n";
    $headers .= "Reply-To: no-reply@ejemplo.com\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Envía el correo y retorna el resultado
    return mail($destinatario, $asunto, $mensaje, $headers);
}

try {
    // Obtener la lista de correos electrónicos
    $correos = getCorreosEstudiantes($pdo);

    // Verifica si hay datos enviados en la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['asunto']) || empty($data['mensaje'])) {
        echo json_encode(['success' => false, 'message' => 'Asunto y mensaje son requeridos.']);
        exit;
    }

    $asunto = $data['asunto'];
    $mensaje = $data['mensaje'];
    $erroresEnvio = [];

    // Enviar el correo a cada destinatario
    foreach ($correos as $email) {
        if (!enviarCorreo($email, $asunto, $mensaje)) {
            $erroresEnvio[] = $email;
        }
    }

    if (count($erroresEnvio) === 0) {
        echo json_encode(['success' => true, 'message' => 'Correos enviados exitosamente.']);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Algunos correos no se pudieron enviar.',
            'errores' => $erroresEnvio
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error inesperado: ' . $e->getMessage()]);
}
?>

