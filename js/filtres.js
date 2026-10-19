/* ============================================================
   T'NATURE · Filtres et maître-détail
   1. Activités : filtre des adresses par temps de route
   2. Activités : cliquer une adresse échange la galerie de droite
   ============================================================ */
(function (window, document) {
  'use strict';

  /* ── 1. Filtre par temps de route ── */
  document.addEventListener('click', function (e) {
    var bouton = e.target.closest('[data-filtre-distance]');
    if (!bouton) return;
    var groupe = bouton.closest('[data-groupe-filtres="distance"]');
    if (!groupe) return;
    var liste = groupe.parentNode.querySelector('[data-liste-lieux]');
    if (!liste) return;

    var max = bouton.getAttribute('data-filtre-distance');   // '15' | '30' | 'tout'
    Array.prototype.forEach.call(
      groupe.querySelectorAll('[data-filtre-distance]'),
      function (b) { b.setAttribute('aria-pressed', b === bouton ? 'true' : 'false'); }
    );

    var visibles = 0;
    Array.prototype.forEach.call(liste.children, function (lieu) {
      var min = parseInt(lieu.getAttribute('data-minutes'), 10);
      var ok = max === 'tout' || (!isNaN(min) && min <= parseInt(max, 10));
      lieu.hidden = !ok;
      if (ok) visibles++;
    });

    var info = groupe.querySelector('[data-compte-lieux]');
    if (info) {
      info.textContent = visibles === 0
        ? 'Aucun lieu dans ce rayon'
        : visibles + (visibles > 1 ? ' lieux' : ' lieu');
    }
  });

  /* La section « maître-détail » vivait ici : cliquer une adresse échangeait
     le carrousel de droite. Elle est partie avec les photos des lieux, le
     19/10/2026. Il ne reste que le filtre par temps de route. */

})(window, document);
