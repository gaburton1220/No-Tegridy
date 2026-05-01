// No-Tegridy — interactions for the redesigned site.

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initSeasonAccordion();
    initGalleryFilter();
    initLightbox();
    initRoastMachine();
});

/* Mobile nav */
function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

/* Past-seasons accordion */
function initSeasonAccordion() {
    document.querySelectorAll('[data-season-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.season');
            if (!item) return;
            item.classList.toggle('open');
            const expanded = item.classList.contains('open');
            btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
    });
}

/* Gallery filter chips */
function initGalleryFilter() {
    const chips = document.querySelectorAll('[data-filter]');
    const tiles = document.querySelectorAll('.tile[data-tags]');
    if (!chips.length) return;
    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            chips.forEach((c) => c.classList.remove('active'));
            chip.classList.add('active');
            const filter = chip.dataset.filter;
            tiles.forEach((tile) => {
                const tags = tile.dataset.tags.split(/\s+/);
                const show = filter === 'all' || tags.includes(filter);
                tile.classList.toggle('is-hidden', !show);
            });
        });
    });
}

/* Image lightbox */
function initLightbox() {
    const modal = document.getElementById('lightbox');
    if (!modal) return;
    const img = modal.querySelector('img');
    const close = modal.querySelector('.modal-close');

    document.querySelectorAll('.tile[data-src]').forEach((tile) => {
        tile.addEventListener('click', () => {
            img.src = tile.dataset.src;
            img.alt = tile.dataset.alt || '';
            modal.classList.add('open');
        });
    });

    const dismiss = () => modal.classList.remove('open');
    close?.addEventListener('click', dismiss);
    modal.addEventListener('click', (e) => { if (e.target === modal) dismiss(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') dismiss(); });
}

/* Roast machine (Isaac page) */
const ISAAC_ROASTS = [
    "35 roster moves and still couldn't make playoffs. The math ain't mathing.",
    "Drafts like he's blindfolded with a Magic 8-Ball as his only consultant.",
    "Isaac 'Isuck' Puzey: turning championship dreams into 5-9 nightmares since 2021.",
    "His fantasy IQ is lower than his season win total — and that's barely possible.",
    "Breaking: Isaac discovers the waiver wire exists. Refuses to use it correctly.",
    "Draft strategy: pick the first name that sounds cool. Ignore everything else.",
    "Makes Tyler's 4-10 toilet bowl look respectable, and that's saying something.",
    "Predictions about as accurate as a stormtrooper's aim.",
    "Living proof that enthusiasm doesn't equal competence.",
    "Lineup decisions brought to you by chaos and questionable judgment.",
    "Puts the L in loser and the disappointing in disappointing season.",
    "Turns trade proposals into an art form — abstract, confusing, and unloved.",
    "Championship odds: the same as his good decisions — non-existent.",
    "Drafts like he's actively trying to lose. Spoiler: he's not.",
    "The human embodiment of a fantasy participation trophy.",
    "Team-building strategy: hope, prayer, and complete ignorance of stats.",
    "Makes missing playoffs look easier than breathing.",
    "A masterclass in consistent mediocrity.",
    "Turns first-round picks into benchwarming disasters since forever.",
    "Records 35 transactions per season. Records exactly zero playoff wins."
];

function initRoastMachine() {
    const btn = document.getElementById('roast-btn');
    const out = document.getElementById('roast-output');
    if (!btn || !out) return;

    const generate = () => {
        out.classList.remove('shake');
        const choice = ISAAC_ROASTS[Math.floor(Math.random() * ISAAC_ROASTS.length)];
        // Force reflow for animation restart
        void out.offsetWidth;
        out.textContent = choice;
        out.classList.add('shake');
    };

    btn.addEventListener('click', generate);
    setTimeout(generate, 600);
}
