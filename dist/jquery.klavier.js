/*! jquery.klavier - v0.9.0 - 2013-12-09
* https://github.com/ahelmberger/jquery.klavier
* Copyright (c) 2013 Andreas Helmberger; Licensed MIT */
(function ($) {

  function createKlavier($el, options) {
    return {
      el: $el,
      options: options
    };
  }

  // Collection method.
  $.fn.klavier = function () {
    var args = $.makeArray(arguments);

    if ((args.length !== 0) && (typeof args[0] === 'string')) {
      var returnValues = [];
      this.each(function () {        
        var instance = $(this).data('__KLAVIER__');
        if (!instance) {
          throw new Error('No klavier instance found on the specified element.');
        }
        var func = instance[args[0]];
        if (typeof func !== 'function') {
          throw new Error('Function "' + args[0] + '" does not exist.');
        }
        returnValues.push(func.apply(instance, args.slice(1)));
      });
      return (returnValues.length !== 0) ? returnValues[0] : undefined;
    }

    return this.each(function () {
      var $el = $(this);
      $el.data('__KLAVIER__', createKlavier($el, (args.length !== 0) ? args[0] : {}));
    });

  };

  // Default options.
  $.klavier = {
    options: {
    }
  };

}(jQuery));
