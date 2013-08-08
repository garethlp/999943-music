/*global console, clog, jQuery, $  */
/*jslint es5:true, white:false  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Args(nom){
    var A = location.search.slice(1).split('&')
    ,   O = {}
    ;
    $.each(A, function(i, e){
        var x = e.split('=');
        O[x[0]] = x[1];
    });
    return nom ? O[nom] : O;
}

function init() {
    var respond = function () {
        var w = document.documentElement.clientWidth, // good god -- the only way to get width in IE?
            i = !!(location.href.match('index')),
            r = $('html').is('.retina');
        if (w < 650) {
            $('#index-page header img').eq(0).attr('src','slices/header/wferm-sm.png');
        } else {
            $('#index-page header img').eq(0).attr('src','slices/header/wferm.png');
        }
        if ((w <= 500 && i && !r) || (w <= 900 && i && r)) {
            location.href='mobile.html';
        } else if ((w > 500 && !i && !r) || (w > 900 && !i && r)) {
            location.href='index.html';
        }
    }
    $('a[href="#"], a.ext').bind('click', function (evt) {
        evt.preventDefault();
        Popup.open(evt);
        return;
    });
    $(window).bind('resize orientationchange', respond);
    respond();
}
$(init);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

    mp3 text size tweaks on mobile
    make sure alert images are gone

 */
