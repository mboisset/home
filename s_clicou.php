<?php
header('Content-type: text/html; charset=iso-8859-1');
if (isset($_COOKIE['clicou_lvl'])) $l = $_COOKIE['clicou_lvl']; else $l = '2';
if (isset($_GET['l'])) $l = $_GET['l']; else $l = '2';
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Patiences et solitaires - Clicou</title>
    <link type="text/css" rel="stylesheet" media="screen" href="style/clicou.css">
    <link type="text/css" rel="stylesheet" media="screen" href="style/menu.css">
    <link rel="icon" type="image/png" href="favicon.png" />
    <script type="text/javascript" src="js/menu.js"></script>
  </head>
  <body>
<?php include 's_menu.php'; ?>

    <div id="zoom_zone">
    <div id="tapis">
    <div id="frame"><div id="subframe"></div></div>
    </div>
    </div>
    
    <div id="count"></div>
    <audio id="tiles_set" style="display:none" >
      <source src="style/media/snd_dominos.mp3" type="audio/ogg">
      <embed src="style/media/snd_dominos.mp3">
    </audio> 
    <audio id="tile_click" style="display:none" >
      <source src="style/media/snd_clicou2.mp3" type="audio/ogg">
      <embed src="style/media/snd_clicou2.mp3">
    </audio> 
    <div id="lvl">  
      <b>Niveaux</b>
    <ul>
      <li><?php if ($l != '1') { ?><a href="javascript:window.location='./?g=Clicou&z=<?php echo $z; ?>&l=1';">1</a><?php } else { ?>1<?php } ?></li>
      <li><?php if ($l != '2') { ?><a href="javascript:window.location='./?g=Clicou&z=<?php echo $z; ?>&l=2';">2</a><?php } else { ?>2<?php } ?></li>
      <li><?php if ($l != '3') { ?><a href="javascript:window.location='./?g=Clicou&z=<?php echo $z; ?>&l=3';">3</a><?php } else { ?>3<?php } ?></li>
      <li><?php if ($l != '4') { ?><a href="javascript:window.location='./?g=Clicou&z=<?php echo $z; ?>&l=4';">4</a><?php } else { ?>4<?php } ?></li>
    </ul>
    </div>
    <script type="text/javascript" src="js/clicou.js"></script>
    <script type="text/javascript">set_level(<?php echo $l; ?>);set_up();</script>
  </body>
</html>