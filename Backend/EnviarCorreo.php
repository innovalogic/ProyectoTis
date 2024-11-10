<?php
// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Manejar solicitudes OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function getCorreosEstudiantes($pdo) {
    $query = 'SELECT "emailEstudiante" FROM "Estudiante"';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_COLUMN); 
}

function enviarCorreo($destinatario, $asunto, $mensaje) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'innovalogicoficial@gmail.com'; 
        $mail->Password = 'yievvnsolbpsabso';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('innovalogicoficial@gmail.com', 'Notificaciones');
        $mail->addAddress($destinatario);
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = $mensaje;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("No se pudo enviar el correo a $destinatario: {$mail->ErrorInfo}");
        return false;
    }
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
