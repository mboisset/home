var to_shuffle = [], shuffled = [], ce = [], selectedCards = [], to_shuffle_source = [];
var tiles = [
  // chiffres
  newTile(  0, 'c1', 'c', 1, 1), newTile(  1, 'c2', 'c', 1, 2), newTile(  2, 'c3', 'c', 1, 3), newTile(  3, 'c4', 'c', 1, 4), newTile(  4, 'c5', 'c', 1, 5), newTile(  5, 'c6', 'c', 1, 6), newTile(  6, 'c7', 'c', 1, 7), newTile(  7, 'c8', 'c', 1, 8), newTile(  8, 'c9', 'c', 1, 9),
  newTile(  9, 'c1', 'c', 1, 1), newTile( 10, 'c2', 'c', 1, 2), newTile( 11, 'c3', 'c', 1, 3), newTile( 12, 'c4', 'c', 1, 4), newTile( 13, 'c5', 'c', 1, 5), newTile( 14, 'c6', 'c', 1, 6), newTile( 15, 'c7', 'c', 1, 7), newTile( 16, 'c8', 'c', 1, 8), newTile( 17, 'c9', 'c', 1, 9),  
  newTile( 18, 'c1', 'c', 1, 1), newTile( 19, 'c2', 'c', 1, 2), newTile( 20, 'c3', 'c', 1, 3), newTile( 21, 'c4', 'c', 1, 4), newTile( 22, 'c5', 'c', 1, 5), newTile( 23, 'c6', 'c', 1, 6), newTile( 24, 'c7', 'c', 1, 7), newTile( 25, 'c8', 'c', 1, 8), newTile( 26, 'c9', 'c', 1, 9),  
  newTile( 27, 'c1', 'c', 1, 1), newTile( 28, 'c2', 'c', 1, 2), newTile( 29, 'c3', 'c', 1, 3), newTile( 30, 'c4', 'c', 1, 4), newTile( 31, 'c5', 'c', 1, 5), newTile( 32, 'c6', 'c', 1, 6), newTile( 33, 'c7', 'c', 1, 7), newTile( 34, 'c8', 'c', 1, 8), newTile( 35, 'c9', 'c', 1, 9), 
  // ronds
  newTile( 36, 'r1', 'r', 2, 1), newTile( 37, 'r2', 'r', 2, 2), newTile( 38, 'r3', 'r', 2, 3), newTile( 39, 'r4', 'r', 2, 4), newTile( 40, 'r5', 'r', 2, 5), newTile( 41, 'r6', 'r', 2, 6), newTile( 42, 'r7', 'r', 2, 7), newTile( 43, 'r8', 'r', 2, 8), newTile( 44, 'r9', 'r', 2, 9),
  newTile( 45, 'r1', 'r', 2, 1), newTile( 46, 'r2', 'r', 2, 2), newTile( 47, 'r3', 'r', 2, 3), newTile( 48, 'r4', 'r', 2, 4), newTile( 49, 'r5', 'r', 2, 5), newTile( 50, 'r6', 'r', 2, 6), newTile( 51, 'r7', 'r', 2, 7), newTile( 52, 'r8', 'r', 2, 8), newTile( 53, 'r9', 'r', 2, 9),  
  newTile( 54, 'r1', 'r', 2, 1), newTile( 55, 'r2', 'r', 2, 2), newTile( 56, 'r3', 'r', 2, 3), newTile( 57, 'r4', 'r', 2, 4), newTile( 58, 'r5', 'r', 2, 5), newTile( 59, 'r6', 'r', 2, 6), newTile( 60, 'r7', 'r', 2, 7), newTile( 61, 'r8', 'r', 2, 8), newTile( 62, 'r9', 'r', 2, 9),  
  newTile( 63, 'r1', 'r', 2, 1), newTile( 64, 'r2', 'r', 2, 2), newTile( 65, 'r3', 'r', 2, 3), newTile( 66, 'r4', 'r', 2, 4), newTile( 67, 'r5', 'r', 2, 5), newTile( 68, 'r6', 'r', 2, 6), newTile( 69, 'r7', 'r', 2, 7), newTile( 70, 'r8', 'r', 2, 8), newTile( 71, 'r9', 'r', 2, 9),
  // bambous
  newTile( 72, 'b1', 'b', 3, 1), newTile( 73, 'b2', 'b', 3, 2), newTile( 74, 'b3', 'b', 3, 3), newTile( 75, 'b4', 'b', 3, 4), newTile( 76, 'b5', 'b', 3, 5), newTile( 77, 'b6', 'b', 3, 6), newTile( 78, 'b7', 'b', 3, 7), newTile( 79, 'b8', 'b', 3, 8), newTile( 80, 'b9', 'b', 3, 9),
  newTile( 81, 'b1', 'b', 3, 1), newTile( 82, 'b2', 'b', 3, 2), newTile( 83, 'b3', 'b', 3, 3), newTile( 84, 'b4', 'b', 3, 4), newTile( 85, 'b5', 'b', 3, 5), newTile( 86, 'b6', 'b', 3, 6), newTile( 87, 'b7', 'b', 3, 7), newTile( 88, 'b8', 'b', 3, 8), newTile( 89, 'b9', 'b', 3, 9),  
  newTile( 90, 'b1', 'b', 3, 1), newTile( 91, 'b2', 'b', 3, 2), newTile( 92, 'b3', 'b', 3, 3), newTile( 93, 'b4', 'b', 3, 4), newTile( 94, 'b5', 'b', 3, 5), newTile( 95, 'b6', 'b', 3, 6), newTile( 96, 'b7', 'b', 3, 7), newTile( 97, 'b8', 'b', 3, 8), newTile( 98, 'b9', 'b', 3, 9),  
  newTile( 99, 'b1', 'b', 3, 1), newTile(100, 'b2', 'b', 3, 2), newTile(101, 'b3', 'b', 3, 3), newTile(102, 'b4', 'b', 3, 4), newTile(103, 'b5', 'b', 3, 5), newTile(104, 'b6', 'b', 3, 6), newTile(105, 'b7', 'b', 3, 7), newTile(106, 'b8', 'b', 3, 8), newTile(107, 'b9', 'b', 3, 9), 
  // vents 
  newTile(108, 'wn', 'w', 4, 1), newTile(109, 'wn', 'w', 4, 1), newTile(110, 'wn', 'w', 4, 1), newTile(111, 'wn', 'w', 4, 1),
  newTile(112, 'ws', 'w', 4, 2), newTile(113, 'ws', 'w', 4, 2), newTile(114, 'ws', 'w', 4, 2), newTile(115, 'ws', 'w', 4, 2),
  newTile(116, 'ww', 'w', 4, 3), newTile(117, 'ww', 'w', 4, 3), newTile(118, 'ww', 'w', 4, 3), newTile(119, 'ww', 'w', 4, 3),
  newTile(120, 'we', 'w', 4, 4), newTile(121, 'we', 'w', 4, 4), newTile(122, 'we', 'w', 4, 4), newTile(123, 'we', 'w', 4, 4),
  // fleurs
  newTile(124, 'f1', 'f', 5, 1), newTile(125, 'f2', 'f', 5, 1), newTile(126, 'f3', 'f', 5, 1), newTile(127, 'f4', 'f', 5, 1),
  // saisons
  newTile(128, 's1', 's', 6, 1), newTile(129, 's2', 's', 6, 1), newTile(130, 's3', 's', 6, 1), newTile(131, 's4', 's', 6, 1),
  // dragons
  newTile(132, 'd1', 'd', 7, 1), newTile(133, 'd1', 'd', 7, 1), newTile(134, 'd1', 'd', 7, 1), newTile(135, 'd1', 'd', 7, 1),
  newTile(136, 'd2', 'd', 7, 2), newTile(137, 'd2', 'd', 7, 2), newTile(138, 'd2', 'd', 7, 2), newTile(139, 'd2', 'd', 7, 2),
  newTile(140, 'd3', 'd', 7, 3), newTile(141, 'd3', 'd', 7, 3), newTile(142, 'd3', 'd', 7, 3), newTile(143, 'd3', 'd', 7, 3),
  newTile(144, '99', '9', 9, 9)
];

