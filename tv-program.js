let data = {
    "list": {
        "g1": [
            {
                "id": "2022030428673",
                "event_id": "28673",
                "start_time": "2022-03-04T04:35:00+09:00",
                "end_time": "2022-03-04T04:40:00+09:00",
                "area": {
                    "id": "130",
                    "name": "東京"
                },
                "service": {
                    "id": "g1",
                    "name": "ＮＨＫ総合１",
                    "logo_s": {
                        "url": "//www.nhk.or.jp/common/img/media/gtv-100x50.png",
                        "width": "100",
                        "height": "50"
                    },
                    "logo_m": {
                        "url": "//www.nhk.or.jp/common/img/media/gtv-200x100.png",
                        "width": "200",
                        "height": "100"
                    },
                    "logo_l": {
                        "url": "//www.nhk.or.jp/common/img/media/gtv-200x200.png",
                        "width": "200",
                        "height": "200"
                    }
                },
                "title": "みんなのうた「ごっつぉさま」／「超変身！ミネラルフォーマーズ」",
                "subtitle": "「ごっつぉさま」うた：須貝智郎／「超変身！ミネラルフォーマーズ」うた：鬼龍院翔ｆｒｏｍゴールデンボンバー",
                "content": "「ごっつぉさま」うた：須貝智郎／「超変身！ミネラルフォーマーズ」うた：鬼龍院翔ｆｒｏｍゴールデンボンバー",
                "act": "",
                "genres": [
                    "0409",
                    "0700",
                    "0504"
                ]
            },
            {
                "id": "2022030427069",
                "event_id": "27069",
                "start_time": "2022-03-04T23:05:00+09:00",
                "end_time": "2022-03-04T23:10:00+09:00",
                "area": {
                    "id": "130",
                    "name": "東京"
                },
                "service": {
                    "id": "g1",
                    "name": "ＮＨＫ総合１",
                    "logo_s": {
                        "url": "//www.nhk.or.jp/common/img/media/gtv-100x50.png",
                        "width": "100",
                        "height": "50"
                    },
                    "logo_m": {
                        "url": "//www.nhk.or.jp/common/img/media/gtv-200x100.png",
                        "width": "200",
                        "height": "100"
                    },
                    "logo_l": {
                        "url": "//www.nhk.or.jp/common/img/media/gtv-200x200.png",
                        "width": "200",
                        "height": "200"
                    }
                },
                "title": "パラスポーツ×アニメ「アニ×パラ」▽パラアルペンスキーテーマ曲江口寿史×ＡＣＣ",
                "subtitle": "パラスポーツの魅力をアニメで伝える番組。高速滑走に挑む精神力が試されるパラアルペンスキーを描く。キャラ原案：江口寿史／曲：Ａｗｅｓｏｍｅ　Ｃｉｔｙ　Ｃｌｕｂ",
                "content": "パラスポーツの魅力をアニメで伝えるプロジェクトの第１３弾。圧倒的なスピードに挑む「パラアルペンスキー」の世界を江口寿史原案の魅力的なキャラクターで描く。平昌パラリンピック金メダリストの村岡桃佳選手への取材から生まれた主人公・桃は、スピードへの恐怖を克服していく。その壁を越えた先にあるものとは…　テーマ曲　♪「Ｏｎ　Ｙｏｕｒ　Ｍａｒｋ」はＡｗｅｓｏｍｅ　Ｃｉｔｙ　Ｃｌｕｂが手掛けた。",
                "act": "【声】松本まりか，【出演】Ａｗｅｓｏｍｅ　Ｃｉｔｙ　Ｃｌｕｂ，【監督】西村一彦，【脚本】加納新太，【原案】江口寿史",
                "genres": [
                    "0700"
                ]
            }
        ]
    }
};

/////////////////// 課題3-2 はここから書き始めよう
/*console.log(data);
for (const tvPrgObj of data.list.g1) {
    console.log('開始時刻: ' + tvPrgObj.start_time);
    console.log('終了時刻: ' + tvPrgObj.end_time);
    console.log('チャンネル: ' + tvPrgObj.service.name);
    console.log('タイトル: ' + tvPrgObj.title);
    console.log('サブタイトル: ' + tvPrgObj.subtitle);
    console.log('番組説明: ' + tvPrgObj.content);
    console.log('出演者: ' + tvPrgObj.act);
}*/
let result = document.querySelector('div#result');
let button = document.querySelector('#search');


