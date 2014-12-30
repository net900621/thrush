
var cps = require('../lib/cps.js');

var handleError = function(e) {
    if (e.stack) {
        console.log(e.stack);
    } else {
        console.log(e);
    }
};

var start = new Date();
var cb = function(err, res) {
    try {
        var end = new Date();
        console.log('time spent: ', end-start);
        if (err) {
            handleError(err);
        } else {
            console.log(res);
        }
        console.log('finished');
    } catch(e) {
        handleError(e);
    }
};

var alienAdd = function(a, b, cb) {
    setTimeout(function() {
        cb(null, a + b);
    }, 0);
};

var asyncFib = function(n, cb) {
    if (n < 0) {
        throw new Error('fib input error');
        // return cb(new Error('fib input error'));
    }
    if (n == 0) {return cb(null, 1);}
    if (n == 1) {return cb(null, 1);}

    var a = 1,
        b = 1,
        i = 2;
    cps.seq([
        function(_, cb) {
            cps.pwhile(
                function(cb) {
                    cb(null, i <= n);
                },
                function(cb) {
                    cps.seq([
                        function(_, cb) {
                            alienAdd(a, b, cb);
                        },
                        function(res, cb) {
                            a = b;
                            b = res;
                            alienAdd(i, 1, cb);
                        },
                        function(res, cb) {
                            i = res;
                            cb();
                        }
                    ], cb);
                },
                cb
            );
        },
        function(_, cb) {
            cb(null, b);
        }
    ], cb);
};

/*
cps.peach(
    [1,2,3,4,5,6,7,8,9,10],
    function(el, cb) {
        cps.seq([
            function(_, cb) {
                asyncFib(el, cb);
            },
            function(res, cb) {
                console.log(res);
                cb();
            }
        ], cb);

    },
    cb
);
*/

/*
cps.seq([
    function(_, cb) {
        cps.pmap(
            [1,2,3,4,5,6,7,8,9,10,-2],
            function(el, cb) {
                cps.rescue({
                    'try': function(cb) {
                        asyncFib(el, cb);
                    },
                    'catch': function(err, cb) {
                        console.log(err);
                        cb(null, -1);
                    },
                    'finally': function(cb) {
                        // console.log('finally');
                        throw new Error('finally');
                        cb();
                    }
                }, cb)
            },
            cb
        );
    },
    function(res, cb) {
        console.log(res);
        cb();
    }
], cb);
*/

var rescueTest = function(cb) {
    cps.rescue({
        'try': function(cb) {
            setTimeout(function() {
                cb(new Error('foobar'));
            }, 0);
        },
        'catch': function(err, cb) {
            throw err;
            cb(null, 'ok');
        }
    }, cb);
};

var parallelTest = function(cb) {
    cps.parallel([
        function(cb) {
            setTimeout(function() {
                console.log('3');
                cb(new Error('kaz'));
            }, 3000);
        },
        function(cb) {
            setTimeout(function() {
                console.log('1');
                cb(null, 'ok');
            }, 2000);
        },
        function(cb) {
            setTimeout(function() {
                console.log('2');
                cb(new Error('foobar'));
            }, 1000);
        }
    ], cb);
};

var callbackTest = function(cb) {
    cps.seq([
        function(_, cb) {
            setTimeout(function() {
                cb(null, 'after timeout');
            }, 1000);

            cb(null, 'right now');
        }
    ], cb);
};

var pforTest = function(cb) {
    var sum = 0;
    cps.seq([
        function(_, cb) {
            console.log('here');
            cps.pfor(10, function(i, cb) {
                setTimeout(function() {
                    sum += i;
                    console.log(sum);
                    cb();
                }, 1000);
            }, cb);
        },
        function(_, cb) {
            console.log(sum);
            cb(null, 'ok');
        }
    ], cb);
};

pforTest(cb);
