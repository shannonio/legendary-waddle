(function() {
  
  /*
  * Object Utility for finding the first matching object in an array with a given key, value pair
  */
  Object.prototype.findItem = function(key, val) {
    return this.filter(function(obj) {
      return obj[key] === val;
    })[0];
  };

})();
