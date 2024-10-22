<?php
ob_start();
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$data = json_decode(file_get_contents("php://input"));
var_dump($data); // Para verificar qué datos están llegando

if (
    !empty($data->fechaInicio) &&
    !empty($data->fechaFin) &&
    !empty($data->nomSprint) &&
    !empty($data->codSis)
) {
    try {
        $querycodSis = "SELECT \"idGrupoEmpresa\"
                FROM \"Estudiante\"
                WHERE \"codSis\"=:codSis";
        $stmtcodSis = $pdo->prepare($querycodSis);
        $stmtcodSis->bindParam(':codSis', $data->codSis);
        $stmtcodSis->execute();

        // Verificar si se encontró el codigosis
        $codSisData = $stmtcodSis->fetch(PDO::FETCH_ASSOC);
        if (!$codSisData) {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'codigoSis no encontrado']);
            exit();
        }
        $idGrupoEmpresa = $codSisData['idGrupoEmpresa'];

        $query = 'INSERT INTO "Sprint"("fechaInicio", "fechaFin", "GrupoEmpresa_idGrupoEmpresa", "nomSprint")
                  VALUES (:startDate, :endDate, :idGrupoEmpresa, :nomSprint)';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':startDate', $data->fechaInicio);
        $stmt->bindParam(':endDate', $data->fechaFin);
        $stmt->bindParam(':nomSprint', $data->nomSprint);
        $stmt->bindParam(':idGrupoEmpresa', $idGrupoEmpresa); // Aquí se enlaza el idGrupoEmpresa dinámico

        if ($stmt->execute()) {
            ob_end_clean();
            echo json_encode(['success' => true, 'message' => 'Sprint registrada']);
        } else {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Error al registrar el Sprint']);
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