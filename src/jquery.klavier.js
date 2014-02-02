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

  var name = "klavier";
  var blackKeyValues = [1, 3, 6, 8, 10];

  var Klavier = function (el, options) {
    this.options = $.extend({}, Klavier.defaults, options);
    this.$el = $(el);
    this.$el.data(name, this);
  };

  Klavier.prototype.destroy = function () {
    this.$el.removeData(name);
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
    // default options here...
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
