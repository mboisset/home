var talon      = [];
var hand       = [];
var foundation = [[],[],[],[],[]];
var tableau    = [[],[],[],[],[],[],[],[],[],[]];
var tabUp      = [0,0,1,2,3,4,5,6,7];
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

var clickFrom = '', clickTo = '', posFrom = '', posTo = '', cardFrom = '', cardTo = '', selectedCard = '', selectedCardTop = '';

function start() {
  shuffle();
  i = 1;
  while (talon.length > 0) talon.pop();
  while (hand.length > 0)  hand.pop();
  for (i = 1; i < 9; i++) while (tableau[i].length > 0) tableau[i].pop();
  for (i = 1; i < 5; i++) while (foundation[i].length > 0) foundation[i].pop();
  for (i = 0; i < 9; i++) if (i < 2) tabUp[i] = 0; else tabUp[i] = i-1;
  // init tableau
  for (i = 1; i < 9; i++) {
    for (j = 0; j < i; j++) {
      tableau[i].push(shuffled.pop());
      c = cards[tableau[i][tableau[i].length-1]];
      c.style.transform = 'none';
      c.moveTo(tab[i].left, tab[i].top + 30 * (tableau[i].length-1), tableau[i].length);
      if (j < i - 1) c.faceDn(); else c.faceUp();
    }
  }
  for(i = 1; shuffled.length > 0; i++) {
    talon.push(shuffled.pop());
    cards[talon[talon.length-1]].style.transform = 'none';
    cards[talon[talon.length-1]].moveTo(50, 0, i);
  }
  cnt = -1;
  strt = new Date().getTime();
  timer = setInterval(tmr, 1000);
  countMvt(1);
}

function declick() {
  if (clickFrom == 'hnd') {
    if (hand.length > 0) cards[hand[hand.length-1]].unselect();
  }
  else if (clickFrom == 'f1' && foundation[1].length > 0) {
    if (cards[foundation[1][foundation[1].length-1]].selected) cards[foundation[1][foundation[1].length-1]].unselect();
  }
  else if (clickFrom == 'f2' && foundation[2].length > 0) {
    if (cards[foundation[2][foundation[2].length-1]].selected) cards[foundation[2][foundation[2].length-1]].unselect();
  }
  else if (clickFrom == 'f3'  && foundation[3].length > 0) {
    if (cards[foundation[3][foundation[3].length-1]].selected) cards[foundation[3][foundation[3].length-1]].unselect();
  }
  else if (clickFrom == 'f4' && foundation[4].length > 0) {
    if (cards[foundation[4][foundation[4].length-1]].selected) cards[foundation[4][foundation[4].length-1]].unselect();
  }
  else if (clickFrom == 't1' || clickFrom == 't2' || clickFrom == 't3' || clickFrom == 't4' || clickFrom == 't5' || clickFrom == 't6' || clickFrom == 't7' || clickFrom == 't8') {
    tabFrom = Number(clickFrom.substr(1));
    for (i = 0; i < tableau[tabFrom].length; i++) {
      if (tableau[tabFrom].length > 0) if (cards[tableau[tabFrom][tableau[tabFrom].length-1]].selected) cards[tableau[tabFrom][i]].unselect();
    }
  }
  while (document.getElementsByClassName('highlighted').length > 0) document.getElementsByClassName('highlighted')[0].classList.remove('highlighted');
  while (document.getElementsByClassName('raised').length > 0) cards[document.getElementsByClassName('raised')[0].id].unselect();
  clickFrom = clickTo = tabFrom = tabTo = '';
}

