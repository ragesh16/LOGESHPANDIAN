/* ============================================================
   PROPERTY DATA
   To add a new property: copy an object in the "properties" array
   and fill in your own details. To add a placeholder "coming soon"
   slot instead, add an object with placeholder set to true.
   Images: drop new photos into /assets and reference them below.
   ============================================================ */

var properties = [
  {
    id: "kmc-veeralaxmi-nagar",
    featured: true,
    tag: "Featured",
    title: "Premium Duplex House \u2014 KMC Veeralaxmi Nagar",
    location: "Veerapandi Town Panchayat, Theni",
    heroImage: "assets/property1-gate-car.jpg",
    gallery: [
      "assets/property1-gate-car.jpg",
      "assets/property1-exterior-wide.jpg",
      "assets/property1-entrance.jpg",
      "assets/property1-porch.jpg",
      "assets/property1-pooja.jpg",
    ],
    stats: [
      { num: "1,770", label: "Sq. Ft." },
      { num: "East", label: "Facing" },
    ],
    price: "\u20B997 Lakhs",
    priceNote: "Negotiable at \u20B990 Lakhs and above \u00B7 Land \u20B97 Lakhs / Cent",
    priceBlocks: [
      { num: "\u20B997L", lbl: "Sale price" },
      { num: "\u20B990L+", lbl: "Negotiable from" },
      { num: "\u20B97L", lbl: "Per cent (land)" },
    ],
    features: [
      "Rainwater harvesting tank \u2013 8\u00D76",
      "Water sump \u2013 8\u00D78",
      "Sewage sump \u2013 10\u00D710",
      "Stylish interior & exterior",
      "Furnished modular kitchen",
      "Built-in cupboards",
      "Vengai wood work",
      "Good bore water source",
      "Compound wall",
      "External staircase to upper floor",
      "Duplex staircase in garden room",
    ],
    community: [
      "DTCP approved layout",
      "Gated community, association formed",
      "Day & night security with CCTV",
      "33 families currently residing",
      "4 ongoing construction sites",
    ],
    addressLines: [
      "KMC Veeralaxmi Nagar, Eastern Mill Back Side,",
      "Bodi Main Road, Poothipuram Road,",
      "Veerapandi Town Panchayat, Theni.",
    ],
    suitability: "Suitable for premium family living & investment.",
  },

  // Placeholder slots: swap "placeholder: true" items for real
  // listings as they're confirmed. Each renders as a quiet
  // "coming soon" card until then.
  { placeholder: true, label: "Next Property", note: "Details to be added" },
  { placeholder: true, label: "Land Parcel", note: "Details to be added" },
  { placeholder: true, label: "Reserved", note: "Details to be added" },
];

/* ============================================================
   RENDER
   ============================================================ */

var grid = document.getElementById("propertyGrid");

function currencyStat(stat) {
  return (
    '<div>' +
    '<span class="card__stat-num">' + stat.num + '</span>' +
    '<span class="card__stat-label">' + stat.label + '</span>' +
    '</div>'
  );
}

function renderFeaturedCard(p) {
  var statsHtml = p.stats.map(currencyStat).join("");
  return (
    '<article class="card card--featured" data-id="' + p.id + '" tabindex="0" role="button" aria-label="View details for ' + p.title + '">' +
      '<div class="card__media">' +
        '<span class="card__tag">' + p.tag + '</span>' +
        '<img class="card__img" src="' + p.heroImage + '" alt="' + p.title + '" loading="lazy">' +
      '</div>' +
      '<div class="card__info">' +
        '<p class="card__location">' + p.location + '</p>' +
        '<h3 class="card__title">' + p.title + '</h3>' +
        '<div class="card__stats">' + statsHtml + '</div>' +
        '<p class="card__price">' + p.price + '</p>' +
        '<p class="card__price-note">' + p.priceNote + '</p>' +
        '<span class="card__link">View full details &amp; gallery</span>' +
      '</div>' +
    '</article>'
  );
}

function renderPlaceholderCard(p) {
  return (
    '<div class="card card--placeholder">' +
      '<div>' +
        '<span class="placeholder__icon">+</span>' +
        '<p class="placeholder__text">' + p.label + '<br>' + p.note + '</p>' +
      '</div>' +
    '</div>'
  );
}

if (grid) {
  grid.innerHTML = properties
    .map(function (p) {
      return p.placeholder ? renderPlaceholderCard(p) : renderFeaturedCard(p);
    })
    .join("");
}

/* ============================================================
   MODAL
   ============================================================ */

var modal = document.getElementById("propertyModal");
var modalBody = document.getElementById("modalBody");
var lastFocused = null;

function listItems(arr) {
  return arr.map(function (item) { return '<li>' + item + '</li>'; }).join("");
}

function openModal(propertyId) {
  var p = properties.find(function (x) { return x.id === propertyId; });
  if (!p) return;

  var galleryHtml = p.gallery
    .map(function (src) { return '<img src="' + src + '" alt="' + p.title + ' photo" loading="lazy">'; })
    .join("");

  var priceBlocksHtml = p.priceBlocks
    .map(function (b) {
      return '<div class="modal__price-item"><span class="num">' + b.num + '</span><span class="lbl">' + b.lbl + '</span></div>';
    })
    .join("");

  modalBody.innerHTML =
    '<div class="modal__gallery">' + galleryHtml + '</div>' +
    '<div class="modal__content">' +
      '<p class="modal__eyebrow">' + p.location + '</p>' +
      '<h2 class="modal__title" id="modalTitle">' + p.title + '</h2>' +
      '<div class="modal__price-block">' + priceBlocksHtml + '</div>' +
      '<div class="modal__section">' +
        '<h4>Key Features</h4>' +
        '<ul class="modal__list">' + listItems(p.features) + '</ul>' +
      '</div>' +
      '<div class="modal__section">' +
        '<h4>Gated Community</h4>' +
        '<ul class="modal__list">' + listItems(p.community) + '</ul>' +
      '</div>' +
      '<div class="modal__section">' +
        '<h4>Location</h4>' +
        '<address class="modal__address">' + p.addressLines.join("<br>") + '</address>' +
      '</div>' +
      '<p class="modal__price-note" style="margin-bottom:20px;">' + p.suitability + '</p>' +
      '<a class="modal__cta" href="tel:+916379046447">Call to Enquire \u2014 +91 63790 46447</a>' +
    '</div>';

  lastFocused = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal__close").focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

if (grid) {
  grid.addEventListener("click", function (e) {
    var card = e.target.closest(".card--featured");
    if (card) openModal(card.dataset.id);
  });

  grid.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("card--featured")) {
      e.preventDefault();
      openModal(e.target.dataset.id);
    }
  });
}

if (modal) {
  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

/* ============================================================
   MISC
   ============================================================ */

var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
