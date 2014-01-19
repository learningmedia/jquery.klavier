(function ($, undefined) {

  describe("Klavier", function () {

    var Klavier = $.fn.klavier._constructor,
        container;

    beforeEach(function () {
      container = $("<div></div>").appendTo(window.document.body);
    });

    afterEach(function () {
      container.remove();
      container = undefined;
    });

    it("should be a function.", function () {
      expect($.isFunction(Klavier)).toBe(true);
    });

    describe("TODO", function () {
      // TODO: Do tests with the Klavier function!
    });

  });

}) (jQuery);
