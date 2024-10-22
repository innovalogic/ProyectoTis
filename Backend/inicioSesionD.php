<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include_once 'db.php';

try {
    // Crear una nueva conexión con PDO
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verifica si la solicitud es POST
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Recoger los datos enviados desde el frontend
        $correoDocente = $_POST["correoDocente"] ?? '';  
        $contraseña = $_POST['password'] ?? '';

        // Consulta para verificar si el correoDocente y la contraseña coinciden con un docente en la base de datos
        $sql = 'SELECT * FROM "Docente" WHERE "correoDocente" = :correoDocente AND "contraseñaDocente" = :password';

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':correoDocente', $correoDocente);  
        $stmt->bindParam(':password', $contraseña);

        // Ejecutar la consulta
        $stmt->execute();

        // Verificar si se encontró un usuario
        if ($stmt->rowCount() > 0) {
            // Obtener los datos del docente
            $docente = $stmt->fetch(PDO::FETCH_ASSOC);
            // Devolver los datos del docente como JSON
            echo json_encode($docente);
        } else {
            echo json_encode(["message" => "Login failed: Invalid correoDocente or password"]);
        }
    }
} catch (PDOException $e) {
    echo json_encode(["message" => "Error en la conexión: " . $e->getMessage()]);
}
?>
