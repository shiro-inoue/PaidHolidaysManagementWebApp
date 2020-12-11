window.onload = function () {
    initTable();
    // 有給の合計日数 反映
    totalPaid();
};

/*
関数概要：テーブル初期処理
引数：無し
戻り値：無し
*/
function initTable() {

    // テーブル内リストボックスの初期化
    initCarryForwardDays();
    initGrantDays();

    generateTable(ACQUISITIONPLANTABLE_ROW_NUM, ACQUISITIONPLANTABLE_ROW_INDEX, "acquisitionPlanTable");
    generateTable(ADMINISTRATIONTABLE_ROW_NUM, ADMINISTRATIONTABLE_ROW_INDEX, "administrationTable");
}

/*
関数概要：テーブルを動的に生成
引数：num 挿入行数
引数：index 行を挿入するインデックス（0オリジン）
引数：tableName 生成するテーブル名
戻り値：無し
*/
function generateTable(num, index, tableName) {
    let month;
    let date;
    let table = document.getElementById(tableName);

    for (let i = 0; i < num; i++) {
        let row = table.insertRow(index + i);

        let cell1 = row.insertCell(-1);
        let cell2 = row.insertCell(-1);
        let cell3 = row.insertCell(-1);
        let cell4 = row.insertCell(-1);
        let cell5 = row.insertCell(-1);

        // acquisitionplanTableの処理
        if (tableName == "acquisitionPlanTable") {
            // idの設定（createDateControlで参照）
            month = "month" + (i + 1);
            date = "date" + (i + 1);

            cell1.innerHTML = getAcquisitionplanTableCell1HTML(month, date);
            cell2.innerHTML = getAcquisitionplanTableCell2HTML();
            cell3.innerHTML = getAcquisitionplanTableCell3HTML();
            cell4.innerHTML = getAcquisitionplanTableCell4HTML();
            cell5.innerHTML = getAcquisitionplanTableCell5HTML();
        }
        // administrationTableの処理
        else if (tableName == "administrationTable") {
            month = "month" + (i + ACQUISITIONPLANTABLE_ROW_NUM + 1);
            date = "date" + (i + ACQUISITIONPLANTABLE_ROW_NUM + 1);

            cell1.innerHTML = getAdministrationTableCell1HTML(month, date);
            cell2.innerHTML = getAdministrationTableCell2HTML();
            cell3.innerHTML = getAdministrationTableCell3HTML();
            cell4.innerHTML = getAdministrationTableCell4HTML();
            cell5.innerHTML = getAdministrationTableCell5HTML();
        }
        else {
            // ここには来ないはず
        }

        createDateControl(month, date);
    }
}

/*
関数概要：acquisitionplanTableの日付セルのHTML取得
引数：month month用のid名称
引数：date date用のid名称
戻り値：html
*/
function getAcquisitionplanTableCell1HTML(month, date) {
    return ACQUISITIONPLANTABLE_CELL1F_HTML + month + ACQUISITIONPLANTABLE_CELL1M_HTML + date + ACQUISITIONPLANTABLE_CELL1R_HTML;
}

/*
関数概要：acquisitionplanTableの区分セルのHTML取得
戻り値：html
*/
function getAcquisitionplanTableCell2HTML() {
    return ACQUISITIONPLANTABLE_CELL2_HTML;
}

/*
関数概要：acquisitionplanTableの取得日数(通算)セルのHTML取得
戻り値：html
*/
function getAcquisitionplanTableCell3HTML() {
    return ACQUISITIONPLANTABLE_CELL3_HTML;
}

/*
関数概要：acquisitionplanTableの残日数セルのHTML取得
戻り値：html
*/
function getAcquisitionplanTableCell4HTML() {
    return ACQUISITIONPLANTABLE_CELL4_HTML;
}

/*
関数概要：acquisitionplanTableの備考セルのHTML取得
戻り値：html
*/
function getAcquisitionplanTableCell5HTML() {
    return ACQUISITIONPLANTABLE_CELL5_HTML;
}

