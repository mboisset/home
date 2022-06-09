var hand       = [[],[],[],[],[]];
var stock      = [];
var foundation = [[],[],[],[],[]];
var tableau    = [[],[],[],[],[],[],[],[],[],[]];

var hnd = [
  { top:0, left:  0 },
  { top:0, left: 50 },
  { top:0, left:230 },
  { top:0, left:410 },
  { top:0, left:590 },
];

var found = [
  { top:0, left:   0 },
  { top:0, left: 770 },
  { top:0, left: 950 },
  { top:0, left:1130 },
  { top:0, left:1310 },
];

var tab = [ 
  { top:  0, left:   0 },
  { top:250, left:  50 },
  { top:250, left: 230 },
  { top:250, left: 410 },
  { top:250, left: 590 },
  { top:250, left: 770 },
  { top:250, left: 950 },
  { top:250, left:1130 },
  { top:250, left:1310 },
];

var maxMoves = [  // maxMoves[tabFree][handFree]
  [  1,  2,  3,  4,  5],
  [  2,  4,  6,  8, 10],
  [  4,  7, 10,100,100],
  [  7, 11,100,100,100],
  [ 11,100,100,100,100],
  [100,100,100,100,100],
  [100,100,100,100,100],
  [100,100,100,100,100],
  [100,100,100,100,100]
];
var deplMax = 0;
var clickFrom = '', clickTo = '', posFrom = '', posTo = '', cardFrom = '', cardTo = '';

function start() {
  shuffle();
  for (i = 1; i < 9; i++) tableau[i] = tableau[i].splice(0,0);
  for (i = 1; i < 5; i++) { foundation[i] = foundation[i].splice(0,0); hand[i] = hand[i].splice(0,0); }
  i = 1;  
  // init tableau
  while (shuffled.length > 0) {
    tableau[i].push(shuffled.pop());
    tabtop = tableau[i][tableau[i].length-1];
    cards[tabtop].faceUp();
    cards[tabtop].tab = i;
    cards[tabtop].pos = tableau[i].length - 1;;
    cards[tabtop].style.transform = 'none';
    cards[tabtop].moveTo(tab[i].left, tab[i].top + 30 * (tableau[i].length - 1), tableau[i].length);
    i = (i % 8)?i+1:1;
  }
  cnt = -1;
  strt = new Date().getTime();
  timer = setInterval(tmr, 1000);
  countMvt(1);
}

function declick() {
  if (clickFrom == 'card') {
    for (i = posFrom; i < tableau[cardFrom].length; i++) {
      if (tableau[cardFrom].length > 0) {
        c = cards[tableau[cardFrom][i]];
        if (c.selected) c.unselect();
      }
    }
  }
  else if (clickFrom == 'h1' || clickFrom == 'h2' || clickFrom == 'h3' || clickFrom == 'h4') {
    h = Number(clickFrom.substr(1));
    if (hand[h].length > 0)
    c = cards[hand[h][hand[h].length -1]];
    if (c.selected) c.unselect();
  }
  cardFrom = cardTo = posFrom = clickFrom = clickTo = '';
}

function action(site) {
  document.getElementById('snd_card_slide').play();
  if (clickFrom == '') {
    clickFrom = site;
    if (clickFrom =='h1' || clickFrom =='h2' || clickFrom =='h3' || clickFrom =='h4') {
      h = Number(clickFrom.substr(1));
      cards[hand[h][hand[h].length -1]].select();
    }
  }
  else {
    clickTo = site;
    cardTo = Number(clickTo.substr(1));
    if (clickFrom == 'card') {
      if (clickTo == 't1' || clickTo == 't2' || clickTo == 't3' || clickTo == 't4' || 
          clickTo == 't5' || clickTo == 't6' || clickTo == 't7' || clickTo == 't8')      tt();
      else if (clickTo == 'h1' || clickTo == 'h2' || clickTo == 'h3' || clickTo == 'h4') th();
      else if (clickTo == 'f1' || clickTo == 'f2' || clickTo == 'f3' || clickTo == 'f4') tf();
    }
    else { 
      cardFrom = Number(clickFrom.substr(1));
      if (clickFrom == 'h1' || clickFrom == 'h2' || clickFrom == 'h3' || clickFrom == 'h4') {
        if (clickTo == 'f1' || clickTo == 'f2' || clickTo == 'f3' || clickTo == 'f4')         hf();
        else if (clickTo == 'h1' || clickTo == 'h2' || clickTo == 'h3' || clickTo == 'h4')    if (cardTo == cardFrom) hf();  else hh();
        else if (clickTo == 't1' || clickTo == 't2' || clickTo == 't3' || clickTo == 't4' || 
                 clickTo == 't5' || clickTo == 't6' || clickTo == 't7' || clickTo == 't8')    ht();
      }
    }
    countMvt(1);
    declick();
  }
}

