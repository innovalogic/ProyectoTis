<?php
// Habilitar la visualización de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin:*"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
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
    $stmt1 = $pdo->prepare('SELECT 
    "Sprint"."nomSprint" AS "Sprint", 
    "HU"."titulo" AS "HistoriaUsuario", 
    "Tarea"."titulo" AS "Tarea", 
    encode("Tarea"."archivos", \'base64\') AS "Archivo", 
    "Tarea"."enlace" AS "Link",
    "Tarea"."nombreArchivo" AS "NombreArchivo"
FROM 
    "Tarea"
JOIN 
    "HU" ON "Tarea"."HU_idHU" = "HU"."idHU"
JOIN 
    "Sprint" ON "HU"."Sprint_idSprint" = "Sprint"."idSprint"
JOIN 
    "Estudiante" ON "Estudiante"."idGrupoEmpresa" = "Sprint"."GrupoEmpresa_idGrupoEmpresa"
WHERE 
    "Estudiante"."idEstudiante" = :idEstudiante');
    
    // Vincular el parámetro idEstudiante
    $stmt1->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);
    
    // Ejecutar la consulta
    $stmt1->execute();
    
    // Obtener los resultados
   // Después de ejecutar la consulta
$tabla = $stmt1->fetchAll(PDO::FETCH_ASSOC);

if (empty($tabla)) {
    echo json_encode(['error' => 'No se encontraron resultados']);
    exit();
}

    // Devolver los sprints como respuesta JSON
    echo json_encode(['tabla' => $tabla]);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}

?>