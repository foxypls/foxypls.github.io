function expForLevel(lvl) {
    lvl = lvl-1;
    lvlexp = 0;
    while (lvl >= 1) {
      lvlexp = lvlexp + Math.floor(lvl+300*Math.pow(2, lvl/7));
      lvl--;
    }
    return Math.floor(lvlexp/4);
  }