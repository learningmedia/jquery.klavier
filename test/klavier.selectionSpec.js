(function ($, undefined) {

  var container;

  describe("setSelectedValues", function () {

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

    it("should set the correct classes", function () {
      container.klavier("setSelectedValues", [60, 64, 67]);
      var values = container.find(".klavier-selected-key").get().map(function (el) {
        return parseInt($(el).data("value"), 10);
      });
      expect(values).toEqual([60, 64, 67]);
    });

  });

  describe("getSelectedValues", function () {

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

    it("should be empty on a new instance", function () {
      expect(container.klavier("getSelectedValues")).toEqual([]);
    });

    it("should be 61 when the first c# is selected", function () {
      container.klavier("setSelectedValues", [61]);
      expect(container.klavier("getSelectedValues")).toEqual([61]);
    });

  });

  describe("when selectionMode is 'none'", function () {

    beforeEach(function () {
      container = $("<div></div>")
        .css({ width: "210px", height: "80px" })
        .appendTo(window.document.body)
        .klavier({ selectionMode: "none" });
    });

    afterEach(function () {
      container.klavier("destroy");
      container.remove();
      container = undefined;
    });

    it("should not select any key on click", function () {
      container.find("[data-value='60']").trigger("click");
      expect(container.klavier("getSelectedValues")).toEqual([]);
    });

  });

  describe("when selectionMode is 'single'", function () {

    beforeEach(function () {
      container = $("<div></div>")
        .css({ width: "210px", height: "80px" })
        .appendTo(window.document.body)
        .klavier({ selectionMode: "single" });
    });

    afterEach(function () {
      container.klavier("destroy");
      container.remove();
      container = undefined;
    });

    it("should select 61 when c# has been clicked", function () {
      container.find("[data-value='61']").trigger("click");
      expect(container.klavier("getSelectedValues")).toEqual([61]);
    });

    describe("when c# is selected", function () {

      beforeEach(function () {
        container.klavier("setSelectedValues", [61]);
      });

      it("should select nothing when c# has been clicked again", function () {
        container.find("[data-value='61']").trigger("click");
        expect(container.klavier("getSelectedValues")).toEqual([]);
      });

      it("should select only 66 when f# has been clicked", function () {
        container.find("[data-value='66']").trigger("click");
        expect(container.klavier("getSelectedValues")).toEqual([66]);
      });

    });

  });

  describe("when selectionMode is 'multiple' and c# and d are selected", function () {

    beforeEach(function () {
      container = $("<div></div>")
        .css({ width: "210px", height: "80px" })
        .appendTo(window.document.body)
        .klavier({ selectionMode: "multiple" });
      container.klavier("setSelectedValues", [61, 62]);
    });

    afterEach(function () {
      container.klavier("destroy");
      container.remove();
      container = undefined;
    });

    it("should select three keys when d# has been clicked", function () {
      container.find("[data-value='63']").trigger("click");
      expect(container.klavier("getSelectedValues")).toEqual([61, 62, 63]);
    });
 
     it("should select only c# when d has been clicked again", function () {
      container.find("[data-value='62']").trigger("click");
      expect(container.klavier("getSelectedValues")).toEqual([61]);
    });

  });

  describe("When the selection changed", function () {
    var onSelectedValuesChanged;

    beforeEach(function () {
      onSelectedValuesChanged = jasmine.createSpy();
      container = $("<div></div>")
        .css({ width: "210px", height: "80px" })
        .appendTo(window.document.body)
        .klavier({
          selectionMode: "multiple",
          onSelectedValuesChanged: onSelectedValuesChanged
        });
    });

    afterEach(function () {
      onSelectedValuesChanged = undefined;
      container.klavier("destroy");
      container.remove();
      container = undefined;
    });

    describe("through setting new values", function () {
      it("should invoke the 'onSelectedValuesChanged' function", function () {
        container.klavier("setSelectedValues", [61, 62]);
        expect(onSelectedValuesChanged).toHaveBeenCalledWith([61, 62]);
      });
    });

    describe("through click events", function () {
      it("should invoke the 'onSelectedValuesChanged' function", function () {
        container.find("[data-value='61']").trigger("click");
        container.find("[data-value='62']").trigger("click");
        expect(onSelectedValuesChanged).toHaveBeenCalledWith([61]);
        expect(onSelectedValuesChanged).toHaveBeenCalledWith([61, 62]);
      });
    });
  });

}) (jQuery);
