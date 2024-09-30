<?php
// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php'; // Asegúrate de tener la conexión a la base de datos

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->estudiantes) && !empty($data->idGrupo)) {
    $estudiantes = $data->estudiantes; // Array de IDs de estudiantes
    $idGrupo = $data->idGrupo; // Nuevo idGrupo a asignar

    try {
        // Preparar la consulta
        $query = 'UPDATE "Estudiante" SET "idGrupoEmpresa" = :idGrupo WHERE "idEstudiante" = :idEstudiante';
        $stmt = $pdo->prepare($query);

        // Ejecutar la consulta para cada estudiante en el array
        foreach ($estudiantes as $idEstudiante) {
            $stmt->bindParam(':idGrupo', $idGrupo);
            $stmt->bindParam(':idEstudiante', $idEstudiante);
            $stmt->execute();
        }

        ob_end_clean();
        echo json_encode(['success' => true, 'message' => 'Grupo asignado a los estudiantes']);
    } catch (PDOException $e) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
    }
} else {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>
