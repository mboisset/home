function start() {
  l = 0; c = 0;
  for (i = 0; i < 52; i++) {
    if (i%13 == 0) { c = 0; l++;}
    console.log('i = '+i+', l = '+l+', c = '+c);
    cards[i].faceUp();
    cards[i].moveTo(10 + c*180,   l*250 - 250, 1);
    c++;
  }
}