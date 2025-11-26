/* sampie.js */

$(document).ready(function() {

    // 1. 【初期化の強制】すべての結果と解説エリアを、jQueryで強制的に非表示からスタート 
    $('.result-box').hide(); 

    // インライン結果 (選択肢結果) を削除する関数
    function clearInlineResults($group) {
        $group.find('.inline-result').remove();
    }

    // --- 選択肢ボタン (js-toggle-button) の処理 ---
    $('.js-toggle-button').on('click', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var targetSelector = $btn.data('target');
        if (!targetSelector) return;

        var $group = $btn.closest('.new-question-group');
        
        // 1. 同じグループ内の解説エリアを閉じる (前回の修正を維持)
        $group.find('.result-box[id^="hintArea"]').slideUp(220); 

        // 2. 🚨 修正: 既に結果（.inline-result）が表示されているかチェック
        var $existingResult = $btn.next('.inline-result');

        if ($existingResult.length) {
            // 既に表示されている場合：結果を閉じる
            $existingResult.slideUp(220, function() {
                $(this).remove();
            });
            // 他のボタンのアクティブ状態を解除（もしあれば）
            $group.find('.js-toggle-button').removeClass('active-result');
            
        } else {
            // 表示されていない場合：結果を開く準備
            
            // 3. 同じグループの他のインライン結果をすべて削除
            clearInlineResults($group);

            var $orig = $(targetSelector);
            if ($orig.length === 0) return;

            // 4. 結果エリアの内容を複製して、ボタンの直下にインライン表示する
            var $clone = $('<div class="inline-result"></div>').html($orig.html());
            $btn.after($clone);

            // 新しい結果をスライドダウン表示
            $clone.hide().slideDown(220);

            // 5. スムーズスクロール (新しい結果が開く位置へ)
            $('html, body').animate({
                scrollTop: $btn.offset().top - 20
            }, 220);
        }
    });

    // --- 🔑 解説ボタンの処理 --- (変更なし、結果を閉じる機能はそのまま)
    $('.js-hint-toggle').on('click', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var targetSelector = $btn.data('target-area');
        if (!targetSelector) return;

        var $target = $(targetSelector);
        if ($target.length === 0) return;

        var $group = $btn.closest('.new-question-group');
        
        // 1. 現在のグループ内の選択肢結果（.inline-result）を閉じる
        clearInlineResults($group);

        // 2. 目的の解説エリアの表示/非表示を切り替える (slideToggle)
        $target.slideToggle(220, function() {
            // 開いたときにスクロール
            if ($target.is(':visible')) {
                $('html, body').animate({
                    scrollTop: $btn.offset().top - 20
                }, 220);
            }
        });
    });

    // ページ上の他の場所をクリックしたとき、開いている結果を閉じる (変更なし)
    $(document).on('click', function(e) {
        var $t = $(e.target);
        // 結果やボタン、解説エリア内をクリックした場合は閉じない
        if ($t.closest('.js-toggle-button').length ||
            $t.closest('.js-hint-toggle').length ||
            $t.closest('.inline-result').length ||
            $t.closest('.result-box').length
        ) return;

        // 選択肢の結果（インライン）と解説エリア（result-box）を閉じる
        $('.inline-result').remove();
        $('.result-box').slideUp(220);
    });
});