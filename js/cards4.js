var faces = [ '', 'As', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi'];
var figs = [0,1,2,3,4,5,6,7,8,9,10,1,1,1];
var colors = [ '', 'carreau', 'trefle', 'coeur', 'pique'];
var faceCar = [ '', "&diams;", '&clubs;', '&hearts;', '&spades;' ];
var to_shuffle = [], shuffled = [], ce = [], selectedCards = [], to_shuffle_source = []
var cards = [
  newCard(0,  'DA',  'r', 'D', 1,  1, '&#x1F0C1;'), newCard(1,  'D2',  'r', 'D', 1,  2, '&#x1F0C2;'), newCard(2,  'D3',  'r', 'D', 1,  3, '&#x1F0C3;'), newCard(3,  'D4',  'r', 'D', 1,  4, '&#x1F0C4;'), newCard(4,  'D5',  'r', 'D', 1,  5, '&#x1F0C5;'), newCard(5,  'D6',  'r', 'D', 1,  6, '&#x1F0C6;'), newCard(6,  'D7',  'r', 'D', 1,  7, '&#x1F0C7;'), newCard(7,  'D8',  'r', 'D', 1,  8, '&#x1F0C8;'), newCard(8,  'D9',  'r', 'D', 1,  9, '&#x1F0C9;'), newCard(9,  'D10', 'r', 'D', 1, 10, '&#x1F0CA;'), newCard(10, 'DJ',  'r', 'D', 1, 11, "&#x1F0CB;"), newCard(11, 'DQ',  'r', 'D', 1, 12, '&#x1F0CD;'), newCard(12, 'DK',  'r', 'D', 1, 13, '&#x1F0CE;'),
  newCard(13, 'CA',  'b', 'C', 2,  1, '&#x1F0D1;'), newCard(14, 'C2',  'b', 'C', 2,  2, '&#x1F0D2;'), newCard(15, 'C3',  'b', 'C', 2,  3, '&#x1F0D3;'), newCard(16, 'C4',  'b', 'C', 2,  4, '&#x1F0D4;'), newCard(17, 'C5',  'b', 'C', 2,  5, '&#x1F0D5;'), newCard(18, 'C6',  'b', 'C', 2,  6, '&#x1F0D6;'), newCard(19, 'C7',  'b', 'C', 2,  7, '&#x1F0D7;'), newCard(20, 'C8',  'b', 'C', 2,  8, '&#x1F0D8;'), newCard(21, 'C9',  'b', 'C', 2,  9, '&#x1F0D9;'), newCard(22, 'C10', 'b', 'C', 2, 10, '&#x1F0DA;'), newCard(23, 'CJ',  'b', 'C', 2, 11, "&#x1F0DB;"), newCard(24, 'CQ',  'b', 'C', 2, 12, '&#x1F0DD;'), newCard(25, 'CK',  'b', 'C', 2, 13, '&#x1F0DE;'),
  newCard(26, 'HA',  'r', 'H', 3,  1, '&#x1F0B1;'), newCard(27, 'H2',  'r', 'H', 3,  2, '&#x1F0B2;'), newCard(28, 'H3',  'r', 'H', 3,  3, '&#x1F0B3;'), newCard(29, 'H4',  'r', 'H', 3,  4, '&#x1F0B4;'), newCard(30, 'H5',  'r', 'H', 3,  5, '&#x1F0B5;'), newCard(31, 'H6',  'r', 'H', 3,  6, '&#x1F0B6;'), newCard(32, 'H7',  'r', 'H', 3,  7, '&#x1F0B7;'), newCard(33, 'H8',  'r', 'H', 3,  8, '&#x1F0B8;'), newCard(34, 'H9',  'r', 'H', 3,  9, '&#x1F0B9;'), newCard(35, 'H10', 'r', 'H', 3, 10, '&#x1F0BA;'), newCard(36, 'HJ',  'r', 'H', 3, 11, "&#x1F0BB;"), newCard(37, 'HQ',  'r', 'H', 3, 12, '&#x1F0BD;'), newCard(38, 'HK',  'r', 'H', 3, 13, '&#x1F0BE;'),
  newCard(39, 'SA',  'b', 'S', 4,  1, '&#x1F0A1;'), newCard(40, 'S2',  'b', 'S', 4,  2, '&#x1F0A2;'), newCard(41, 'S3',  'b', 'S', 4,  3, '&#x1F0A3;'), newCard(42, 'S4',  'b', 'S', 4,  4, '&#x1F0A4;'), newCard(43, 'S5',  'b', 'S', 4,  5, '&#x1F0A5;'), newCard(44, 'S6',  'b', 'S', 4,  6, '&#x1F0A6;'), newCard(45, 'S7',  'b', 'S', 4,  7, '&#x1F0A7;'), newCard(46, 'S8',  'b', 'S', 4,  8, '&#x1F0A8;'), newCard(47, 'S9',  'b', 'S', 4,  9, '&#x1F0A9;'), newCard(48, 'S10', 'b', 'S', 4, 10, '&#x1F0AA;'), newCard(49, 'SJ',  'b', 'S', 4, 11, "&#x1F0AB;"), newCard(50, 'SQ',  'b', 'S', 4, 12, '&#x1F0AD;'), newCard(51, 'SK',  'b', 'S', 4, 13, '&#x1F0AE;'),
];

function newCard(id, face, col, color, colid, val, figface) {
  c = document.createElement("div");
  c.id = id;
  document.getElementById('tapis').appendChild(c);
  c.face      = face;
  c.col       = col;
  c.color     = color;
  c.colid     = colid;
  c.val       = val;
  c.selected  = false;
  c.classList.add('card_shape', 'card_deck');
  c.title     = faces[val]+' de '+colors[colid];
  c.faceUp    = function() { this.classList.remove('card_deck');         this.classList.add(cards[this.id].face); };
  c.faceDn    = function() { this.classList.remove(cards[this.id].face); this.classList.add('card_deck'); }; 
  c.select    = function() { this.selected = true;  this.classList.add('raised'); };
  c.unselect  = function() { this.selected = false; this.classList.remove('raised'); };
  c.onclick   = function(event) { cardAction(this.id); event.stopPropagation(); };
  c.highlight = function() { this.classList.add('highlighted'); }
  c.dimm      = function() { this.classList.remove('highlighted'); }
  c.moveTo    = function(x, y, z) {
    this.style.left = x + 'px';
    this.style.top  = y + 'px';
    this.unselect();
    if (z) this.style.zIndex = z; else this.style.zIndex = 0;
  };
  return c;
}

function shuffle() {
  document.getElementById('distr').style.display = 'none';
  for (i = 0; i < 52; i++) { 
    cards[i].faceDn();
    to_shuffle_source[i] = i; 
  } 
  shuffled = shuffled.splice(0, 0);
  document.getElementById('snd_card_distr').play();
  for (i = 0; i < to_shuffle_source.length; i++) to_shuffle[i] = to_shuffle_source[i];
  while (to_shuffle.length > 0) shuffled.push(to_shuffle.splice(Math.floor(Math.random()*to_shuffle.length), 1));
}

function eventail() {
  document.getElementById('snd_card_shuffle').play();
  d = document.getElementById('distr');
  d.style.top  = window.innerHeight/2 + 200 +'px';
  d.style.left = window.innerWidth/2 - 95 +'px';
  d.style.display = 'block';
  for (i = 0; i < 52; i++) { 
    cards[i].style.transition = 'all none';
    cards[i].faceDn();
    cards[i].moveTo(window.innerWidth/2 - 100, window.innerHeight/2-50, (i+10)); 
    cards[i].style["transform-origin"] = '80px 336px'; 
    cards[i].style.transform = 'rotate(-65deg)';
  } 
  for (i = 0; i < 52; i++) { 
    to_shuffle_source[i] = i; 
    cards[i].style.transition = 'top ease 0.4s, left ease 0.4s, margin ease 0.4s, transform ease 1s';
    r = i * 3 - 73;
    rd = r * 6.2831853/360;
    cards[i].style.transform = 'rotate('+r+'deg)';
  }
}

function highlight(c) {
  console.log('highlight - c = '+c);
  e = document.getElementById(c);
  e.classList.add('highlighted');
}