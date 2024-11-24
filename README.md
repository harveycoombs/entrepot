# Introducing Opt

### What can Opt do?
Opt provides an environment for developing concise & effective JavaScript. Besides simplifying DOM manipulation, Opt also provides tools for parsing, calculations & HTTP requests.

## Examples

### Adding classes to DOM elements
```js
// Native JavaScript
var box = document.querySelector("#box");
box.classList.add("classX", "classY", "classZ");

// Opt JavaScript
var box = DOM.select("#box");
box.apply("classX classY classZ");
```

### Attaching & detaching Event listeners
```js
// Native JavaScript
var item = document.querySelector("div.item");

item.addEventListener("click", function () {
  console.log("I was clicked!");
});

// Opt JavaScript
var item = DOM.select("div.item");

item.listen("click", function () {
  console.log("I was clicked!");
});
```