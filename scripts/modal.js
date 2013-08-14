/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Modal;

(function (W) { //IIFE
    var name = 'Modal',
        self = new Global(name, '(enable modal selections)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        all: '.modal',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _foo() {
        Df.all.each(function () {
            var me = $(this)
            .on('show.Modal', _show)
            .on('hide.Modal', _hide);
            me.on('click', _hide)

            W.debug > 0 && C.debug(name + '_foo', me);
        });
    }

    function _show() {
        var me = $(this);
        me.show();
    }
    function _hide() {
        var me = $(this);
        me.hide();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.all = $(Df.all);
        _foo();
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
