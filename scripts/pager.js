/*global W, console, clog, debug, jQuery, $  */
/*jslint es5:true, white:false  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Page = {};

(function (glob) {
    //  INIT
    var idx = 2, tot, div$, dot$, all$, old$, now$, handle, cf = {
        amt: '999',     //  ani range px
        anc: '.pager',  //  anchor element (end)
        con: 'nav',     //  container selector
        dot: false,     //  show dots?
        hgt: '300',     //  fixed height px
        seg: '.seg',    //  segments to rotate
    };

    function setActivation (act){
        if (act === 'time') { //  run handle on interval
            W.setInterval(function(){
                handle();
            }, 6666);
        } else { //  run handle on event
            div$.bind ('click', function (){
                div$.trigger('next');
            });
        }
    }

    function dots() {
        var pager, dot, i;
        pager = $('<div class="pager">');
        dot = $('<span>').css({
            width: '9px',
            height: '9px',
        });
        $('img.pager').replaceWith(pager);  // swap pager img for div
        for (i = 0; i < tot; i++) {         // for each segment
            pager.append(dot.clone());
        }
        dot$ = pager.find('span');
        dot$.bind('activate.dots', function () {
            dot$.removeClass('active');
            $(this).addClass('active');
        });
    }
    function _handle(num) {
        //  determine next item
        now$ = all$.eq(num).insertBefore(cf.anc, div$);
        if (cf.dot) {
            dot$.eq(num).trigger('activate');
        }

        //  insert after all items
        old$.css({
            position: 'relative',
            left: 0,
            top: 0,
        }).show();

        if (debug) clog(old$.width());

        now$.css({
            position: 'absolute',
            left: cf.amt,
            top: 0,
        }).show();

        old$.stop().animate({ //  animate current (old) the left
            left: -cf.amt,
        }, function () {
            $(this).css('position', 'absolute').hide();
        });

        now$.stop().show().animate({
            left: 0,
        }, function () {
            $(this).css('position', 'relative');
        });

        if (debug) clog( idx, tot, div$, all$, old$, now$);
        old$ = now$;
    }

    function inc (bool) {
        idx = idx + (bool ? -1 : +1);
        return (idx = (idx % tot));
    }
    handle = function(bool) {
        var num = inc(bool);
        _handle(num);
    };

    function init() {
        //  main container and div set to clip
        glob.div = div$ = $(cf.con).find('div').first()
        .css({
            overflow: 'hidden',
            height: cf.hgt,
        });

        setActivation('time');
        //  get all segments
        all$ = div$.find(cf.seg);
        //  total segments
        tot = all$.length;
        //  init item showing
        old$ = all$.eq(idx);
        // cf.amt = old$.width();
        glob.all = all$;
        glob.run = handle;
        if (cf.dot) {
            dots();
        }
        glob.run();
    }

    glob.init = init;
}(Page));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
