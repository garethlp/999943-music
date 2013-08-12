/*jslint es5:true, white:false */
/*globals $, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract;

(function (W) { //IIFE
    var name = 'Extract',
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
        C.debug('Extract._load');
        Df.jqCache = $('<div>').load(Df.partsUrl, function (html, stat) {
            if (stat !== 'success') {
                throw new Error('Cannot load from parts.html');
            }
            cb($(html));
        });
    }

    function _link2button() {
        var jq = $(this),
            neo = $('<button>').addClass('orange').text(jq.text());
        jq.html(neo);
    }

    function _linkButtons(jq) {
        var refs = jq.find('a');
        refs.each(_link2button);
    }

    function _parse($load) {
        _linkButtons($load);

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
            Df.dat[sect] = sectO;
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
Extract(sect, type, lang)

i need text for ( sect, all/[text,tile,head]], both/[eng,esp] )

return { // (green) / (green, all, all)
    green: { // sect
        head: { // type
            eng: '...',
            esp: '...',
        },
        text: { // type
            eng: '...',
            esp: '...',
        },
        tile: { // type
        lang: {
            eng: '...',
            esp: '...',
            },
        },
    },
};
return { // (red, head, eng)
    red: { // sect
        head: { // type
            eng: '...',
        },
    },
};
*/
