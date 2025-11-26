/* sampie.js */

$(document).ready(function() {

    // 1. 【初期化の強制】すべての結果と解説エリアを、jQueryで強制的に非表示からスタート 
    //    HTMLから hidden クラスを削除した解説エリアも、これで非表示から始まります。
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
        
        // 1. 同じグループの他のインライン結果を削除し、開いている解説エリアを閉じる
        clearInlineResults($group);
        $group.find('.result-box[id^="hintArea"]').slideUp(220); 

        var $orig = $(targetSelector);
        if ($orig.length === 0) return;

        // 2. 結果エリアの内容を複製して、ボタンの直下にインライン表示する
        var $clone = $('<div class="inline-result"></div>').html($orig.html());
        $btn.after($clone);

        // 3. スムーズスクロール
        $('html, body').animate({
            scrollTop: $btn.offset().top - 20
        }, 220);
    });

    // --- 🔑 解説ボタンの最終修正 (js-hint-toggle) ---
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
        //    これにより、非表示状態（.hide()）から確実に開きます。
        $target.slideToggle(220, function() {
            // 開いたときにスクロール
            if ($target.is(':visible')) {
                $('html, body').animate({
                    scrollTop: $btn.offset().top - 20
                }, 220);
            }
        });
    });

    // ページ上の他の場所をクリックしたとき、開いている結果を閉じる
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