function newTile(id, face, col, colid, val) {
  c = document.createElement("div");
  c.id = id;
  document.getElementById('tapis').appendChild(c);
  c.face        = face;
  c.col         = col;
  c.colid       = colid;
  c.val         = val;
  c.selected    = false;
  c.classList.add('tile_shape', 'tile_deck');
  c.style.top   = '-2000px';
  c.faceUp      = function() { this.classList.remove('tile_deck');         this.classList.add(tiles[this.id].face); };
  c.faceDn      = function() { this.classList.remove(tiles[this.id].face); this.classList.add('tile_deck'); }; 
  c.select      = function() { this.selected = true;  this.classList.add('raised'); };
  c.unselect    = function() { this.selected = false; this.classList.remove('raised'); };
  c.onclick     = function(event) { tileAction(this.id); event.stopPropagation(); };
  c.moveTo      = function(x, y, z) {
    this.style.left = x + 'px';
    this.style.top  = y + 'px';
    this.unselect();
    if (z) this.style.zIndex = z; else this.style.zIndex = 0;
  };
  return c;
}

function shuffle() {
  for (i = 0; i < 144; i++) { tiles[i].faceDn(); to_shuffle_source[i] = i; }
  shuffled = shuffled.splice(0, 0);
  for (i = 0; i < to_shuffle_source.length; i++) to_shuffle[i] = to_shuffle_source[i];
  while (to_shuffle.length > 0) shuffled.push(to_shuffle.splice(Math.floor(Math.random()*to_shuffle.length), 1));
}

function eventail() {
  start(); 
}