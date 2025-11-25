$(document).ready(function() {
    // 1. 初期設定: すべての結果ボックスを非表示にします
    $('.result-box').hide(); 

    // --- 汎用的な選択肢ボタン (js-toggle-button) の処理 (変更なし) ---
    $('.js-toggle-button').on('click', function() {
        var targetID = $(this).data('target'); 

        // クリックされた要素以外（選択肢の結果も解説エリアも含む）をすべて非表示
        $('.result-box').not(targetID).fadeOut(200);
        
        // 自分の結果は、表示・非表示を切り替える
        $(targetID).fadeToggle(400); 
    });

    // --- 🔑 解説ボタンの新しい汎用処理（この部分が個別IDから汎用処理に変わります） ---
    // 解説ボタンには HTML 側で新しく .js-hint-toggle クラスが必要です
    $('.js-hint-toggle').on('click', function() {
        var currentQ = $(this).data('question');     // 例: 'q1', 'q2', 'q3'
        var targetArea = $(this).data('target-area'); // 例: '#hintAreaA', '#hintAreaE'

        // 1. クリックされたボタンと同じ質問属性を持つ解説エリアのみをトグル表示
        $(targetArea).slideToggle(300);
        
        // 2. 他の質問のすべての結果/解説エリアを非表示にする
        //    (currentQと異なる data-question を持つ要素をすべて非表示)
        $('.result-box').not('[data-question="' + currentQ + '"]').fadeOut(200);

        // 3. 同じ質問の選択肢の結果エリアを非表示にする
        //    (同じ質問内の解説エリア以外を非表示)
        $('.result-box[data-question="' + currentQ + '"]').not(targetArea).fadeOut(200);
    });
});