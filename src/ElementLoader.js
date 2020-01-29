class ElementLoader 
{
    constructor(element) 
    {
        this.element    = element;
        this.loaded     = false;
        this.inProgress = false;

        this.element.classList.add('is-set');
    }

    getSrc() 
    {
        return this.element.getAttribute('data-src');
    }

    scroll() 
    {
        if (this.loaded) {
            return;
        }

        if (this.inProgress) {
            return;
        }

        if (! this.isElementInView()) {
            return;
        }

        this.inProgress = true;

        this.beforeLoading().then( async () => 
        {
            this.loaded     = true;
            this.inProgress = false;
            return this.load();

        }).then( async () => 
        {
            this.afterLoading();

        });
    }

    beforeLoading() 
    {
        this.element.classList.add('is-loading');

        return new Promise( (success, fail) => 
        {
            setTimeout( () => { success() }, 500);
        });
    }

    load() 
    {
        var src     = this.getSrc();

        var promise = new Promise( (success, fail) => 
        {
            this.element.onLoad = () => 
            {
                succes();
            }
        });

        this.element.setAttribute('src', src);

        return promise;
    }

    afterLoading() 
    {
        this.element.classList.remove('is-loading');
        this.element.classList.add('is-loaded');
    }

    isElementInView() 
    {
        var screenHeight, scrollTop, y, height;

        screenHeight    = window.innerHeight;
        scrollTop       = document.documentElement.scrollTop;
        y               = this.element.offsetTop;
        height          = this.element.offsetHeight;
        
        if (y > (scrollTop + screenHeight)) {
            return false;
        }

        if (scrollTop > (y + height)) {
            return false;
        }

        return true;
    }
}

module.exports = ElementLoader;
