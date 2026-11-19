// ── Counter animation ────────────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target, parseInt(e.target.dataset.count));
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.4 });
    counters.forEach(c => obs.observe(c));
}

// ── Donate pill selection ─────────────────────────────────────────────
document.querySelectorAll('.donate-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.donate-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        const amountField = document.getElementById('donate-amount');
        if (amountField && pill.dataset.amount) {
            amountField.value = pill.dataset.amount;
        }
    });
});

// ── Lightbox ──────────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    document.querySelectorAll('[data-lightbox]').forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.lightbox || item.querySelector('img')?.src;
            if (src) {
                lightbox.querySelector('img').src = src;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ── Scroll-in reveal ─────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.service-card, .news-card, .gallery-item, .team-card');
if (revealEls.length) {
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                }, i * 60);
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        revealObs.observe(el);
    });
}

// ── Nav close on outside click ─────────────────────────────────────
document.addEventListener('click', e => {
    if (document.body.classList.contains('nav-open')) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.nav-toggle')) {
            document.body.classList.remove('nav-open');
        }
    }
});
if(document.body.classList.contains('page-gallery')){const key=new URLSearchParams(location.search).get('type')||'';document.querySelectorAll('a[href^="?type="]').forEach(a=>{const on=(new URL(a.href).searchParams.get('type')||'')===key;a.classList.toggle('btn-green',on);a.style.background=on?'var(--green-mid)':'var(--ivory)';a.style.color=on?'white':'var(--ink-mid)';});document.querySelector('.gallery-grid').hidden=key==='video';document.querySelector('#video-empty').hidden=key!=='video';}
