// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 丸いアイコンボタンをすべて取得
    const buttons = document.querySelectorAll('.circle');
    
    // ボタンの aria-label と、移動先のセクション（クラス名）を紐付け
    const targetMap = {
        'About': '.about-me',
        'Skills': '.skills',
        'Works': '.works',
        'Life': '.life',
        'Contact': '.contact'
    };

    // 各ボタンにクリック時の処理を追加
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // クリックされたボタンのラベル（Aboutなど）を取得
            const label = button.getAttribute('aria-label');
            const targetSelector = targetMap[label];
            
            if (targetSelector) {
                const targetElement = document.querySelector(targetSelector);
                if (targetElement) {
                    // 対象のセクションまでスムーズにスクロール
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
// --- トップへ戻るボタンの処理 ---
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // 1. スクロールした時の処理（表示・非表示の切り替え）
        window.addEventListener('scroll', function() {
            // 上から300px以上スクロールしたら 'show' クラスを追加して表示
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // 2. ボタンをクリックした時の処理（一番上へ戻る）
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // フワッとスクロールさせる
            });
        });
    }
});
// --- スクロールに合わせてフワッと表示させる処理 ---
document.addEventListener('DOMContentLoaded', function() {
    // アニメーションさせたい要素をすべて取得
    const fadeElements = document.querySelectorAll('.fade-in-section');

    // 画面内に入ったかどうかを監視する仕組み（Intersection Observer）
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            // 要素が画面内に入ったら
            if (entry.isIntersecting) {
                // 'is-visible' クラスを追加してアニメーションを実行
                entry.target.classList.add('is-visible');
                
                // 🌟一度表示されたら、その後は表示したままにする（監視を解除）
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 画面の下から 15% ほど見えたタイミングで発火させる
        threshold: 0.15
    });

    // 取得した要素を一つずつ監視対象に設定
    fadeElements.forEach(function(el) {
        observer.observe(el);
    });
});
// --- スクロールに合わせてフワッと表示させる処理（何度でも繰り返し） ---
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // 🌟 画面内に入ったら 'is-visible' をつけて表示する
                entry.target.classList.add('is-visible');
            } else {
                // 🌟 画面から完全に出たら 'is-visible' を外して元の透明な状態に戻す
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        // 画面の下から 15% ほど見えたタイミングで発火させる
        threshold: 0.15
    });

    fadeElements.forEach(function(el) {
        observer.observe(el);
    });
});