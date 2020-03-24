// ==UserScript==
// @name         Bilibili BV2AV
// @namespace    https://konge.pw/
// @version      0.1
// @description  Replace BV id with old AV id.
// @author       zkonge
// @include      *://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

// From https://github.com/Coxxs/bvid

let table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
let tr = {}
for (let i = 0; i < 58; i++) {
    tr[table[i]] = i
}
let s = [11, 10, 3, 8, 4, 6, 2, 9, 5, 7]
let xor = BigInt('177451812')
let add = BigInt('100618342136696320')

function decode(x) {
    let r = BigInt(0)
    for (let i = 0; i < 10; i++) {
        r += BigInt(tr[x[s[i]]]) * (BigInt(58) ** BigInt(i))
    }
    r = ((r - add) ^ xor)
    return r > 0 && r < 1e9 ? r : null
}

const regex = /video\/(?<BV>[Bb][Vv][^\?]*)\?*/;

(function () {
    let path = location.toString();
    const check = regex.exec(path);
    if (check) {
        const AV = decode(check.groups.BV);
        path = path.replace(check.groups.BV, 'av' + AV);
        history.replaceState(history.state, '', path);
    }
})();
