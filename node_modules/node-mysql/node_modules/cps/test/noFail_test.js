var cps = require('../lib/cps');

var t1 = function(cb) {
    cps.noFail(function(cb) {
        // cb(null, 1);
        cb(new Error('foobar'));
    }, cb);
};

cps.run(t1, {
    'ok': function(res) {
        console.log('cps.run OK100: ', res);
    },
    'error': function(err) {
        console.log('cps.run ERROR100: ', err);
    },
    'finally': function() {
        // throw new Error('finally-foo-bar');
        console.log('finally');
    }
});