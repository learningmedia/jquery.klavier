(function ($, undefined) {

  describe("jquery.klavier", function () {

    var container,
        createElements = function (count) {
          return container.html(new Array(count + 1).join("<div></div>")).children();
        };

    beforeEach(function () {
      container = $("<div></div>").appendTo(window.document.body);
    });

    afterEach(function () {
      container.remove();
      container = undefined;
    });

    describe("When the klavier is called on a set of elements", function () {

      var elems;

      beforeEach(function () {
        elems = createElements(3);
      });

      afterEach(function () {
        elems.remove();
        elems = undefined;
      });

      it("should be chainable", function () {
        expect(elems.klavier()).toBe(elems);
      });

      it("should be instantiated on each element", function () {
        elems.klavier();
        elems.each(function () {
          expect($(this).data("klavier")).toEqual(jasmine.any(Object));
        });
      });

      it("should be destroyed on each element", function () {
        elems.klavier();
        elems.klavier("destroy");
        elems.each(function () {
          expect($(this).data("klavier")).toBeUndefined();
        });
      });

    });

  });

}) (jQuery);