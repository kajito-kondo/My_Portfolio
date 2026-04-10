document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. スクロールアニメーション（画面に入ったらフワッと表示 / 方向判定付き） ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                entry.target.classList.remove('fade-down', 'fade-up');
                
                const rect = entry.target.getBoundingClientRect();
                const isComingFromBottom = rect.top > window.innerHeight / 2;

                if (isComingFromBottom) {
                    entry.target.classList.add('fade-down');
                } else {
                    entry.target.classList.add('fade-up');
                }

                requestAnimationFrame(() => {
                    entry.target.classList.add('is-visible');
                });
                
            } else {
                entry.target.classList.remove('is-visible', 'fade-down', 'fade-up');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- 2. トップへ戻るボタンの制御 ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 3. 上部の丸いアイコンメニューのスクロール移動 ---
    const circleButtons = document.querySelectorAll('.circle');
    circleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const label = button.querySelector('.circle-label').innerText.toLowerCase();
            
            let targetClass = label;
            if (label === 'about') targetClass = 'about-me';
            if (label === 'demo') targetClass = 'demo-works'; // 🌟 DEMOWORKSの紐づけ
            
            const targetSection = document.querySelector('.' + targetClass);
            if (targetSection) {
                const yOffset = -50; 
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    });

});