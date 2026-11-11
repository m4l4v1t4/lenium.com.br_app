<?php
ob_start();
header("Content-type: text/xml");
include "conexao.php";
$conecta = new PDO('mysql:host='.ELE1_SER.';dbname='.ELE1_BAN.';charset=utf8', ELE1_USU, ELE1_SEN);
$config = $conecta->query("SELECT * FROM configuracoes WHERE id='1'");
$config = $config->fetch(PDO::FETCH_OBJ);
$uportal = $config->protocolo . $config->url . "/";
echo '<?xml version="1.0" encoding="UTF-8"?>';
?>

<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0"><channel><title><?php echo $config->titulo; ?></title><link><?php echo $uportal; ?></link><description><?php echo $config->descricao; ?></description><language>pt-BR</language><copyright>© Copyright <?php echo $config->nome_site; ?>.</copyright><atom:link href="<?php echo $uportal . "rss.xml"; ?>" rel="self" type="application/rss+xml"/><image><url><?php echo $uportal . "img/" . $config->icone; ?></url><title><?php echo $config->titulo; ?></title><link><?php echo $uportal; ?></link><width>144</width><height>144</height></image>
<?php
$select = $conecta->query("SELECT * FROM noticias WHERE status='S' AND data < '".date('Y-m-d H:i:s')."' AND lixeira='N' ORDER BY id DESC LIMIT 10");
while($dados = $select->fetch(PDO::FETCH_OBJ)) {
$categoria = $conecta->query("SELECT * FROM noticias_cat WHERE id='".$dados->id_cat."'");
$categoria = $categoria->fetch(PDO::FETCH_OBJ);
?><item><title><?php echo $dados->titulo; ?></title></item><?php } ?></channel></rss>
<?php echo preg_replace('/&(?!#?[a-z0-9]+;)/', '&amp;', ob_get_clean()); ?>