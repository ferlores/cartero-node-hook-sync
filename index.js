var path = require( "path" );
var clone = require('lodash.clonedeep');

var kMetaDataFileName = "metaData.json";

module.exports = CarteroNodeHook;

function CarteroNodeHook(outputDirPath, options) {
  if (! this instanceof CarteroNodeHook)
    return new CarteroNodeHook(outputDirPath, options);

  if(!outputDirPath)
    throw new Error( "outputDirPath is required" );

  options = options || {};
  this.cache = options.cache === undefined ? true : options.cache;

  this.outputDirPath = outputDirPath;

  this.readMetaData();
}

CarteroNodeHook.prototype.readMetaData = function() {
  var outputDirPath = this.outputDirPath;
  var metaDataPath = path.join(outputDirPath, kMetaDataFileName);
  var packageMap;

  if (this.cache) {
    delete(require.cache[metaDataPath]);
  }

  this.metaData = clone(require(metaDataPath));
  packageMap = this.metaData.packageMap;

  Object.keys(packageMap).forEach(function (key) {
    var assetsPath = path.join( outputDirPath, packageMap[key], 'assets.json');

    if (this.cache) {
      delete(require.cache[assetsPath]);
    }
    try {
      // ignore error if file not found
      packageMap[key] = require(assetsPath);
    } catch(err){}
  });
};

CarteroNodeHook.prototype.getParcelAssets = function(parcelSrcPath) {
  if(!this.cache) {
    this.readMetaData();
  }

  var assets = this.metaData.packageMap[parcelSrcPath];

  if( ! assets ) throw new Error( 'Could not find parcel with path "' + parcelSrcPath + '"' );

  return assets;
};
