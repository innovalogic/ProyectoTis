<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conexión a la base de datos
include_once 'db.php';

// Recibir el cuerpo de la solicitud JSON
$data = json_decode(file_get_contents("php://input"));

// Verificar si el idDocente fue enviado
if (!isset($data->idDocente)) {
    echo json_encode(['error' => 'Falta idDocente']);
    exit();
}

$idDocente = $data->idDocente;
try {
    // Consultar los datos del docente
    $stmt1 = $pdo->prepare('SELECT * FROM "Docente" WHERE "idDocente" = :idDocente');
    $stmt1->bindParam(':idDocente', $idDocente, PDO::PARAM_INT);

    // Ejecutar la consulta
    $stmt1->execute();
    
    // Obtener los resultados
    $docente = $stmt1->fetch(PDO::FETCH_ASSOC);
    
    if ($docente) {
        // Si se encuentra el docente, se retorna en formato JSON
        echo json_encode(['docenteData' => $docente]);
    } else {
        // Si no se encuentra el docente
        echo json_encode(['error' => 'Docente no encontrado']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>
