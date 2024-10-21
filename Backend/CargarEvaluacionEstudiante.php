<?php
ob_start();
header("Access-Control-Allow-Origin:*"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

$idEstudiante = isset($_GET['idEstudiante']) ? $_GET['idEstudiante'] : null;

if (!empty($idEstudiante)) {
    try {
        $query = 'SELECT "idevaluacion", "semana", "idEstudiante", "estudiante", "tarea", "calificacion", "comentario", "grupo", "fechaEntrega", "idTarea", "HU_idHU", "HU_Sprint_idSprint", "HU_Sprint_GrupoEmpresa_idGrupoEmpresa", "idDocente" 
                  FROM "evaluacionsemanal" 
                  WHERE "idEstudiante" = :idEs';

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($result)) {
                ob_end_clean();
                echo json_encode(['success' => true, 'datos' => $result]);
            } else {
                ob_end_clean();
                echo json_encode(['success' => false, 'message' => 'No se encontraron evaluaciones para el docente.']);
            }
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al ejecutar la consulta']);
        }
    } catch (PDOException $e) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
    }
} else {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>
