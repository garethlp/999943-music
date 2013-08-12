/*jslint es5:true, white:false */
/*globals $, Extract, Global, debug, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Translate;

(function (W) { //IIFE
    var name = 'Translate',
        self = new Global(name, '(detect and insert verbiage)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        current: 'esp',
        partsUrl: 'data.html',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _deref(obj, arr) {
        var foo = obj;
        $.each(arr, function (i, e) {
            foo = typeof foo === 'object' ? foo[e] : foo;
            debug > 1 && C.debug(name, '_deref', e);
        });
        return foo;
    }

    function _clarr(jq) {
        var a0 = jq.parent().attr('class').split(' '),
            a1 = jq.attr('class').split(' '),
            arr;
        arr = [a0.pop(), a1.pop()];
        if (Df.current) {
            arr.push(Df.current);
        }
        debug > 1 && C.debug('_clarr', name, arr);
        return arr;
    }

    function _retile() {
        var eles, data = Extract.data();

        C.debug(name, data);
        eles = $('.head, .text');

        eles.each(function () {
            var me = $(this),
                txt = _deref(data, _clarr(me));
            debug > 0 && C.debug('_retile', name, txt);
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _retile();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        run: _retile,
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

Track current lang
    - current
    + fill(ele, clas)
            uses current lang (seeks class of ele)
    + set (lang)
    + change button
    + findAll()
        - what is eligible

find tiles
    transplant para

find reveals
    deal head and text
    add class for sect

activate tiles automatically
    run fill on each

when activating reveal
    fill(this)

tranlate wants to know
    clas ... if not given, find from current




*/
