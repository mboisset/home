<?php header('Content-type: text/html; charset=iso-8859-1'); ?>
<!DOCTYPE html>
<html>
  <head>
    <title>Patiences et solitaires - Canfield</title>
    <meta charset="iso-8859-1"/>
    <link type="text/css" rel="stylesheet" media="screen" href="style/cards3.css">
    <link type="text/css" rel="stylesheet" media="screen" href="style/canfield.css">
    <link type="text/css" rel="stylesheet" media="screen" href="style/menu.css">
    <link rel="icon" type="image/png" href="favicon.png" />
    <script type="text/javascript" src="js/menu.js"></script>
  </head>
  <body>
<?php include 's_menu.php'; ?>

    <audio id="snd_card_shuffle" style="display:none" >
      <source src="style/media/snd_card_shuffle.mp3" type="audio/ogg">
      <embed src="style/media/snd_card_shuffle.mp3">
    </audio> 
    <audio id="snd_card_distr" style="display:none" >
      <source src="style/media/snd_card_distr.mp3" type="audio/ogg">
      <embed src="style/media/snd_card_distr.mp3">
    </audio> 
    <audio id="snd_card_slide" style="display:none" >
      <source src="style/media/snd_card_slide.mp3" type="audio/ogg">
      <embed src="style/media/snd_card_slide.mp3">
    </audio> 
    <audio id="snd_card_flip" style="display:none" >
      <source src="style/media/snd_card_flip.mp3" type="audio/ogg">
      <embed src="style/media/snd_card_flip.mp3">
    </audio> 
    <div id="zoom_zone">
    <div id="tapis" onclick="declick();">
      <div class="card_shape card_places card_face restack" id="talon"><div class="places tal">&#x1F0F4;</div></div>
      <div class="card_shape card_places card_face shad1" id="hand1"></div>
      <div class="card_shape card_places card_face star" id="stock"><div class="places str">&#x2606;</div></div>
      <div class="card_shape card_places card_face backD" id="foundation1"><div class="places r">&#x2662;</div></div>
      <div class="card_shape card_places card_face backC" id="foundation2"><div class="places b">&#x2667;</div></div>
      <div class="card_shape card_places card_face backH" id="foundation3"><div class="places r">&#x2661;</div></div>
      <div class="card_shape card_places card_face backS" id="foundation4"><div class="places b">&#x2664;</div></div>
      <div class="card_shape card_places card_face shad2" id="tableau1"></div>
      <div class="card_shape card_places card_face shad2" id="tableau2"></div>
      <div class="card_shape card_places card_face shad2" id="tableau3"></div> 
      <div class="card_shape card_places card_face shad2" id="tableau4"></div>
    </div>
    <div class="z" onclick="action('stk');" id="stk"></div>
    <div class="z" onclick="action('tal');" id="tal"></div>
    <div class="z" onclick="action('hnd');" id="hnd"></div>
    <div class="z" onclick="action('t1');" id="t1"></div>
    <div class="z" onclick="action('t2');" id="t2"></div>
    <div class="z" onclick="action('t3');" id="t3"></div>
    <div class="z" onclick="action('t4');" id="t4"></div>
    <div class="z" onclick="action('f1');" id="f1"></div>
    <div class="z" onclick="action('f2');" id="f2"></div>
    <div class="z" onclick="action('f3');" id="f3"></div>
    <div class="z" onclick="action('f4');" id="f4"></div>
    <div id="distr" onclick="start()"><p>Cliquer<br>pour<br>distribuer</p></div>
    </div>
    <div id="count"><span id="timer"></span></div>
    <script type="text/javascript" src="js/cards4.js"></script>
    <script type="text/javascript" src="js/canfield.js"></script>
    <script type="text/javascript">set_up();</script>
    <audio id="snd_card_shuffle" style="display:none" >
      <source src="style/media/snd_card_shuffle.wav" type="audio/ogg">
      <embed src="style/media/snd_card_shuffle.wav">
    </audio> 
  </body>
</html>