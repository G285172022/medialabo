// 答え
let kotae = Math.floor(Math.random() * 10) + 1;
console.log('答え（デバッグ用）: ' + kotae);

// 入力回数（予想回数）
let kaisu = 0;

// 予想を4回実行する
// 将来以下の hantei(); の4回の呼び出しを全て削除する
// 代わりにここでは，ボタンを押したら hantei() を呼び出すイベント処理をする

let button = document.querySelector('#answer');
button.addEventListener('click', hantei);



// ボタンを押した後の処理をする関数 hantei() の定義
function hantei() {
    // 将来ここでは 4 ではなくテキストボックスに指定された数値を yoso に代入する

    let i = document.querySelector('input[name="yoso"]');
    let yoso = parseInt(i.value);

    kaisu += 1;
    //console.log(kaisu + '回目の予想: ' + yoso)
    let spanK = document.querySelector('span#kaisu');
    let spanA = document.querySelector('span#answer');
    spanK.textContent = kaisu;
    spanA.textContent = yoso;

    // 課題3-1: 正解判定する
    // kotae と yoso が一致するかどうか調べて結果を出力
    // 課題3-1における出力先はコンソール
    let pResult = document.querySelector('p#result');
    if (kaisu < 4) {
        if (kotae === yoso) {
            //console.log('正解です．おめでとう!');
            pResult.textContent = '正解です．おめでとう!';
            kaisu += 3;
        } else if (kotae > yoso) {
            //console.log('まちがい．答えはもっと大きいですよ');
            if (kaisu == 3) {
                pResult.textContent = '答えは ' + kotae + ' でした．すでにゲームは終わっています';
            } else {
                pResult.textContent = 'まちがい．答えはもっと大きいですよ';
            }
        } else {
            //console.log('まちがい．答えはもっと小さいですよ');
            if (kaisu == 3) {
                pResult.textContent = '答えは ' + kotae + ' でした．すでにゲームは終わっています';
            } else {
                pResult.textContent = 'まちがい．答えはもっと小さいですよ';
            }
        }
    } else {
        //console.log('答えは ' + kotae + ' でした．すでにゲームは終わっています');
        pResult.textContent = '答えは ' + kotae + ' でした．すでにゲームは終わっています';
    }
}