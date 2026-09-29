document.querySelectorAll(".video[data-yt]").forEach(function (el) {
  var id = el.dataset.yt.trim();
  if (!id) return;
  var f = document.createElement("iframe");
  f.src = "https://www.youtube.com/embed/" + encodeURIComponent(id);
  f.title = el.dataset.title;
  f.loading = "lazy";
  f.referrerPolicy = "strict-origin-when-cross-origin";
  f.allowFullscreen = true;
  f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture";
  el.appendChild(f);
});

var emailBtn = document.getElementById("email-btn");
if (emailBtn) {
  emailBtn.addEventListener("click", function () {
    navigator.clipboard.writeText("vinayvvv992@gmail.com").then(function () {
      var e = document.getElementById("email-label");
      if (!e) return;
      var o = e.textContent;
      e.textContent = "Copied!";
      setTimeout(function () {
        e.textContent = o;
      }, 1200);
    });
  });
}