document.addEventListener("DOMContentLoaded", function() {
  var el = document.querySelector(".post-content");
  if (el) {
    renderMathInElement(el, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ],
      throwOnError: false
    });
  }
});
