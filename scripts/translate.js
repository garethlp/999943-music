/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Translate;

(function (W) { //IIFE
    var name = 'Translate',
        self = new Global(name, '(extract verbiage)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        dat: {},
        partsUrl: 'data.html',
        // cycle
        keyList: ['cgray', 'red', 'green', 'purple', 'amber', 'plum', 'teal', 'legal', 'exit'],
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _load(cb) {
        C.debug('Translate._load');
        Df.jqCache = $('<div>').load(Df.partsUrl, function (html, stat) {
            if (stat !== 'success') {
                throw new Error('Cannot load from parts.html');
            }
            cb($(html));
        });
    }

    function _parse($load) {
        // make a data var
        var D = Df.dat;
        // for each in keylist
        $.each(Df.keyList, function (i, sect) {
            var sectO = {},
                row$;

            // search new html for rows with that section key
            row$ = $load.find('.' + sect).removeClass(sect);

            row$.each(function () { // ie "red" section
                var $row = $(this),
                    type = $row.attr('class').trim(),
                    typeO = {};
                // new obj for remaining class name (ie "red tile" => tile)
                $row.find('td').each(function () {
                    var me = $(this),
                        lang = me.attr('class').trim();
                    // prop: lang{string} takes html from that cell
                    typeO[lang] = me.html();
                });
                sectO[type] = typeO;
            });
            D[sect] = sectO;
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _load(_parse);
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        data: function () {
            return Df.dat;
        },
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

Track current lang
    - current
    + fill(ele, clas)
            uses current lang (seeks class of ele)
    + set (lang)
    + change button
    + findAll()
        - what is eligible

find tiles
    transplant para

find reveals
    deal head and text
    add class for sect

activate tiles automatically
    run fill on each

when activating reveal
    fill(this)

tranlate wants to know
    clas ... if not given, find from current




*/
