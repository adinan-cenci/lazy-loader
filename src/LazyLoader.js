const ElementLoader = require('./ElementLoader.js');

class LazyLoader 
{
    constructor() 
    {
        this.loaders = [];
        this.throtle = null;

        window.addEventListener('scroll', this.scroll.bind(this));
        this.scroll();
    }

    scroll() 
    {
        if (this.throtle) {
            return;
        }

        this.throtle = setTimeout( () => 
        { 
            this.throtle = null; 
        }, 100);

        this.instantiateLoaders();

        for (var l of this.loaders) {
            l.scroll();
        }
    }

    instantiateLoaders() 
    {
        this.getElements().forEach( (el) => 
        {
            this.loaders.push( new ElementLoader(el) );
        });
    }

    getElements() 
    {
        return document.querySelectorAll('.lazy-loading:not(.is-set)');
    }
}

module.exports = LazyLoader;