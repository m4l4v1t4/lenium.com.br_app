<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
ini_set('memory_limit', '2048M'); // 1 GB

include "config.php";

function conecta_bd(){
    $PDO = new PDO(
        'mysql:host=' . servidor_bd . ';dbname=' . nome_bd . ';charset=utf8mb4',
        usuario_bd,
        senha_bd,
        [
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );

    return $PDO;
}

$pdo = conecta_bd();

$sql = "SELECT id, texto FROM noticias WHERE texto LIKE '%<script%'";
$noticias = $pdo->query($sql)->fetchAll();

$total = 0;

foreach ($noticias as $noticia) {

    $textoLimpo = preg_replace(
        '#<script\b[^>]*>.*?</script>#is',
        '',
        $noticia['texto']
    );

    if ($textoLimpo !== $noticia['texto']) {
        $update = $pdo->prepare("UPDATE noticias SET texto = :texto WHERE id = :id");
        $update->execute([
            ':texto' => $textoLimpo,
            ':id'    => $noticia['id']
        ]);

        $total++;
    }
}

echo "Scripts removidos de {$total} notícias.";
?>