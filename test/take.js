var assert = require('assert');
var Lazy = require('..');
var expresso = expresso;

function range(i, j) {
    var r = [];
    for (;i<j;i++) r.push(i);
    return r;
}

take_expect = function (amount, pool, expected, emit_end) {
    if (!emit_end) emit_end = false;

    var lazy = new Lazy;
    var data = [];
    var executed = 0;
    lazy.take(amount).join(function (xs) {
        assert.deepEqual(xs, range(0,expected));
        executed++;
    });

    range(0,pool).forEach(function (x) {
        lazy.emit('data', x);
    });
    if (emit_end) lazy.emit('end');

    assert.equal(executed, 1, 'join executed incorrectly');
}

exports['take_6_of_10'] = take_expect(6, 10, 6);
exports['take_6_of_6'] = take_expect(6, 6, 6);
exports['take_6_of_6_end'] = take_expect(6, 6, 6, true);
exports['take_10_of_6_end'] = take_expect(10, 6, 6, true);
