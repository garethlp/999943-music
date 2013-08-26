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

            W.debug > 1 && C.debug(name + '_binding', '\n', me);
        });
    }

    function _show() {
        var me = $(this),
            blocks = me.children().not('aside'),
            button = $('aside.icon').hide();

        me.fadeIn(Main.delay, function () {
            button.fadeIn(Main.delay) //
            .cornerOf(blocks.filter(':visible').first());
        });
        blocks.hide().valign();
    }

    function _hide() {
        var me = $(this);
        me.slideUp(Main.delay);
    }

    // VERTICALLY ALIGN FN
    $.fn.valign = function() {
        return this.each(function(i,e){
            var me = $(this),
                px = (me.parent().height() - me.height()) / 2;
            me.css('margin-top', px);
        });
    };

    // CALC CLOSE BUTTON
    $.fn.cornerOf = function(ele) {
        var me = $(this),
            box = $(ele),
            pos = box.children(':visible').first().offset();

        pos.left = pos.left - me.width() / 2;
        pos.position = 'absolute';
        // uses the top margin as set by valign
        pos.top = parseInt(box.css('margin-top')) - me.height() / 2;

        me.css(pos);
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
