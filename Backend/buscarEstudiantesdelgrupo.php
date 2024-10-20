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

// Verificar si se han enviado los parámetros necesarios
if (isset($_GET['grupo']) && isset($_GET['sprint']) && isset($_GET['semana'])) {
    $grupo = $_GET['grupo'];
    $sprint = $_GET['sprint'];
    $semana = $_GET['semana'];

    try {
        // Convertir la fecha de '4/11/2024' a '2024-11-04'
        $fecha = DateTime::createFromFormat('j/n/Y', $semana);
        if ($fecha) {
            $fecha_formateada = $fecha->format('Y-m-d');
        } else {
            echo json_encode(['error' => 'Formato de fecha inválido']);
            exit;
        }

        // Consulta utilizando los parámetros recibidos sin alias "T"
        $query = "
            WITH TareasConRanking AS (
                SELECT 
                    \"Tarea\".*,
                    ROW_NUMBER() OVER (PARTITION BY \"Tarea\".\"responsable\" ORDER BY \"Tarea\".\"fechaEntrega\" ASC) AS fila
                FROM \"Tarea\"
                WHERE \"HU_Sprint_GrupoEmpresa_idGrupoEmpresa\" = :grupo
                  AND \"fechaEntrega\" > :semana
                  AND \"HU_Sprint_idSprint\" = :sprint
            )
            SELECT *
            FROM TareasConRanking
            WHERE fila = 1;
        ";

        // Preparar la consulta
        $stmt = $pdo->prepare($query);

        // Enlazar parámetros
        $stmt->bindParam(':grupo', $grupo, PDO::PARAM_INT);
        $stmt->bindParam(':sprint', $sprint, PDO::PARAM_INT);
        $stmt->bindParam(':semana', $fecha_formateada, PDO::PARAM_STR);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener los resultados
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Convertir el archivo a Base64 si no es nulo
        foreach ($result as &$row) {
            if (isset($row['archivos']) && $row['archivos'] !== null) {
                // Verificar el tipo de dato de 'archivos' antes de codificar
                if (is_string($row['archivos'])) {
                    $row['archivos'] = base64_encode($row['archivos']);
                } elseif (is_resource($row['archivos'])) {
                    // Si es un recurso, podrías necesitar leerlo primero
                    $row['archivos'] = base64_encode(stream_get_contents($row['archivos']));
                }
            } else {
                $row['archivos'] = null; // Asegúrate de que se mantenga como null si no hay datos
            }
        }
        

        // Devolver los resultados en formato JSON
        echo json_encode($result);

    } catch (PDOException $e) {
        // En caso de error, devolver un mensaje
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Faltan parámetros']);
}
?>
