/*! jquery.klavier - v1.1.1 - 2016-04-24
* https://github.com/learningmedia/jquery.klavier
* Copyright (c) 2016 Andreas Helmberger & Ulrich Kaiser; Licensed MIT */
(function (root, factory) {
  if (typeof exports === "object") {
    var jquery = require("jquery");
    factory(jquery);
  } else if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
}) (this, function ($) {

  var MIN_KEY = 0;
  var MAX_KEY = 120;
  var BLACK_KEY_WIDTH_FACTOR = 0.6;
  var BLACK_KEY_HEIGHT_FACTOR = 0.6;

  var name = "klavier";
  var blackKeyValues = [1, 3, 6, 8, 10];

  var prepareContainer = function ($el, options) {
    $el
      .css("position", "relative")
      .addClass(options.cssPrefix + "-container")
      .on("click." + name, "." + options.cssPrefix + "-key", onKeyClick);
  };

  function createKeys($el, options) {
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
        .attr("data-value", i)
        .appendTo($el);

      if (!isBlackKey) {
        currentPosition += whiteKeyWidth;
      }
    }
  }

  function getValueFromKeyElement(el) {
    return parseInt($(el).data("value"), 10);
  }

  function onKeyClick(event) {
    var klavier = Klavier.getOrCreate(event.delegateTarget);
    var value = getValueFromKeyElement(event.target);
    var selectedValues = klavier.getSelectedValues();
    var index = selectedValues.indexOf(value);
    switch(klavier.options.selectionMode) {
      case "single":
        if (index === -1) {
          selectedValues = [value];
        } else {
          selectedValues = [];
        }
        break;
      case "multiple":
        if (index === -1) {
          selectedValues.push(value);
        } else {
          selectedValues.splice(index, 1);
        }
        break;
      default:
        selectedValues = [];
        break;
    }
    klavier.setSelectedValues(selectedValues);
  }

  function Klavier(el, options) {
    this.options = $.extend({}, Klavier.defaults, options);
    this.$el = $(el);
    this.$el.data(name, this);
    prepareContainer(this.$el, this.options);
    createKeys(this.$el, this.options);
  }

  Klavier.prototype.destroy = function () {
    this.$el.removeData(name);
    this.$el.removeClass(this.options.cssPrefix + "-container");
    this.$el.off("." + name);
    this.$el.empty();
    this.$el = null;
  };

  Klavier.prototype.getSelectedValues = function () {
    return this.$el.find("." + this.options.cssPrefix + "-selected-key").get().map(function (key) {
      return getValueFromKeyElement(key);
    });
  };

  Klavier.prototype.setSelectedValues = function (values) {
    this.$el.find("." + this.options.cssPrefix + "-key").each(function (index, key) {
      var isSelected = values.indexOf(getValueFromKeyElement(key)) !== -1;
      $(key).toggleClass(this.options.cssPrefix + "-selected-key", isSelected);
    }.bind(this));
    if (typeof this.options.onSelectedValuesChanged === "function") {
      this.options.onSelectedValuesChanged(this.getSelectedValues());
    }
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
    selectionMode: "multiple",
    cssPrefix: "klavier",
    zIndex: 999
  };

  // Collection method.
  $.fn.klavier = function (options) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (typeof options === "string") {
      var values = this.get().map(function (el) {
        var klavier = Klavier.getOrCreate(el);
        var v = klavier[options].apply(klavier, args);
        return v;
      });
      return values.length ? values[0] : undefined;
    }
    return this.each(function () {
      Klavier.getOrCreate(this, options);
    });
  };

  $.fn.klavier.defaults = Klavier.defaults;

  // For testing purposes we make the constructor public:
  $.fn.klavier._constructor = Klavier;

});
