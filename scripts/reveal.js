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
        open: '',
        sect: '',
        speed: 666,
        tile: '',
        revealpx: 257,
        reveals: '.reveal',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _reexpand(jq) {
        if (Df.finish) {
            Df.finish(jq); /// from Translate/retile
        } else {
            return;
        }

        jq.closest('tr').show().end() //
        .children().fadeIn(Df.speed).end() //
        .animate({
            height: Df.revealpx * (Respond.mobile() ? 1.5 : 1),
        }, function () {
            Df.open = jq;
        });
    }

    function _expand(jq) {
        jq = $(jq);

        if (jq.length) {
            // remove sects and add sect
            jq.removeClass(Main.sectStr()).addClass(Df.sect);
            _reexpand(jq);
        }
    }

    function _closed() {
        Df.open = '';

        if (Df.tile) { //
            _expand(Df.tile);
        }
    }

    function _toggle(tile, sect, cb) {
        Df.tile = tile || Df.tile;

        if (!Df.tile && !Df.open) {
            return; // nothing to do!
        }
        Df.sect = sect;
        Df.finish = cb;

        W.debug > 0 && C.debug(name + '_toggle', Df);
        if (Df.open) {
            Df.open.children().fadeOut().end() //
            .animate({
                height: '1px',
            }, Df.speed, function () {
                $(this).closest('tr').hide();
                _closed();
            });
        } else {
            _closed(); // ALREADY
        }
    }

    function _contractAll() {
        var all = $(Df.reveals);
        W.debug > 0 && C.debug(name, '_contract', all.children());

        all.css({
            height: '1px',
        }).children().fadeOut().end() //
        .closest('tr').hide();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
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
