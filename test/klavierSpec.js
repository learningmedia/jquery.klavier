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
      expect(Klavier).toEqual(jasmine.any(Function));
    });

    describe("isBlackKey", function () {
      it("should be true for black keys", function () {
        expect(Klavier.isBlackKey(1)).toBe(true);
        expect(Klavier.isBlackKey(63)).toBe(true);
        expect(Klavier.isBlackKey(70)).toBe(true);
        expect(Klavier.isBlackKey(44)).toBe(true);
        expect(Klavier.isBlackKey(42)).toBe(true);
      });

      it("should be false for white keys", function () {
        expect(Klavier.isBlackKey(12)).toBe(false);
        expect(Klavier.isBlackKey(2)).toBe(false);
        expect(Klavier.isBlackKey(64)).toBe(false);
        expect(Klavier.isBlackKey(65)).toBe(false);
        expect(Klavier.isBlackKey(127)).toBe(false);
        expect(Klavier.isBlackKey(129)).toBe(false);
        expect(Klavier.isBlackKey(11)).toBe(false);
      });
    });

    describe("TODO", function () {
      // TODO: Do tests with the Klavier function!
    });

  });

}) (jQuery);
