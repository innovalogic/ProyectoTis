<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit();
}

// Obtén el ID de la URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    echo json_encode(['success' => false, 'message' => 'ID inválido']);
    exit();
}
try {

    $query = 'DELETE FROM criterios WHERE idcriterios = :id';
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {// Limpia cualquier salida previa antes de enviar la respuesta JSON
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Criterio eliminado con éxito']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se encontró un criterio con ese ID']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar el criterio']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>