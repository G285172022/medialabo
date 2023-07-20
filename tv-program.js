let result = document.querySelector('div#result');
let button = document.querySelector('#search');
button.addEventListener('click', searchButtonClicked);

let g1url;
let e1url;
let g1data;
let e1data;

let g1 = false;
let e1 = false;
let genreID;
let isTwice = false;

function searchButtonClicked() {
    if (result.hasChildNodes()) {
        while (result.firstChild) {
            result.removeChild(result.firstChild);
        }
    }

    let cErrorMsg = document.querySelector('p#cError');
    cErrorMsg.textContent = '';
    let cError = false;
    let gError = false;
    g1 = false;
    e1 = false;
    isTwice = false;

    g1data = undefined;
    e1data = undefined;

    let channel = document.querySelectorAll('input[name="service"]');
    if (channel[0].checked || channel[1].checked) {
        if (channel[0].checked) {
            g1 = true;
        }
        if (channel[1].checked) {
            e1 = true;
        }
    } else {
        //console.log('cError');
        cError = true;
        cErrorMsg.textContent = '検索するチャンネルは1つ以上選択してください';

    }

    let genre = document.querySelector('select#genre')
    let idx = genre.selectedIndex;
    let gnr = genre.querySelectorAll('option');
    let g = gnr.item(idx);
    if (g.getAttribute('value') !== '') {
        genreID = g.getAttribute('value');
    } else {
        //console.log('gError');
        gError = true;
    }
    if (!gError && !cError) {
        sendRequest();
    }
}

function sendRequest() {
    if (g1) {
        g1url = 'https://www.nishita-lab.org/web-contents/jsons/nhk/g1-' + genreID + '-j.json'
        axios.get(g1url)
            .then(showResult)
            .catch(showError)
            .then(finish);
    }
    if (e1) {
        e1url = 'https://www.nishita-lab.org/web-contents/jsons/nhk/e1-' + genreID + '-j.json'
        axios.get(e1url)
            .then(showResult)
            .catch(showError)
            .then(finish)
    }
}

function showResult(resp) {
    let data = resp.data;

    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    if (data.list !== null) {
        if ('g1' in data.list) {
            g1data = data;
            console.log('g1');
        }
        if ('e1' in data.list) {
            e1data = data;
            console.log('e1');
        }
    }
    if (g1 === e1) {
        if (isTwice) {
            if (g1data === undefined) {
                g1 = false;
            }
            if (e1data === undefined) {
                e1 = false;
            }
            showSearchResult();
        }
        isTwice = true;
    } else{
        if (g1data === undefined) {
            g1 = false;
        }
        if (e1data === undefined) {
            e1 = false;
        }
        showSearchResult();
    }
}

function showError(err) {
    console.log(err);
}

function finish() {
    console.log('End transmission.');
}

function showSearchResult() {
    let resultCount = document.createElement('h3');
    resultCount.textContent = '検索結果は' + ((g1 ? g1data.list.g1.length : 0) + (e1 ? e1data.list.e1.length : 0)) + '件';
    result.insertAdjacentElement('beforeend', resultCount);
    let i = 1;
    if (g1) {
        let h1 = document.createElement('h1');
        h1.textContent = 'NHK総合1';
        h1.classList.add('ch');
        result.insertAdjacentElement('beforeend', h1);
        for (let tvPrgObj of g1data.list.g1) {
            let h2 = document.createElement('h2');
            h2.textContent = '検索結果' + i + '件目';
            result.insertAdjacentElement('beforeend', h2);

            let table = document.createElement('table');
            let colgroup = document.createElement('colgroup');
            let colClass = document.createElement('col');
            colClass.classList.add('rowNames');
            let colSpan = document.createElement('col');
            colSpan.span = '7';
            colgroup.insertAdjacentElement('beforeend', colClass);
            colgroup.insertAdjacentElement('beforeend', colSpan);
            table.insertAdjacentElement('beforeend', colgroup);

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
    if (e1) {
        let h1 = document.createElement('h1');
        h1.textContent = 'NHKEテレ1';
        h1.classList.add('ch');
        result.insertAdjacentElement('beforeend', h1);
        for (let tvPrgObj of e1data.list.e1) {
            let h2 = document.createElement('h2');
            h2.textContent = '検索結果' + i + '件目';
            result.insertAdjacentElement('beforeend', h2);

            let table = document.createElement('table');
            let colgroup = document.createElement('colgroup');
            let colClass = document.createElement('col');
            colClass.classList.add('rowNames');
            let colSpan = document.createElement('col');
            colSpan.span = '7';
            colgroup.insertAdjacentElement('beforeend', colClass);
            colgroup.insertAdjacentElement('beforeend', colSpan);
            table.insertAdjacentElement('beforeend', colgroup);

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
}
