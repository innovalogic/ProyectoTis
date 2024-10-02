<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

try {
    // Crear una nueva conexión con PDO
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verifica si la solicitud es POST
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Recoger los datos enviados desde el frontend
        $codSis = $_POST["codSis"] ?? '';  
        $contraseña = $_POST['password'] ?? '';

        // Consulta para verificar si el codSis y la contraseña coinciden
        $sql = 'SELECT * FROM "Estudiante" WHERE "codSis" = :codSis AND "contraseñaEstudiante" = :password';

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':codSis', $codSis);
        $stmt->bindParam(':password', $contraseña);

        // Ejecutar la consulta
        $stmt->execute();

        // Verificar si se encontró un usuario
        if ($stmt->rowCount() > 0) {
            // Obtener los datos del estudiante
            $estudiante = $stmt->fetch(PDO::FETCH_ASSOC);
            // Devolver los datos del estudiante como JSON
            echo json_encode($estudiante);
        } else {
            echo json_encode(["message" => "Login failed: Invalid codSis or password"]);
        }
    }
} catch (PDOException $e) {
    echo json_encode(["message" => "Error en la conexión: " . $e->getMessage()]);
}
?>
