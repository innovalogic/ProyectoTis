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
    echo json_encode(['error' => 'Faltan datos requeridos: codSis o password']);
    exit();
}

// Asignar los datos a variables locales
$codSis = $data->codSis;
$password = $data->password;

try {
    // Consulta para verificar si el usuario es un estudiante
    $sqlEstudiante = 'SELECT * FROM "Estudiante" WHERE "codSis" = :codSis AND "contraseñaEstudiante" = :password';
    $stmtEstudiante = $pdo->prepare($sqlEstudiante);
    $stmtEstudiante->bindParam(':codSis', $codSis, PDO::PARAM_INT); // codSis es INTEGER
    $stmtEstudiante->bindParam(':password', $password, PDO::PARAM_STR);
    $stmtEstudiante->execute();

    // Verificar si el estudiante existe
    if ($stmtEstudiante->rowCount() > 0) {
        $estudiante = $stmtEstudiante->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['Usuario' => 'Estudiante', 'Datos' => $estudiante]);
    } else {
        echo json_encode(['message' => 'Login failed: Invalid codSis or password']);
    }
} catch (PDOException $e) {
    // Manejar errores de conexión o consulta
    error_log("Error en la consulta: " . $e->getMessage());
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
