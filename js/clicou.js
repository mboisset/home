var to_shuffle = [], shuffled = [], ce = [], selectedCards = [], to_shuffle_source = [], tiles = [], level = 4, marked = [], sorted, iteration = 0;
var clicou = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

for (i = 0; i < 400; i++) {
  col = 1+Math.floor(Math.random()*4);
  tiles.push(newTile(i, 't'+col, col));
}

for (i = 0; i < 16; i++) for (j = 0; j < 24; j++) {
  c = document.createElement("div");
  c.id = "cl_"+i+'_'+j;
  c.style.top  = (i*42+50)+'px';
  c.style.left = (j*42+150)+'px';
  document.getElementById('tapis').appendChild(c);
}
  
function newTile(id, face, val) {
  c = document.createElement("div");
  document.getElementById('tapis').appendChild(c);
  c.id          = id;
  c.face        = face;
  c.val         = val;
  c.mark        = false;
  c.classList.add('tile_shape', c.face);
  c.onclick     = function(event) { tileAction(this.id); event.stopPropagation(); };
  c.moveTo      = function(x, y, z) {
    this.style.left = x + 'px';
    this.style.top  = y + 'px';
    if (z) this.style.zIndex = z; else this.style.zIndex = 0;
  };
  return c;
}

function start() {
  document.getElementById('tiles_set').play();
  shuffle(384);
  for (i = 0; i< 16; i++) for (j = 0; j < 24; j++) {
    c = tiles[i*24+j];
    clicou[i][j] = {id:'c_'+i+'_'+j, tile_id:c.id, val:c.val, mark:false};
    c.row = i;
    c.col = j;
    c.style.opacity = 1;
    c.style.width = c.style.height = '42px';
    c.moveTo(150+j*42, 50+i*42, 999);
  }
  cnt = 0;
  strt = new Date().getTime();
  timer =  setInterval(tmr, 1000);
  countMvt(0);
}

function shuffle(n) {
  for (i = 0; i < 400; i++) { 
    oldVal = tiles[i].val;
    val = 1+Math.floor(Math.random()*level);
    tiles[i].val = val;
    tiles[i].classList.remove('t'+oldVal);
    tiles[i].classList.add('t'+val);
    tiles[i].col = i%23;
    tiles[i].row = Math.floor(i/23);
    tiles[i].moveTo(50+tiles[i].col*42, 150+tiles[i].row*42, 1);
    tiles[i].style.opacity = 0.4;
  }
}

function eventail() {  start(); }

function set_level(l) {
  level = l*2;
  start();
}

function tileAction(id) {
  var i,j,lm,tm,c;
  c = tiles[id];
  marked = marked.splice(0,0);
  iteration = 0;
  prospect(c.row,c.col,c.val);
  if (iteration > 1) {
    document.getElementById('tile_click').play();
    sorted = marked.sort(function(a,b){return a-b;});
    colMin = 999;
    colMax = 1;
    for (i = 0; i < sorted.length; i++) {
      tm = tiles[sorted[i]];
      colMin = (tm.col < colMin)?tm.col:colMin;
      colMax = (tm.col > colMax)?tm.col:colMax;
      tm.style.opacity = 0;
      clicou[tm.row][tm.col].mark = false;
      tm.moveTo(-1500, -1500, 1);
      for (lm = tm.row; lm > 0; lm--) {
        clicou[lm][tm.col].tile_id = clicou[lm-1][tm.col].tile_id;
        clicou[lm][tm.col].val     = clicou[lm-1][tm.col].val;
        if (clicou[lm][tm.col].tile_id != '') {
          tiles[clicou[lm][tm.col].tile_id].row++;
          tiles[clicou[lm][tm.col].tile_id].moveTo(150+tm.col*42, 50+lm*42, 1);
        }
      }
      clicou[0][tm.col].tile_id = '';
      clicou[0][tm.col].val     = 0;
      clicou[0][tm.col].mark    = false;
    }
    for (j = colMin; j <= colMax; j++) if (clicou[15][j].val == 0) shift(j);
    countMvt(1);
  }
}

function prospect(row, col, val) {
   if (iteration > 20) return;
   iteration++;
   clicou[row][col].mark = true;
   marked.push(Number(clicou[row][col].tile_id));
   if (row > 0  && clicou[row-1][col].val == val && !clicou[row-1][col].mark) prospect(row-1, col, val);
   if (row < 15 && clicou[row+1][col].val == val && !clicou[row+1][col].mark) prospect(row+1, col, val);
   if (col > 0  && clicou[row][col-1].val == val && !clicou[row][col-1].mark) prospect(row, col-1, val);
   if (col < 23 && clicou[row][col+1].val == val && !clicou[row][col+1].mark) prospect(row, col+1, val);
}

function shift(colShift) {
  var i, j;
  for (i = 0; i < 16; i++) {
    for (j = colShift; j > 0; j--) {
      if (clicou[i][j-1].tile_id != '') {
        clicou[i][j].val       = clicou[i][j-1].val; 
        clicou[i][j].tile_id   = clicou[i][j-1].tile_id; 
        clicou[i][j-1].val     = 0; 
        clicou[i][j-1].tile_id = '';
        tiles[clicou[i][j].tile_id].col = j;
        tiles[clicou[i][j].tile_id].moveTo(150+j*42, 50+i*42, 1);
      }
      else {
        clicou[i][j].val     = 0; 
        clicou[i][j].tile_id = '';
      }
    }
    clicou[i][0].val     = 0; 
    clicou[i][0].tile_id = '';
  }
}

function countMvt(n) {
  cnt += n;
  tr = 0;
  for (i = 0; i < 16; i++) for (j = 0; j < 24; j++) if (clicou[i][j].val != 0) tr++;
  document.getElementById('count').innerHTML = '<h1>Temps :</h1><div id="timer">'+timerTxt+'</div>'+
      '<h1>Mouvt :</h1><div>'+cnt+'</div>'+'<h1>Tuiles en jeu :</h1><div>'+tr+'</div>';
  if (tr == 0) tadaa('Clicou');
}

