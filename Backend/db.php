<?php

// Conexión a la base de datos PostgreSQL
$host = "localhost";
$port = "5432";
$dbname = "Tis"; // Cambia esto al nombre de tu base de datos
$user = "postgres"; // Usuario de la base de datos
<<<<<<< HEAD
$password = ""; // Contraseña de PostgreSQL
=======
$password = "28042003"; // Contraseña de PostgreSQL
>>>>>>> b47bbc08db5ca84319404bc0512d754ce8fd2f31

try {
    // Crear una nueva conexión PDO
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    // Establecer el modo de error en excepciones
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}


