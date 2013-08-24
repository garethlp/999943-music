/*jslint es5:true, white:false */
/*globals $, Global, Reveal, Translate, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Control;

(function (W) { //IIFE
    var name = 'Control',
        self = new Global(name, '(load images after doc)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        cnom: {
            active: 'tilted',
            normal: 'tilt',
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reset(jq, not) {
        $('.control').not(not).removeClass(Df.cnom.active) //
        .addClass(Df.cnom.normal) //
        .attr('title', 'Reveal');

        if (jq) {
            jq.addClass(Df.cnom.active) //
            .removeClass(Df.cnom.normal) //
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

    function _soon(ele) {
        // delay scroll
        W.setTimeout(function () {
            _scroll(ele);
        }, 333);
    }

    function _getSect(ctrl) { // who am i
        return ctrl.closest('td').attr('class').split(' ').pop();
    }

    function _getLevel(ctrl) { // who am i
        return ctrl.closest('tr').attr('class').split(' ').pop();
    }

    function _getReveal(level) { // who am i
        return $('.reveal.' + level);
    }

    function _isActive(ele) {
        return $(ele).is('.'+ Df.cnom.active);
    }

    function _tilter(ctrl) {
        var sect = _getSect(ctrl),
            reveal = '(closed)';

        if (_isActive(ctrl)) {
            Reveal.contract(_reset); // open nothing
            _soon('#Top'); // scroll to top
            _reset('', ctrl);
        } else {
            reveal = _getReveal(_getLevel(ctrl)); // td

            Translate.update(reveal, sect);
            _soon(ctrl); // scroll to tile
            _reset(ctrl);
        }
        W.debug > 0 && C.debug(name + '_tilter', sect, [ctrl, reveal]);
    }

    function _binding() {
        $('.control').each(function () {
            var ctrl = $(this);

            ctrl.parent().on('click', function () {
                _tilter(ctrl);
            });

            _reset();
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
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
