<!DOCTYPE html>
<html>
  <head>
    <title>Patiences et solitaires</title>
    <link rel="manifest" href="/manifest.json">
    <link type="text/css" rel="stylesheet" media="screen" href="style/cards3.css">
    <link type="text/css" rel="stylesheet" media="screen" href="style/canfield.css">
    <link type="text/css" rel="stylesheet" media="screen" href="style/menu.css">
    <link rel="icon" type="image/png" href="favicon.png" />
    <link rel="mask-icon" href="logo.svg" color="#ffffff">
    <meta name="msapplication-config" content="browserconfig.xml">
    <link rel="apple-touch-icon" href="favicon.png" sizes="192x192">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">


  <script type="text/javascript" src="js/menu.js"></script>
  </head>
  <body>
    <audio id="snd_menu_click">
      <source src="style/media/snd_menu_click.wav" type="audio/ogg">
      <embed src="style/media/snd_menu_click.wav">
    </audio> 
    <div id="choix_jeu">
      <h2>Patiences et Solitaires</h2>
      <ul class="choix_jeu">
        <li><a href="javascript:goto('Klondike')">Klondike<br><img src="style/media/vign_klondike.png" alt="Klondike"></a></li>
        <li><a href="javascript:goto('Canfield')">Canfield<br><img src="style/media/vign_canfield.png" alt="Canfield"></a></li>
        <li><a href="javascript:goto('Freecell')">Freecell<br><img src="style/media/vign_freecell.png" alt="Freecell"></a></li>
      </ul>
      <ul class="choix_jeu">
        <li><a href="javascript:goto('Mahjong')">Mahjong  <br><img src="style/media/vign_mahjong.png"  alt="Mahjong"></a></li>  
        <li><a href="javascript:goto('Taquin')">Taquin    <br><img src="style/media/vign_taquin.png"   alt="Taquin"></a></li>    
        <li><a href="javascript:goto('Clicou')">Clicou    <br><img src="style/media/vign_clicou.png"   alt="Clicou"></a></li>    
      </ul>
      <ul class="choix_jeu">
        <li><a href="javascript:goto('Solitaire1')">Solitaire 1  <br><img src="style/media/vign_solitaire1.png"  alt="Solitaire"></a></li>  
        <li><a href="javascript:goto('Solitaire2')">Solitaire 2  <br><img src="style/media/vign_solitaire2.png"   alt="Solitaire"></a></li>    
        <!--li><a href="javascript:goto('Clicou')">Clicou    <br><img src="style/media/vign_clicou.png"   alt="Clicou"></a></li--> 
      </ul>        
    </div>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js');
        });
      }
    </script>
  </body>
</html>