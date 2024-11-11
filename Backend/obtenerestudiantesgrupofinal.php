<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (isset($_GET['idGrupoEmpresa'])) {
    $idGrupoEmpresa = (int)$_GET['idGrupoEmpresa'];

    try {
        $query = "
            SELECT \"idEstudiante\", \"nombreEstudiante\", \"apellidoEstudiante\"
            FROM \"Estudiante\"
            WHERE \"idGrupoEmpresa\" = :idGrupoEmpresa
            ORDER BY \"idEstudiante\" ASC; ;
        ";

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':idGrupoEmpresa', $idGrupoEmpresa, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);

    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Faltan parámetros']);
}
