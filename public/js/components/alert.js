

var CSS_INSERT = document.createElement('style');
CSS_INSERT.type='text/css';
CSS_INSERT.innerHTML ="#alerts{width:400px;top:12px;right:50px;position:fixed;z-index:9999;list-style:none;}.alert{width:100%;margin-bottom:8px;display:block;position:relative;border-left:4px solid;right:-50px;opacity:0;line-height:1;padding:0;transition:right 400ms,opacity 400ms,line-height 300ms 100ms,padding 300ms 100ms;@extend .cf;display:table;}.alert:hover{cursor:pointer;box-shadow:0 0 6px rgba(0,0,0,0.3);}.open{right:0;opacity:1;line-height:2;padding:10px 15px;transition:line-height 200ms,padding 200ms,right 350ms 200ms,opacity 350ms 200ms;}.alert-title{font-weight:bold;}.alert-block{width:80%;width:-webkit-calc(100% - 60px);width:calc(100% - 60px);text-align:left;em,small{font-size:.75em;opacity:.75;}}.alert i{font-size:2em;width:1.5em;max-height:48px;top:50%;margin-top:-12px;display:table-cell;vertical-align:middle;}.alert-success{color:#fff;border-color:#539753;background-color:#8fbf2f;}.alert-error{color:#fff;border-color:#7f0709;background-color:#bf074b;}.alert-info{color:#fff;border-color:#076d91;background-color:#3397db;}.alert-warning{color:#fff;border-color:#dd6137;background-color:#f7931d;}";
document.getElementsByTagName('head')[0].appendChild(CSS_INSERT);


var Alert = undefined;

(function(Alert) {
  var alert, error, info, success, warning, _container;
  info = function(message, title, options) {
    return alert("info", message, title, "icon-info-sign", options);
  };
  warning = function(message, title, options) {
    return alert("warning", message, title, "icon-warning-sign", options);
  };
  error = function(message, title, options) {
    return alert("error", message, title, "icon-minus-sign", options);
  };
  success = function(message, title, options) {
    return alert("success", message, title, "icon-ok-sign", options);
  };
  alert = function(type, message, title, icon, options) {
    var alertElem, messageElem, titleElem, iconElem, innerElem, _container;
    if (typeof options === "undefined") {
      options = {};
    }
    options = $.extend({}, Alert.defaults, options);
    if (!_container) {
      _container = $("#alerts");
      if (_container.length === 0) {
        _container = $("<ul>").attr("id", "alerts").appendTo($("body"));
      }
    }
    if (options.width) {
      _container.css({
        width: options.width
      });
    }
      alertElem = $("<li>").addClass("alert").addClass("alert-" + type);
      setTimeout(function() {
         alertElem.addClass('open');
      }, 1);
    if (icon) {
      iconElem = $("<i>").addClass(icon);
      alertElem.append(iconElem);
    }
    innerElem = $("<div>").addClass("alert-block");
    alertElem.append(innerElem);
    if (title) {
      titleElem = $("<div>").addClass("alert-title").append(title);
      innerElem.append(titleElem);
    }
    if (message) {
      messageElem = $("<div>").addClass("alert-message").append(message);
      innerElem.append(messageElem);
    }
    if (options.displayDuration > 0) {
      setTimeout((function() {
        leave();
      }), options.displayDuration);
    } else {
      innerElem.append("<em>Click to Dismiss</em>");
    }
    alertElem.on("click", function() {
      leave();
    });
     function leave() {
         alertElem.removeClass('open');
          alertElem.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',  function() { return alertElem.remove(); });
    }
    return _container.prepend(alertElem);
  };
  Alert.defaults = {
    width: "",
    icon: "",
    displayDuration: 3000,
    pos: ""
  };
  Alert.info = info;
  Alert.warning = warning;
  Alert.error = error;
  Alert.success = success;
  return _container = void 0;


})(Alert || (Alert = {}));

this.Alert = Alert;
