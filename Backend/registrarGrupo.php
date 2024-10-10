<?php
// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->NombreEmpresa) &&
    !empty($data->NombreCorto) &&
    !empty($data->CorreoEmpresa) &&
    !empty($data->jefeId) &&
    !empty($data->imageUrl)
) {
    try {
        $query = 'INSERT INTO "GrupoEmpresa" (
            "nombreEmpresa",
            "nombreCortoEmpresa",
            "correoEmpresa",
            "logoEmpresa",
            "idEstudianteScrum"
        ) VALUES (
            :NombreEmpresa,
            :NombreCorto,
            :CorreoEmpresa,
            :imageUrl,
            :jefeId
        )';

        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':NombreEmpresa', $data->NombreEmpresa);
        $stmt->bindParam(':NombreCorto', $data->NombreCorto);
        $stmt->bindParam(':CorreoEmpresa', $data->CorreoEmpresa);
        $stmt->bindParam(':imageUrl', $data->imageUrl);
        $stmt->bindParam(':jefeId', $data->jefeId);

        if ($stmt->execute()) {
            $lastUserId = $pdo->lastInsertId();
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Grupo Empresa registrado', 'lastUserId' => $lastUserId]);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al registrar grupoempresa']);
        }
    } catch (PDOException $e) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
    }
}else{
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
?>
