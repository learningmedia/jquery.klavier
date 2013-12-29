(function ($, undefined) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module("jquery.klavier", {
    setup: function () {
      this.createContainers = function (count) {
        var html = new Array(count + 1).join("<div></div>");
        return $("#qunit-fixture").html(html).children();
      };
    },
    teardown: function () {
      $("#qunit-fixture").empty();
    }
  });

  test("is chainable", function () {
    expect(1);
    var elems = this.createContainers(3);
    strictEqual(elems.klavier(), elems);
  });

  test("instantiate on all elements", function () {
    expect(3);
    var elems = this.createContainers(3);
    elems.klavier();
    elems.each(function () {
      notStrictEqual($(this).data("klavier"), undefined);
    });
  });

  test("is destroyed on all elements", function () {
    expect(3);
    var elems = this.createContainers(3);
    elems.klavier();
    elems.klavier("destroy");
    elems.each(function () {
      strictEqual($(this).data("klavier"), undefined);
    });
  });

}) (jQuery);
