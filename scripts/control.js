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

    function _groom() {
        $('.control').each(function () {
            var me = $(this),
                sect, level, reveal;

            // get my sect (last class of closest td)
            sect = me.closest('td').attr('class').split(' ').pop();

            // get my level (class of closest tr) [upper/lower]
            level = me.closest('tr').attr('class').split(' ').pop();

            // level: find the reveal
            reveal = $('.reveal.' + level);

            W.debug > 0 && C.debug(name + '_groom', sect, level, reveal[0]);

            me.click(function () {
                Translate.open(reveal, sect);
            });
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
make a turn style control widget
    and methods

when tilted title "Reveal" ==> "Return"
    <img class="control tilt" alt="Reveal" src="./images/controls/right.png">
    <img class="control tilted" alt="Return" src="./images/controls/down.png">

prep controls
    find '.control'
    is '.big'? skip for now
    set for '.tilt'
    title='Reveal'
    setsource

*/
