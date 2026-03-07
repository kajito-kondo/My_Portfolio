document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. スクロールアニメーション（画面に入ったらフワッと表示 / 方向判定付き） ---
    // Intersection Observer APIを使って、要素が画面内に入ったかを監視します
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 要素が15%画面に入ったらアニメーションを開始する
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            
            // 🌟 画面に入ってきたとき
            if (entry.isIntersecting) {
                // ダウン用とアップ用のクラスを一旦リセット
                entry.target.classList.remove('fade-down', 'fade-up');
                
                // 🌟 スクロールの向き（上からか下からか）を判定
                // セクションのトップ位置が、画面の半分より下なら「下から（ダウン）」、上なら「上から（アップ）」と判定
                const rect = entry.target.getBoundingClientRect();
                const isComingFromBottom = rect.top > window.innerHeight / 2;

                if (isComingFromBottom) {
                    // 下から湧き上がる動き
                    entry.target.classList.add('fade-down');
                } else {
                    // 上から降ってくる動き
                    entry.target.classList.add('fade-up');
                }

                // 少し遅延させてからフェードイン（初期transformが適用された直後に動かすため）
                requestAnimationFrame(() => {
                    entry.target.classList.add('is-visible');
                });
                
            } else {
                // 🌟 画面から完全に外れたとき
                // 🌟 ここが重要：クラスを削除して、再度画面に入ったときにアニメーションするようにリセット
                entry.target.classList.remove('is-visible', 'fade-down', 'fade-up');
            }
        });
    }, observerOptions);

    // .fade-in-section がついているすべてのセクションを監視対象にする
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => {
        observer.observe(el);
    });


    // --- 2. トップへ戻るボタンの制御 ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // 300px以上下にスクロールしたらボタンを表示
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        // ボタンを押したら一番上まで滑らかにスクロール
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- 3. 上部の丸いアイコンメニューのスクロール移動 ---
    const circleButtons = document.querySelectorAll('.circle');
    circleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // ボタンの下の文字（ABOUTなど）を取得
            const label = button.querySelector('.circle-label').innerText.toLowerCase();
            
            // HTMLのクラス名に合わせて少し変換
            let targetClass = label;
            if (label === 'about') targetClass = 'about-me';
            
            // 対象のセクションを探して、そこまで滑らかにスクロール
            const targetSection = document.querySelector('.' + targetClass);
            if (targetSection) {
                const yOffset = -50; // ヘッダーなどの余白分、少し上で止まるように調整
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    });

});