// 基準日
let referenceDate = 0;
// 取得日数(総数)
let totalAcquisitionDays = 0;
// 残日数
let RemainDays = 0;

window.onload = function () {
    initTable();
    // 有給の合計日数 反映
    totalPaid();
    autoReflectDate();
};

/*
関数概要：テーブル初期処理
引数：無し
戻り値：無し
*/
function initTable() {

    setReferenceDate();

    // テーブル内リストボックスの初期化
    initCarryForwardDays();
    initGrantDays();

    generateTable(ACQUISITIONPLANTABLE_ROW_NUM, ACQUISITIONPLANTABLE_ROW_INDEX, "acquisitionPlanTable");
    generateTable(ADMINISTRATIONTABLE_ROW_NUM, ADMINISTRATIONTABLE_ROW_INDEX, "administrationTable");
}

/*
関数概要：基準日の設定
引数：無し
戻り値：無し
*/
function setReferenceDate() {
    // 日付から基準年を算出
    let date = new Date();
    let month = date.getMonth() + 1;
    referenceDate = (month > 3) ? date.getFullYear() : date.getFullYear() - 1;
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
    const baseYear = referenceDate;
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

    // 残日数が0.5日未満の時は、行を追加しない
    if (isPaidDaysLeft(administrationTable.rows[index - 1].cells[3].innerText)) {
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
戻り値：true 0.5日以上
戻り値：false 0.5日未満もしくは未入力
*/
function isPaidDaysLeft(days) {
    console.log("days = " + days);
    console.log("days.length = " + days.length);
    if (days.length <= 1) {
        return true;
    }
    let day = Number(days.substr(0, days.length - 1));
    console.log("day = " + day);
    if (day < 0.5) {
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
        // 文字列の後ろからoverhangNum文字分を削除（半角全角も１文字扱い）
        text = text.slice(0, -(overhangNum));
    }

    obj.value = text;
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
        // 半角文字の判定
        if ((chr >= 0x00 && chr < 0x81) ||
            (chr === 0xf8f0) ||
            (chr >= 0xff61 && chr < 0xffa0) ||
            (chr >= 0xf8f1 && chr < 0xf8f4)) {
            singleByteCharNum += 1;
        } else {
            singleByteCharNum += 2;
        }

        if (singleByteCharNum > maxLength) {
            // 最大文字数を超えた文字数を半角全角どちらも１文字でカウント（半角全角混在を考慮）
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

    // 残日数
    RemainDays = Number(carryForwardDays) + Number(grantDays);
}

/*
関数概要：acquisitionPlanTableおよびadministrationTableの区分を変更した時に呼び出される
引数    ：obj 区分コントロールの情報
戻り値　：なし
*/
function changeClassification(obj) {
    // // 計画年休を選択時
    // if (obj.selectedIndex == 1) {
    //     // 前年度繰越日数が入力されているかチェック
    //     if (!isEnteredInputColumn("carryForwardDays", false)) {
    //         // selectを空白へ戻す
    //         obj.selectedIndex = 0;
    //         alert(MESSAGE_CARRYFORWARDDAYS_ERROR);
    //         return;
    //     }
    //     // 新規付与日数が入力されているかチェック
    //     if (!isEnteredInputColumn("grantDays", true)) {
    //         // selectを空白へ戻す
    //         obj.selectedIndex = 0;
    //         alert(MESSAGE_GRANTDAYS_ERROR);
    //         return;
    //     }
    // }

    tr = obj.parentNode.parentNode;
    let index = tr.sectionRowIndex;
    // 区分が操作されたテーブルID
    let tableID = obj.parentNode.parentNode.parentNode.parentNode.id;
    // console.log("index = " + index);
    // console.log("tableID = " + tableID);

    // // 今年度年休総数
    // totalPaidDays = document.getElementById("totalPaidDays");
    // 取得日数(総数)
    totalAcquisitionDays = 0;
    // 残日数 ← "日"を削除して、数値(小数点も入る)へ変換
    RemainDays = Number(totalPaidDays.innerText.slice(0, -1));
    // console.log("totalPaidDays.innerText = " + totalPaidDays.innerText);
    // console.log("RemainDays = " + RemainDays);

    let paidDays = 0;
    paidDays = checkAcquisitionPlanTableDaysInfo();
    paidDays += checkAdministrationTableDaysInfo();
    // console.log("paidDays = " + paidDays);
    // 区分指定された年休が取得できるか？
    if (RemainDays < paidDays) {
        alert(MESSAGE_TOTALPAIDDAYS_ERROR);
        // selectを空白へ戻す
        obj.selectedIndex = 0;
    }
    else {
        // 区分コントロールが選択されたテーブルにだけindexを渡す
        updateAcquisitionPlanTable((tableID == "acquisitionPlanTable") ? index : -1);
        updateAdministrationTable((tableID == "administrationTable") ? index : -1);
    }
}

/*
関数概要：acquisitionPlanTableの取得日の確認
引数    ：無し
戻り値　：acquisitionPlanTableの取得日
*/
function checkAcquisitionPlanTableDaysInfo() {
    let paidDays = 0;
    let acquisitionPlanTable = document.getElementById("acquisitionPlanTable");

    for (let i = ACQUISITIONPLANTABLE_ROW_INDEX; i < acquisitionPlanTable.rows.length; i++) {
        let selectCell = acquisitionPlanTable.rows[i].cells[1].children[0];

        switch (selectCell.selectedIndex) {
            case 0: // 空白
                break;

            case 1: // 計画年休
                paidDays++;
                break;

            default: // その他
        }
    }
    // console.log("checkAcquisitionPlanTableDaysInfo = " + paidDays);
    return paidDays;
}

/*
関数概要：administrationTableの取得日の確認
引数    ：無し
戻り値　：administrationTableの取得日
*/
function checkAdministrationTableDaysInfo() {
    let paidDays = 0;
    let administrationTable = document.getElementById("administrationTable");

    for (let i = ADMINISTRATIONTABLE_ROW_INDEX; i < administrationTable.rows.length - 1; i++) {
        let selectCell = administrationTable.rows[i].cells[1].children[0];

        switch (selectCell.selectedIndex) {
            case 0: // 空白
                break;

            case 1: // 全休
                paidDays++;
                break;

            case 2: // 午前半休
            case 3: // 午後半休
                paidDays += 0.5;
                break;

            default: // その他
        }
    }
    // console.log("checkAdministrationTableDaysInfo = " + paidDays);
    return paidDays;
}

/*
関数概要：acquisitionPlanTableの更新
引数    ：index 操作された区分コントロールのインデックス
戻り値　：無し
*/
function updateAcquisitionPlanTable(index) {
    let acquisitionPlanTable = document.getElementById("acquisitionPlanTable");

    for (let i = ACQUISITIONPLANTABLE_ROW_INDEX; i < acquisitionPlanTable.rows.length; i++) {
        // 各行の処理
        let selectCell = acquisitionPlanTable.rows[i].cells[1].children[0];
        // console.log("selectCell.selectedIndex = " + selectCell.selectedIndex);

        switch (selectCell.selectedIndex) {
            case 0: // 空白
                // 区分が変更された行の場合
                if (i == index) {
                    acquisitionPlanTable.rows[i].cells[2].innerText = getAcquisitionplanTableCell3HTML();
                    acquisitionPlanTable.rows[i].cells[3].innerText = getAcquisitionplanTableCell4HTML();
                }
                break;

            case 1: // 計画年休
                // 取得日数（通算）、残日数を更新する
                acquisitionPlanTable.rows[i].cells[2].innerText = (++totalAcquisitionDays).toFixed(1) + "日";
                acquisitionPlanTable.rows[i].cells[3].innerText = (--RemainDays).toFixed(1) + "日";
                break;

            default: // その他
        }
    }
}

/*
関数概要：administrationTableの更新
引数    ：index 操作された区分コントロールのインデックス
戻り値　：無し
*/
function updateAdministrationTable(index) {
    let administrationTable = document.getElementById("administrationTable");

    for (let i = ADMINISTRATIONTABLE_ROW_INDEX; i < administrationTable.rows.length - 1; i++) {
        // 各行の処理
        let selectCell = administrationTable.rows[i].cells[1].children[0];
        // console.log("selectCell.selectedIndex = " + selectCell.selectedIndex);

        switch (selectCell.selectedIndex) {
            case 0: // 空白
                // 区分が変更された行の場合
                if (i == index) {
                    administrationTable.rows[i].cells[2].innerText = getAdministrationTableCell3HTML();
                    administrationTable.rows[i].cells[3].innerText = getAdministrationTableCell4HTML();
                }
                break;

            case 1: // 全休
                // 取得日数（通算）、残日数を更新する
                administrationTable.rows[i].cells[2].innerText = (++totalAcquisitionDays).toFixed(1) + "日";
                administrationTable.rows[i].cells[3].innerText = (--RemainDays).toFixed(1) + "日";
                break;

            case 2: // 午前半休
            case 3: // 午後半休
                // 取得日数（通算）、残日数を更新する
                administrationTable.rows[i].cells[2].innerText = (totalAcquisitionDays += 0.5).toFixed(1) + "日";
                administrationTable.rows[i].cells[3].innerText = (RemainDays -= 0.5).toFixed(1) + "日";
                break;

            default: // その他
        }
    }
}

// /*
// 関数概要　：欄が入力されているかのチェック
// 引数　　　：id コントロールid
//          ：flag ゼロチェックするしない
// 戻り値　　：true 入力済み
//          ：false 未入力
// メモ     ：前年度繰越日数および新規付与日数のチェック用
// */
// function isEnteredInputColumn(id, flag) {
//     let inputColumn = document.getElementById(id);
//     // console.log("inputColumn.value = " + inputColumn.value);
//     // 未入力の場合
//     if (inputColumn.value == "") {
//         return false;
//     }
//     if (flag) {
//         // ゼロの場合
//         if (inputColumn.value == 0) {
//             return false;
//         }
//     }
//     return true;
// }

/*
関数概要　：JSONデータをTableへ設定
引数　　　：jsonParse JSONデータ
戻り値　　：
*/
function setJSONData(jsonParse) {
    if (!confirm(MESSAGE_READPAIDDAYSDATA_CONFIRM)) {
        return;
    }

    // 基準日の設定
    // console.log("ReferenceDate    = " + jsonParse.ReferenceDate);
    referenceDate = jsonParse.ReferenceDate;

    setInfoTableTable(jsonParse);
    setAcquisitionPlanTable(jsonParse);
    setAdministrationTable(jsonParse);

    // 有給の合計日数 反映
    totalPaid();

    updateAcquisitionPlanTable(-1);
    updateAdministrationTable(-1);
}

/*
関数概要　：JSONデータをinfoTableへ設定
引数　　　：jsonParse JSONデータ
戻り値　　：
*/
function setInfoTableTable(jsonParse) {
    let infoTable = document.getElementById("infoTable");
    // console.log("keyword          = " + jsonParse.keyword);
    // console.log("employeeNumber   = " + jsonParse.employeeNumber);
    // console.log("name             = " + jsonParse.name);
    // console.log("carryForwardDays = " + jsonParse.carryForwardDays);
    // console.log("grantDays        = " + jsonParse.grantDays);
    (infoTable.rows[INFOTABLE_ROW_INDEX].cells[INFOTABLE_EMPL_CELLS]).getElementsByTagName("input")[0].value = jsonParse.employeeNumber;
    (infoTable.rows[INFOTABLE_ROW_INDEX].cells[INFOTABLE_NAME_CELLS]).getElementsByTagName("input")[0].value = jsonParse.name;
    (infoTable.rows[INFOTABLE_ROW_INDEX].cells[INFOTABLE_CARR_CELLS]).getElementsByTagName("select")[0].value = jsonParse.carryForwardDays;
    (infoTable.rows[INFOTABLE_ROW_INDEX].cells[INFOTABLE_GRAN_CELLS]).getElementsByTagName("select")[0].value = jsonParse.grantDays;

    // JSON読込時に前年度繰越日数および新規付与日数を編集不可とする実装（サーバー側では実装必要）
    // (infoTable.rows[INFOTABLE_ROW_INDEX].cells[5]).getElementsByTagName("select")[0].disabled = true;
    // (infoTable.rows[INFOTABLE_ROW_INDEX].cells[7]).getElementsByTagName("select")[0].disabled = true;
}

/*
関数概要　：JSONデータをacquisitionPlanTableへ設定
引数　　　：jsonParse JSONデータ
戻り値　　：
*/
function setAcquisitionPlanTable(jsonParse) {
    let acquisitionPlanTable = document.getElementById("acquisitionPlanTable");
    // console.log("jsonParse.acquisitionPlanTable.length = " + jsonParse.acquisitionPlanTable.length);
    jsonParse.acquisitionPlanTable.forEach((acqTbl, i) => {
        // console.log("acqTbl.month          = " + acqTbl.month);
        // console.log("acqTbl.date           = " + acqTbl.date);
        // console.log("acqTbl.classification = " + acqTbl.classification);
        // console.log("acqTbl.remarks        = " + acqTbl.remarks);
        (acquisitionPlanTable.rows[ACQUISITIONPLANTABLE_ROW_INDEX + i].cells[ACQUTABLE_MONT_CELLS]).getElementsByTagName("select")[ACQUTABLE_MONT_CEIDX].value = acqTbl.month;
        (acquisitionPlanTable.rows[ACQUISITIONPLANTABLE_ROW_INDEX + i].cells[ACQUTABLE_DATE_CELLS]).getElementsByTagName("select")[ACQUTABLE_DATE_CEIDX].value = acqTbl.date;
        (acquisitionPlanTable.rows[ACQUISITIONPLANTABLE_ROW_INDEX + i].cells[ACQUTABLE_CLAS_CELLS]).getElementsByTagName("select")[0].value = acqTbl.classification;
        (acquisitionPlanTable.rows[ACQUISITIONPLANTABLE_ROW_INDEX + i].cells[ACQUTABLE_REMA_CELLS]).getElementsByTagName("input")[0].value = acqTbl.remarks;
    });
}

/*
関数概要　：JSONデータをadministrationTableへ設定
引数　　　：jsonParse JSONデータ
戻り値　　：
*/
function setAdministrationTable(jsonParse) {
    let administrationTable = document.getElementById("administrationTable");
    // console.log("jsonParse.administrationTable.length = " + jsonParse.administrationTable.length);
    jsonParse.administrationTable.forEach((admTbl, i) => {
        // console.log("admTbl.month          = " + admTbl.month);
        // console.log("admTbl.date           = " + admTbl.date);
        // console.log("admTbl.classification = " + admTbl.classification);
        // console.log("admTbl.reason         = " + admTbl.reason);
        (administrationTable.rows[ADMINISTRATIONTABLE_ROW_INDEX + i].cells[ADMITABLE_MONT_CELLS]).getElementsByTagName("select")[ADMITABLE_MONT_CEIDX].value = admTbl.month;
        (administrationTable.rows[ADMINISTRATIONTABLE_ROW_INDEX + i].cells[ADMITABLE_DATE_CELLS]).getElementsByTagName("select")[ADMITABLE_DATE_CEIDX].value = admTbl.date;
        (administrationTable.rows[ADMINISTRATIONTABLE_ROW_INDEX + i].cells[ADMITABLE_CLAS_CELLS]).getElementsByTagName("select")[0].value = admTbl.classification;
        (administrationTable.rows[ADMINISTRATIONTABLE_ROW_INDEX + i].cells[ADMITABLE_REMA_CELLS]).getElementsByTagName("input")[0].value = admTbl.reason;
    });
}

/*
関数概要　：日付データの自動反映
引数　　　：jsonParse JSONデータ
戻り値　　：
*/
function autoReflectDate() {
    let titleYear = document.getElementById("titleYear");
    // タイトル「2020年度　年次有給休暇管理表」
    titleYear.innerText = titleYear.innerText.replace("2020", referenceDate);

    let infoTable = document.getElementById("infoTable");
    // 基準日「基準日：2020/4/1」
    infoTable.rows[INFOTABLE_REFE_ROWS].cells[0].innerText = infoTable.rows[INFOTABLE_REFE_ROWS].cells[0].innerText.replace("2020", referenceDate);
    // 年度末「年度末（2021/3/31）までに、必ず、５日以上取得してください。」
    infoTable.rows[INFOTABLE_YEAR_ROWS].cells[0].innerText = infoTable.rows[INFOTABLE_YEAR_ROWS].cells[0].innerText.replace("2021", referenceDate + 1);

    let administrationTable = document.getElementById("administrationTable");
    // 有効期限「有効期限：2021/3/31」
    administrationTable.rows[administrationTable.rows.length - 1].cells[1].innerText = administrationTable.rows[administrationTable.rows.length - 1].cells[1].innerText.replace("2021", referenceDate + 1);
}
