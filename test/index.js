var Window = require('./mock-window')
var HashState = require('../index');
var assert = require('assert');

describe('hash > state', function() {
    it('should use location.hash', function() {
        var win = new Window();
        var hashState = new HashState({}, win);
        assert.deepEqual(hashState.data(), {
            path: '',
            query: {}
        })
    })

    it('should use location.hash with data', function() {
        var win = new Window();
        win.location.hash = '#/a/b?c=d&e=f'
        var hashState = new HashState({}, win);
        assert.deepEqual(hashState.data(), {
            path: '/a/b',
            query: {
                c: 'd',
                e: 'f'
            }
        })
    })
})

describe('state > hash', function() {
    
})
