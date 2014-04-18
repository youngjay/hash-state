var ko = require('knockout');

var hashParser = require('./lib/hash-parser');

module.exports = require('mixin-class')(
    function(redirects, win/* for mock */) {
        this.redirects = redirects || {};
        this.window = win || window;
        this._hash = ko.observable('');
        this._start();
    },
    {
        data: function(input) {
            if (input) {
                this._hash(hashParser.stringify(input));
            } else {
                return hashParser.parse(this._hash());
            }
        },

        query: function(input) {
            if (input) {
                this.data({
                    path: this.data().path,
                    query: input
                });
            } else {
                return this.data().query;
            }
        },                

        reload: function() {
            this._hash.valueWillMutate();
            this._hash.valueHasMutated();
        },

        _start: function() {
            var self = this;
            var window = this.window;
            var location = window.location;

            var setHash = function() {
                var hash = location.hash;
                var redirectedHash = self._applyRedirectHash(hash);

                if (redirectedHash === hash) {
                    self._hash(redirectedHash);
                } else {
                    location.replace(redirectedHash);
                }                   
            };

            ko.utils.registerEventHandler(window, 'hashchange', setHash);

            setHash();

            // must after location.hash > self._hash
            ko.computed(function() {
                location.hash = self._applyRedirectHash(self._hash());                                
            });
        },

        _applyRedirectHash: function(hash) {
            return hashParser.stringify(this._applyRedirectData(hashParser.parse(hash)));
        },

        _applyRedirectData: function(data) {                
            if (this.redirects['*']) {
                this.redirects['*'](data);
            }

            var redirector, prevPath;

            while (redirector = this.redirects[data.path]) {
                prevPath = data.path;

                switch (typeof redirector) {
                    case 'function':
                        data = redirector(data) || data;
                        break;
                    case 'object':
                        data.path = redirector.path;
                        data.query = redirector.query;
                        break;
                    case 'string': 
                        data.path = redirector;
                        break;                              
                    default:
                        throw new Error('unknown redirector type of: ', redirector);
                }

                // do not recursive if path not change
                if (prevPath === data.path) {
                    break;
                }
            }



            return data;
        }
    }
);