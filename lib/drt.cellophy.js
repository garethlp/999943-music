/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function ($) {
    if (!$.drt) {
        $.drt = {};
    }
    window.console.debug('drt');

    $.drt.cellophy = function (el, foo, options) {
        window.console.debug('drt.cellophy');

        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this,
            $el;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data('drt.cellophy', base);

        base.init = function () {
            base.foo = foo;
            base.options = $.extend({}, $.drt.cellophy.defaultOptions, options);

            // Put your initialization code here
        };
        // Sample Function, Uncomment to use
        base.functionName = function (paramaters) {
            window.console.debug('drt_cellophy.wrap');
        };
        // Run initializer
        base.init();
    };

    $.drt.cellophy.defaultOptions = {
        def: ''
    };

    $.fn.drt_cellophy = function (foo, options) {
        window.console.debug('drt_cellophy');
        return this.each(function () {
            // (new $.drt.cellophy(this, foo, options));
            var $el = $(this), newDiv;

            newDiv = $('<div />', {
                'class': 'innerWrapper',
                'css': {
                    'height': $el.height(),
                    'width': '100%',
                    'position': 'relative'
                }
            });
            $el.wrapInner(newDiv);
        });
    };

    // This function breaks the chain, but returns
    // the drt.cellophy if it has been attached to the object.
    $.fn.getdrt_cellophy = function () {
        this.data('drt.cellophy');
    };

}(jQuery));
