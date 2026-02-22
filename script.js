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