cartero-node-hook-sync
======================
Like [cartero-node-hook](https://github.com/rotundasoftware/cartero-node-hook) but reading the assets definition on the constructor



## Installation
```
npm install cartero-node-hook-sync
```

## Usage

```javascript
var hook = require('cartero-node-hook-sync');
var path = require('path');

var h = hook(path.join( __dirname, 'static/assets'));

// get the js and css html of a parcel
var assets = h.getParcelAssets(parcelPath);
// assets.script is a string with the url for the bundle
// assets.style is a string with the url for the bundle
// assets.image is a array with all the url for the images
```

## API

### h = hook( outputDirPath, options );

`outputDirPath` is the absolute path to your cartero output directory, as passed into cartero at build time. `options` may contain:

* `cache` (default: `true`) - whether or not to cache meta data. Set to `false` in dev mode so that you don't need to restart your application when assets are changed.

### assets = h.getParcelAssets( parcelPath )

Returns a hash of asset paths keyed by asset type

```javascript
h.getParcelAssets( 'path/to/pages/page1', function( err, assets ) {
  console.log( assets.style );
}
```

## License

MIT

## Change log

### v0.0.1

* First version
