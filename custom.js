// ========================================
// 性格診断テスト用のJavaScript
// ========================================

(function($) {
  'use strict';
  
  $(document).ready(function() {
    
    if ($('.personality-test').length) {
      
      // 質問データ
      const questions = [
        {
          question: '週末の過ごし方として、より魅力的なのは？',
          answers: [
            { text: '友人と大人数でワイワイ過ごす', type: 'social' },
            { text: '少人数の親しい友人とゆっくり過ごす', type: 'thoughtful' },
            { text: '一人で趣味や興味のあることに没頭する', type: 'creative' },
            { text: '新しい場所や活動に挑戦する', type: 'adventurous' }
          ]
        },
        {
          question: '新しいプロジェクトに取り組むとき、あなたは？',
          answers: [
            { text: '計画を立ててから着実に進める', type: 'analytical' },
            { text: 'まず行動してから調整していく', type: 'adventurous' },
            { text: 'チームで協力しながら進める', type: 'social' },
            { text: '独自のアイデアを形にすることを重視する', type: 'creative' }
          ]
        },
        {
          question: '困っている人を見かけたら？',
          answers: [
            { text: 'すぐに声をかけて助ける', type: 'social' },
            { text: '相手の気持ちを考えてから行動する', type: 'thoughtful' },
            { text: '効率的な解決方法を提案する', type: 'analytical' },
            { text: '創造的な解決策を考える', type: 'creative' }
          ]
        },
        {
          question: 'ストレスを感じたとき、どう対処する？',
          answers: [
            { text: '友人や家族に話を聞いてもらう', type: 'social' },
            { text: '一人で静かに考える時間を持つ', type: 'thoughtful' },
            { text: '運動や外出で気分転換する', type: 'adventurous' },
            { text: '趣味や創作活動に打ち込む', type: 'creative' }
          ]
        },
        {
          question: '意思決定をするとき、重視するのは？',
          answers: [
            { text: '論理的な分析とデータ', type: 'analytical' },
            { text: '直感と第一印象', type: 'adventurous' },
            { text: '周囲の人の意見や影響', type: 'social' },
            { text: '自分の価値観と信念', type: 'thoughtful' }
          ]
        },
        {
          question: '理想の休日の朝は？',
          answers: [
            { text: '予定を立てて効率的に過ごす', type: 'analytical' },
            { text: 'その日の気分で自由に決める', type: 'adventurous' },
            { text: 'ゆっくり起きて好きなことをする', type: 'creative' },
            { text: '大切な人とゆったり過ごす', type: 'thoughtful' }
          ]
        },
        {
          question: 'グループでの役割として自然なのは？',
          answers: [
            { text: 'リーダーとして全体をまとめる', type: 'social' },
            { text: 'アイデアを出す創造的な役割', type: 'creative' },
            { text: '計画を立てて管理する役割', type: 'analytical' },
            { text: 'メンバーをサポートする役割', type: 'thoughtful' }
          ]
        },
        {
          question: '新しいことを学ぶとき、好きな方法は？',
          answers: [
            { text: '体験しながら学ぶ', type: 'adventurous' },
            { text: 'じっくり本や資料を読む', type: 'analytical' },
            { text: '人から教わりながら学ぶ', type: 'social' },
            { text: '自分なりの方法を見つける', type: 'creative' }
          ]
        }
      ];
      
      // 診断結果タイプ
      const resultTypes = {
        social: {
          name: '社交的リーダータイプ',
          icon: '🌟',
          description: 'あなたは人との交流を大切にし、周囲を明るくする存在です。コミュニケーション能力が高く、チームをまとめる力があります。人の気持ちを理解し、調和を重んじるあなたは、多くの人から信頼されています。リーダーシップを発揮しながら、みんなが楽しめる環境を作ることが得意です。'
        },
        thoughtful: {
          name: '思慮深いサポータータイプ',
          icon: '🌸',
          description: 'あなたは深く考え、慎重に行動する思慮深い性格です。相手の立場に立って物事を考えることができ、細やかな気配りができます。落ち着いた雰囲気で周囲を安心させ、信頼できるアドバイスを提供します。人の話をじっくり聞き、適切なサポートができる貴重な存在です。'
        },
        creative: {
          name: '独創的クリエイタータイプ',
          icon: '🎨',
          description: 'あなたは豊かな想像力と独自の視点を持つクリエイティブな人です。既存の枠にとらわれず、新しいアイデアを生み出すことが得意です。芸術的センスがあり、物事を美しく表現する才能があります。自分らしさを大切にし、オリジナリティあふれる作品や提案で周囲を驚かせます。'
        },
        analytical: {
          name: '論理的アナリストタイプ',
          icon: '🧠',
          description: 'あなたは物事を論理的に分析し、効率的な解決策を見つける能力に優れています。計画性があり、目標に向かって着実に進むことができます。データや事実を重視し、客観的な判断ができます。問題解決能力が高く、複雑な状況でも冷静に対処できる頼れる存在です。'
        },
        adventurous: {
          name: '冒険的チャレンジャータイプ',
          icon: '🚀',
          description: 'あなたは新しいことに挑戦することを恐れない冒険心あふれる性格です。変化を楽しみ、未知の世界に飛び込む勇気があります。行動力があり、直感を信じて素早く決断できます。失敗を恐れず、そこから学ぶ姿勢を持っています。エネルギッシュで、周囲に刺激を与える存在です。'
        }
      };
      
      let currentQuestion = 0;
      let answers = {
        social: 0,
        thoughtful: 0,
        creative: 0,
        analytical: 0,
        adventurous: 0
      };
      
      // スタートボタン
      $('.test-start-btn').on('click', function() {
        $('.test-start').removeClass('active');
        $('.test-questions').addClass('active');
        showQuestion(0);
      });
      
      // 質問を表示
      function showQuestion(index) {
        const question = questions[index];
        $('.question-title').text(question.question);
        
        $('.answer-btn').each(function(i) {
          $(this).text(question.answers[i].text);
          $(this).attr('data-type', question.answers[i].type);
        });
        
        // 進捗バー更新
        const progress = ((index + 1) / questions.length) * 100;
        $('.progress-fill').css('width', progress + '%');
        $('.current-question').text(index + 1);
      }
      
      // 回答ボタンクリック
      $('.answer-btn').on('click', function() {
        const type = $(this).attr('data-type');
        answers[type]++;
        
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
          // 次の質問へ
          $('.question-card').fadeOut(200, function() {
            showQuestion(currentQuestion);
            $(this).fadeIn(200);
          });
        } else {
          // 結果表示
          showResult();
        }
      });
      
      // 結果を表示
      function showResult() {
        // 最も多いタイプを判定
        let maxType = 'social';
        let maxCount = 0;
        
        for (let type in answers) {
          if (answers[type] > maxCount) {
            maxCount = answers[type];
            maxType = type;
          }
        }
        
        const result = resultTypes[maxType];
        
        $('.result-icon').text(result.icon);
        $('.result-type-name').text(result.name);
        $('.result-text').text(result.description);
        
        // 画面切り替え
        $('.test-questions').removeClass('active');
        $('.test-result').addClass('active');
        
        // LINEシェアボタンにデータを設定
        const shareText = `性格診断の結果: ${result.name}\n\n${result.description.substring(0, 50)}...`;
        $('.share-line-btn').attr('data-share-text', shareText);
      }
      
      // LINEシェアボタン
      $('.share-line-btn').on('click', function() {
        const shareText = $(this).attr('data-share-text');
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(shareText);
        const lineUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`;
        window.open(lineUrl, '_blank');
      });
      
      // もう一度診断ボタン
      $('.retry-btn').on('click', function() {
        // リセット
        currentQuestion = 0;
        answers = {
          social: 0,
          thoughtful: 0,
          creative: 0,
          analytical: 0,
          adventurous: 0
        };
        
        $('.test-result').removeClass('active');
        $('.test-start').addClass('active');
      });
      
      console.log('性格診断テストが読み込まれました');
    }
    
  });
  
})(jQuery);