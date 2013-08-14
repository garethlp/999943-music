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
        debug > 1 && C.debug(name + '_classify', arr);
        arr.push(Df.current); // include language tag
        return arr;
    }

    function _retile(jq) {
        var eles, data = Df.dat = Extract.data();

        eles = $(jq || 'body').find(Df.tiles);
        debug > 0 && C.debug(name + '_retile', jq, eles);

        eles.each(function () {
            var me = $(this),
                txt = _deref(data, _classify(me));
            me.fadeOut(function () {
                $(this).html(txt).fadeIn();
            });
        });
    }

    function _classic(jq, sect) {
        // remove sects and add sect
        if (jq && jq.length) {
            _retile(jq);
            jq.removeClass('cgray red green purple amber plum teal');
            jq.addClass(sect);
        }
    }

    function _reveal(jq, sect) {
        $('.reveal').animate({
            height: '1px',
        }, function () {
            $(this).parent().hide();
            if (jq) {
                jq = $(jq);
                _classic(jq, sect);
                jq.parent().show().end().animate({
                    height: '257px',
                });
            }
        });
    }

    function _setLang(str) {
        Df.current = str;
        Df.flip.text( str === 'eng' ? 'Español' : 'English' );
        _retile();
        $('body').removeClass('eng esp').addClass(str);
    }

    function _change() {
        if (Df.current === 'eng') {
            _setLang('esp')
        } else {
            _setLang('eng');
        }
    }

    function _text(kind) {
        var str = Df.dat[kind].text[Df.current];
        str = $(str).text();
        debug > 0 && C.debug(name + '_text', str);
        return str;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _reveal();
        _retile();
        Df.flip = $(Df.flip).on('click', _change);
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        run: _retile,
        change: _change,
        open: _reveal,
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
