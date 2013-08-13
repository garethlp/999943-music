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
        flip: '.fliplang',
        partsUrl: 'data.html',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _deref(obj, arr) {
        var foo = obj;

        $.each(arr, function (i, e) {
            // drill or stay put
            foo = (typeof foo === 'object' ? foo[e] : foo);
        });
        return foo;
    }

    function _classify(jq) {
        // constuct array for drilling path
        var a0 = jq.parent().attr('class').split(' '),
            a1 = jq.attr('class').split(' '),
            arr;
        if (a0[0] === 'tile') {
            a1[1] = 'tile'; // tile text
        }
        arr = [a0.slice(-1).pop(), a1.slice(-1).pop()];
        arr.push(Df.current); // include language tag
        return arr;
    }

    function _retile() {
        var eles, data = Extract.data();

        debug > 0 && C.debug(name, data);
        _resetReveals();
        eles = $('.head, .text');

        eles.each(function () {
            var me = $(this),
                txt = _deref(data, _classify(me));
            me.fadeOut(function () {
                $(this).html(txt).fadeIn();
            });
        });
    }

    function _resetReveals(b) {
        $('.reveal').animate({
            height: '33px',
        }, function () {
            $(this).parent().hide();
            if (b) {
                _resetReveals();
                $(b).parent().show().end().animate({
                    height: '257px',
                }, function () {
                    $(this);
                });
            }
        });
    }

    function _setLang(str) {
        Df.current = str;
        Df.flip.text( str === 'eng' ? 'Spanish' : 'English' );
        _retile();
    }

    function _change() {
        if (Df.current === 'eng') {
            _setLang('esp')
        } else {
            _setLang('eng');
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _retile();
        Df.flip = $(Df.flip);
        Df.flip.on('click', _change);
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        run: _retile,
        change: _change,
        open: _resetReveals,
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
