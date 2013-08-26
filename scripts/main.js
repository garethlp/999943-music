/*jslint es5:true, white:false */
/*globals $, Control, Decache, Extract, Global, Modal, Respond, Reveal, Translate, videojs */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Main(W) {
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        delay: 333,
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
        Reveal.init();

        if ($.browser.mozilla) {
            $('td').drt_cellophy();
        }

        $('.disclose').on('click', function () {
            $('.modal').trigger('show.Modal');
            $('#Legal').show();
        });

        $('img.purple').on('click', function (evt) {
            var vid = $(this).data('vid'),
                vidjs = videojs(vid);

            $('#Video').children().hide();
            $('#' + vid).show().click(function (evt) {
                evt.stopPropagation();
            });

            $('.modal').trigger('show.Modal') //
            .on('hide.Modal', function () {
                vidjs.pause();
            });

            vidjs.currentTime(0).play();
            $('#Video').show();
        });

        $('.aturitmo').on('click', function () {
            Respond.change(); // eventless arg
        });

        $('.upper.reveal').one('click', 'button', function (evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            $('.disclose').click();
        });
    }
    function _scroll(ele) {
        var $me = $(ele);

        // look before leap
        if ($me.length) {
            $(W.isIE ? 'html' : 'body').stop().animate({
                scrollTop: $me.offset().top,
            }, Main.delay);
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        C.error('init @ ' + Date() + ' debug:', W.debug);

        if (self.inited(true)) {
            return null;
        }
        Df.inits(_binding);
        _scroll('#Top');
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        delay: Df.delay,
        scroll: _scroll,
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
