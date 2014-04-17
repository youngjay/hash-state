var EE = require('events').EventEmitter;
var inherits = require('util').inherits;

var Location = require('./mock-location');

var Window = function() {
    EE.call(this);
    this.location = new Location();
    
    var self = this;
    this.location.on('hashchange', function() {
        self.emit('hashchange');
    })
};

inherits(Window, EE);

Window.prototype.addEventListener = Window.prototype.addListener

module.exports = Window;