var talon      = [];
var hand       = [];
var stock      = [];
var foundation = [[],[],[],[],[]];
var tableau    = [[],[],[],[],[]];
var found = [
  { top: 0, left:   0 },
  { top:0, left: 500 },
  { top:0, left: 700 },
  { top:0, left: 900 },
  { top:0, left:1100 },
];
 
var tab = [ 
  { top:  0, left:   0 },
  { top:250, left: 500 },
  { top:250, left: 700 },
  { top:250, left: 900 },
  { top:250, left:1100 },
];

var clickFrom = '', clickTo = '', selectedCard = zoneTo = zoneFrom = '';

function start() {
  shuffle(1);
  stock = stock.splice(0,0);
  talon = talon.splice(0,0);
  hand = hand.splice(0,0);
  for (i = 1; i < 5; i++) {
    foundation[i] = foundation[i].splice(0,0);
    tableau[i]    = tableau[i].splice(0,0);
  }
  for (i = 0; i < 52; i++) {
    cards[i].faceDn();
    cards[i].moveTo(0,0,0);
  }
  
  // init stock
  for (i= 0; i < 14; i++) {
    stock.push(shuffled.pop());
    stocktop = stock[(stock.length-1)]
    cards[stocktop].faceDn();
    cards[stocktop].style.transform = 'none';
    cards[stocktop].moveTo(50, 250 + i * 30, i);
  }  
  stocktop = stock[(stock.length-1)];
  cards[stocktop].faceUp();
  cards[stocktop].moveTo(50, 340, i);
  
  //init tableau
  for(i = 1; i < 5; i++) {
    tableau[i].push(shuffled.pop());
    tabtop = tableau[i][tableau[i].length-1]
    cards[tabtop].style.transform = 'none';
    cards[tabtop].faceUp();
    cards[tabtop].moveTo(tab[i].left, tab[i].top, 1);
  }
  
  //init talon
  for(i = 1; shuffled.length > 0; i++) {
    talon.push(shuffled.pop());
    cards[talon[talon.length-1]].style.transform = 'none';
    cards[talon[talon.length-1]].moveTo(50, 0, i);
  }
  baseFoundation = cards[stock[stock.length-1]].val;
  if (baseFoundation > 1) baseTableau = baseFoundation - 1;
  else baseTableau = 13;
  cnt = -1;
  strt = new Date().getTime();
  timer = setInterval(tmr, 1000);
  countMvt(1);
  sf();
}

function declick(a) {
  if (clickFrom == 'stk' && stock.length > 0) 
    if (cards[stock[stock.length-1]].selected) cards[stock[stock.length-1]].unselect();
  else if (clickFrom == 'hnd') 
    if (hand.length > 0) cards[hand[hand.length-1]].unselect();
  else if (clickFrom == 'f1' || clickFrom == 'f2' || clickFrom == 'f3' || clickFrom == 'f4') {
    fndFrom = Number(clickFrom.substr(1))
    if (foundation[fndFrom].length > 0) 
      if (cards[foundation[fndFrom][foundation[fndFrom].length-1]].selected) 
        cards[foundation[fndFrom][foundation[fndFrom].length-1]].unselect();
  }
  else if (clickFrom == 't1' || clickFrom == 't2' || clickFrom == 't3' || clickFrom == 't4') {
    tabFrom = Number(clickFrom.substr(1))
    for (i = 0; i < tableau[1].length; i++) {
      if (tableau[tabFrom].length > 0) if (cards[tableau[tabFrom][tableau[tabFrom].length-1]].selected) cards[tableau[tabFrom][i]].unselect();
    }
  }
  clickFrom = clickTo = selectedCard = selectedCardTop = zoneTo = '';
  while (document.getElementsByClassName('highlighted').length > 0) document.getElementsByClassName('highlighted')[0].classList.remove('highlighted');
  while (document.getElementsByClassName('raised').length > 0) cards[document.getElementsByClassName('raised')[0].id].unselect();
}

