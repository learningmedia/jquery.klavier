# jquery.klavier

A jQuery plugin to render a piano keyboard.

[![Build Status](https://travis-ci.org/learningmedia/jquery.klavier.png)](https://travis-ci.org/learningmedia/jquery.klavier)

## Getting Started

Download the [production version][min] or the [development version][max].

In your web page:

```html
<div id='container'></div>
<script src='jquery.min.js'></script>
<script src='jquery.klavier.min.js'></script>
<script>
$(document).ready(function ($) {
  $('#container').klavier();
});
</script>
```

Copy the following styles into your web site's CSS:

```CSS
#container {
    height: 200px;
    width: 600px;
}
.klavier-key {
    border: 1px solid black;
}
.klavier-black-key {
    background-color:  black;
}
.klavier-white-key {
    background-color:  white;
}
.klavier-white-key.klavier-selected-key {
    background-color:  #CCCCCC;
}
.klavier-black-key.klavier-selected-key {
    background-color:  #333333;
}
```

## Documentation

### API

Instantiate a new keyboard by calling:

```JS
$('#container').klavier();
```

You can also specify options:

```JS
$('#container').klavier({ startKey: 60, endKey: 83 });
```

The following table lists all available options and their default values:

| option name             | default value | description                                                                                           |
|-------------------------|---------------|-------------------------------------------------------------------------------------------------------|
| startKey                | 60            | The MIDI value of the first key (must be a white key)                                                 |
| endKey                  | 71            | The MIDI value of the last key (must be a white key)                                                  |
| selectionMode           | 'multiple'    | Specifies how many keys can be selected at one time (can be 'none', 'single' or 'multiple')           |
| cssPrefix               | 'klavier'     | The first part of the generated CSS classes for the keys (can be used to style instances differently) |
| zIndex                  | 999           | The `z-index` value of the white keys (black keys have `zIndex + 1`)                                  |
| onSelectedValuesChanged | *(not set)*   | A function used as callback when the selection has changed                                            |

You can set the selected keys providing an array of MIDI values:


```JS
$('#container').klavier('setSelectedValues', [60, 61]);
```

You can get the currently selected keys by calling:


```JS
var selectedKeys = $('#container').klavier('getSelectedValues');
```

You can finally destroy the keyboard by calling:


```JS
var selectedKeys = $('#container').klavier('destroy');
```

Please note, that all named calls to the `$.klavier` function are not chainable.

### Styling

Every key gets assigned following CSS classes by the plugin: `klavier-key`, `klavier-white-key` (for white keys), `klavier-black-key` (for black keys), where the first part corresponds to the `cssPrefix` you provided as options (defaults to `klavier`).

Please note that the jQuery.klavier plugin sets `position: relative` on the container element during initialization. However, you have to set an explicit `width` and `height` on the container or else the keyboard won't be visible. You also have to set at least some background colors and borders for the CSS classes `klavier-black-key` and `klavier-white-key` to distinguish the keys (see also the aforementioned examples).

## Examples

Have a look at the file *examples.html*.

## Release History

* **1.1.0** Support for CommonJS and AMD style module loading
* **1.0** Initial release

---

Copyright (c) 2014 Andreas Helmberger & Ulrich Kaiser
Licensed under the MIT License (MIT)

[min]: https://raw.github.com/learningmedia/jquery.klavier/master/dist/jquery.klavier.min.js
[max]: https://raw.github.com/learningmedia/jquery.klavier/master/dist/jquery.klavier.js
