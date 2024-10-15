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

// Verificar si el idEstudiante fue enviado
if (!isset($data->idEstudiante)) {
    echo json_encode(['error' => 'Falta idEstudiante']);
    exit();
}

$idEstudiante = $data->idEstudiante;

try {
    // Consultar los sprints relacionados al estudiante
    $stmt1 = $pdo->prepare('SELECT "Sprint"."nomSprint"
                            FROM "Estudiante"
                            JOIN "Sprint" ON "Estudiante"."idGrupoEmpresa" = "Sprint"."GrupoEmpresa_idGrupoEmpresa"
                            WHERE "Estudiante"."idEstudiante" = :idEstudiante');
    
    // Vincular el parámetro idEstudiante
    $stmt1->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);
    
    // Ejecutar la consulta
    $stmt1->execute();
    
    // Obtener los resultados
    $sprints = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    
    // Devolver los sprints como respuesta JSON
    echo json_encode(['Sprint' => $sprints]);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
