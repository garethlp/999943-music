/*jslint es5:true, white:false */
/*globals $, Global, debug, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Respond;

(function (W) { //IIFE
    var name = 'Respond',
        self = new Global(name, '(detect and insert verbiage)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        revealpx: '257px',
        current: 'mobile',
        flip: '.aturitmo',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _recolumn(num) {
        $('.filler, .reveal').attr({
            colspan: num,
        });
    }

    function _setSize(str) {
        Df.current = str;
        $('body').removeClass('desktop mobile').addClass(str);
    }

    function _change(str) {
        if (str === 'desktop' || (!str && Df.current === 'mobile')) {
            _setSize('desktop')
            _recolumn(6)
        } else if (str === 'mobile' || (!str && Df.current === 'desktop')) {
            _setSize('mobile');
            _recolumn(3)
        }
    }

    function _detect() {
        var r = $('html').is('.retina'),
            w = W.document.documentElement.clientWidth;
            // good god -- the only way to get width in IE?

        if ((w <= 600 && !r) || (w <= 1200 && r)) {
            C.debug('mobile');
            _change('mobile');
        } else if ((w > 600 && !r) || (w > 1200 && r)) {
            C.debug('desktop');
            _change('desktop');
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _detect();

        $(W).bind('resize orientationchange', _.throttle(_detect, 333));

        Df.flip = $(Df.flip).on('click', function () {
            _change(); // eventless arg
        });

        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        change: _change,
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

Track current devide
    - current
    + fill(ele, clas)
            uses current lang (seeks class of ele)
    + set (lang)
    + toggle button (on copyright)
    + findAll()
        - what is eligible
        - get all classes/data
        - make data entries with true
        - remove certain classes (desktop)

    don`t expect classes to stay orderly!

*/
