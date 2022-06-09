var to_shuffle = [], shuffled = [], ce = [], selectedCards = [], to_shuffle_source = [];
var tiles = [];
for (i = 0; i < 400; i++) tiles.push(newTile(i, 'c'+(i+1), i+1));

function newTile(id, face, val) {
  c = document.createElement("div");
  document.getElementById('tapis').appendChild(c);
  c.id          = id;
  c.face        = face;
  c.val         = val;
  c.selected    = false;
  c.classList.add('tile_shape', 'tile_deck');
  c.style.top   = '-500px';
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

function shuffle(n) {
  document.getElementById('tiles_set').play(); 
  for (i = 0; i < 400; i++) { to_shuffle_source[i] = i; }
  shuffled = shuffled.splice(0, 0);
  for (i = 0; i < n; i++) to_shuffle[i] = to_shuffle_source[i];
  while (to_shuffle.length > 0) shuffled.push(to_shuffle.splice(Math.floor(Math.random()*to_shuffle.length), 1));
}

function eventail() {
  start(); 
}