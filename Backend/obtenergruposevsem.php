<?php
// Encabezados CORS
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin:*"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

include_once 'db.php';

// Manejar solicitudes OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


try {
    // Asegúrate de que el idDocente se pase correctamente
    $idDocente = isset($_GET['idDocente']) ? $_GET['idDocente'] : null;

    if ($idDocente === null) {
        http_response_code(400); // Solicitud incorrecta
        echo json_encode(["error" => "Falta el idDocente"]);
        exit;
    }

    // Consulta para obtener los grupos empresa del docente específico
    $query = 'SELECT "idGrupoEmpresa", "nombreEmpresa" FROM "GrupoEmpresa" WHERE "idDocente" = :idDocente';
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':idDocente', $idDocente, PDO::PARAM_INT); // Asegúrate de que sea el tipo correcto
    $stmt->execute();
    
    // Obtener los resultados
    $grupos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Enviar los resultados en formato JSON
    echo json_encode($grupos);
} catch (PDOException $e) {
    // Enviar mensaje de error en caso de fallo
    http_response_code(500); // Error interno del servidor
    echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
}

?>
