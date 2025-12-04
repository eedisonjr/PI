// home.js
(function () {
    // segurança para garantir que o DOM esteja carregado
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    function init() {
        const sel = '.home-reveal';
        const items = document.querySelectorAll(sel);
        if (!items || items.length === 0) return;

        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // se quiser que a animação ocorra apenas uma vez:
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        items.forEach(el => obs.observe(el));
    }
})();
