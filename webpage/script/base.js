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


const hchk = "f01bd24bc85fc9f5954ee3c13e02bbabf3d49f97c7e9f0d9a0b723d21a83f8ed";
const fchk = "8c70cb52890efe734590acc7da29e6b348599830c1c308b8df0dc0c598655f34";


const verify = (plain, hash) => plain.then(sha256).then(h => (h === hash) ? plain : "Invalid checksum");

const header = document.getElementById("header");
const footer = document.getElementById("footer");

verify(headerBase, hchk).then(e => header.innerHTML = e);
verify(footerBase, fchk).then(e => footer.innerHTML = e);
