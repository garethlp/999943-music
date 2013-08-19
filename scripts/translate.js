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
        dat: null,
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

    function _classify(jq) {
        // constuct array for drilling path
        var par = jq.closest('footer, section, td'),
            sect = Extract.sect(par),
            kind;

        if (par.is('.tile')) {
            kind = 'tile'; // (.tile > .text)
        } else if (jq.is('.text')) {
            kind = 'text';
        } else if (jq.is('.head')) {
            kind = 'head';
        }

        // include language tag
        W.debug > 1 && C.debug(name + '_classify',
            '[jq: sect,kind,lang]', [jq, sect, kind, Df.current]);

        return [sect, kind, Df.current];
    }

    function _retile(jq) {
        var texts;

        Df.dat = (Df.dat || Extract.data());

        texts = $(jq || 'body').find(Df.tiles); // one or all
        W.debug > 1 && C.debug(name + '_retile', jq, texts);

        texts.each(function () {
            var me = $(this),
                txt = _deref(Df.dat, _classify(me));
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

    function _pop(sect, kind) {
        var str = Df.dat[sect][kind][Df.current];

        str = $(str).text();
        W.debug > 0 && C.debug(name + '_text', str);
        return str;
    }

    function _text(sect) {
        return _pop(sect, 'text');
    }
    function _tile(sect) {
        return _pop(sect, 'tile');
    }
    function _head(sect) {
        return _pop(sect, 'head');
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(glob) {
        Df.glob = glob;
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
        self: _pop,
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

        establish tile text/head data
        custom events to populate

    change language sends event update
    triggers each element with this listener to
    run _pop(self.sect, self,kind, current lang)

? need to update with (?, 'tile')


*/
