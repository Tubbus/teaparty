const selectEl = document.querySelector.bind(document);
const selectEls = document.querySelectorAll.bind(document);
const {min, max} = Math;
const clamp = (n, low, high) => max(min(n, high), low);