/*global console, clog, debug, jQuery, $  */
/*jslint es5:true, white:false  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Popup;

(function ($) {
    var _ = {
        pop: $('#Popup')
    };
    if (_.pop.length === 0) {
        _.pop = $('<div id="Popup"></div>');
        _.div = $('<div class="alert"></div>').appendTo(_.pop);
        _.top = $('<h3>head</h3>').appendTo(_.div);
        _.msg = $('<p>message</p>').appendTo(_.div);
        _.url = $('<a href="wf.com">wf.com</a>').appendTo(_.div);
    } else {
        _.div = _.pop.find('div');
        _.top = _.pop.find('h3');
        _.msg = _.pop.find('p');
        _.url = _.pop.find('a');
    }
    function _urlText(str) {
        str = str.replace(/^https?:\/\//, '');
        _.url.text('Open > ' + str);
    }
    function _urlLink(str) {
        _.url.attr({
            'href': str,
            'target': '_blank',
        });
    }
    function prepHref(ele) {
        var arr = ele.href.split('#');
        if (debug) clog('prepHref', arr);
        return Popup.setUrl.apply(null, arr);
    };
    _.init = function () {
        $('body').append(_.pop);
        _.setUrl();
    };
    _.open = function (evt) {
        var vers = prepHref(evt.currentTarget);
        // show only requested disclosure version
        _.pop.find('p').hide().end().find('.'+vers).show();
        _.pop.show();
    };
    _.close = function () {
        _.pop.hide();
    };
    Popup = _;
    /* - - - - - - - */
    Popup.pop.data('Popup', Popup);

    Popup.setUrl = function (link, text, vers) {
        link = link || 'https://www.google.com/';
        text = text || link
        vers = vers || 'media';
        _urlLink(link);
        _urlText(text);
        return vers;
    };

    $(Popup.init);
    if (debug) clog(Popup);

}(jQuery));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
