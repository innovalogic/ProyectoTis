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
    // Consultar los datos del Estudiante
    $stmt1 = $pdo->prepare('SELECT * FROM "Estudiante" WHERE "idDocente" = :idDocente');
    $stmt1->bindParam(':idDocente', $idDocente, PDO::PARAM_INT);

    // Ejecutar la consulta
    $stmt1->execute();
    
    // Obtener los resultados
    $Estudiantes = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    
    if ($Estudiantes) {
        // Si se encuentran estudiantes, se retornan en formato JSON
        echo json_encode(['estudianteData' => $Estudiantes]);
    } else {
        // Si no se encuentran estudiantes
        echo json_encode(['error' => 'Estudiantes no encontrados']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'Hubo un problema al obtener los datos']);
    exit();
}
?>