function cardAction(id) {
  document.getElementById('snd_card_slide').play();
  if (clickFrom == '') {
    clickFrom = 'card'; 
    cardFrom  = cards[id].tab;
    posFrom   = cards[id].pos;
    if (posFrom < tableau[cardFrom].length - 1) {
      c = cards[tableau[cardFrom][posFrom]];
      ok = true;
      for (i = posFrom+1; i < tableau[cardFrom].length - 1; i++) {
        cn = cards[tableau[cardFrom][i]];
        if (!((c.val == cn.val + 1 || c.val == cn.cal - 12) && c.col != cn.col)) ok = false;
        c = cn;
      }
      if (ok) for (i = posFrom; i < tableau[cardFrom].length; i++) cards[tableau[cardFrom][i]].select();
    }
    else cards[tableau[cardFrom][tableau[cardFrom].length - 1]].select();
  }
  else {
    clickTo = 'card';
    cardTo  = cards[id].tab;
    posTo   = cards[id].pos;
    if (clickFrom == 'card') {
      if (cardTo == cardFrom && posFrom == posTo) tf(cardFrom); 
      else if (cardTo != cardFrom) tt()
    }
    else {
      if (clickFrom == 'h1' || clickFrom == 'h2' || clickFrom == 'h3' || clickFrom == 'h4') {
        cardFrom = Number(clickFrom.substr(1));
        ht();
      }
    }
    declick();
    countMvt(1);
  }
}

function th() {
  if (tableau[cardFrom].length > 0) {
    t = cardFrom;
    c = cards[tableau[t][tableau[t].length-1]];
    if (hand[cardTo].length == 0) {
      hand[cardTo].push(tableau[t].pop()); 
      c.moveTo(hnd[cardTo].left, hnd[cardTo].top, 1000 + hand[cardTo].length);
      c.pos = c.tab = '';
    }
  }
}

function tf() {
  if (tableau[cardFrom].length > 0) {
    t = cardFrom;
    c = (tableau[t].length > 0)?cards[tableau[t][tableau[t].length-1]]:{val:9999};
    fid = c.colid;
    if ((foundation[fid].length == 0 && c.val == 1) || (foundation[fid].length > 0 && cards[foundation[fid][foundation[fid].length-1]].val == c.val-1)) {
      foundation[fid].push(tableau[t].pop());
      c.moveTo(found[fid].left, found[fid].top, 1000 + foundation[fid].length);
      c.pos = c.tab = '';
    }
  }
}

function tt() {
  if (tableau[cardFrom].length > 0) {
    cfrom = cards[tableau[cardFrom][posFrom]];
    cto = (tableau[cardTo].length > 0)?cards[tableau[cardTo][tableau[cardTo].length-1]]:{val:9999};
    if ((tableau[cardTo].length == 0) || (tableau[cardTo].length > 0 && (cto.val == cfrom.val+1 || cto.val == cfrom.val-12) && cto.col != cfrom.col)) {
      nbCards = tableau[cardFrom].length - posFrom;
      tabFree = handFree = 0;
      for (i = 1; i < 8; i++) if (tableau[i].length == 0 && i != cardTo) tabFree++;
      for (i = 1; i < 5; i++) if (hand[i].length == 0) handFree++;
      deplMax = maxMoves[tabFree][handFree];
      if (nbCards <= deplMax) {
        var temp = [];
        while (tableau[cardFrom].length > posFrom) temp.push(tableau[cardFrom].pop());
        while (temp.length > 0) {
          tableau[cardTo].push(temp.pop());
          c = cards[tableau[cardTo][tableau[cardTo].length-1]];
          c.moveTo(tab[cardTo].left, tab[cardTo].top + 30 * (tableau[cardTo].length - 1), tableau[cardTo].length);
          c.pos = tableau[cardTo].length - 1;
          c.tab = cardTo;
        }
      }
    }
  }
}

