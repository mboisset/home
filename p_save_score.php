<?php
include_once 'connect.php';

if (isset($_POST['p'])) $p = $_POST['p']; else $p = '';
if (isset($_POST['g'])) $g = $_POST['g']; else $g = '';
if (isset($_POST['l'])) $l = $_POST['l']; else $l = '';
if (isset($_POST['s'])) $s = $_POST['s']; else $s = '';
if (isset($_POST['c'])) $c = $_POST['c']; else $c = '';
if ($p != '') {
  $qry = "insert into cartes_scores(player, game, niv, score, moves, dt_score) values('$p', '$g', '$l', sec_to_time($s), '$c', now())";
  echo $qry;
  $res = $db->query($qry);
  setcookie('blbrcclcr', $p, time() + 86400 * 365, '/cartes/');
}
?>
