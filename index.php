<?php
header('Content-type: text/html; charset=iso-8859-1');
include_once 'connect.php';
if (isset($_GET['g'])) $g = $_GET['g']; else $g = 'canfield';
if (isset($_GET['z'])) $z = $_GET['z']; else $z = '100';
if (isset($_GET['l'])) $l = $_GET['l']; else { if ($g == 'Mahjong') $l = 'Palace'; else if ($g == "Taquin") $l= '_12_8';  else $l = ''; }
setcookie('niv', $l, 0);
$voy = array('a', 'e', 'i', 'o', 'u', '');
$cons = array('b', 'bl', 'br', 'c','cl', 'cr', 'd', 'dr', 'ds', 'f', 'fl', 'fr', 'gl', 'gm', 'gn', 'gr', 'gs', 'l', 'm','n', 'p', 'pl', 'pr', 'ps', 'r', 'rb', 'rc', 'rl', 'rm', 'rn', 'rp', 'rs', 'rt', 'rv', 's', 'sb', 'sl', 'sn', 'sm', 'ss', 'st', 'sv', 'tl', 'tm', 'tn', 'tr', 'ts', 'tv', 'vl', 'vn', 'vm', 'vr', 'w', 'x', 'z', 'zb', 'zk', 'zl', 'zm', 'zn', 'zr', 'zt');

switch ($g) {
  case 'Mahjong'    : include 's_mahjong.php';    break;
  case 'Freecell'   : include 's_freecell.php';   break;
  case 'Klondike'   : include 's_klondike.php';   break;
  case 'Taquin'     : include 's_taquin.php';     break;
  case 'Clicou'     : include 's_clicou.php';     break;
  case 'Switch'     : include 's_switch.php';     break;
  case 'Poker'      : include 's_poker.php';      break;
  case 'Canfield'   : include 's_canfield.php';   break;
  case 'Solitaire1' : include 's_solitaire1.php'; break;
  case 'Solitaire2' : include 's_solitaire2.php'; break;
  default           : include 's_accueil.php';    break;
}
?>
