<?php
// Configurar reporte de errores y encabezados HTTP
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Incluir la conexión a la base de datos
include_once 'db.php';

// Recibir el cuerpo de la solicitud JSON
$data = json_decode(file_get_contents("php://input"));

// Verificar si los datos requeridos fueron enviados
if (!isset($data->codSis) || !isset($data->password)) {
    echo json_encode(['error' => 'Faltan datos requeridos: correoDocente o password']);
    exit();
}

// Asignar los datos a variables locales
$correoDocente = $data->codSis;
$password = $data->password;

try {
    // Consulta para verificar si el usuario es un docente
    $sqlDocente = 'SELECT * FROM "Docente" WHERE LOWER("correoDocente") = LOWER(:correoDocente) AND "contraseñaDocente" = :password';
    $stmtDocente = $pdo->prepare($sqlDocente);
    $stmtDocente->bindParam(':correoDocente', $correoDocente, PDO::PARAM_STR); // correoDocente es VARCHAR
    $stmtDocente->bindParam(':password', $password, PDO::PARAM_STR);
    $stmtDocente->execute();

    // Verificar si el docente existe
    if ($stmtDocente->rowCount() > 0) {
        $docente = $stmtDocente->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['Usuario' => 'Docente', 'Datos' => $docente]);
    } else {
        echo json_encode(['message' => 'Login failed: Invalid correoDocente or password']);
    }
} catch (PDOException $e) {
    // Manejar errores de conexión o consulta
    error_log("Error en la consulta: " . $e->getMessage());
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
