const { isPlainObject } = require('lodash');

function addItem (e, t) {
  return e ? { key: e, value: t } : [t];
}

function scan (e) {
  const n = [];
  for (let t = '', r = '', o = 0, i = e.length; o < i; o++) {
    let a = e.charAt(o);
    if (a === '/') {
      n.push(addItem(t, r));
      t = '';
      r = '';
    } else {
      if (a === '@') {
        o += 1;
        a = e.charAt(o);
        if (a === 'A') {
          r += '@';
        } else {
          if (a === 'S') {
            r += '/';
          } else {
            if (a === '=') {
              t = r;
              r = '';
            }
          }
        }
      } else {
        r += a;
      }
    }
  }
  return n;
}

function parse (e) {
  let t = String(e);
  if (t) {
    t.charAt(t.length - 1) !== '/' && (t += '/');
    return scan(t);
  } else {
    return [];
  }
}

function decode (e) {
  let t = void 0;
  parse(e).forEach(e => {
    if (Array.isArray(e)) {
      t = t || [];
      e.length === 1 ? t.push(e[0]) : t.push(e);
    }
    if (isPlainObject(e)) {
      const r = e.key;
      const o = e.value;
      (t = t || {})[r] = o;
    }
  });
  return t;
}

module.exports = decode;
