
var jeu_vide = [
 [  0, -1, -1, -1, -1, -1, -1 ],
 [  0,  0, -1, -1, -1, -1, -1 ],
 [  0,  0,  0, -1, -1, -1, -1 ],
 [  0,  0,  0,  0, -1, -1, -1 ],
 [  0,  0,  0,  0,  0, -1, -1 ],
 [  0,  0,  0,  0,  0,  0, -1 ],
 [  0,  0,  0,  0,  0,  0,  0 ],
];

var jeu_init = [
 [  1, -1, -1, -1, -1, -1, -1 ],
 [  1,  1, -1, -1, -1, -1, -1 ],
 [  1,  1,  1, -1, -1, -1, -1 ],
 [  1,  1,  1,  1, -1, -1, -1 ],
 [  1,  1,  0,  1,  1, -1, -1 ],
 [  1,  1,  1,  1,  1,  1, -1 ],
 [  1,  1,  1,  1,  1,  1,  1 ],
];

var jeu  = [
 [  1, -1, -1, -1, -1, -1, -1 ],
 [  1,  1, -1, -1, -1, -1, -1 ],
 [  1,  1,  1, -1, -1, -1, -1 ],
 [  1,  1,  1,  1, -1, -1, -1 ],
 [  1,  1,  1,  1,  1, -1, -1 ],
 [  1,  1,  1,  1,  1,  1, -1 ],
 [  1,  1,  1,  1,  1,  1,  1 ],
];

var colors = ['green', 'gold', 'darkblue', 'violet', 'orangered', 'purple', 'dodgerblue', 'sandybrown'];
var fond = [0,80,160,240,320,400,480,560,640,720,800,880,960,1040,1120,1200,1280,1360,1440,1520,1600];
var clicked = { clicked: false, i:-1, j:-1}; 
var moves = [];
var prises = [];

var move = { id: '', x : 0, y : 0, nx : 0, ny : 0};
var allowed = [];
var pions = 0;

function start() {
  pions = 0;
  moves = moves.splice(0,0); prises = prises.splice(0,0);
  for (i = 0; i < 7; i++) {
    for (j = 0; j < 7; j++) {
      if (document.getElementById(i+'_'+j).hasChildNodes()) document.getElementById(i+'_'+j).removeChild(document.getElementById(i+'_'+j).firstChild);
    }
  }
  im = 0;
  for (i = 0; i < 7; i++) {
    for (j = 0; j < 7; j++) {
      if (jeu_init[i][j] == 1)  {
        
        c = document.createElement("img");
        c.src = '/style/media/bille_brille.png';
        c.classList.add('bille');
        c.id = 'b_'+i+'_'+j;
        //c.style.background
        c.style.backgroundColor = colors[Math.floor(Math.random()*8)];
        c.style.backgroundImage = 'url(/style/media/agate.jpg)';
        c.style.backgroundPositionX = '-' + fond[Math.floor(Math.random()*20)] + 'px';
        console.log('c.id = '+c.id+', '+i+'_'+j);
        p = document.getElementById(i+'_'+j)
        p.appendChild(c);
        p.dataset.i = i;
        p.dataset.j = j;
        c.onclick = function(event) { clickAction(this.id); event.stopPropagation(); };
        p.onclick = function(event) { clickEmpty(this.id); event.stopPropagation(); };
        im += 80;
        pions++;
      }
      else if (jeu_init[i][j] == 0) {
        p = document.getElementById(i+'_'+j)
        p.onclick = function(event) { clickEmpty(this.id); event.stopPropagation(); };
      }
    }
  }
  timer = setInterval(tmr, 1000);
  countMvt(0);
  
}


