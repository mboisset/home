var taquin = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

function start() {
  shuffle(384);
  for (i = 0; i < 16; i++) for (j = 0; j < 24; j++) {
    console.log('i='+i+', j='+j);
    taquin[i][j] = shuffled.pop();
    c = tiles[taquin[i][j]];
    c.col = j;
    c.row = i;
    c.style.width = c.style.height = '42px';
    offsetx = (c.id%24)*(-42)+'px';
    offsety = Math.floor(c.id/24)*(-42)+'px';
    c.style.backgroundPosition = offsetx+' '+offsety;
    if (i != 0 || j != 0) tiles[taquin[i][j]].moveTo(150+j*42, 50+i*42, 1);
  }
  taquin[0][0] = '';
  cnt = 0;
  strt = new Date().getTime();
  timer =  setInterval(tmr, 1000);
  countMvt(0);
}

function tileAction(id) {
  t = tiles[id];
  //console.log('tileAction - t.row = '+t.row+', t.col = '+t.col);
  //if (t.col > 0) console.log(' - taquin[t.row][t.col-1] = '+taquin[t.row][t.col-1]+', taquin[t.row][t.col+1] = '+taquin[t.row][t.col+1]);
  //if (t.row > 0) console.log(' - taquin[t.row-1][t.col] = '+taquin[t.row-1][t.col]+', taquin[t.row+1][t.col] = '+taquin[t.row+1][t.col]);
  move = false;
  if      (t.col > 0  && taquin[t.row][t.col-1] == '') { console.log(1);taquin[t.row][t.col-1] = taquin[t.row][t.col]; taquin[t.row][t.col] = ''; t.col--; move = true; }
  else if (t.col < 11 && taquin[t.row][t.col+1] == '') { console.log(2);taquin[t.row][t.col+1] = taquin[t.row][t.col]; taquin[t.row][t.col] = ''; t.col++; move = true; }
  else if (t.row > 0  && taquin[t.row-1][t.col] == '') { console.log(3);taquin[t.row-1][t.col] = taquin[t.row][t.col]; taquin[t.row][t.col] = ''; t.row--; move = true; }
  else if (t.row < 7  && taquin[t.row+1][t.col] == '') { console.log(4);taquin[t.row+1][t.col] = taquin[t.row][t.col]; taquin[t.row][t.col] = ''; t.row++; move = true; }
  else console.log(0);
  if (move) document.getElementById('tile_click').play(); 
  t.moveTo(150+t.col*42, 50+t.row*42, 1);
  countMvt(1);
}

function countMvt(n) {
  cnt += n;
  win = true;
  v = 0; 
  for (i = 0; i < 16; i++) for (j = 0; j < 24; j++) { 
    if ((i != 0 || j != 0) && taquin[i][j] != v) win = false; 
    v++;
  }
  document.getElementById('count').innerHTML = '<h1>Temps :</h1><div id="timer">'+timerTxt+'</div>'+
      '<h1>Mouvt :</h1><div>'+cnt+'</div>';
  if (win) tadaa('Taquin');
  
}

