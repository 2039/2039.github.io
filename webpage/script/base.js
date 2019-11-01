"use strict";

// firefox: about:config -> privacy.file_unique_origin

const get = (url) => fetch(url).then(e => e.text());

const headerBase = get("template/header.html");
const footerBase = get("template/footer.html");

const sha256 = async (text) => {

    // NOT ORIGINAL CODE:
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const toString = b => b.toString(16).padStart(2, "0");
    const hashHex = hashArray.map(toString).join("");

    return hashHex
}


const hchk = "933841f52a0ec826b3245baa6d5d627b4f6e384bade074b72e1b709a8e030d54";
const fchk = "d9b1d0b6f1665acb382718414943ee523577119f143b145d3b5e57df6412a862";


const verify = (plain, hash) => plain.then(sha256).then(h => (h === hash) ? plain : "Invalid checksum");

const header = document.getElementById("header");
const footer = document.getElementById("footer");


// verify(headerBase, hchk).then(e => header.innerHTML = e);
// verify(footerBase, fchk).then(e => footer.innerHTML = e);
headerBase.then(e => header.innerHTML = e)
footerBase.then(e => footer.innerHTML = e)
