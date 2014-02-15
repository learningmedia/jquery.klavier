/*
 * jquery.klavier
 * 
 *
 * Copyright (c) 2013 Andreas Helmberger & Ulrich Kaiser
 * Licensed under the MIT license.
 */

(function ($, undefined) {

  var MIN_KEY = 0;
  var MAX_KEY = 120;
  var BLACK_KEY_WIDTH_FACTOR = 0.6;
  var BLACK_KEY_HEIGHT_FACTOR = 0.6;

  var name = "klavier";
  var blackKeyValues = [1, 3, 6, 8, 10];

  var prepareContainer = function ($el, options) {
    $el
      .css("position", "relative")
      .addClass(options.cssPrefix + "-container");
  };

  var createKeys = function ($el, options) {
    var whiteKeyCount = Klavier.getWhiteKeyCount(options.startKey, options.endKey);
    var whiteKeyWidth = $el.innerWidth() / whiteKeyCount;
    var blackKeyWidth = BLACK_KEY_WIDTH_FACTOR * whiteKeyWidth;
    var whiteKeyHeight = $el.innerHeight();
    var blackKeyHeight = BLACK_KEY_HEIGHT_FACTOR * whiteKeyHeight;
    var currentPosition = 0;
    var isBlackKey;
    var i;

    for (i = options.startKey; i <= options.endKey; i++) {
      isBlackKey = Klavier.isBlackKey(i);

      $("<div></div>")
        .css({
          position: "absolute",
          width: (isBlackKey ? blackKeyWidth : whiteKeyWidth) + "px",
          height: (isBlackKey ? blackKeyHeight : whiteKeyHeight) + "px",
          top: "0px",
          left: (isBlackKey ? (currentPosition - blackKeyWidth / 2) : currentPosition) + "px",
          zIndex: isBlackKey ? options.zIndex + 1 : options.zIndex
        })
        .addClass(options.cssPrefix + "-key")
        .addClass(options.cssPrefix + (isBlackKey ? "-black-key" : "-white-key"))
        .appendTo($el);

      if (!isBlackKey) {
        currentPosition += whiteKeyWidth;
      }
    }
  };

  var Klavier = function (el, options) {
    this.options = $.extend({}, Klavier.defaults, options);
    this.$el = $(el);
    this.$el.data(name, this);
    prepareContainer(this.$el, this.options);
    createKeys(this.$el, this.options);
  };

  Klavier.prototype.destroy = function () {
    this.$el.removeData(name);
    this.$el.removeClass(this.options.cssPrefix + "-container");
    this.$el.off("." + name);
    this.$el.empty();
    this.$el = null;
  };

  Klavier.getOrCreate = function (el, options) {
    return $(el).data(name) || new Klavier(el, options);
  };

  Klavier.isBlackKey = function (midiValue) {
    var normalized = midiValue % 12;
    return blackKeyValues.indexOf(normalized)  !== -1;
  };

  Klavier.getWhiteKeyCount = function (startKey, endKey) {
    var whiteKeyCount = 0;
    var i;
    for (i = startKey; i <= endKey; i++) {
      if(!Klavier.isBlackKey(i)) {
        whiteKeyCount += 1;
      }
    }
    return whiteKeyCount;
  };

  Klavier.validateOptions = function (options) {
    if (options.endKey <= options.startKey) {
      throw new Error("The end key must be greater than the start key.");
    }
    if (options.startKey < MIN_KEY || options.endKey > MAX_KEY) {
      throw new Error("The key values must be grater than or equal to " + MIN_KEY + " and less than or euqal to " + MAX_KEY + ".");
    }
    if (Klavier.isBlackKey(options.startKey)) {
      throw new Error("The keyboard has to start with a white key.");
    }
    if (Klavier.isBlackKey(options.endKey)) {
      throw new Error("The keyboard has to end with a white key.");
    }
  };

  Klavier.defaults = {
    startKey: 60,
    endKey: 71,
    cssPrefix: "klavier",
    zIndex: 999
  };

  // Collection method.
  $.fn.klavier = function (options) {
    var args = Array.prototype.slice(arguments, 1);
    if (typeof options === "string") {
      var values = this.map(function () {
        var klavier = Klavier.getOrCreate(this);
        return klavier[options].apply(klavier, Array.prototype.slice(args));
      }).get();
      return values.length ? values[0] : undefined;
    }
    return this.each(function () {
      Klavier.getOrCreate(this, options);
    });
  };

  $.fn.klavier.defaults = Klavier.defaults;

  // For testing purposes we make the constructor public:
  $.fn.klavier._constructor = Klavier;

}) (jQuery);