function action(site) {
  if (clickFrom == '') {
    clickFrom = site;
    tabFrom = Number(clickFrom.substr(1));
    if (clickFrom == 'tal') {
      if (talon.length == 0) {
        for(i = 1; hand.length > 0; i++) {
          talon.push(hand.pop());
          cards[talon[talon.length - 1]].faceDn();
          cards[talon[talon.length - 1]].moveTo(50, 0, talon.length);
        }
      }
      th();
      clickFrom = '';
    }
    else if (clickFrom == 'hnd' && hand.length > 0)         { selectedCard = hand[hand.length-1];                   cards[selectedCard].select(); }
    else if (clickFrom == 'f1' && foundation[1].length > 0) { selectedCard = foundation[1][foundation[1].length-1]; cards[selectedCard].select(); }
    else if (clickFrom == 'f2' && foundation[2].length > 0) { selectedCard = foundation[2][foundation[2].length-1]; cards[selectedCard].select(); }
    else if (clickFrom == 'f3' && foundation[3].length > 0) { selectedCard = foundation[3][foundation[3].length-1]; cards[selectedCard].select(); }
    else if (clickFrom == 'f4' && foundation[4].length > 0) { selectedCard = foundation[4][foundation[4].length-1]; cards[selectedCard].select(); }
    else if (clickFrom == 't1' || clickFrom == 't2' || clickFrom == 't3' || clickFrom == 't4' || clickFrom == 't5' || clickFrom == 't6' || clickFrom == 't7' || clickFrom == 't8') {
      tabFrom = Number(clickFrom.substr(1));
      if (tabUp[tabFrom] == -1) {
        c = cards[tableau[tabFrom][tableau[tabFrom].length-1]];
        c.faceUp();
        tabUp[tabFrom] = tableau[tabFrom].length - 1;
        clickFrom = '';
        countMvt(0);
      }
      else { 
        for (i = tabUp[tabFrom]; i < tableau[tabFrom].length; i++) cards[tableau[tabFrom][i]].select(); 
        selectedCard = tableau[tabFrom][tableau[tabFrom].length-1]; 
      }
    }
    if (clickFrom != '' && selectedCard != '') {
      c = cards[selectedCard];
      for (i = 1; i < 9; i++) {
        if (tabUp[i] > -1) {
          t = cards[tableau[i][tableau[i].length-1]];
          if ((t.val == c.val + 1 || t.val == c.val - 12) && t.col != c.col) { zoneTo = 't'+i; highlight(t.id); }
        }
        else if (clickFrom == 'hnd' && tableau[i].length > 0 || clickFrom == 'hnd' && tableau[i].length == 0 && cards[hand.length - 1].val == 13) { zoneTo = 't'+i; highlight('tableau'+i); }
      }
      for (i = 1; i < 5; i++) {
        if (foundation[i].length > 0) {
          f = cards[foundation[i][foundation[i].length-1]];
          if ((f.val == c.val - 1 || f.val == c.val + 12) && f.color == c.color){ zoneTo = 'f'+i; highlight(f.id); }
        }
        else if (c.val == 1 && c.colid == i) { zoneTo = 'f'+i; highlight('f'+i); }
      }
    }
    document.getElementById('snd_card_flip').play();
  }
  else {
    clickTo = site;
    tabFrom = Number(clickFrom.substr(1));
    if (clickTo == 'f1' || clickTo == 'f2' || clickTo == 'f3' || clickTo == 'f4') {
      if (clickFrom == 'hnd') hf();
      else if (clickFrom == 't1' || clickFrom == 't2' || clickFrom == 't3' || clickFrom == 't4' || clickFrom == 't5' || clickFrom == 't6' || clickFrom == 't7' || clickFrom == 't8') tf(Number(clickFrom.substr(1)));
    }
    else if (clickTo == 't1' || clickTo == 't2' || clickTo == 't3' || clickTo == 't4' || clickTo == 't5' || clickTo == 't6' || clickTo == 't7' || clickTo == 't8') {
      tabTo = Number(clickTo.substr(1))
      if (clickFrom == 'hnd')      ht(tabTo);
      else if (clickFrom == 'f1' || clickFrom == 'f2' || clickFrom == 'f3' || clickFrom == 'f4') ft(Number(clickFrom.substr(1)), tabTo);
      else if (clickFrom == 't1' || clickFrom == 't2' || clickFrom == 't3' || clickFrom == 't4' || clickFrom == 't5' || clickFrom == 't6' || clickFrom == 't7' || clickFrom == 't8') {
        tabFrom = Number(clickFrom.substr(1));
        if (tabFrom == tabTo) tf(tabFrom);  // double click => to foundation
        else tt(tabFrom, tabTo);
      }
    }
    else if (clickTo == 'hnd' && clickFrom == 'hnd')  hf();
    countMvt(1);
    document.getElementById('snd_card_slide').play();
    declick();
  }
}

function th() {
  if (hand.length > 0) cards[hand[hand.length-1]].moveTo(250, 0, hand.length-1);
  if (hand.length > 1) cards[hand[hand.length-2]].moveTo(250, 0, hand.length-2);
  if (hand.length > 2) cards[hand[hand.length-3]].moveTo(250, 0, hand.length-3);
  if (talon.length > 0) hand.push(talon.pop());
  if (talon.length > 0) hand.push(talon.pop());
  if (talon.length > 0) hand.push(talon.pop());
  if (hand.length > 2) cards[hand[hand.length-3]].faceUp();
  if (hand.length > 1) cards[hand[hand.length-2]].faceUp();
  if (hand.length > 0) cards[hand[hand.length-1]].faceUp();
  if (hand.length > 2) cards[hand[hand.length-3]].moveTo(250, 0, 100+hand.length-3);
  if (hand.length > 1) cards[hand[hand.length-2]].moveTo(280, 0, 100+hand.length-2);
  if (hand.length > 0) cards[hand[hand.length-1]].moveTo(310, 0, 100+hand.length-1);
}

function hf() {
  if (hand.length > 0) {
    c = cards[hand[hand.length-1]];
    f = cards[foundation[c.colid][foundation[c.colid].length-1]];
    if (foundation[c.colid].length == 0 && c.val == 1 || foundation[c.colid].length > 0 && (c.val == f.val+1 || c.val == f.val-12)) {
      h = hand.pop();
      fid = c.colid;
      foundation[fid].push(h);
      cards[h].moveTo(found[c.colid].left, found[c.colid].top, 1000 + foundation[fid].length);
      if (hand.length > 2) cards[hand[hand.length-3]].moveTo(250, 0, 100+hand.length-3);
      if (hand.length > 1) cards[hand[hand.length-2]].moveTo(280, 0, 100+hand.length-2);
      if (hand.length > 0) cards[hand[hand.length-1]].moveTo(310, 0, 100+hand.length-1);
    }
  }
}

