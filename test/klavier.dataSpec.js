(function ($, undefined) {

  describe("Klavier", function () {

    var container;

    beforeEach(function () {
      container = $("<div></div>")
        .css({ width: "210px", height: "80px" })
        .appendTo(window.document.body)
        .klavier();
    });

    afterEach(function () {
      container.klavier("destroy");
      container.remove();
      container = undefined;
    });

    describe("when a new instance with default options is created", function () {

      it("should have keys with correct midi values as data attributes", function () {
        $(".klavier-key", container).each(function (index, element) {
          expect($(element).data("value")).toBe(index + 60);
        });
      });

    });

  });

}) (jQuery);
