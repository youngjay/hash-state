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
        win.location.hash = '#'
        assert.deepEqual(hashState.data(), {
            path: '',
            query: {
            }
        })
    })
})

describe('state > hash', function() {

    it('should change hash', function() {

        var win = new Window();
        var hashState = new HashState({}, win);

        hashState.data({
            path: '/a/b',
            query: {
                c: 'd',
                e: 'f'
            }
        })

        assert.equal(win.location.hash,'#/a/b?c=d&e=f');
    })


})

describe('redirect', function() {
    it('should accept **function**', function() {

        var win = new Window();
        var hashState = new HashState({
            '/a': function(data) {
                data.path = '/b';
                data.query = {
                    b: 'b'
                }
            }
        }, win);

        // from hash
        win.location.hash = '#/a';
        assert.equal(win.location.hash, '#/b?b=b')

        // reset hash
        win.hash = '#';

        // from state
        hashState.data({
            path: '/a'
        })
        assert.equal(win.location.hash, '#/b?b=b')

    })

    it('should accept **object**', function() {

        var win = new Window();
        var hashState = new HashState({
            '/a': {
                path: '/b',
                query: {
                    b: 'b'
                }
            }
        }, win)

        win.location.hash = '#/a';
        assert.equal(win.location.hash, '#/b?b=b')

    })

    it('should accept **string**', function() {

        var win = new Window();
        var hashState = new HashState({
            '/a': '/b'
        }, win)

        win.location.hash = '#/a?b=b';
        assert.equal(win.location.hash, '#/b?b=b')

    })
})
