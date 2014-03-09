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

    describe("setSelectedValues", function () {

      it("should set the correct classes", function () {
        container.klavier("setSelectedValues", [60, 64, 67]);
        var values = container.find(".klavier-selected-key").get().map(function (el) {
          return parseInt($(el).data("value"), 10);
        });
        expect(values).toEqual([60, 64, 67]);
      });

    });

    describe("getSelectedValues", function () {

      it("should be empty on a new instance", function () {
        expect(container.klavier("getSelectedValues")).toEqual([]);
      });

      it("should be 61 when the first c# is selected", function () {
        container.klavier("setSelectedValues", [61]);
        expect(container.klavier("getSelectedValues")).toEqual([61]);
      });

    });

  });

}) (jQuery);
