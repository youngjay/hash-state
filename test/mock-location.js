var EE = require('events').EventEmitter;
var inherits = require('util').inherits;

var Location = function() {
    EE.call(this);
    this._hash = '';
};

inherits(Location, EE);

Location.prototype.replace = function(str) {
    this.hash = str;    
};

Object.defineProperty(Location.prototype, 'hash', {
    set: function(str) {
        if (str !== this._hash) {
            this._hash = str;            
            this.emit('hashchange', str);
        }
    },

    get: function() {
        return this._hash;
    }
});

module.exports = Location;