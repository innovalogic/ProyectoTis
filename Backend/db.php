<?php

// Conexión a la base de datos PostgreSQL
$host = "localhost";
$port = "5432";
$dbname = "p3"; // Cambia esto al nombre de tu base de datos
$user = "postgres"; // Usuario de la base de datos
$password = ""; // Contraseña de PostgreSQL

try {
    // Crear una nueva conexión PDO
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    // Establecer el modo de error en excepciones
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa";
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}

?>
