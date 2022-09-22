<img src="http://harveycoombs.com/titania/assets/titania-logo-alt.png" alt="The Titania Logo" width="250"/>

---

Titania is a lightweight, yet powerful JavaScript library.

## Frequently Asked Questions
### What does Titania do?
Titania provides a platform to develop concise & effective JavaScript. It also provides a plethora of utilities & tools for parsing, calculations etc.

### Why should I use Titania over other libraries?
Titania includes various useful tools & routines for convenience. Other libraries do not include said features & are often provably slower than Titania.
Additionally, Titania aims to limit the deprecation of features, to ensure the stability of those who include the latest version in their projects.

### I'm sold. How do I use/learn Titania
You can download Titania, at any time, from [this repository](https://github.com/harveycoombs/titania/), or from [titania-js.org](http://titania-js.org/).
Alternatively, you can include the following script tag in your project.
`<script src="http://titania-js.org/releases/latest/titania.js" type="text/javascript" defer></script>`

For learning Titania, please see the [Documentation](http://titania-js.org/docs).

## Examples

##Adding classes to DOM elements
`
//Native JavaScript
var box = document.querySelector("#box");

box.addEventListener("click", () => {
  box.classList.add("classX", "classY", "classZ");
});

//Titania JavaScript
var box = dom.select("#box");
 
box.listen("click", () => {
  box.apply("classX classY classZ");
});`
