/*jslint es5:true, white:false */
/*globals $, Control, Global, Reveal, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Respond;

(function (W) { //IIFE
    var name = 'Respond',
        self = new Global(name, '(detect and insert verbiage)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        current: 'mobile',
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
        Reveal.contract();
        Control.reset();

        if (str === 'desktop' || (!str && Df.current === 'mobile')) {
            _setSize('desktop')
            _recolumn(6)
        } else if (str === 'mobile' || (!str && Df.current === 'desktop')) {
            _setSize('mobile');
            _recolumn(3)
        }
    }

    function _detect() {
        var r = Modernizr.highres, // $('html').is('.retina'),
            w = W.document.documentElement.clientWidth;
            // good god -- the only way to get width in IE?

        if ((w <= 600 && !r) || (w <= 1200 && r)) {
            W.debug > 0 && C.debug(name + '_detect', 'mobile');
            _change('mobile');
        } else if ((w > 600 && !r) || (w > 1200 && r)) {
            W.debug > 0 && C.debug(name + '_detect', 'desktop');
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

        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        change: _change,
        mobile: function () {
            return (Df.current === 'mobile');
        },
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

Modernizr.addTest('highres', function() {
    // for opera
    var ratio = '2.99/2';
    // for webkit
    var num = '1.499';
    var mqs = [
    'only screen and (-o-min-device-pixel-ratio:' + ratio + ')',
    'only screen and (min--moz-device-pixel-ratio:' + num + ')',
    'only screen and (-webkit-min-device-pixel-ratio:' + num + ')',
    'only screen and (min-device-pixel-ratio:' + num + ')'
    ];
    var isHighRes = false;

    // loop through vendors, checking non-prefixed first
    for (var i = mqs.length - 1; i >= 0; i--) {
        isHighRes = Modernizr.mq( mqs[i] );
        // if found one, return early
        if ( isHighRes ) {
            return isHighRes;
        }
    }
    // not highres
    return isHighRes;
});