function tf(n) {
  if (tableau[n].length > 0) {
    c = cards[tableau[n][tableau[n].length-1]];
    f = cards[foundation[c.colid][foundation[c.colid].length-1]];
    if (foundation[c.colid].length == 0 && c.val == 1 || foundation[c.colid].length > 0 && (c.val == f.val+1 || c.val == f.val-12)) {
      console.log('tf - tabUp['+n+'] ='+tabUp[n]+', tableau['+n+'] = '+tableau[n]);
      if(tabUp[n] == tableau[n].length -1) tabUp[n] = -1;
      h = tableau[n].pop();
      fid = c.colid;
      foundation[fid].push(h);
      cards[h].moveTo(found[c.colid].left, found[c.colid].top, 1000 + foundation[fid].length);
    }
  }
}

function ht(n) {
  if (hand.length > 0) {
    c = cards[hand[hand.length-1]];
    t = cards[tableau[n][tableau[n].length-1]];
    if ((tableau[n].length == 0 && c.val == 13)||
        tableau[n].length > 0 && tabUp[n] > -1 && (c.val == t.val-1  && c.col != t.col || c.val == t.val+12 && c.col != t.col)) {
      if (tableau[n].length == 0) tabUp[n] = 0;
      tableau[n].push(hand.pop());
      tabtop = tableau[n][tableau[n].length-1];
      cards[tabtop].moveTo(tab[n].left, tab[n].top + (tableau[n].length - 1) * 30, tableau[n].length)
      if (hand.length > 2) cards[hand[hand.length-3]].moveTo(250, 0, 100+hand.length-3);
      if (hand.length > 1) cards[hand[hand.length-2]].moveTo(280, 0, 100+hand.length-2);
      if (hand.length > 0) cards[hand[hand.length-1]].moveTo(310, 0, 100+hand.length-1);
    }
  }
}

function ft(f,t) {
  if (foundation[f].length > 0) {
    c = cards[foundation[f][foundation[f].length-1]];
    tb = cards[tableau[t][tableau[t].length-1]];
    if (tableau[t].length == 0 && c.val == 13 || tableau[t].length > 0 && tabUp[t] > -1 && (c.val == tb.val-1  && c.col != tb.col || c.val == tb.val+12 && c.col != tb.col)) {
      if (tableau[t].length == 0) tabUp[t] = 0;
      h = foundation[f].pop();
      tableau[t].push(h);
      cards[h].moveTo(tab[t].left, tab[t].top + (tableau[t].length - 1) * 30, tableau[t].length);
    }
  }
}

function tt(f,t) {
  c = cards[tableau[f][tabUp[f]]];
  tb = cards[tableau[t][tableau[t].length-1]];
  if ((tableau[t].length == 0 && c.val == 13) || tableau[t].length > 0 && tabUp[t] > -1 && (c.val == tb.val-1  && c.col != tb.col || c.val == tb.val+12 && c.col != tb.col)) {
    if (tableau[t].length == 0) tabUp[t] = 0;
    var temp = [];
    while (tableau[f].length > tabUp[f]) temp.push(tableau[f].pop());
    while (temp.length > 0) {
      tableau[t].push(temp.pop());
      tabtop = tableau[t][tableau[t].length - 1];
      cards[tabtop].moveTo(tab[t].left, tab[t].top + (tableau[t].length - 1) * 30, tableau[t].length);
    }
    tabUp[f] = -1;
  }
}

var cnt = 0;
var strt = new Date().getTime();
function countMvt(n) {
  cnt += n;
  now = new Date().getTime()
  tmr = now - strt;
  t = tableau[1].length + tableau[2].length + tableau[3].length + tableau[4].length + 
      tableau[5].length + tableau[6].length + tableau[7].length + tableau[8].length;
  free = t + hand.length + talon.length;
  c = document.getElementById('count');
  ret = 0;
  for (i = 1; i < 9; i++) if (tabUp[i] > 0) ret += tabUp[i]; else if (tabUp[i] == -1) ret += tableau[i].length;
  c.innerHTML = '<h1>Temps :</h1><div id="timer">'+timerTxt+'</div>'+'<h1>Mouvt :</h1><div>'+cnt+'</div>'+'<h1>Cartes en jeu :</h1><div>'+free+'</div>'+
                '<h1>Talon :</h1><div>'+(hand.length + talon.length)+'</div>'+'<h1>Tableau :</h1><div>'+t+'</div>'+'<h1>Non retournées :</h1><div>'+ret+'</div>';
  win = 0;
  for (i = 1; i < 5; i++) win += foundation[i].length;
  if (win == 52) tadaa('klondike');
}
