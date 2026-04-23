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

  function getHashId(link) {
    var href = link.getAttribute('href') || '';
    if (href.charAt(0) !== '#') {
      return '';
    }

    try {
      return decodeURIComponent(href.slice(1));
    } catch (error) {
      return href.slice(1);
    }
  }

  function initDirectoryScrollSpy() {
    var directory = document.querySelector('[data-tools-directory]');
    if (!directory) {
      return null;
    }

    var links = Array.prototype.slice.call(directory.querySelectorAll('[data-tools-directory-link]'));
    var items = links.map(function (link) {
      var section = document.getElementById(getHashId(link));
      if (!section) {
        return null;
      }

      return {
        link: link,
        section: section
      };
    }).filter(Boolean);
    var activeLink = null;

    if (!items.length) {
      return null;
    }

    function setCurrent(link) {
      if (link === activeLink) {
        return;
      }

      activeLink = link;
      links.forEach(function (candidate) {
        var isCurrent = candidate === link;
        candidate.classList.toggle('is-current', isCurrent);
        if (isCurrent) {
          candidate.setAttribute('aria-current', 'location');
        } else {
          candidate.removeAttribute('aria-current');
        }
      });

      link.scrollIntoView({ block: 'nearest', inline: 'center' });
    }

    function updateCurrent() {
      var activationOffset = Math.min(window.innerHeight * 0.25, 160);
      var threshold = Math.max(0, directory.getBoundingClientRect().bottom) + activationOffset;
      var current = items[0];

      items.forEach(function (item) {
        if (!item.section.hidden && item.section.getBoundingClientRect().top <= threshold) {
          current = item;
        }
      });

      setCurrent(current.link);
    }

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setCurrent(link);
      });
    });

    window.addEventListener('scroll', updateCurrent, { passive: true });
    window.addEventListener('resize', updateCurrent);
    window.addEventListener('hashchange', updateCurrent);
    updateCurrent();

    return updateCurrent;
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
    var updateDirectoryCurrent = initDirectoryScrollSpy();

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

      if (updateDirectoryCurrent) {
        updateDirectoryCurrent();
      }
    }

    input.addEventListener('input', applyFilter);
    applyFilter();
  });
})();
