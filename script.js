document.querySelectorAll(".video[data-gif]").forEach(function (el) {
  var gifSrc = el.dataset.gif.trim();
  if (!gifSrc) return;

  var img = document.createElement("img");
  img.src = gifSrc;
  img.alt = el.dataset.alt || "Gameplay preview";
  img.loading = "lazy";

  el.appendChild(img);
});

var modal = document.getElementById("game-modal");
var modalIframe = document.getElementById("modal-iframe");
var modalTitle = document.getElementById("modal-title");
var modalDesc = document.getElementById("modal-description");
var modalTech = document.getElementById("modal-mechanics");

function renderMechanics(text) {
  if (!modalTech) return;
  modalTech.textContent = "";
  var items = text
    .split("|")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  if (items.length < 2) {
    modalTech.textContent = text.trim();
    return;
  }
  var ul = document.createElement("ul");
  items.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  modalTech.appendChild(ul);
}

function openModal(btn) {
  if (!modal || !modalIframe) return;

  var ytId = btn.dataset.yt || "";
  var title = btn.dataset.title || "";
  var desc = btn.dataset.description || "";
  var tech = btn.dataset.mechanics || "";

  modalIframe.src = ytId
    ? "https://www.youtube.com/embed/" +
      encodeURIComponent(ytId) +
      "?autoplay=1"
    : "";
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = desc;
  renderMechanics(tech);

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal || !modalIframe) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modalIframe.src = "";
}

document.querySelectorAll(".modal-trigger").forEach(function (card) {
  card.addEventListener("click", function () {
    openModal(card);
  });

  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(card);
    }
  });
});

document.querySelectorAll("[data-close]").forEach(function (el) {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal && modal.classList.contains("active")) {
    closeModal();
  }
});

var emailBtn = document.getElementById("email-btn");
if (emailBtn && navigator.clipboard) {
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
