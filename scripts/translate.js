/*jslint es5:true, white:false */
/*globals $, Extract, Global, window */
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
        tiles: '.head, .text',
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

    function _split(str) {
        return str = str ? str.split(' ') : []
    }

    function _classify(jq) {
        // constuct array for drilling path
        var a0 = _split(jq.closest('footer, section, td').attr('class')),
            a1 = _split(jq.attr('class')),
            arr;
        if (a0[0] === 'tile') {
            a1[1] = 'tile'; // tile text
        }
        arr = [a0.slice(-1).pop(), a1.slice(-1).pop()];
        W.debug > 1 && C.debug(name + '_classify', arr);
        arr.push(Df.current); // include language tag
        return arr;
    }

    function _retile(jq) {
        var eles, data = Df.dat = Extract.data();

        eles = $(jq || 'body').find(Df.tiles);
        W.debug > 1 && C.debug(name + '_retile', jq, eles);

        eles.each(function () {
            var me = $(this),
                txt = _deref(data, _classify(me));
            me.fadeOut(function () {
                $(this).html(txt).fadeIn();
            });
        });
    }

    function _reveal(jq, sect) {
        Reveal.expand(jq, sect, _retile);
    }

    function _setLang(str) {
        var body = $('body'),
            html = $('html');

        body.removeClass('eng esp').addClass(str);
        Df.flip.text( str === 'eng' ? 'Español' : 'English' );
        Df.current = str;
        _retile();

        if (str === 'eng') {
            html.attr('lang', 'en');
        } else if (str === 'esp') {
            html.attr('lang', 'es');
        }
    }

    function _toggle() {
        if (Df.current === 'eng') {
            _setLang('esp')
        } else {
            _setLang('eng');
        }
    }

    function _text(kind) {
        var str = Df.dat[kind].text[Df.current];
        str = $(str).text();
        W.debug > 0 && C.debug(name + '_text', str);
        return str;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _reveal();
        _retile();
        Df.flip = $(Df.flip).on('click', _toggle);
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        run: _retile,
        change: _toggle,
        reveal: _reveal,
        exit: function () {
            return _text('exit');
        },
        legal: function () {
            return _text('legal');
        },
        slug: function () {
            return _text('slug');
        },
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

*/
