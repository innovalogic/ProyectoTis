<?php 
// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

// Incluir el autoload de Composer
require 'vendor/autoload.php'; // Asegúrate de que la ruta sea correcta

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Manejar solicitudes OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function getCorreosEstudiantes($pdo, $idDocente, $idGrupoEmpresa) {
    $query = 'SELECT "emailEstudiante" FROM "Estudiante" WHERE "idDocente" = :idDocente AND "idGrupoEmpresa" = :idGrupoEmpresa';
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':idDocente', $idDocente, PDO::PARAM_INT);
    $stmt->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
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
    // Verifica si hay datos enviados en la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['idDocente']) || empty($data['idGrupoEmpresa']) || empty($data['asunto']) || empty($data['mensaje'])) {
        echo json_encode(['success' => false, 'message' => 'idDocente, idGrupoEmpresa, asunto y mensaje son requeridos.']);
        exit;
    }

    $idDocente = (int)$data['idDocente'];
    $idGrupoEmpresa = (int)$data['idGrupoEmpresa'];
    $asunto = $data['asunto'];
    $mensaje = $data['mensaje'];

    // Obtener la lista de correos electrónicos filtrados
    $correos = getCorreosEstudiantes($pdo, $idDocente, $idGrupoEmpresa);

    if (empty($correos)) {
        echo json_encode(['success' => false, 'message' => 'No se encontraron estudiantes con los criterios proporcionados.']);
        exit;
    }

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
