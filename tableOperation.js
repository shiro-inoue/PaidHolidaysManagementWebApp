window.onload = function () {
    initTable();
};

/*
関数概要：テーブル初期処理
引数：無し
戻り値：無し
*/
function initTable() {
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