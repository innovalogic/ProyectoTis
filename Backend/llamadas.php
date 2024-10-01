<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conexión a la base de datos
include_once 'db.php';

try {
    // Consulta para obtener los responsables
    $stmt1 = $pdo->query('SELECT CONCAT("nombreEstudiante", \' \', "apellidoEstudiante") AS nombre_completo
                      FROM "Estudiante"
                      WHERE "idGrupoEmpresa" = 1');
    $responsables = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    // Consulta para obtener las actividades
    $stmt2 = $pdo->query('SELECT titulo, "Sprint_idSprint"
                        FROM "HU"
                        WHERE "Sprint_GrupoEmpresa_idGrupoEmpresa" = 1');
    $historiasdeu = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    // Respuesta en formato JSON
    echo json_encode([
        'responsables' => $responsables,
        'historiasdeu' => $historiasdeu  // Cambio realizado aquí
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>