function action(site) {
  if (clickFrom == '') {
    clickFrom = site;
    if (clickFrom == 'tal') {
      if (talon.length == 0) {
        for(i = 1; hand.length > 0; i++) {
          talon.push(hand.pop());
          cards[talon[talon.length - 1]].faceDn();
          cards[talon[talon.length - 1]].moveTo(50, 0, talon.length);
        }
      }
      th();
      clickFrom = selectedCard = selectCardTop = '';
      hf();
    }
    else if (clickFrom == 'stk') { if (stock.length > 0) { selectedCard = stock[stock.length-1]; cards[selectedCard].select(); } }
    else if (clickFrom == 'hnd') { if (hand.length > 0) { selectedCard = hand[hand.length-1]; cards[selectedCard].select(); } }
    else if (clickFrom == 'f1')  { if (foundation[1].length > 0) { selectedCard = foundation[1][foundation[1].length-1]; cards[selectedCard].select(); } }
    else if (clickFrom == 'f2')  { if (foundation[2].length > 0) { selectedCard = foundation[2][foundation[2].length-1]; cards[selectedCard].select(); } }
    else if (clickFrom == 'f3')  { if (foundation[3].length > 0) { selectedCard = foundation[3][foundation[3].length-1]; cards[selectedCard].select(); } }
    else if (clickFrom == 'f4')  { if (foundation[4].length > 0) { selectedCard = foundation[4][foundation[4].length-1]; cards[selectedCard].select(); } }
    else if (clickFrom == 't1')  { selectedCard = tableau[1][0]; if (tableau[1].length > 0) selectedCardTop = tableau[1][tableau[1].length-1]; for (i = 0; i < tableau[1].length; i++) cards[tableau[1][i]].select(); }
    else if (clickFrom == 't2')  { selectedCard = tableau[2][0]; if (tableau[2].length > 0) selectedCardTop = tableau[2][tableau[2].length-1]; for (i = 0; i < tableau[2].length; i++) cards[tableau[2][i]].select(); }
    else if (clickFrom == 't3')  { selectedCard = tableau[3][0]; if (tableau[3].length > 0) selectedCardTop = tableau[3][tableau[3].length-1]; for (i = 0; i < tableau[3].length; i++) cards[tableau[3][i]].select(); }
    else if (clickFrom == 't4')  { selectedCard = tableau[4][0]; if (tableau[4].length > 0) selectedCardTop = tableau[4][tableau[4].length-1]; for (i = 0; i < tableau[4].length; i++) cards[tableau[4][i]].select(); }
    if (clickFrom != '' && selectedCard != '') {
      c = (clickFrom.substr(0,1) == 't')?cards[selectedCardTop]:cards[selectedCard];
      for (i = 1; i < 5; i++) {
        if (tableau[i].length > 0) {
          t = cards[tableau[i][tableau[i].length-1]];
          if ((t.val == c.val + 1 || t.val == c.val - 12) && t.col != c.col) { zoneTo = 't'+i; highlight(t.id); }
        }
        else if (clickFrom == 'hnd' && stock.length == 0 || clickFrom == 'stk') { zoneTo = 't'+i; highlight('tableau'+i); }
      }
      for (i = 1; i < 5; i++) {
        if (foundation[i].length > 0) {
          f = cards[foundation[i][foundation[i].length-1]];
          if ((f.val == c.val - 1 || f.val == c.val + 12) && f.color == c.color){ zoneTo = 'f'+i; highlight(f.id); }
        }
        else if (c.val == baseFoundation && c.colid == i) { zoneTo = 'f'+i; highlight('f'+i); }
      }
    }
  }
  else {
    clickTo = site;
    if (zoneTo != '' && clickFrom == clickTo) clickTo = zoneTo;
    if (clickTo == 'stk' && clickFrom == 'stk') sf();
    else if (clickTo == 'f1' || clickTo == 'f2' || clickTo == 'f3' || clickTo == 'f4') {
      if (clickFrom == 'hnd') hf();
      else if (clickFrom == 'stk') sf();
      else if (clickFrom == 't1' || clickFrom == 't2' || clickFrom == 't3' || clickFrom == 't4') tf(Number(clickFrom.substr(1)));
      //else if (clickFrom == 't2') tf(2);
      //else if (clickFrom == 't3') tf(3);
      //else if (clickFrom == 't4') tf(4);
    }
    else if (clickTo == 't1' || clickTo == 't2' || clickTo == 't3' || clickTo == 't4') {
      if (zoneTo != '' && clickFrom == clickTo) clickTo = zoneTo;
      tabTo   = Number(clickTo.substr(1));
      tabFrom = Number(clickFrom.substr(1));
      if (clickFrom == 'hnd') ht(tabTo);  
      else if (clickFrom == 'stk') s2t(tabTo); 
      else if (clickFrom == 'f1' || clickFrom == 'f2' || clickFrom == 'f3' || clickFrom == 'f4')  ft(tabFrom, tabTo);
      else if (clickFrom == 't1' || clickFrom == 't2' || clickFrom == 't3' || clickFrom == 't4')  tt(tabFrom, tabTo);
    }
    else if (clickTo == 'hnd' && clickFrom == 'hnd')  hf();
    countMvt(1);
    declick();
  }
}

