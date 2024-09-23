<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->nombre) &&
    !empty($data->apellido) &&
    !empty($data->codsiss) &&
    !empty($data->telefono) &&
    !empty($data->contrasena)
) {
    try {
        $query = 'INSERT INTO "Estudiante" ("nombreEstudiante", "apellidoEstudiante", "codSis", "telefonoEstudiante", "contraseñaEstudiante", "idGrupoEmpresa", "idDocente") 
        VALUES (:nombre, :apellido, :codsiss, :telefono, :contrasena, null, 2)';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':nombre', $data->nombre);
        $stmt->bindParam(':apellido', $data->apellido);
        $stmt->bindParam(':codsiss', $data->codsiss);
        $stmt->bindParam(':telefono', $data->telefono);
        $contrasenaHashed = password_hash($data->contrasena, PASSWORD_BCRYPT);
        $stmt->bindParam(':contrasena', $contrasenaHashed);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Estudiante registrado']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrar el estudiante']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}
