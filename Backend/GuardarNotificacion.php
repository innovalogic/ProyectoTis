<?php
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->campo1) &&
    !empty($data->links) &&
    !empty($data->fecha) &&
    !empty($data->hora) &&
    !empty($data->idDocente) 
) {
    try {
        $query = 'INSERT INTO "notificacion" ("mensaje", "fecha", "hora", "iddocente") VALUES (:campo1, :fecha, :hora, :idDocente)';
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':campo1', $data->campo1);
        $stmt->bindParam(':fecha', $data->fecha);
        $stmt->bindParam(':hora', $data->hora);
        $stmt->bindParam(':idDocente', $data->idDocente);

        if ($stmt->execute()) {
            $notificacionId = $pdo->lastInsertId();

            if (!empty($data->links)) {
                try{
                    $linkSql = 'INSERT INTO "notificacion_links" ("idnotificacion", "enlace") VALUES (:notificacionId, :enlace)';
                    $linkStmt = $pdo->prepare($linkSql);
    
                    foreach ($data->links as $link) {
                        $linkStmt->bindValue(':notificacionId', $notificacionId);
                        $linkStmt->bindValue(':enlace', $link);
                        $linkStmt->execute();
                    }
                }catch (PDOException $e) {
                    ob_end_clean();
                    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
                }
                
            }

            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Grupo Empresa registrado', 'lastUserId' => $notificacionId]);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al registrar grupoempresa']);
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
