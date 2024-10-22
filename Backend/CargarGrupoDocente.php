<?php
ob_start();
header("Access-Control-Allow-Origin:*"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

$idDocente = isset($_GET['idDocente']) ? $_GET['idDocente'] : null;

if (!empty($idDocente)) {
    try {
        $query = 'SELECT distinct g."nombreCortoEmpresa",g."idGrupoEmpresa"
                    FROM evaluacionsemanal e
                    JOIN "GrupoEmpresa" g ON e.grupo = g."idGrupoEmpresa"
                    WHERE e."idDocente" = :idDocente';

        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':idDocente', $idDocente, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($result)) {
                ob_end_clean();
                echo json_encode(['success' => true, 'datos' => $result]);
            } else {
                ob_end_clean();
                echo json_encode(['success' => false, 'message' => 'No se encontraron datos para el estudiante.']);
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
