hash-state
==========

global state bus persist with hash(#)

用hash作为事件总线，当hash变化的时候触发变化

``` javascript
var HashState = require('hash-state');
var ko = require('knockout');

var hashState = new HashState();
ko.computed(function() {
    console.log(hashState.data());
})
location.hash = '#/a/b?c=d';
location.hash = '#/e';

// output

// init data
{
    path: '',
    query: {}
}

// '#/a/b?c=d'
{
    path: '/a/b',
    query: {
        c: 'd'
    }
}

// '#/e'
{
    path: '/e',
    query: {}
}

```


