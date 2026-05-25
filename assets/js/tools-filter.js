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

  function isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  }

  function isFullyVisibleInScroller(element) {
    var parent = element.parentElement;
    while (parent && parent !== document.body) {
      var style = window.getComputedStyle(parent);
      if (/(auto|scroll)/.test(style.overflowX + style.overflowY)) {
        var parentRect = parent.getBoundingClientRect();
        var elementRect = element.getBoundingClientRect();
        return elementRect.left >= parentRect.left &&
          elementRect.right <= parentRect.right &&
          elementRect.top >= parentRect.top &&
          elementRect.bottom <= parentRect.bottom;
      }
      parent = parent.parentElement;
    }

    var rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
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

  function isTypingTarget(element) {
    if (!element) {
      return false;
    }

    if (element.isContentEditable) {
      return true;
    }

    var tagName = (element.tagName || '').toLowerCase();
    return tagName === 'input' || tagName === 'textarea' || tagName === 'select';
  }

  function initDirectoryScrollSpy() {
    var directoryLinks = Array.prototype.slice.call(document.querySelectorAll('[data-tools-directory-link]'));
    if (!directoryLinks.length) {
      return null;
    }

    var linkItems = directoryLinks.map(function (link) {
      var id = getHashId(link);
      var section = document.getElementById(id);
      if (!section) {
        return null;
      }

      return {
        id: id,
        link: link,
        section: section
      };
    }).filter(Boolean);
    var sections = [];
    var sectionById = new Map();
    var knownIds = new Set();
    var activeId = null;
    var queued = false;
    var suppressScrollspyUntil = 0;
    var intentId = '';

    if (!linkItems.length) {
      return null;
    }

    linkItems.forEach(function (item) {
      if (knownIds.has(item.id)) {
        return;
      }

      knownIds.add(item.id);
      sections.push(item);
      sectionById.set(item.id, item);
    });

    sections.sort(function (left, right) {
      if (left.section === right.section) {
        return 0;
      }

      var relation = left.section.compareDocumentPosition(right.section);
      if (relation & Node.DOCUMENT_POSITION_FOLLOWING) {
        return -1;
      }
      if (relation & Node.DOCUMENT_POSITION_PRECEDING) {
        return 1;
      }

      return 0;
    });

    function revealIfNeeded(id) {
      linkItems.forEach(function (item) {
        if (item.id !== id || !isVisible(item.link) || isFullyVisibleInScroller(item.link)) {
          return;
        }

        item.link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      });
    }

    function hasId(id) {
      return !!id && sectionById.has(id);
    }

    function setCurrent(id, options) {
      options = options || {};
      if (id === activeId && !options.reveal) {
        return;
      }

      activeId = id;
      linkItems.forEach(function (candidate) {
        var isCurrent = candidate.id === id;
        candidate.link.classList.toggle('is-current', isCurrent);
        if (isCurrent) {
          candidate.link.setAttribute('aria-current', 'location');
        } else {
          candidate.link.removeAttribute('aria-current');
        }
      });

      if (options.reveal) {
        revealIfNeeded(id);
      }

      document.dispatchEvent(new CustomEvent('tools:category-change', {
        detail: {
          id: id,
          label: (sectionById.get(id) && sectionById.get(id).link.textContent || '').trim(),
          source: options.source || 'scroll'
        }
      }));
    }

    function updateCurrent() {
      var intentItem = intentId ? sectionById.get(intentId) : null;
      if (intentItem && !intentItem.section.hidden) {
        var intentRect = intentItem.section.getBoundingClientRect();
        var intentVisible = intentRect.bottom > 0 && intentRect.top < window.innerHeight;
        if (intentVisible) {
          setCurrent(intentId, { source: 'intent' });
          return;
        }
      }

      if (performance.now() < suppressScrollspyUntil) {
        return;
      }

      var activationOffset = Math.min(window.innerHeight * 0.25, 160);
      var threshold = activationOffset;

      var current = sections[0];

      sections.forEach(function (item) {
        if (!item.section.hidden && item.section.getBoundingClientRect().top <= threshold) {
          current = item;
        }
      });

      setCurrent(current.id, { source: 'scroll' });
    }

    function setIntent(id, source) {
      if (!hasId(id)) {
        intentId = '';
        return false;
      }

      intentId = id;
      setCurrent(id, { reveal: true, source: source || 'intent' });
      suppressScrollspyUntil = performance.now() + 450;
      return true;
    }

    function scheduleUpdate() {
      if (queued) {
        return;
      }

      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        updateCurrent();
      });
    }

    linkItems.forEach(function (item) {
      item.link.addEventListener('click', function () {
        setIntent(item.id, 'click');
      });
    });

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    updateCurrent();

    return {
      scheduleUpdate: scheduleUpdate,
      getActiveId: function () {
        return activeId;
      },
      hasId: hasId,
      setIntent: setIntent,
      jumpBy: function (offset) {
        if (!sections.length || !offset) {
          return;
        }

        var currentIndex = sections.findIndex(function (item) {
          return item.id === activeId;
        });
        if (currentIndex < 0) {
          currentIndex = 0;
        }

        var targetIndex = currentIndex + offset;
        if (targetIndex < 0) {
          targetIndex = 0;
        }
        if (targetIndex >= sections.length) {
          targetIndex = sections.length - 1;
        }

        var target = sections[targetIndex];
        if (!target || target.section.hidden) {
          return;
        }

        setIntent(target.id, 'jump');
        target.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
  }

  function getCardMeta(card) {
    return {
      title: normalize(card.getAttribute('data-tool-title') || ''),
      category: normalize(card.getAttribute('data-tool-category') || ''),
      description: normalize(card.getAttribute('data-tool-description') || ''),
      label: normalize(card.getAttribute('data-tool-label') || ''),
      text: normalize(card.textContent || '')
    };
  }

  function scoreCard(meta, terms) {
    return terms.reduce(function (score, term) {
      var termScore = 0;

      if (meta.title.indexOf(term) === 0) {
        termScore += 60;
      } else if (meta.title.indexOf(term) !== -1) {
        termScore += 40;
      }

      if (meta.category.indexOf(term) !== -1) {
        termScore += 28;
      }

      if (meta.label.indexOf(term) !== -1) {
        termScore += 20;
      }

      if (meta.description.indexOf(term) !== -1) {
        termScore += 14;
      }

      if (meta.text.indexOf(term) !== -1) {
        termScore += 4;
      }

      if (!termScore) {
        return -1;
      }

      if (score < 0) {
        return score;
      }

      return score + termScore;
    }, 0);
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
    var suggestionButtons = Array.prototype.slice.call(document.querySelectorAll('[data-tools-suggestion], [data-tools-jump-id]'));
    var sortMode = document.querySelector('[data-tools-sort-mode]');
    var sortStatus = document.querySelector('[data-tools-sort-status]');
    var rootCategoryPicker = document.querySelector('.tools-category-picker-root');
    var activeState = document.querySelector('[data-tools-active-state]');
    var activeSearch = document.querySelector('[data-tools-active-search]');
    var activeCategory = document.querySelector('[data-tools-active-category]');
    var clearSearchButton = document.querySelector('[data-tools-clear-search]');
    var cardMeta = new Map();
    var directorySpy = initDirectoryScrollSpy();
    var categoryStateQueued = false;
    var categoryInteracted = false;
    var categoryGateElements = Array.prototype.slice.call(document.querySelectorAll('.tools-intro, .tools-start'));

    function getHashCategoryId() {
      var hash = window.location.hash || '';
      if (hash.charAt(0) !== '#') {
        return '';
      }

      try {
        return decodeURIComponent(hash.slice(1));
      } catch (error) {
        return hash.slice(1);
      }
    }

    if (directorySpy && directorySpy.hasId && directorySpy.setIntent) {
      var initialHashId = getHashCategoryId();
      if (initialHashId && directorySpy.hasId(initialHashId)) {
        categoryInteracted = true;
        directorySpy.setIntent(initialHashId, 'hash');
      }
    }

    function setElementHidden(element, hidden) {
      if (!element) {
        return;
      }

      element.hidden = hidden;
    }

    function updateActiveStateBar() {
      if (!activeState) {
        return;
      }

      var searchQuery = input.value.trim();
      var categoryId = directorySpy && directorySpy.getActiveId ? directorySpy.getActiveId() : '';
      var showCategory = !searchQuery && !!categoryId && (categoryInteracted || hasPassedCategoryGate());

      if (activeSearch) {
        activeSearch.textContent = searchQuery ? 'Search: ' + searchQuery : '';
        setElementHidden(activeSearch, !searchQuery);
      }

      if (activeCategory) {
        var link = showCategory ? document.querySelector('[data-tools-directory-link][href="#' + categoryId + '"]') : null;
        var linkLabel = link ? link.querySelector('span') : null;
        var label = linkLabel ? (linkLabel.textContent || '').replace(/\s+/g, ' ').trim() : '';
        activeCategory.textContent = label ? 'Category: ' + label : '';
        setElementHidden(activeCategory, !showCategory || !label);
      }

      setElementHidden(clearSearchButton, !searchQuery);
      setElementHidden(activeState, !searchQuery && !showCategory);
    }

    function hasPassedCategoryGate() {
      if (!categoryGateElements.length) {
        return true;
      }

      var gateBottom = categoryGateElements.reduce(function (maxBottom, element) {
        if (!isVisible(element)) {
          return maxBottom;
        }

        var rect = element.getBoundingClientRect();
        var bottom = rect.bottom + window.scrollY;
        return Math.max(maxBottom, bottom);
      }, 0);
      var scrollThreshold = Math.max(0, gateBottom - Math.min(window.innerHeight * 0.2, 140));

      return window.scrollY >= scrollThreshold;
    }

    function syncToHashIntent(options) {
      options = options || {};
      if (!directorySpy || !directorySpy.hasId || !directorySpy.setIntent) {
        return false;
      }

      var hashId = getHashCategoryId();
      if (!hashId || !directorySpy.hasId(hashId)) {
        return false;
      }

      directorySpy.setIntent(hashId, options.source || 'hash');
      var targetSection = document.getElementById(hashId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: options.smooth ? 'smooth' : 'auto',
          block: 'start'
        });
      }

      categoryInteracted = true;
      return true;
    }

    function clearSearchAndSync(options) {
      input.value = '';
      input.focus();
      applyFilter();
      syncToHashIntent(options || { source: 'clear', smooth: false });
    }

    function scheduleActiveStateUpdate() {
      if (categoryStateQueued) {
        return;
      }

      categoryStateQueued = true;
      window.requestAnimationFrame(function () {
        categoryStateQueued = false;
        updateActiveStateBar();
      });
    }

    cards.forEach(function (card) {
      cardMeta.set(card, getCardMeta(card));
    });

    function applyFilter() {
      var terms = normalize(input.value).split(' ').filter(Boolean);
      var isFiltering = terms.length > 0;
      var activeSort = sortMode ? sortMode.value : 'relevance';
      var visibleCount = 0;
      var groupScores = new Map();
      var visibleCards = [];

      document.body.classList.toggle('tools-filter-active', isFiltering);

      cards.forEach(function (card) {
        var score = isFiltering ? scoreCard(cardMeta.get(card), terms) : 0;
        var matches = !isFiltering || score >= 0;

        card.hidden = !matches;
        card.style.order = '';
        if (matches) {
          visibleCount += 1;
          visibleCards.push(card);
        }

        var group = card.closest('[data-tool-group]');
        if (group && matches) {
          groupScores.set(group, Math.max(groupScores.get(group) || 0, score));
        }
      });

      if (isFiltering && activeSort === 'relevance') {
        visibleCards.forEach(function (card) {
          var score = scoreCard(cardMeta.get(card), terms);
          card.style.order = String(10000 - score);
        });
      } else if (isFiltering && activeSort === 'az') {
        visibleCards.sort(function (left, right) {
          return cardMeta.get(left).title.localeCompare(cardMeta.get(right).title);
        });
        visibleCards.forEach(function (card, index) {
          card.style.order = String(index + 1);
        });
      }

      groups.forEach(function (group) {
        var groupCards = Array.prototype.slice.call(group.querySelectorAll('[data-tool-card]'));
        var groupVisible = groupCards.some(function (card) {
          return !card.hidden;
        });

        group.hidden = !groupVisible;
        group.style.order = isFiltering && groupVisible && activeSort === 'relevance' ? String(10000 - (groupScores.get(group) || 0)) : '';
      });

      if (count) {
        count.textContent = countLabel(visibleCount);
      }

      if (empty) {
        empty.hidden = visibleCount !== 0;
      }
      if (sortStatus) {
        if (!isFiltering) {
          sortStatus.textContent = 'Browse order';
        } else if (activeSort === 'az') {
          sortStatus.textContent = 'Results sorted within categories (A-Z)';
        } else {
          sortStatus.textContent = 'Results sorted by relevance';
        }
      }

      if (directorySpy && directorySpy.scheduleUpdate) {
        directorySpy.scheduleUpdate();
      }

      updateActiveStateBar();
    }

    input.addEventListener('input', applyFilter);
    if (sortMode) {
      sortMode.addEventListener('change', applyFilter);
    }
    suggestionButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var jumpId = button.getAttribute('data-tools-jump-id') || '';
        if (jumpId && directorySpy && directorySpy.hasId && directorySpy.hasId(jumpId)) {
          var encodedJumpId = encodeURIComponent(jumpId);
          if (window.location.hash !== '#' + encodedJumpId) {
            window.location.hash = encodedJumpId;
          } else {
            syncToHashIntent({ source: 'shortcut', smooth: true });
          }
          return;
        }

        input.value = button.getAttribute('data-tools-suggestion') || '';
        input.focus();
        applyFilter();
      });
    });
    if (rootCategoryPicker) {
      rootCategoryPicker.addEventListener('click', function (event) {
        var link = event.target.closest('a[href^="#"]');
        if (!link) {
          return;
        }

        rootCategoryPicker.open = false;
      });
    }
    if (clearSearchButton) {
      clearSearchButton.addEventListener('click', function () {
        clearSearchAndSync({ source: 'clear', smooth: false });
      });
    }
    document.addEventListener('tools:category-change', function (event) {
      if (event && event.detail && event.detail.source === 'click') {
        categoryInteracted = true;
      }

      updateActiveStateBar();
    });
    window.addEventListener('hashchange', function () {
      var hashId = getHashCategoryId();
      var handled = !!(directorySpy && directorySpy.setIntent && directorySpy.setIntent(hashId, 'hash'));
      categoryInteracted = handled || !!window.location.hash;
      scheduleActiveStateUpdate();
    });
    window.addEventListener('scroll', scheduleActiveStateUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveStateUpdate);
    document.addEventListener('keydown', function (event) {
      if (!input) {
        return;
      }

      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTypingTarget(event.target)) {
        event.preventDefault();
        input.focus();
        input.select();
        return;
      }

      if (event.key === 'Escape' && document.activeElement === input && input.value) {
        event.preventDefault();
        clearSearchAndSync({ source: 'escape', smooth: false });
        return;
      }

    });

    applyFilter();
  });
})();
