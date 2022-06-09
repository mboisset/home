<?php
include_once 'connsql.php';
if (isset($_GET['g'])) $g = $_GET['g']; else $g = 'canfield';
$voy = array('a', 'e', 'i', 'o', 'u', '');
$cons = array('b', 'bl', 'br', 'c','cl', 'cr', 'd', 'dr', 'ds', 'f', 'fl', 'fr', 'gl', 'gm', 'gn', 'gr', 'gs', 'l', 'm','n', 'p', 'pl', 'pr', 'ps', 'r', 'rb', 'rc', 'rl', 'rm', 'rn', 'rp', 'rs', 'rt', 'rv', 's', 'sb', 'sl', 'sn', 'sm', 'ss', 'st', 'sv', 'tl', 'tm', 'tn', 'tr', 'ts', 'tv', 'vl', 'vn', 'vm', 'vr', 'w', 'x', 'z', 'zb', 'zk', 'zl', 'zm', 'zn', 'zr', 'zt');
if (isset($_COOKIE['blbrcclcr'])) {
  $qry = "select * from cartes where cookie = '".$_COOKIE['blbrcclcr']."'";
  $res = mysql_query($qry);
  $row = mysql_fetch_object($res);
  $cookie = $row->cookie;
  setcookie('blbrcclcr', $cookie, time() + 31536000, "/cartes/", 'boisset.be');
}
else {
  $cookie = $voy[rand(0,5)].$cons[rand(0,count($cons))].$voy[rand(0,4)].$cons[rand(0,count($cons))].$voy[rand(0,4)].$cons[rand(0,count($cons))].$voy[rand(0,4)];
  $qry = "insert into cartes(cookie) values('$cookie');";
  $res = mysql_query($qry);
  $rc = setcookie('blbrcclcr', $cookie, time() + 31536000, '/cartes/', 'boisset.be');
  //echo "<pre>c='$rc'</pre>";
}
$qry = "update cartes set ip = '".$_SERVER['REMOTE_ADDR']."', dt = now(), game = '$g' where cookie = '$cookie'";
$res = mysql_query($qry);
switch ($g) {
  case 'freecell' : include 's_freecell.php'; break;
  case 'klondike' : include 's_klondike.php'; break;
  case 'freecell' : 
  default :         include 's_canfield.php'; break;
}
?>
<!--div id="0"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="1"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="2"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="3"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="4"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="5"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="6"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="7"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="8"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="9"  class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="10" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="11" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="12" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="13" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="14" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="15" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="16" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="17" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="18" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="19" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="20" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="21" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="22" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="23" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="24" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="25" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="26" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="27" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="28" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="29" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="30" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="31" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="32" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="33" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="34" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="35" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="36" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="37" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="38" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="39" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="40" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="41" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="42" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="43" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="44" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="45" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="46" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="47" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="48" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="49" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="50" class="card_shape card_deck " style="top:0;left:-2000px;"></div>
<div id="51" class="card_shape card_deck " style="top:0;left:-2000px;"></div-->
<div id="count"></div>
<?php
if (isset($_GET['g'])) $g = $_GET['g']; else $g = 'canfield';
switch ($g) {
  case 'freecell' : echo '<script src="js/freecell.js" type="text/javascript"></script>'; break;
  case 'klondike' : echo '<script src="js/klondike.js" type="text/javascript"></script>'; break;
  case 'canfield' : 
  default :         echo '<script src="js/canfield.js" type="text/javascript"></script>'; break;
}
?>
<script type="text/javascript">
createCards();
</script>
</body>
</html>