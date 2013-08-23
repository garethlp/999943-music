/*jslint es5:true, white:false */
/*globals $, Global, Main, Respond, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Reveal;

(function (W) { //IIFE
    var name = 'Reveal',
        self = new Global(name, '(expand or contract)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        glob: null,
        open: '',
        sect: '',
        revealpx: 257,
        reveals: '.reveal',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reexpand(jq) {
        jq.parent().show().end().animate({
            height: Df.revealpx * (Respond.mobile() ? 1.5 : 1),
        }, function () {
            Df.open = jq;
            Df.finish(jq); /// from Translate/retile
        });
    }

    function _expand(jq) {
        jq = $(jq);

        if (jq.length) {
            // remove sects and add sect
            jq.removeClass(Main.sectStr());
            jq.addClass(Df.sect);
            _reexpand(jq);
        }
    }

    function _toggle(btn, sect, cb) {
        W.debug > 0 && C.debug(name + '_toggle', Df, [btn, sect, cb]);

        if (!btn && !Df.open) {
            return; // nothing to do!
        }

        $(Df.open || Df.reveals).first().animate({
            height: '1px',
        }, function () {
            $(this).closest('tr').hide();
            if (btn) { //
                Df.sect = sect;
                Df.finish = cb;
                _expand(btn);
            }
        });
    }

    function _contractAll() {
        W.debug > 0 && C.debug(name, '_contract');

        $(Df.reveals).css({
            height: '1px',
        }).closest('tr').hide();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(glob) {
        Df.glob = glob;

        if (self.inited(true)) {
            return null;
        }

        _contractAll();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        expand: _toggle,
        contract: function () {
            _toggle();
        },
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*
Reveal
    store props
        -amount
    track state
        -revealpx
    expose meths
        +expand

*/
