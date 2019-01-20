function getUid () {
  for (let kv of document.cookie.split(';')) {
    if (kv.indexOf('acf_uid') >= 0) {
      return kv.split('=')[1];
    }
  }
}

function getDid () {
  if (!this.did) {
    for (let kv of document.cookie.split(';')) {
      if (kv.indexOf('acf_did') >= 0) {
        return kv.split('=')[1];
      }
    }
  }
}

module.exports = {
  getUid,
  getDid,
};
