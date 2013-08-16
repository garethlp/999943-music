/*jslint es5:true, white:false */
/*globals $, Global, Translate, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Control;

(function (W) { //IIFE
    var name = 'Control',
        self = new Global(name, '(load images after doc)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reset() {
        $('.control').removeClass('tilted').addClass('tilt') //
        .attr({
            title: 'Reveal',
        });
    }

    function _scroll(ele) {
        var $me = $(ele);

        // look before leap
        if ($me.length) {
            $(W.isIE ? 'html' : 'body').stop().animate({
                scrollTop: $me.offset().top,
            }, 333);
        }
    }

    function _soon(x) {
        // delay scroll
        W.setTimeout(function () {
            _scroll(x);
        }, 333);
    }

    function _groom() {
        $('.control').each(function () {
            var ctrl = $(this),
                sect, level, reveal;

            // get my sect (last class of closest td)
            sect = ctrl.closest('td').attr('class').split(' ').pop();

            // get my level (class of closest tr) [upper/lower]
            level = ctrl.closest('tr').attr('class').split(' ').pop();

            // find which reveal
            reveal = $('.reveal.' + level);

            ctrl.parent().click(function () {
                var tilt = ctrl.is('.tilted');
                // store state and restore defaults
                _reset();

                if (tilt) {
                    // open nothing
                    Translate.open();

                    // scroll to top
                    _soon('#Top');
                } else {
                    Translate.open(reveal, sect);
                    ctrl.addClass('tilted').removeClass('tilt') //
                    .attr({
                        title: 'Close',
                    });

                    // scroll to top of tile
                    _soon(this);
                }
            });

            _reset();
            W.debug > 1 && C.debug(name + '_groom', sect, level, reveal[0]);
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _groom();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
