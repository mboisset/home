<?php
include_once 'connect.php';
if (isset($_GET['g'])) $g = $_GET['g']; else $g = '';
if (isset($_GET['l'])) $l = $_GET['l']; else $l = '';
$s = $s * 1;
$t = $s;
$hGame = floor($t/3600);
$t = $t - $hGame * 3600;
$mGame = floor($t/60);
$sGame = $t - $mGame * 60;
$scoreTxt = sprintf("%02d:%02d:%02d", $hGame, $mGame, $sGame);

$qry = "select player, game, score, date_format(dt_score, '%e/%m/%Y') as dt_score, time_to_sec(score) as num_score from cartes_scores where game = '$g' and niv = '$l' order by score asc limit 20";
//echo "<pre>\nscore = $s - scoreTxt = $scoreTxt\nqry = $qry\n</pre>";
$res = $db->query($qry);
?>
<table id="table_scores" onclick="document.getElementById('scores').style.display = 'none'" title="Cliquer pour fermer" style="cursor:default">
  <thead>
    <tr class="title"><th colspan="4" class="title">Meilleurs scores</th><tr>
    <tr>
      <th>Rang</th>
      <th>Joueur</th>
      <th>Score</th>
      <th>Date</th>
    </tr>
  </thead>
<?php
for ($i = 1; $i < 21; $i++) {
  if ($row = $res->fetch_object()) {
    $player = $row->player;
    $score = $row->score;
    $dt_score = $row->dt_score;
    $num_score = $row->num_score;
  }
  else {
    $player = '';
    $score = '';
    $dt_score = '';
    $num_score = 500000;
  }
?>
    <tr class="item<?php echo $i; ?>" style="opacity:<?php echo ((25-$i)*.05); ?>">
      <td class="num"><?php echo $i; ?></td>
      <td class="centre"><?php echo $player; ?></td>
      <td class="centre"><?php echo $row->score; ?></td>
      <td class="num"><?php echo $dt_score; ?></td>
    </tr>
<?php    
}
?>
  </tbody>
</table>
