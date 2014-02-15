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

      it("should have white keys with a height of 80px", function () {
        $(".klavier-white-key", container).each(function (index, element) {
          expect($(element).css("height")).toBe("80px");
        });
      });

      it("should have white keys with a width of 30px", function () {
        $(".klavier-white-key", container).each(function (index, element) {
          expect($(element).css("width")).toBe("30px");
        });
      });

      it("should have black keys with a height of 48px", function () {
        $(".klavier-black-key", container).each(function (index, element) {
          expect($(element).css("height")).toBe("48px");
        });
      });

      it("should have black keys with a width of 18px", function () {
        $(".klavier-black-key", container).each(function (index, element) {
          expect($(element).css("width")).toBe("18px");
        });
      });

      it("should render all keys at top=0px", function () {
        $(".klavier-key", container).each(function (index, element) {
          expect($(element).css("top")).toBe("0px");
        });
      });

      it("should render the 'c' at left=0px", function () {
        expect($(".klavier-key").first().css("left")).toBe("0px");
      });

      it("should render the 'e' at left=60px", function () {
        expect($(".klavier-key:nth-child(5)").css("left")).toBe("60px");
      });

      it("should render the 'b' at left=180px", function () {
        expect($(".klavier-key").last().css("left")).toBe("180px");
      });

      it("should render the 'c#' at left=21px", function () {
        expect($(".klavier-key:nth-child(2)").css("left")).toBe("21px");
      });

      it("should render the 'f#' at left=111px", function () {
        expect($(".klavier-key:nth-child(7)").css("left")).toBe("111px");
      });

      it("should render the 'bb' at left=171px", function () {
        expect($(".klavier-key:nth-child(11)").css("left")).toBe("171px");
      });

      it("should have white keys with a z-index of 999", function () {
        $(".klavier-white-key", container).each(function (index, element) {
          expect($(element).css("z-index")).toBe("999");
        });
      });

      it("should have black keys with a z-index of 1000", function () {
        $(".klavier-black-key", container).each(function (index, element) {
          expect($(element).css("z-index")).toBe("1000");
        });
      });

    });

  });

}) (jQuery);
