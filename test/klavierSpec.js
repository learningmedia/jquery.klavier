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

    describe("validateOptions", function () {
      it("should not throw an exception when options are valid.", function () {
        var options = {
          startKey: 60,
          endKey: 64
        };
        expect(Klavier.validateOptions.bind(Klavier, options)).not.toThrow();
      });

      it("should throw an exception when startKey is greater than endKey.", function () {
        var options = {
          startKey: 60,
          endKey: 59
        };
        expect(Klavier.validateOptions.bind(Klavier, options))
          .toThrow(new Error("The end key must be greater than the start key."));
      });

      it("should throw an exception when startKey is equal to endKey.", function () {
        var options = {
          startKey: 60,
          endKey: 60
        };
        expect(Klavier.validateOptions.bind(Klavier, options))
          .toThrow(new Error("The end key must be greater than the start key."));
      });

      it("should throw an exception when startKey is less than 0.", function () {
        var options = {
          startKey: -1,
          endKey: 64
        };
        expect(Klavier.validateOptions.bind(Klavier, options))
          .toThrow(new Error("The key values must be grater than or equal to 0 and less than or euqal to 120."));
      });

      it("should throw an exception when endKey is greater than 120.", function () {
        var options = {
          startKey: 60,
          endKey: 122
        };
        expect(Klavier.validateOptions.bind(Klavier, options))
          .toThrow(new Error("The key values must be grater than or equal to 0 and less than or euqal to 120."));
      });

      it("should throw an exception when startKey is a black key.", function () {
        var options = {
          startKey: 61,
          endKey: 64
        };
        expect(Klavier.validateOptions.bind(Klavier, options))
          .toThrow(new Error("The keyboard has to start with a white key."));
      });

      it("should throw an exception when endKey is a black key.", function () {
        var options = {
          startKey: 60,
          endKey: 63
        };
        expect(Klavier.validateOptions.bind(Klavier, options))
          .toThrow(new Error("The keyboard has to end with a white key."));
      });
    });

    describe("TODO", function () {
      // TODO: Do tests with the Klavier function!
    });

  });

}) (jQuery);
