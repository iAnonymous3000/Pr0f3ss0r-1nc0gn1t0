(function () {
  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }

    callback();
  }

  function countLabel(count) {
    return count === 1 ? '1 tool' : count + ' tools';
  }

  function normalize(value) {
    return value.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  onReady(function () {
    var input = document.querySelector('[data-tools-filter-input]');
    if (!input) {
      return;
    }

    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-tool-card]'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-tool-group]'));
    var count = document.querySelector('[data-tools-filter-count]');
    var empty = document.querySelector('[data-tools-filter-empty]');
    var cardText = new Map();

    cards.forEach(function (card) {
      cardText.set(card, normalize(card.textContent || ''));
    });

    function applyFilter() {
      var terms = normalize(input.value).split(' ').filter(Boolean);
      var isFiltering = terms.length > 0;
      var visibleCount = 0;

      document.body.classList.toggle('tools-filter-active', isFiltering);

      cards.forEach(function (card) {
        var text = cardText.get(card) || '';
        var matches = terms.every(function (term) {
          return text.indexOf(term) !== -1;
        });

        card.hidden = !matches;
        if (matches) {
          visibleCount += 1;
        }
      });

      groups.forEach(function (group) {
        var groupCards = Array.prototype.slice.call(group.querySelectorAll('[data-tool-card]'));
        group.hidden = !groupCards.some(function (card) {
          return !card.hidden;
        });
      });

      if (count) {
        count.textContent = countLabel(visibleCount);
      }

      if (empty) {
        empty.hidden = visibleCount !== 0;
      }
    }

    input.addEventListener('input', applyFilter);
    applyFilter();
  });
})();