function ht() {
  if (hand[cardFrom].length > 0) {
    cfrom = (hand[cardFrom].length > 0)?cards[hand[cardFrom][hand[cardFrom].length-1]]:{val:99999};
    cto = (tableau[cardTo].length > 0)?cards[tableau[cardTo][tableau[cardTo].length-1]]:{val:9999};
    if ((tableau[cardTo].length == 0) || (tableau[cardTo].length > 0 && (cto.val == cfrom.val+1 || cto.val == cfrom.val-12) && cto.col != cfrom.col)) {
      tableau[cardTo].push(hand[cardFrom].pop());
      c = cards[tableau[cardTo][tableau[cardTo].length-1]];
      c.moveTo(tab[cardTo].left, tab[cardTo].top + 30 * (tableau[cardTo].length - 1), tableau[cardTo].length);
      c.pos = tableau[cardTo].length - 1;
      c.tab = cardTo;
    }  
  }
}

function hf() {
  if (hand[cardFrom].length > 0) {
    c = (hand[cardFrom].length > 0)?cards[hand[cardFrom][hand[cardFrom].length-1]]:{val:99999};
    cto = (foundation[fid].length > 0)?cards[foundation[fid][foundation[fid].length-1]]:{val:9999};
    fid = c.colid;
    if ((foundation[fid].length == 0 && c.val == 1) || (foundation[fid].length > 0 && cto.val == c.val-1)) {
      foundation[fid].push(hand[cardFrom].pop());
      c.moveTo(found[fid].left, found[fid].top, 1000 + foundation[fid].length);
      c.pos = c.tab = '';
    }
  }
}

function hh() {
  if (hand[cardFrom].length > 0) {
    if (hand[cardTo].length == 0) { // move
      c = cards[hand[cardFrom][hand[cardFrom].length-1]];
      hand[cardTo].push(hand[cardFrom].pop());
      c.moveTo(hnd[cardTo].left, hnd[cardTo].top, 1000 + hnd[cardTo].length);
    }
    else {  // swap
      cfrom = cards[hand[cardFrom][hand[cardFrom].length-1]];
      cto   = cards[hand[cardTo][hand[cardTo].length-1]];
      hfrom = hand[cardFrom].pop();
      hto   = hand[cardTo].pop();
      hand[cardTo].push(hfrom);
      hand[cardFrom].push(hto);
      cfrom.moveTo(hnd[cardTo].left, hnd[cardTo].top, 1000 + hnd[cardTo].length);
      cto.moveTo(hnd[cardFrom].left, hnd[cardFrom].top, 1000 + hnd[cardFrom].length);
    }
  }
}

var cnt = 0;
var strt = new Date().getTime();
function countMvt(n) {
  cnt++;
  now = new Date().getTime()
  tmr = now - strt;
  c = document.getElementById('count');
  h = hand[1].length + hand[2].length + hand[3].length + hand[4].length;
  t = tableau[1].length + tableau[2].length + tableau[3].length + tableau[4].length + 
      tableau[5].length + tableau[6].length + tableau[7].length + tableau[8].length;
  tabFree = 0, handFree = 0;
  for (i = 1; i < 8; i++) if (tableau[i].length == 0) tabFree++;
  for (i = 1; i < 5; i++) if (hand[i].length == 0) handFree++;
  deplMax = maxMoves[tabFree][handFree];
  c.innerHTML = '<h1>Temps :</h1><div id="timer">'+timerTxt+'</div>'+
                '<h1>Mouvt :</h1><div>'+cnt+'</div>' +
                '<h1>Cartes en jeu :</h1><div>'+(h+t)+'</div>'+
                '<h1>Dépl. max :</h1><div>'+deplMax+'</div>';
  win = 0;
  for (i = 1; i < 5; i++) win += foundation[i].length;
  if (win == 52) tadaa('freecell');
}
