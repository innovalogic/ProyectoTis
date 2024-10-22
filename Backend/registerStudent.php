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
    !empty($data->codsiss) &&
    !empty($data->telefono) &&
    !empty($data->contrasena) &&
    !empty($data->email) &&
    !empty($data->codigoDocente) // Verificar que el código de docente esté presente
) {
    try {
        // Verificar si el CodSISS ya existe
        $checkQuery = 'SELECT COUNT(*) FROM "Estudiante" WHERE "codSis" = :codsiss';
        $checkStmt = $pdo->prepare($checkQuery);
        $checkStmt->bindParam(':codsiss', $data->codsiss);
        $checkStmt->execute();
        $exists = $checkStmt->fetchColumn();

        if ($exists > 0) {
            // Si el CodSISS ya existe, devolver un error
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'El CodSISS ya está registrado.']);
            exit;
        }

        // Verificar si el código de docente existe
        $docenteQuery = 'SELECT "idDocente" FROM "Docente" WHERE "CodigoDocente" = :codigoDocente';
        $docenteStmt = $pdo->prepare($docenteQuery);
        $docenteStmt->bindParam(':codigoDocente', $data->codigoDocente);
        $docenteStmt->execute();
        $docente = $docenteStmt->fetch(PDO::FETCH_ASSOC);

        if (!$docente) {
            // Si el código de docente no existe, devolver un error
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'El código del docente no existe.']);
            exit;
        }

        // Obtener el ID del docente
        $idDocente = $docente['idDocente'];

        // Proceder con la inserción del estudiante
        $query = 'INSERT INTO "Estudiante" ("nombreEstudiante", "apellidoEstudiante", "codSis", "telefonoEstudiante", "contraseñaEstudiante", "idGrupoEmpresa", "idDocente", "emailEstudiante") 
                  VALUES (:nombre, :apellido, :codsiss, :telefono, :contrasena, null, :idDocente, :email)';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':nombre', $data->nombre);
        $stmt->bindParam(':apellido', $data->apellido);
        $stmt->bindParam(':codsiss', $data->codsiss);
        $stmt->bindParam(':telefono', $data->telefono);
        $stmt->bindParam(':contrasena', $data->contrasena); 
        $stmt->bindParam(':idDocente', $idDocente); // Usar el ID del docente obtenido
        $stmt->bindParam(':email', $data->email);

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
