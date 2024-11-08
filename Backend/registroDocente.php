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
    !empty($data->nombre) &&
    !empty($data->apellido) &&
    !empty($data->contrasena) &&
    !empty($data->correo) &&
    !empty($data->codigoDocente)&&
    !empty($data->telefono) 
// Verificar que el código de docente esté presente
) {
    try {
    $query = 'INSERT INTO "Docente" ("nombreDocente", "apellidoDocente", "contraseñaDocente","correoDocente","CodigoDocente", "telefonoDocente") 
                  VALUES (:nombre, :apellido, :contrasena, :correo, :codigoDocente, :telefono)';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':nombre', $data->nombre);
        $stmt->bindParam(':apellido', $data->apellido);
        $stmt->bindParam(':contrasena', $data->contrasena); 
        $stmt->bindParam(':correo', $data->correo);
        $stmt->bindParam(':codigoDocente', $data->codigoDocente);
        $stmt->bindParam(':telefono', $data->telefono);

        if ($stmt->execute()) {
            // Limpia cualquier salida previa antes de enviar la respuesta JSON
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Estudiante registrado exitosamente.']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al registrar el estudiante.']);
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
