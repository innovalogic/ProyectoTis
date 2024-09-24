<<<<<<< HEAD
<?php
// db.php

$host = 'localhost';
$dbname = 'p3';
$user = 'postgres';
$password = '';

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
=======
<?php
// db.php

$host = 'localhost';
$dbname = 'p3';
$user = 'postgres';
$password = '';

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
>>>>>>> 2aa7d248b3bcb59d0f93c1f3a935fd6a0aa6905a
