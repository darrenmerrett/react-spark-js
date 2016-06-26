"use strict";

React.createElement(
  "div",
  null,
  React.createElement("script", { src: "bower_components/requirejs/require.js" }),
  React.createElement("script", { src: "lib/index.js" }),
  React.createElement(
    "script",
    null,
    function () {
      return require(['bootstrap']);
    },
    "();"
  )
);