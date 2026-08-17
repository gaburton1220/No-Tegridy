// NTSN — No-Tegridy Sports Network. Site interactions.

document.addEventListener('DOMContentLoaded', () => {
    duplicateTicker();
    initReveal();
    initSeasons();
    initGallery();
    initLightbox();
    initRoast();
});

/* Seamless infinite ticker — duplicate items once so the -50% loop is invisible. */
function duplicateTicker() {
    const track = document.getElementById('ticker');
    if (track) track.innerHTML += track.innerHTML;
}

/* Scroll-in reveal */
function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        els.forEach((e) => e.classList.add('in'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    els.forEach((e) => io.observe(e));
}

/* Season accordion (history page) */
function initSeasons() {
    document.querySelectorAll('[data-season-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.season');
            if (!item) return;
            const open = item.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });
}

/* Gallery filter chips */
function initGallery() {
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
                tile.classList.toggle('hidden', filter !== 'all' && !tags.includes(filter));
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

/* Roast generator (Isaac page) */
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
    "Records 35 transactions per season. Records exactly zero playoff wins.",
    "Changed his team name instead of his lineup habits. Bold strategy.",
    "Got the 1.01 and the league still isn't worried. Let that sink in.",
    "Rebranding won't save you when you're the one setting the lineup.",
    "New name, new number one pick, same guy who starts players on bye.",
    "Aaronning Away With It — from the responsibility, mostly."
];

function initRoast() {
    const btn = document.getElementById('roast-btn');
    const out = document.getElementById('roast-output');
    if (!btn || !out) return;

    const generate = () => {
        out.classList.remove('shake');
        void out.offsetWidth;
        out.textContent = ISAAC_ROASTS[Math.floor(Math.random() * ISAAC_ROASTS.length)];
        out.classList.add('shake');
    };

    btn.addEventListener('click', generate);
    setTimeout(generate, 500);
}
