<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

try {
    // Consulta para obtener todos los estudiantes
    $query = 'SELECT "idEstudianteScrum" FROM "GrupoEmpresa"';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Enviar respuesta en formato JSON
    echo json_encode([
        'success' => true,
        'estudiantes' => $result
    ]);
} catch (PDOException $e) {
    // Enviar un mensaje de error en caso de fallo
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
}
   
?>
   