button.addEventListener('click', searchButtonClicked);
function searchButtonClicked() {
    if (result.hasChildNodes()) {
        while (result.firstChild) {
            result.removeChild(result.firstChild);
        }
    }
    let cerrorMsg = document.querySelector('p#cerror');
    cerrorMsg.textContent = '';
    let cerror = false;
    let gerror = false;
    let channel = document.querySelectorAll('input[name="service"]')
    if (channel[0].checked || channel[1].checked) {
        for (let ch of channel) {
            if (ch.checked) {
                console.log(ch.id);
            }
        }
    } else {
        //console.log('cerror');
        cerror = true;
        cerrorMsg.textContent = '検索するチャンネルは1つ以上選択してください';

    }
    let genre = document.querySelector('select#genre')
    let idx = genre.selectedIndex;
    let gnr = genre.querySelectorAll('option');
    let g = gnr.item(idx);
    if (g.getAttribute('value') !== '') {
        console.log(g.getAttribute('value'));
    } else {
        //console.log('gerror');
        gerror = true;
    }
    if (!gerror && !cerror) {
        showSearchResult();
    }

}
function showSearchResult() {
    let kekka = document.createElement('h3');
    kekka.textContent = '検索結果は' + data.list.g1.length + '件 ';
    result.insertAdjacentElement('beforeend', kekka);
    let i = 1;
    for (let tvPrgObj of data.list.g1) {
        let h2 = document.createElement('h2');
        h2.textContent = '検索結果' + i + '件目';
        result.insertAdjacentElement('beforeend', h2);

        let table = document.createElement('table');
        let colgroup = document.createElement('colgroup');
        let colClass = document.createElement('col');
        colClass.classList.add('colname');
        let colSpan = document.createElement('col');
        colSpan.span = '7';
        colgroup.insertAdjacentElement('beforeend', colClass);
        colgroup.insertAdjacentElement('beforeend', colSpan);
        table.insertAdjacentElement('beforeend', colgroup);

        let tbody = document.createElement('tbody');

        let tr1 = document.createElement('tr');
        tr1.classList.add('top');
        let td11 = document.createElement('td');
        let td12 = document.createElement('td');
        td11.textContent = '開始時刻';
        let year = tvPrgObj.start_time.slice(0, 4);
        let month = tvPrgObj.start_time.slice(5, 7);
        let day = tvPrgObj.start_time.slice(8, 10);
        let time = tvPrgObj.start_time.slice(11, 19);
        td12.textContent = year + '年' + month + '月' + day + '日 ' + time;
        tr1.insertAdjacentElement('beforeend', td11);
        tr1.insertAdjacentElement('beforeend', td12);
        table.insertAdjacentElement('beforeend', tr1);

        let tr2 = document.createElement('tr');
        let td21 = document.createElement('td');
        let td22 = document.createElement('td');
        td21.textContent = '終了時刻';
        year = tvPrgObj.end_time.slice(0, 4);
        month = tvPrgObj.end_time.slice(5, 7);
        day = tvPrgObj.end_time.slice(8, 10);
        time = tvPrgObj.end_time.slice(11, 19);
        td22.textContent = year + '年' + month + '月' + day + '日 ' + time;
        tr2.insertAdjacentElement('beforeend', td21);
        tr2.insertAdjacentElement('beforeend', td22);
        table.insertAdjacentElement('beforeend', tr2);

        let tr3 = document.createElement('tr');
        let td31 = document.createElement('td');
        let td32 = document.createElement('td');
        td31.textContent = 'チャンネル';
        td32.textContent = tvPrgObj.service.name;
        tr3.insertAdjacentElement('beforeend', td31);
        tr3.insertAdjacentElement('beforeend', td32);
        table.insertAdjacentElement('beforeend', tr3);

        if (tvPrgObj.title !== '') {
            let tr4 = document.createElement('tr');
            let td41 = document.createElement('td');
            let td42 = document.createElement('td');
            td41.textContent = 'タイトル';
            td42.textContent = tvPrgObj.title;
            tr4.insertAdjacentElement('beforeend', td41);
            tr4.insertAdjacentElement('beforeend', td42);
            table.insertAdjacentElement('beforeend', tr4);
        }

        if (tvPrgObj.subtitle !== '') {
            let tr5 = document.createElement('tr');
            let td51 = document.createElement('td');
            let td52 = document.createElement('td');
            td51.textContent = 'サブタイトル';
            td52.textContent = tvPrgObj.subtitle;
            tr5.insertAdjacentElement('beforeend', td51);
            tr5.insertAdjacentElement('beforeend', td52);
            table.insertAdjacentElement('beforeend', tr5);
        }

        if (tvPrgObj.content !== '') {
            let tr6 = document.createElement('tr');
            let td61 = document.createElement('td');
            let td62 = document.createElement('td');
            td61.textContent = '番組説明';
            td62.textContent = tvPrgObj.content;
            tr6.insertAdjacentElement('beforeend', td61);
            tr6.insertAdjacentElement('beforeend', td62);
            table.insertAdjacentElement('beforeend', tr6);
        }

        if (tvPrgObj.act !== '') {
            let tr7 = document.createElement('tr');
            let td71 = document.createElement('td');
            let td72 = document.createElement('td');
            td71.textContent = '出演者';
            td72.textContent = tvPrgObj.act;
            tr7.insertAdjacentElement('beforeend', td71);
            tr7.insertAdjacentElement('beforeend', td72);
            table.insertAdjacentElement('beforeend', tr7);
        }

        result.insertAdjacentElement('beforeend', table);

        i++;
    }
}