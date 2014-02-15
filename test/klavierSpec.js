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

    describe("when a new instance with default options is created", function () {
      beforeEach(function () {
        container.klavier();
      });

      afterEach(function () {
        container.klavier("destroy");
      });

      it("should set the container to position=relative", function () {
        expect(container.css("position")).toBe("relative");
      });

      it("should set the 'klavier-container' class on the container", function () {
        expect(container.hasClass("klavier-container")).toBe(true);
      });

      it("should create 12 elements inside the container", function () {
        var keyEements = container.children();
        expect(keyEements.length).toBe(12);
      });

      it("should create 12 absolutley positioned elements inside the container", function () {
        var keyEements = container.children();
        keyEements.each(function (index, keyElement) {
          expect($(keyElement).css("position")).toBe("absolute");
        });
      });

      it("should create 12 elements with class 'klavier-key' inside the container", function () {
        var keyEements = container.children();
        keyEements.each(function (index, keyElement) {
          expect($(keyElement).hasClass("klavier-key")).toBe(true);
        });
      });

      it("should create 8 elements with class 'klavier-white-key' inside the container", function () {
        var filteredElements = $(".klavier-white-key", container);
        expect(filteredElements.length).toBe(7);
      });

      it("should create 5 elements with class 'klavier-black-key' inside the container", function () {
        var filteredElements = $(".klavier-black-key", container);
        expect(filteredElements.length).toBe(5);
      });

    });

  });

}) (jQuery);