function clickAction(id) {
  b =  document.getElementById(id);
  p = b.parentNode;
  i = Number(p.dataset.i);
  j = Number(p.dataset.j);
  console.log('clickAction - id = '+id+ ', i = '+i+', j = '+j);
  if (b.classList.contains('selected')) {
    b.classList.remove('selected');
    clicked.clicked = false;
    clicked.i = -1;
    clicked.j = -1;
    moves = moves.splice(0,0); prises = prises.splice(0,0);
  }
  else {
    jumpOk = false;
    for (ix = -1; ix < 2; ix++) {
      for (jx = -1; jx < 2; jx++) {
        console.log('clickAction - ix = '+ix+', jx = '+jx+', i + ix = '+(i+ix)+', j +jx = '+(j+jx)+', i + 2ix = '+(i+2*ix)+', j +2jx = '+(j+2*jx));
        console.log ('!(ix == 0 && jx == 0) is ' + !(ix == 0 && jx == 0));
        if (!(ix == 0 && jx == 0)) {
          console.log ('(i+ix*2 >-1 && i+ix*2 < 7 && j+jx*2 > -1 && j+jx*2 < 7)' + (i+ix*2 >-1 && i+ix*2 < 7 && j+jx*2 > -1 && j+jx*2 < 7));
          if (i+ix*2 >-1 && i+ix*2 < 7 && j+jx*2 > -1 && j+jx*2 < 7) {
            console.log('jeu[i+ix*2][j+jx*2] = ' + jeu[i+ix*2][j+jx*2]);
            if (jeu[i+ix*2][j+jx*2] != -1) {
              console.log('clickAction - (i+ix)+_+(j+jx) = ' + (i+ix)+'_'+(j+jx) + ', (i+ix*2)+_+(j+jx*2) = ' + (i+ix*2)+'_'+(j+jx*2));
              if (document.getElementById((i+ix)+'_'+(j+jx)).hasChildNodes() && !document.getElementById((i+ix*2)+'_'+(j+jx*2)).hasChildNodes()) {
                jumpOk = true;
                moves.push(document.getElementById((i+ix*2)+'_'+(j+jx*2)).id);
                prises.push(document.getElementById((i+ix)+'_'+(j+jx)).id);
              }
            }
          }
        }
        console.log('clickAction - jumpOk = '+jumpOk);
      }
    }
    if (jumpOk) {
      if (clicked.clicked) {
        clicked.clicked = false;
        clicked.i = -1;
        clicked.j = -1;
        moves = moves.splice(0,0); prises = prises.splice(0,0);
      }
      b.classList.add('selected');
      clicked.clicked = true;
      clicked.i = i;
      clicked.j = j;
    }
    else {
      if (clicked.clicked === true) {
        console.log('b_+clicked.i+_+clicked.j = ' + 'b_' + clicked.i + '_' + clicked.j)
        b = document.getElementById('b_' + clicked.i + '_' + clicked.j);
        b.classList.remove('selected');
        clicked.clicked = false;
        clicked.i = -1;
        clicked.j = -1;
      }
      moves = moves.splice(0,0); prises = prises.splice(0,0);
    }
  }
}

function clickEmpty(id) {
  console.log('clickEmpty');
  p =  document.getElementById(id);
  if (clicked.clicked) {
    console.log('clickEmpty - clicked.i+_+clicked.j = ' + clicked.i+'_'+clicked.j);
    c = document.getElementById(clicked.i+'_'+clicked.j).firstElementChild;
    if (moves.indexOf(id) > -1) {
      p.appendChild(c);
      prise = document.getElementById(prises[moves.indexOf(id)]);
      prise.removeChild(prise.firstChild);
      pions--;
    }
    c.classList.remove('selected');
    clicked.clicked = false;
    clicked.i = -1;
    clicked.j = -1;
  }
  moves = moves.splice(0,0); prises = prises.splice(0,0);
  countMvt(1);
}

function countMvt(n) {
  cnt += n;
  document.getElementById('count').innerHTML = 
      '<h1>Temps :         </h1><div id="timer">' + timerTxt + '</div>'+
      '<h1>Mouvt :         </h1><div>' + cnt      + '</div>'+
      '<h1>Billes :        </h1><div>' + pions    + '</div>';
  if (pions == 1) tadaa('Solitaire1');
}

