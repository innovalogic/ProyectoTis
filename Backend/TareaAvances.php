<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Si es una solicitud OPTIONS, responder y salir
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Conexión a la base de datos
include_once 'db.php';

// Recibir el cuerpo de la solicitud JSON
$data = json_decode(file_get_contents("php://input"));

// Verificar si se han enviado el nombre del Sprint, el idEstudiante y el título de la HU
if (!isset($data->sprintSeleccionado) || !isset($data->idEstudiante) || !isset($data->HuSeleccionado)) {
    echo json_encode(['error' => 'Faltan parámetros: ' . json_encode($data)]);
    exit();
}

$HuSeleccionado = $data->HuSeleccionado;
$sprintSeleccionado = $data->sprintSeleccionado;
$idEstudiante = $data->idEstudiante;

try {
    // Logear los datos para depuración
    error_log("sprintSeleccionado: " . $sprintSeleccionado);
    error_log("HuSeleccionado: " . $HuSeleccionado);
    error_log("idEstudiante: " . $idEstudiante);
    
    // Consultar las Historias de Usuario relacionadas al Sprint y al estudiante
    $stmt = $pdo->prepare('SELECT "Tarea"."titulo"
    FROM "Tarea" 
    JOIN "HU" ON "Tarea"."HU_idHU" = "HU"."idHU" 
    JOIN "Sprint" ON "HU"."Sprint_idSprint" = "Sprint"."idSprint" 
    JOIN "Estudiante" ON "Estudiante"."idGrupoEmpresa" = "Sprint"."GrupoEmpresa_idGrupoEmpresa"
    WHERE "Sprint"."nomSprint" = :sprintNombre 
    AND "HU"."titulo" = :HuNombre
    AND "Estudiante"."idEstudiante" = :idEstudiante');
    
    // Vincular los parámetros
    $stmt->bindParam(':sprintNombre', $sprintSeleccionado, PDO::PARAM_STR);
    $stmt->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);
    $stmt->bindParam(':HuNombre', $HuSeleccionado, PDO::PARAM_STR);
    
    // Ejecutar la consulta
    $stmt->execute();
    
    // Obtener los resultados
    $tarea = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver las Tareas como respuesta JSON
    http_response_code(200);
    echo json_encode(['tarea' => $tarea]);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}

