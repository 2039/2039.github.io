"use strict";

// To allow for fetching of local files, set
// firefox: about:config -> privacy.file_unique_origin = false

// Helper function for fetching
const get = (url) => fetch(url).then(e => e.text());

const headerBase = get("template/header.html");
const footerBase = get("template/footer.html");

const sha256 = async (text) => {
    // Code taken from
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

    // sha256 isn't the most secure hash, but it works.

    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const toString = b => b.toString(16).padStart(2, "0");
    const hashHex = hashArray.map(toString).join("");

    return hashHex
}

// Marks button of current page in navbar
const markActive = () => {
    const locationName = window.location.pathname.split("/").pop().split(".")[0] || "home";

    const locationButton = document.getElementById(`link-${locationName}`);
    locationButton.classList.add("nav__button--active");
}

// checksum of header/footer
const hchk = "86e04fa25e28571b56235ebda7c56f8062fc5dde86ee7725474c9641e5c144c9";
const fchk = "d9b1d0b6f1665acb382718414943ee523577119f143b145d3b5e57df6412a862";

const verify = (plain, hash) => plain.then(sha256).then(h => (h === hash) ? plain : "Invalid checksum");

const header = document.getElementById("header");
const footer = document.getElementById("footer");

// Verifies, then adds header/footer, then marks active page.
verify(headerBase, hchk).then(e => header.innerHTML = e).then(markActive);
verify(footerBase, fchk).then(e => footer.innerHTML = e);


