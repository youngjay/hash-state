var forEach = function(o, fn) {
    Object.keys(o).forEach(function(key) {
        fn(o[key], key);
    })
};

module.exports = {
    parse: function(str) {
        var o = {};
        str.split('&').forEach(function(keyValue) {
            var arr = keyValue.split('=');
            o[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        });
        return o;
    },

    stringify: function(o) {
        var arr = [];
        forEach(o, function(value, key) {
            if (value != null) {
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        });
        return arr.join('&');
    }
}