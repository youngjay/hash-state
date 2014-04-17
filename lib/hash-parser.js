/*

#/a/b?c=1&d=2 

<==>

{
    path: '/a/b',
    query: {
        c: '1',
        d: '2'
    }
}    
a
*/
var querystring = require('querystring');

var isEmpty = function(o) {
    return Object.keys(o).length === 0;
};

module.exports = {
    parse: function(str) {     
        var parts = str.replace(/^#/, '').split('?');

        return {
            path: parts[0],
            query: parts[1] ? querystring.parse(parts[1]) : {}
        }
    },

    stringify: function(data) {
        var query;
        var str = data.path || '';
        if (!isEmpty(data.query)) {
            query = querystring.stringify(data.query);
            str += '?' + query;
        }         
        return '#' + str;
    }
}