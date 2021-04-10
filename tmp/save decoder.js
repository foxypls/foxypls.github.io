const takeVars = new Set(['skillXP', 'skillLevel', 'currentAxe', 'treeCutLimit', 'currentRod', 'currentPickaxe', 'gameUpdateNotification', 'currentCookingFire', 'godUpgrade', 'currentGamemode', 'petUnlocked', 'MASTERY']); 
/** @customfunction
*/
function decodeMelvorIdleSave(saveGame) {
  let out = [];
  let data = Utilities.base64Decode(saveGame);
  let blobData = Utilities.newBlob(data, 'application/x-gzip');
  let ungzipped = Utilities.ungzip(blobData);
  let dataUngzipped = JSON.parse(ungzipped.getDataAsString());
  let keys = Object.keys(dataUngzipped);
  for(let i = 0; i < keys.length; ++i) {
    if(!takeVars.has(keys[i])) continue;
    let item = getString(dataUngzipped[keys[i]]);
    out.push(keys[i] + "\t" + item);
  }
  return out.map(el => el.replace(/\n/gi,"\n\t")).join("\n").replace(/,/gi,"\t").split("\n").map(el => el.split("\t"));
}

function getString(item, idx = 0) {
  if(Array.isArray(item)) {
    return item.map(getString);
  } else if (typeof item === 'object' && item !== null) {
    let vals = Object.keys(item).map(function (key) {
      //return key + "\t" + getString(item[key]) + "\t";
      return getString(item[key]);
    });
    return (idx == 0 ? "\n" + Object.keys(item) : "") + "\n" + vals ;
  }
  return item;
}