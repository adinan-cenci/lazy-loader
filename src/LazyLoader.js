const ElementLoader = require('./ElementLoader.js');

class LazyLoader 
{
    constructor() 
    {
        this.loaders    = [];
        this.throtle    = null;
        this.observer   = null;

        this.instantiateLoaders();
        this.setUpObserver();
        
        window.addEventListener('scroll', this.scroll.bind(this));
        this.scroll();
    }

    setUpObserver() 
    {
        var config = { 
            attributes  : false, 
            childList   : true, 
            subtree     : true 
        };

        this.observer = new MutationObserver(this.instantiateLoaders.bind(this));

        this.observer.observe(document.body, config);
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