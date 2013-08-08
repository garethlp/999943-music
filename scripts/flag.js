/*global console, clog, debug, jQuery, $, DATA  */
/*jslint es5:true, white:false  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Flag = {};

(function (glob) {
    function makeFlag(ele, txt, cls){
        var div = $('<div class="flag">')
        ,   tab = {
            div: div,
            box: div.append('<div class="box">').find('.box'),
            txt: div.append('<div class="text"><p>').find('.text p'),
            pnt: div.append('<div class="point">').find('.point'),
        };

        tab.txt.html(txt);
        tab.div.addClass(cls);
        $(ele).replaceWith(tab.div);

        if (debug > 2) {
            clog('makeFlag', [ele, txt, cls], tab.div.get(0));
        }
        return tab;
    }

    function JSIN(str) {
        return window['lave'.split('').reverse().join('')](str);
    }
    function dataFrags() {
        $('.addFlag').each(function(){
            var flag = JSIN($(this).data().flag);
            makeFlag(this, flag[0], flag[1]);
        });
    }
    glob.init = function () {
        dataFrags(); // make flag by attribute
    };

}(Flag));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
