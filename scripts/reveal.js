/*jslint es5:true, white:false */
/*globals $, Global, Respond, window */
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
        host: '.reveal',
        open: true,
        revealpx: 257,
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _class(jq, sect) {
        // remove sects and add sect
        jq.removeClass(Main.sectStr());
        jq.addClass(sect);
        _reexpand(jq)
    }

    function _reexpand(jq) {
        jq.parent().show().end().animate({
            height: Df.revealpx * (Respond.mobile() ? 1.5 : 1),
        }, function () {
            Df.open = true;
        });
    }

    function _expand(jq, sect, cb) {
        void W.debug > 0 && C.debug(name + '_expand', Df.open, [jq, sect]);

        if (!jq && !Df.open) {
            return;
        }
        Df.open = false;

        $(Df.host).animate({ // ANIMATE
            height: '1px',
        }, function () {
            $(this).parent().hide(); // TR?

            if (!jq) {
                return;
            } else {
                jq = $(jq);
                cb(jq);
                if (jq.length) _class(jq, sect);
            }
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(glob) {
        Df.glob = glob;
        if (self.inited(true)) {
            return null;
        }

        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        expand: _expand,
        contract: function () {
            _expand();
        }
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
