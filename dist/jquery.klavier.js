/*! jquery.klavier - v0.9.0 - 2014-01-20
* https://github.com/learningmedia/jquery.klavier
* Copyright (c) 2014 Andreas Helmberger & Ulrich Kaiser; Licensed MIT */
(function ($, undefined) {

  var name = "klavier";

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