function cardAction(id) {}

function sf() {
  if (stock.length > 0) {
    c = cards[stock[stock.length-1]];
    f = (foundation[c.colid].length > 0)?cards[foundation[c.colid][foundation[c.colid].length-1]]:{val:9999};
    console.log('sf - c.val = '+c.val+', f.val = '+f.val+', baseFoundation = '+baseFoundation+', foundation['+c.colid+'] = '+foundation[c.colid].length);
    if (foundation[c.colid].length == 0 && c.val == baseFoundation || foundation[c.colid].length > 0 && (c.val == f.val+1 || c.val == f.val-12)) {
      st  = stock.pop();
      fid = cards[st].colid;
      foundation[fid].push(st);
      stocktop = stock[stock.length-1];
      foundtop = foundation[fid][foundation[fid].length-1];
      cards[foundtop].moveTo(found[fid].left, found[fid].top, foundation[fid].length);
      if (stock.length > 0) cards[stocktop].faceUp();
    }
  }
}

function th() {
  if (hand.length > 0) cards[hand[hand.length-1]].moveTo(250, 0, hand.length-1);
  if (hand.length > 1) cards[hand[hand.length-2]].moveTo(250, 0, hand.length-2);
  if (hand.length > 2) cards[hand[hand.length-3]].moveTo(250, 0, hand.length-3);
  if (talon.length > 0) hand.push(talon.pop());
  if (talon.length > 0) hand.push(talon.pop());
  if (talon.length > 0) hand.push(talon.pop());
  if (hand.length > 2) { cards[hand[hand.length-3]].faceUp(); cards[hand[hand.length-3]].moveTo(250, 0, 100+hand.length-3); }
  if (hand.length > 1) { cards[hand[hand.length-2]].faceUp(); cards[hand[hand.length-2]].moveTo(280, 0, 100+hand.length-2); }
  if (hand.length > 0) { cards[hand[hand.length-1]].faceUp(); cards[hand[hand.length-1]].moveTo(310, 0, 100+hand.length-1); }
}

function hf() {
  if (hand.length > 0) {
    c = cards[hand[hand.length-1]];
    f = (foundation[c.colid].length > 0)?cards[foundation[c.colid][foundation[c.colid].length-1]]:{val:9999};
    if (foundation[c.colid].length == 0 && c.val == baseFoundation || foundation[c.colid].length > 0 && (c.val == f.val+1 || c.val == f.val-12)) {
      h = hand.pop();
      fid = c.colid;
      foundation[fid].push(h);
      cards[h].moveTo(found[c.colid].left, found[c.colid].top, foundation[fid].length);
      if (hand.length > 2) cards[hand[hand.length-3]].moveTo(250, 0, 100+hand.length-3);
      if (hand.length > 1) cards[hand[hand.length-2]].moveTo(280, 0, 100+hand.length-2);
      if (hand.length > 0) cards[hand[hand.length-1]].moveTo(310, 0, 100+hand.length-1);
    }
  }
}

function tf(n) {
  if (tableau[n].length > 0) {
    c = cards[tableau[n][tableau[n].length-1]];
    f = (foundation[c.colid].length > 0)?cards[foundation[c.colid][foundation[c.colid].length-1]]:{val:9999};
    console.log('tf - n = '+n+', c.val = '+c.val+', f.val = '+f.val+', baseFoundation = '+baseFoundation+', foundation['+c.colid+'] = '+foundation[c.colid].length);
    if (foundation[c.colid].length == 0 && c.val == baseFoundation || foundation[c.colid].length > 0 && (c.val == f.val+1 || c.val == f.val-12)) {
      h = tableau[n].pop();
      fid = c.colid;
      foundation[fid].push(h);
      cards[h].moveTo(found[c.colid].left, found[c.colid].top, foundation[fid].length);
    }
  }
}

