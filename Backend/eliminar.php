<?php
ob_start();
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

$estudianteEliminado = false;  // Inicializamos en false
$docenteEliminado = false;     // Inicializamos en false

// Eliminación de estudiante
if (isset($data->idEstudiante)) {
    $idEstudiante = $data->idEstudiante;

    try {
        $queryEstudiante = 'DELETE FROM "Estudiante" WHERE "idEstudiante" = :idEstudiante';
        $stmtEstudiante = $pdo->prepare($queryEstudiante);
        $stmtEstudiante->bindParam(':idEstudiante', $idEstudiante);

        $estudianteEliminado = $stmtEstudiante->execute();
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar estudiante: ' . $e->getMessage()]);
        exit;
    }
}

// Eliminación de docente
if (isset($data->idDocente)) {
    $idDocente = $data->idDocente;

    try {
        $queryDocente = 'DELETE FROM "Docente" WHERE "idDocente" = :idDocente';
        $stmtDocente = $pdo->prepare($queryDocente);
        $stmtDocente->bindParam(':idDocente', $idDocente);

        $docenteEliminado = $stmtDocente->execute();
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al eliminar docente: ' . $e->getMessage()]);
        exit;
    }
}

// Verificación de eliminación
if ($estudianteEliminado) {
    echo json_encode(['success' => true, 'message' => 'Estudiante eliminado']);
}

if ($docenteEliminado) {
    echo json_encode(['success' => true, 'message' => 'Docente eliminado']);
}

if (!$estudianteEliminado && !$docenteEliminado) {
    echo json_encode(['success' => false, 'message' => 'No se pudo eliminar el estudiante ni el docente']);
}
?>
