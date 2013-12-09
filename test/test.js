(function ($) {
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

  module('jQuery.klavier', {
    // This will run before each test in this module.
    setup: function () {
      this.createContainers = function (count) {
        var parent = $('#qunit-fixture'),
            html = "";
        for (var i = 0; i < count; i++) {
          html += '<div></div>';
        }
        $(html).appendTo(parent);
        return parent.children().last(count);
      };
    },
    teardown: function () {
      $('#qunit-fixture').empty();
    }
  });

  test('is chainable', function () {
    expect(1);
    // Not a bad test to run on collection methods.
    var elems = this.createContainers(3);
    strictEqual(elems.klavier(), elems, 'should be chainable');
  });

}(jQuery));
