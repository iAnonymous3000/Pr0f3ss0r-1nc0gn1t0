import * as params from '@params';

let fuse;
const resList = document.getElementById('searchResults');
const sInput = document.getElementById('searchInput');
let first;
let last;
let currentElem = null;
let resultsAvailable = false;

function fuseOptions() {
    const defaults = {
        distance: 100,
        threshold: 0.4,
        ignoreLocation: true,
        keys: [
            'title',
            'permalink',
            'summary',
            'content'
        ]
    };

    if (!params.fuseOpts) return defaults;

    return {
        isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
        includeScore: params.fuseOpts.includescore ?? false,
        includeMatches: params.fuseOpts.includematches ?? false,
        minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
        shouldSort: params.fuseOpts.shouldsort ?? true,
        findAllMatches: params.fuseOpts.findallmatches ?? false,
        keys: params.fuseOpts.keys ?? defaults.keys,
        location: params.fuseOpts.location ?? 0,
        threshold: params.fuseOpts.threshold ?? defaults.threshold,
        distance: params.fuseOpts.distance ?? defaults.distance,
        ignoreLocation: params.fuseOpts.ignorelocation ?? defaults.ignoreLocation
    };
}

function resultLimit() {
    const limit = Number(params.fuseOpts?.limit);
    return Number.isFinite(limit) && limit > 0 ? limit : undefined;
}

function clearResults() {
    resultsAvailable = false;
    first = null;
    last = null;
    currentElem = null;
    resList.replaceChildren();
}

function addResult(result, fragment) {
    const item = result.item || {};
    const title = item.title || '';
    const permalink = item.permalink || '#';

    const li = document.createElement('li');
    li.classList.add('post-entry');

    const header = document.createElement('header');
    header.classList.add('entry-header');
    header.append(document.createTextNode(`${title}\u00a0\u00bb`));

    const link = document.createElement('a');
    link.href = permalink;
    link.setAttribute('aria-label', title);

    li.append(header, link);
    fragment.append(li);
}

function renderResults(results) {
    if (results.length === 0) {
        clearResults();
        return;
    }

    const fragment = document.createDocumentFragment();
    results.forEach((result) => addResult(result, fragment));
    resList.replaceChildren(fragment);
    resultsAvailable = true;
    first = resList.firstElementChild;
    last = resList.lastElementChild;
}

function runSearch() {
    const query = sInput.value.trim();
    if (!fuse || !query) {
        clearResults();
        return;
    }

    const limit = resultLimit();
    const results = limit ? fuse.search(query, { limit }) : fuse.search(query);
    renderResults(results);
}

function loadSearchIndex() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status !== 200) return;

        const data = JSON.parse(xhr.responseText);
        if (data) fuse = new Fuse(data, fuseOptions());
    };
    xhr.open('GET', new URL('../index.json', window.location.href).toString());
    xhr.send();
}

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(function (element) {
        element.classList.remove('focus');
    });

    if (!ae) return;

    ae.focus();
    currentElem = ae;
    ae.parentElement?.classList.add('focus');
}

function reset() {
    clearResults();
    sInput.value = '';
    sInput.focus();
}

function bindKeyboard() {
    document.addEventListener('keydown', function (e) {
        const key = e.key;
        let ae = document.activeElement;
        const searchBox = document.getElementById('searchbox');
        const inbox = searchBox?.contains(ae);

        if (ae === sInput) {
            document.querySelectorAll('.focus').forEach(function (element) {
                element.classList.remove('focus');
            });
        } else if (currentElem) {
            ae = currentElem;
        }

        if (key === 'Escape' && inbox) {
            reset();
        } else if (!resultsAvailable || !inbox) {
            return;
        } else if (key === 'ArrowDown') {
            e.preventDefault();
            if (ae === sInput) {
                activeToggle(first?.lastElementChild);
            } else if (ae.parentElement !== last) {
                activeToggle(ae.parentElement?.nextElementSibling?.lastElementChild);
            }
        } else if (key === 'ArrowUp') {
            e.preventDefault();
            if (ae.parentElement === first) {
                activeToggle(sInput);
            } else if (ae !== sInput) {
                activeToggle(ae.parentElement?.previousElementSibling?.lastElementChild);
            }
        } else if (key === 'ArrowRight' && ae !== sInput) {
            ae.click();
        }
    });
}

if (resList && sInput) {
    window.addEventListener('load', loadSearchIndex);
    sInput.addEventListener('input', runSearch);
    sInput.addEventListener('search', function () {
        if (!this.value) reset();
    });
    bindKeyboard();
}
