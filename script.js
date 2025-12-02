$(function() {
    // 心理テストのデータ（質問、選択肢、配点）
    const quizData = [
        {
            question: "Q1. 久しぶりに会う友人が、あなたの知らない新しいバッグを持っていました。最初に感じることは？",
            choices: [
                { text: "A. 「それ、どこで買ったの？私も欲しい！」と、同じものを手に入れる方法を尋ねる。", score: 2 },
                { text: "B. 「新しいものを持ってるんだね、素敵だね」と、友人の変化を素直に褒める。", score: 1 },
                { text: "C. 「今のパートナーが買ってくれたのかな？羨ましいな」と、その背景を想像する。", score: 3 }
            ]
        },
        {
            question: "Q2. パートナーからのメッセージに返信をせずに、一晩寝てしまいました。翌朝、どんな気持ちになりますか？",
            choices: [
                { text: "A. 「ごめんね、すぐに返信するね」と、申し訳ない気持ちでいっぱいになる。", score: 1 },
                { text: "B. 「まあ、急ぎじゃないから大丈夫だろう」と、特に気にしない。", score: 2 },
                { text: "C. 「返信しない間、何をしていたか聞かれたらどうしよう」と、少しドキッとする。", score: 3 }
            ]
        },
        {
            question: "Q3. 興味のある趣味や習い事を見つけました。誰と一緒に始めたいですか？",
            choices: [
                { text: "A. パートナーと二人で始めるのが最も楽しい。", score: 1 },
                { text: "B. 新しい人間関係を広げるため、一人で参加する。", score: 3 },
                { text: "C. 既にその趣味を持っている友人を誘って参加する。", score: 2 }
            ]
        },
        {
            question: "Q4. 街中で魅力的な人を見かけました。あなたはすぐに目を逸らしますか？",
            choices: [
                { text: "A. すぐに目を逸らす。パートナーに悪いと思う。", score: 1 },
                { text: "B. 魅力を感じたことは認めるが、すぐに興味を失う。", score: 2 },
                { text: "C. 相手が視線を送ってくるか、少しの間見てしまう。", score: 3 }
            ]
        },
        {
            question: "Q5. パートナーから「最近、私（僕）のこと、本当に好き？」と聞かれました。あなたの返答は？",
            choices: [
                { text: "A. 「もちろん！世界で一番大好きだよ」と、迷わずストレートに伝える。", score: 1 },
                { text: "B. 「どうしたの？急に。もちろん好きだよ」と、少し考えながら答える。", score: 2 },
                { text: "C. 言葉より行動で示すべきと思い、軽く冗談で返す。", score: 3 }
            ]
        }
    ];

    let userScores = new Array(quizData.length).fill(null); 

    // 質問と選択肢を画面に表示する
    function renderQuiz() {
        const $questions = $('#questions');
        $questions.empty(); 

        quizData.forEach((data, index) => {
            let choicesHtml = '';

            data.choices.forEach((choice) => {
                const isSelected = userScores[index] === choice.score ? ' selected' : '';
                choicesHtml += `
                    <button class="choice-button${isSelected}" data-q="${index}" data-score="${choice.score}">
                        ${choice.text}
                    </button>
                `;
            });

            const questionBlock = `
                <div class="question-block" id="q-${index}">
                    <h3>${data.question}</h3>
                    <div class="choices">
                        ${choicesHtml}
                    </div>
                </div>
            `;
            $questions.append(questionBlock);
        });
    }

    // 選択肢がクリックされた時の処理
    $(document).on('click', '.choice-button', function() {
        const $this = $(this);
        const qIndex = parseInt($this.data('q'));
        const score = parseInt($this.data('score'));

        $(`#q-${qIndex} .choice-button`).removeClass('selected');
        $this.addClass('selected');
        userScores[qIndex] = score;
        
        checkCompletion();
    });

    // 全ての質問に回答したかチェックし、完了していたら結果を表示
    function checkCompletion() {
        const allAnswered = userScores.every(score => score !== null);

        if (allAnswered) {
            calculateResult();
        }
    }

    // 結果を計算し、表示する
    function calculateResult() {
        const totalScore = userScores.reduce((sum, score) => sum + score, 0);
        let resultTitle = '';
        let resultText = '';
        
        // 判定ロジック: 5問 x 1点～3点 = 合計点 5点～15点
        if (totalScore >= 13) {
            resultTitle = '【高い】スリルと刺激を求める自由人タイプ';
            resultText = `あなたは非常に好奇心旺盛で、新しい刺激やロマンスに強く惹かれる傾向があります。現在の関係に慣れてしまうと、外の世界に意識が向きがち。関係を長続きさせるには、二人で新しい挑戦をすることが重要です。`;
        } else if (totalScore >= 9) {
            resultTitle = '【中程度】心のすきまが不安なバランスタイプ';
            resultText = `基本的にはパートナーを大切にしていますが、心のすきまや満たされない欲求があると、別の場所で解消しようとする可能性があります。関係が円満であれば浮気の心配は少ないですが、寂しさが危険信号です。`;
        } else { // 8点以下
            resultTitle = '【非常に低い】安定と安心を求める誠実タイプ';
            resultText = `現在のパートナーとの安定した関係に心から満足しており、他に目を向けることはまずないでしょう。パートナーへの愛情と信頼が厚く、誠実さが最も高いタイプです。安心して二人の関係を育んでいけるでしょう。`;
        }

        // 結果を画面に反映
        $('#questions').addClass('hidden');
        $('#result h2').text('診断結果: ' + resultTitle);
        $('#result-text').text(resultText);
        $('#result').removeClass('hidden');
    }

    // リセットボタンの処理
    $('#reset-button').on('click', function() {
        userScores = new Array(quizData.length).fill(null);
        renderQuiz();
        $('#result').addClass('hidden');
        $('#questions').removeClass('hidden');
    });

    // ページロード時に質問を表示
    renderQuiz();
});