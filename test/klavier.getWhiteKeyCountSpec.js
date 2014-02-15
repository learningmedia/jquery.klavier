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

    describe("getWhiteKeyCount", function () {
      it("should return the correct number of white keys.", function () {
        expect(Klavier.getWhiteKeyCount(60, 72)).toBe(8);
      });
    });

  });

}) (jQuery);