/*
関数概要：administrationTableの日付セルのHTML取得
引数：month month用のid名称
引数：date date用のid名称
戻り値：html
*/
function getAdministrationTableCell1HTML(month, date) {
    return ADMINISTRATIONTABLE_CELL1F_HTML + month + ADMINISTRATIONTABLE_CELL1M_HTML + date + ADMINISTRATIONTABLE_CELL1R_HTML;
}

/*
関数概要：administrationTableの区分セルのHTML取得
戻り値：html
*/
function getAdministrationTableCell2HTML() {
    return ADMINISTRATIONTABLE_CELL2_HTML;
}

/*
関数概要：administrationTableの取得日数(通算)セルのHTML取得
戻り値：html
*/
function getAdministrationTableCell3HTML() {
    return ADMINISTRATIONTABLE_CELL3_HTML;
}

/*
関数概要：administrationTableの残日数セルのHTML取得
戻り値：html
*/
function getAdministrationTableCell4HTML() {
    return ADMINISTRATIONTABLE_CELL4_HTML;
}

/*
関数概要：administrationTableの理由セルのHTML取得
戻り値：html
*/
function getAdministrationTableCell5HTML() {
    return ADMINISTRATIONTABLE_CELL5_HTML;
}

/*
関数概要：日付コントロール生成
引数：month monthのid
引数：date dateのid
戻り値：無し
*/
function createDateControl(month, date) {
    const baseYear = 2020;
    const isLeapYear = year => (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);

    const countDatesOfFeb = year => isLeapYear(year) ? 29 : 28;

    const createOption = (id, startNum, endNum, current) => {
        const selectDom = document.getElementById(id);
        let optionDom = '';
        for (let i = startNum; i <= endNum; i++) {
            // if (i === current) {
            //     option = '<option value="' + i + '" selected>' + i + '</option>';
            // } else {
            option = '<option value="' + i + '">' + i + '</option>';
            // }
            optionDom += option;
        }
        selectDom.insertAdjacentHTML('beforeend', optionDom);
        selectDom.selectedIndex = -1;
    }

    const monthBox = document.getElementById(month);
    const dateBox = document.getElementById(date);

    const today = new Date();
    // const thisYear = today.getFullYear();
    // 現状は基準年を2020とする
    const thisYear = baseYear;
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();

    // 年度を4/1から翌3/31とするため、2月には基準年 + 1を渡す
    let datesOfYear = [31, countDatesOfFeb(thisYear + 1), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 日付コントロール操作時のイベント定義
    monthBox.addEventListener("change", (e) => {
        dateBox.innerHTML = '';
        const selectedMonth = e.target.value;
        createOption(date, 1, datesOfYear[selectedMonth - 1], 1);
    });
    createOption(month, 1, 12, thisMonth);
    createOption(date, 1, datesOfYear[thisMonth - 1], thisDate);
}

/*
関数概要：administrationTableに行を挿入する
引数：obj 行挿入ボタンの情報
戻り値：無し
*/
function insertRow(obj) {
    let administrationTable = document.getElementById("administrationTable");
    tr = obj.parentNode.parentNode;
    // 行挿入ボタンのひとつ上に行を挿入する
    let index = tr.sectionRowIndex;

    // 残日数が0の時は、行を追加しない
    if (isZeroDaysLeft(administrationTable.rows[index - 1].cells[3].innerText)) {
        return;
    }

    let row = administrationTable.insertRow(index);

    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let cell4 = row.insertCell(-1);
    let cell5 = row.insertCell(-1);

    // idの設定（createDateControlで参照）
    let month = "month" + (index - ADMINISTRATIONTABLE_ROW_INDEX + ACQUISITIONPLANTABLE_ROW_NUM + 1);
    let date = "date" + (index - ADMINISTRATIONTABLE_ROW_INDEX + ACQUISITIONPLANTABLE_ROW_NUM + 1);

    cell1.innerHTML = getAdministrationTableCell1HTML(month, date);
    cell2.innerHTML = getAdministrationTableCell2HTML();
    cell3.innerHTML = getAdministrationTableCell3HTML();
    cell4.innerHTML = getAdministrationTableCell4HTML();
    cell5.innerHTML = getAdministrationTableCell5HTML();

    createDateControl(month, date);
}

/*
関数概要：残日数のチェック
引数：days 残日数
戻り値：true ゼロではない
戻り値：false ゼロもしくは未入力
*/
function isZeroDaysLeft(days) {
    console.log("days = " + days);
    console.log("days.length = " + days.length);
    if (days.length <= 1) {
        return true;
    }
    let day = parseInt(days.substr(0, days.length - 1));
    console.log("day = " + day);
    if (day === 0) {
        return true;
    }
    return false;
}

/*
関数概要：administrationTableの最終行を削除する
引数：obj 行削除ボタンの情報
戻り値：無し
*/
function deleteRow(obj) {
    tr = obj.parentNode.parentNode;

    // 6行目以降を削除対象とする
    if (tr.sectionRowIndex <= ADMINISTRATIONTABLE_ROW_NUM + ADMINISTRATIONTABLE_ROW_INDEX) {
        return;
    }

    if (!window.confirm("最終行を削除しますか？")) {
        return;
    }

    // 行削除ボタンのひとつ上の行を削除する
    tr.parentNode.deleteRow(tr.sectionRowIndex - 1);
}

/*
関数概要：入力文字列を最大文字数に丸める
引数：obj 行の情報
引数：maxLength 最大文字数
戻り値：無し
*/
function verifyText(obj, maxLength) {
    let text = obj.value;

    overhangNum = calcOverhangCharNum(text, maxLength);
    if (overhangNum != 0) {
        text = text.slice(0, -(overhangNum));
    }

    obj.value += text;
}

/*
関数概要：最大文字数を超えた文字数を算出する
引数：text 文字列
引数：maxLength 最大文字数
戻り値：最大文字数を超えた文字数
*/
function calcOverhangCharNum(text, maxLength) {
    let singleByteCharNum = 0;
    let overhangNum = 0;

    for (let i = 0; i < text.length; i++) {
        let chr = text.charCodeAt(i);
        if ((chr >= 0x00 && chr < 0x81) ||
            (chr === 0xf8f0) ||
            (chr >= 0xff61 && chr < 0xffa0) ||
            (chr >= 0xf8f1 && chr < 0xf8f4)) {
            singleByteCharNum += 1;
        } else {
            singleByteCharNum += 2;
        }

        if (singleByteCharNum > maxLength) {
            overhangNum++;
        }
    }
    return overhangNum;
}

/*
関数概要　：前年度繰越日数の初期設定
引数　　　：なし
戻り値　　：なし
メモ      ：https://techacademy.jp/magazine/27133
*/
function initCarryForwardDays() {

    let valueList = [
        0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5,
        5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5,
        10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5,
        15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20];

    initListBox('carryForwardDays', valueList);
}

/*
関数概要　：新規付与日数の初期設定
引数　　　：なし
戻り値　　：なし
メモ　　　：https://techacademy.jp/magazine/27133
*/
function initGrantDays() {
    
    let valueList = [0, 1, 2, 3, 4, 5, 10, 11, 12, 14, 16, 18, 20];

    initListBox('grantDays', valueList);
}

/*
関数概要　：新規付与日数の初期設定
引数　　　：listBoxName リストボックス名
　　　　　：valueList　リストボックスに設定する値
戻り値　　：なし
*/
function initListBox(listBoxName, valueList) {
    let element = document.getElementById(listBoxName);

    document.createElement('option');
    for (let i = 0; i < valueList.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', valueList[i]);
        option.innerHTML = valueList[i];
        element.appendChild(option);
    }
}

/*
関数概要　：今年度年休総数に日数を反映
引数　　　：なし
戻り値　　：なし
メモ　　　：https://qiita.com/RyBB/items/c87af2413c34f9367d00
*/
function totalPaid() {
    const carryForwardDays = document.getElementById('carryForwardDays').value;
    const grantDays = document.getElementById('grantDays').value;

    document.getElementById('totalPaidDays').innerHTML = Number(carryForwardDays) + Number(grantDays) + ' 日';
}
