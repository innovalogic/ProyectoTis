<?php

// Encabezados CORS y manejo de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
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

// Verificar si se recibieron los parámetros necesarios
if (isset($_GET['idEstudiante']) && isset($_GET['semana'])) {
    $idEstudiante = $_GET['idEstudiante'];
    $semana = $_GET['semana'];

    try {
        // Preparar la consulta SQL usando parámetros con PDO
        $query = "
            SELECT calificacion, comentario 
            FROM evaluacionsemanal
            WHERE \"idEstudiante\" = :idEstudiante AND semana = :semana
            LIMIT 1";

        // Preparar la consulta con PDO
        $stmt = $pdo->prepare($query);

        // Enlazar los parámetros a la consulta
        $stmt->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);
        $stmt->bindParam(':semana', $semana, PDO::PARAM_INT);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener los resultados
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            // Devolver los datos de la evaluación en formato JSON
            echo json_encode($result);
        } else {
            // No se encontró ninguna evaluación
            echo json_encode(null);
        }

    } catch (PDOException $e) {
        // En caso de error, devolver un mensaje de error en JSON
        echo json_encode(['error' => $e->getMessage()]);
    }

} else {
    // Si no se recibieron los parámetros requeridos, retornar un error
    http_response_code(400);
    echo json_encode(['error' => 'Faltan parámetros']);
}
?>
