# Lazy Loader
A simple lazy loading library.

## How it works
Add the `.lazy-loading` class to your image or iframe tags:
```html
<img class="lazy-loading" src="" data-src="https://catpictures.com/cat.jpg" />

<iframe class="lazy-loading" src="" data-src="https://dogpictures.com"></iframe>
```

And then just instantiate the object.
```js
const LazyLoader = require('../src/LazyLoader.js');

document.addEventListener('DOMContentLoaded', () => 
{
    new LazyLoader();
});
```

You can also add the style sheet if you want:

```html
<link rel="stylesheet" href="lazy-loader/asset/stylesheet/stylesheet.css" />
```

Or don't, you may customize how the elements look with the selectors:

```css
.lazy-loading {}
.lazy-loading.is-loading {}
.lazy-loading.is-loaded {}
```



## License

MIT