function ht(n) {
  if (hand.length > 0) {
    c = cards[hand[hand.length-1]];
    t = (tableau[n].length > 0)?cards[tableau[n][tableau[n].length-1]]:{val:9999};
    if ((tableau[n].length == 0 && stock.length == 0) || tableau[n].length > 0 && (c.val == t.val-1  && c.col != t.col || c.val == t.val+12 && c.col != t.col)) {
      tableau[n].push(hand.pop());
      tabtop = tableau[n][tableau[n].length-1];
      cards[tabtop].moveTo(tab[n].left, tab[n].top + (tableau[n].length - 1) * 30, tableau[n].length)
      if (hand.length > 2) cards[hand[hand.length-3]].moveTo(250, 0, 100+hand.length-3);
      if (hand.length > 1) cards[hand[hand.length-2]].moveTo(280, 0, 100+hand.length-2);
      if (hand.length > 0) cards[hand[hand.length-1]].moveTo(310, 0, 100+hand.length-1);
    }
  }
}

function s2t(n) {
  if (stock.length > 0) {
    c = cards[stock[stock.length-1]];
    t = (tableau[n].length > 0)?cards[tableau[n][tableau[n].length-1]]:{val:9999};
    if (tableau[n].length == 0 || tableau[n].length > 0 && (c.val == t.val-1  && c.col != t.col || c.val == t.val+12 && c.col != t.col)) {
      h = stock.pop();
      tableau[n].push(h);
      cards[h].moveTo(tab[n].left, tab[n].top  + (tableau[n].length - 1) * 30, tableau[n].length);
      if (stock.length > 0) cards[stock[stock.length-1]].faceUp();
    }
  }
}

function ft(f,t) {
  if (foundation[f].length > 0) {
    c = cards[foundation[f][foundation[f].length-1]];
    tb = (tableau[t].length > 0)?cards[tableau[t][tableau[t].length-1]]:{val:9999};
    if (tableau[t].length == 0 || tableau[t].length > 0 && (c.val == tb.val-1  && c.col != tb.col || c.val == tb.val+12 && c.col != tb.col)) {
      h = foundation[f].pop();
      tableau[t].push(h);
      cards[h].moveTo(tab[t].left, tab[t].top + (tableau[t].length - 1) * 30, tableau[t].length);
    }
  }
}

function tt(f,t) {
  c = cards[tableau[f][0]];
  tb = (tableau[t].length > 0)?cards[tableau[t][tableau[t].length-1]]:{val:9999};
  if (tableau[t].length == 0 || tableau[t].length > 0 && (c.val == tb.val-1  && c.col != tb.col || c.val == tb.val+12 && c.col != tb.col)) {
    var temp = [];
    while (tableau[f].length > 0) temp.push(tableau[f].pop());
    while (temp.length > 0) {
      tableau[t].push(temp.pop());
      tabtop = tableau[t][tableau[t].length - 1];
      cards[tabtop].moveTo(tab[t].left, tab[t].top + (tableau[t].length - 1) * 30, tableau[t].length);
    }
  }
}

var cnt = 0;
var strt = new Date().getTime();
function countMvt(n) {
  cnt++;
  c = document.getElementById('count');
  c.innerHTML = '<h1>Temps :</h1><div id="timer">'+timerTxt+'</div>'+
                '<h1>Mouvt :</h1><div>'+cnt+'</div>'+
                '<h1>Cartes en jeu :</h1><div>'+(talon.length+hand.length+stock.length+tableau[1].length+tableau[2].length+tableau[3].length+tableau[4].length)+'</div>'+
                '<h1>Cartes talon :</h1><div>'+(talon.length+hand.length)+'</div>'+
                '<h1>Cartes stock :</h1><div>'+stock.length+'</div>'+
                '<h1>Fondation :</h1><div>'+faces[baseFoundation]+'</div>'+
                '<h1>Tableau :</h1><div>'+faces[baseTableau]+'</div>';
  win = 0;
  for (i = 1; i < 5; i++) win += foundation[i].length;
  if (win == 52) tadaa('canfield');
}
