<?php
// Iniciar un buffer de salida para capturar cualquier salida inesperada
ob_start();
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));

error_log("Datos recibidos: " . print_r($data, true));  // Ya tienes esto para el log del servidor
var_dump($data);

try {
    // Iniciar transacción
    $pdo->beginTransaction();

    $success = true;
    $messages = [];

    // Verificar si el idEstudiante está presente para ejecutar la consulta correspondiente
    if (isset($data->idEstudiante)) {
        // Datos del Estudiante
        $idEstudiante = $data->idEstudiante;
        $nombreEstudiante = $data->nombre;
        $apellidoEstudiante = $data->apellido;
        $codSisEstudiante = (int) $data->codigo;
        $telefonoEstudiante = (string) $data->telefono;
        $contrasenaEstudiante = (string) $data->contrasena;
        $idEmpresa = (int) $data->grupo;
        $emailEstudiante = $data->email;

        // Consulta para actualizar el Estudiante
        $queryEstudiante = 'UPDATE "Estudiante"
            SET "nombreEstudiante" = :nombreEstudiante,
                "apellidoEstudiante" = :apellidoEstudiante,
                "codSis" = :codSis,
                "telefonoEstudiante" = :telefonoEstudiante,
                "contraseñaEstudiante" = :contrasenaEstudiante,
                "idGrupoEmpresa" = :idEmpresa,
                "emailEstudiante" = :emailEstudiante
            WHERE "idEstudiante" = :idEstudiante;';

        $stmtEstudiante = $pdo->prepare($queryEstudiante);
        $stmtEstudiante->bindParam(':idEstudiante', $idEstudiante);
        $stmtEstudiante->bindParam(':nombreEstudiante', $nombreEstudiante);
        $stmtEstudiante->bindParam(':apellidoEstudiante', $apellidoEstudiante);
        $stmtEstudiante->bindParam(':codSis', $codSisEstudiante);
        $stmtEstudiante->bindParam(':telefonoEstudiante', $telefonoEstudiante);
        $stmtEstudiante->bindParam(':contrasenaEstudiante', $contrasenaEstudiante);
        $stmtEstudiante->bindParam(':idEmpresa', $idEmpresa);
        $stmtEstudiante->bindParam(':emailEstudiante', $emailEstudiante);

        if ($stmtEstudiante->execute()) {
            $messages[] = 'Estudiante modificado correctamente';
        } else {
            $success = false;
            $messages[] = 'Error al modificar el Estudiante';
        }
    }

    // Verificar si el idDocente está presente para ejecutar la consulta correspondiente
    if (isset($data->idDocente)) {
        // Datos del Docente
        $idDocente = $data->idDocente;
        $nombreDocente = $data->nombreDocente;
        $apellidoDocente = $data->apellidoDocente;
        $codigoDocente = (int) $data->codigoDocente;
        $telefonoDocente = (string) $data->telefonoDocente;
        $contrasenaDocente = (string) $data->contrasenaDocente;
        $emailDocente = $data->emailDocente;

        // Consulta para actualizar el Docente
        $queryDocente = 'UPDATE "Docente"
            SET "nombreDocente" = :nombreDocente,
                "apellidoDocente" = :apellidoDocente,
                "CodigoDocente" = :codigoDocente,
                "telefonoDocente" = :telefonoDocente,
                "contraseñaDocente" = :contrasenaDocente,
                "correoDocente" = :emailDocente
            WHERE "idDocente" = :idDocente;';

        $stmtDocente = $pdo->prepare($queryDocente);
        $stmtDocente->bindParam(':idDocente', $idDocente);
        $stmtDocente->bindParam(':nombreDocente', $nombreDocente);
        $stmtDocente->bindParam(':apellidoDocente', $apellidoDocente);
        $stmtDocente->bindParam(':codigoDocente', $codigoDocente);
        $stmtDocente->bindParam(':telefonoDocente', $telefonoDocente);
        $stmtDocente->bindParam(':contrasenaDocente', $contrasenaDocente);
        $stmtDocente->bindParam(':emailDocente', $emailDocente);

        if ($stmtDocente->execute()) {
            $messages[] = 'Docente modificado correctamente';
        } else {
            $success = false;
            $messages[] = 'Error al modificar el Docente';
        }
    }

    // Si ambas consultas son exitosas, se confirma la transacción
    if ($success) {
        $pdo->commit();
        ob_end_clean();
        echo json_encode(['success' => true, 'message' => implode(', ', $messages)]);
    } else {
        // Si alguna consulta falla, se revierte la transacción
        $pdo->rollBack();
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => implode(', ', $messages)]);
    }
} catch (Exception $e) {
    // En caso de error de base de datos, revierte la transacción
    $pdo->rollBack();
    ob_end_clean();
    error_log("Error de base de datos: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
