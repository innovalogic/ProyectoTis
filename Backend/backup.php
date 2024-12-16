<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

try {
    // Consulta para obtener todos los backups
    $query = 'SELECT * FROM "Backups"';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir el campo "archivo" (bytea) a Base64
    foreach ($result as &$row) {
        if (isset($row['archivo']) && !empty($row['archivo'])) {
            // Verificar que 'archivo' sea un recurso tipo binario y leer su contenido
            if (is_resource($row['archivo'])) {
                // Convertir el recurso binario a una cadena
                $row['archivo'] = stream_get_contents($row['archivo']);
            }
            // Ahora aplicar base64_encode
            $row['archivo'] = base64_encode($row['archivo']);
        }
    }

    if (empty($result)) {
        echo json_encode(['error' => 'No se encontraron resultados']);
        exit();
    }

    // Enviar los datos al frontend
    echo json_encode([
        'success' => true,
        'backup' => $result,
    ]);
} catch (PDOException $e) {
    // Enviar un mensaje de error en caso de fallo
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>
