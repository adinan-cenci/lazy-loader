const LazyLoader = require('../src/LazyLoader.js');

window.lazy;

document.addEventListener('DOMContentLoaded', () => 
{
    window.lazy = new LazyLoader();
});