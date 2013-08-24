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

    function _binding() {
        Df.all.each(function () {
            var me = $(this)
            .on('show.Modal', _show) //
            .on('hide.Modal', _hide) //
            .on('click', function () {
                me.trigger('hide.Modal');
            });

            W.debug > 0 && C.debug(name + '_binding', '\n', me);
        });
    }

    function _valign(jq) {
        jq.valign();
    }

    function _show() {
        var me = $(this);
        me.children().not('aside').hide();
        me.fadeIn();
        _valign(me.children().not('aside'));
    }

    function _hide() {
        var me = $(this);
        me.slideUp();
    }

    // VERTICALLY ALIGN FN
    $.fn.valign = function() {
        return this.each(function(i){
            var me = $(this),
                px = (me.parent().height() - me.height()) / 2;
            me.css('margin-top', px);
        });
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.all = $(Df.all);
        _binding();
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
