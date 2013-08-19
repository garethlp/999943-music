/*jslint es5:true, white:false */
/*globals $, Control, Decache, Extract, Global, Main:true, Modal, Modernizr, Respond, Translate, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, CDN, W = (W || window);

W.debug = 1;

if ($.now() > 137700e7) {
    W.debug--;
}

CDN = {
    self: '/lib/',
    disk: 'file:///lib/',
    bithon: '../../../lib/',
    webdev: 'http://10.89.101.100/lib/',
    mython: 'http://10.89.101.81:8000/lib/',
    python: 'http://localhost:8000/lib/',
    other0: 'http://cdnjs.cloudflare.com/ajax/libs/',
}.bithon;

Modernizr.load([
{
    test: W.isIE,
    yep: [
        CDN + 'ie/split.js',
        CDN + 'ie/html5shiv.js',
        CDN + 'ie/nwmatcher.min.js',
        CDN + 'ie/selectivizr-min.js',
    ],
    both: [
        CDN + 'underscore/js-1.4.4/underscore.js',
        CDN + 'js/console.js',
        CDN + 'video-js/4.1/video-js.css',
        CDN + 'video-js/4.1/video.dev.js',
        './lib/drt.cellophy.js',
        './lib/mdz.highres.js',
    ],
    complete: function () {
        Data = new Global('Data', '(catchall data fixture)');
    },
},
{
    both: [
        './scripts/control.js',
        './scripts/decache.js',
        './scripts/extract.js',
        './scripts/modal.js',
        './scripts/respond.js',
        './scripts/reveal.js',
        './scripts/translate.js',
    ],
    complete: function () {
        Main(W).init();
    },
},
{
    test: !W.debug,
    yep: [
        CDN + 'js/ecg-ga.js',
    ],
},
]);

function Main(W) {
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        flip: '.fliplang',
        sects: 'cgray red green purple amber plum teal exit legal slug',
        inits: function (cb) {
            Extract.init(Df, cb);
            Decache.init('.desktop');
            Control.init(Df);
            Modal.init();
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function _binding() {
        Translate.init();
        Respond.init();

        if ($.browser.mozilla) {
            $('td').drt_cellophy();
        }

        $('.disclose').on('click', function () {
            $('.modal').trigger('show.Modal');
            $('#Legal').show();
        });

        $('img.purple').on('click', function (evt) {
            var vid = $(this).data('vid');

            $('#Video').children().hide();
            $('#' + vid).show().click(function (evt) {
                evt.stopPropagation();
            });

            $('.modal').trigger('show.Modal');
            $('#Video').show();
        });

        $('.aturitmo').on('click', function () {
            Respond.change(); // eventless arg
        });
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        C.error('init @ ' + Date() + ' debug:', W.debug);

        if (self.inited(true)) {
            return null;
        }

        Df.inits(_binding);
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        sectStr: function () {
            return Df.sects;
        },
        sectArr: function () {
            return Df.sects.split(' ');
        },
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
