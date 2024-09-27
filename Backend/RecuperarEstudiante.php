<?php
    header("Access-Control-Allow-Origin: *"); // Permite todos los orígenes
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // Iniciar un buffer de salida para capturar cualquier salida inesperada
    ob_start();

    header("Content-Type: application/json; charset=UTF-8");

    include_once 'db.php';

    // Asegúrate de manejar las solicitudes OPTIONS preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    try {
        $query = 'SELECT "idEstudiante", "nombreEstudiante", "apellidoEstudiante", "codSis", "telefonoEstudiante", "emailEstudiante" FROM "Estudiante"';
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'data' => $result]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
    }
?>