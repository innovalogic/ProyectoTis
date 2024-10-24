<?php

// Conexión a la base de datos PostgreSQL
$host = "aws-0-sa-east-1.pooler.supabase.com";
$port = "6543";
$dbname = "postgres"; // Cambia esto al nombre de tu base de datos
$user = "postgres.hcdrqbslrxbupukzfyhj"; // Usuario de la base de datos
$password = "tisINGL2024$"; // Contraseña de PostgreSQL

try {
    // Crear una nueva conexión PDO
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    // Establecer el modo de error en excepciones
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}


