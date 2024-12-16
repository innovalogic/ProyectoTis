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

// Verificar si se han enviado el nombre del Sprint, el idEstudiante y el nombre
if (!isset($data->sprintSeleccionado) || !isset($data->idEstudiante) || !isset($data->nombre)) {
    echo json_encode(['error' => 'Faltan parámetros']);
    exit();
}

$idEstudiante = $data->idEstudiante;
$sprintSeleccionado = $data->sprintSeleccionado;
$nombre = $data->nombre;

try {
    // Consultar las Historias de Usuario donde el estudiante es responsable y tiene tareas asignadas
    $stmt = $pdo->prepare('SELECT DISTINCT "HU"."idHU", "HU"."titulo"
                            FROM "HU"
                            JOIN "Sprint" ON "HU"."Sprint_idSprint" = "Sprint"."idSprint"
                            JOIN "Estudiante" ON "Estudiante"."idGrupoEmpresa" = "Sprint"."GrupoEmpresa_idGrupoEmpresa"
                            JOIN "Tarea" ON "Tarea"."HU_idHU" = "HU"."idHU"
                            WHERE "Sprint"."nomSprint" = :sprintNombre
                              AND "Estudiante"."idEstudiante" = :idEstudiante
                              AND "Tarea"."responsable" = :nombre');

    // Vincular los parámetros
    $stmt->bindParam(':sprintNombre', $sprintSeleccionado, PDO::PARAM_STR);
    $stmt->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);

    // Ejecutar la consulta
    $stmt->execute();

    // Obtener los resultados
    $historiasDeUsuario = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver las HUs como respuesta JSON
    echo json_encode(['historiasDeUsuario' => $historiasDeUsuario]);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
