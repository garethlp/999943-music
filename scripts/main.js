/*jslint es5:true, white:false */
/*globals $, Decache, Extract, Global, Main, Modernizr, Translate, debug, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, CDN, W = (W || window);

W.debug = 1;

if ($.now() > 137700e7) {
    W.debug--;
}

CDN = {
    self: '/',
    disk: 'file:///',
    bithon: '../../../',
    webdev: 'http://10.89.101.100/',
    mython: 'http://10.89.101.81:8000/',
    python: 'http://localhost:8000/',
}.bithon;

Modernizr.load([
{
    test: W.isIE,
    yep: [
        CDN + 'lib/ie/split.js',
        CDN + 'lib/ie/html5shiv.js',
        CDN + 'lib/ie/nwmatcher.min.js',
        CDN + 'lib/ie/selectivizr-min.js',
    ],
    both: [
        CDN + 'lib/underscore/js-1.4.4/underscore.js',
        CDN + 'lib/js/console.js',
        'lib/drt.cellophy.js'
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
        './scripts/translate.js',
    ],
    complete: function () {
        Main(W).init();
    },
},
{
    test: !W.debug,
    yep: [
        CDN + 'lib/js/ecg-ga.js',
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
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    function _binding() {
        Translate.init();

        if ($.browser.mozilla) {
            $('td').drt_cellophy()
        }
        $('.disclose').on('click', function () {
            $('.modal').trigger('show.Modal');
        });
        $('.slug .left').on('click', function () {
            $('body').toggleClass('mobile');
        });
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        debug > 0 && C.error('init @ ' + Date() + ' debug:', debug);
        if (self.inited(true)) {
            return null;
        }

        Extract.init(_binding);
        Decache.init();
        Control.init();
        Modal.init();
        Respond.init();
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
