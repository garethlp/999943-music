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
        glob: null,
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reset(jq) {
        $('.control').removeClass('tilted') //
        .addClass('tilt') //
        .attr('title', 'Reveal');

        if (jq) {
            jq.addClass('tilted') //
            .removeClass('tilt') //
            .attr('title', 'Close');
        }
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

    function _getSect(ctrl){
        return ctrl.closest('td').attr('class').split(' ').pop();
    }

    function _getLevel(ctrl){
        return ctrl.closest('tr').attr('class').split(' ').pop();
    }

    function _binding() {
        $('.control').each(function () {
            var ctrl = $(this),
                sect, level, reveal;

            // get my sect (last class of closest td)
            sect = _getSect(ctrl);

            // get my level (class of closest tr) [upper/lower]
            level = _getLevel(ctrl)

            W.debug > 0 && C.debug(name + '_binding', sect, level);

            // find which reveal
            reveal = $('.reveal.' + level);

            ctrl.parent().on('click', function () {
                // store state and restore defaults

                if (ctrl.is('.tilted')) {
                    // open nothing
                    Reveal.contract();
                    // scroll to top
                    _soon('#Top');
                    _reset();
                } else {
                    Translate.update(reveal, sect);
                    // scroll to top of tile
                    _soon(ctrl);
                    _reset(ctrl);
                }
            });

            _reset();
            W.debug > 1 && C.debug(name + '_groom', sect, level, reveal[0]);
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(glob) {
        Df.glob = glob;
        if (self.inited(true)) {
            return null;
        }
        _binding();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        reset: _reset,
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
