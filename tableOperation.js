const year = 2020;

window.onload = function () {
    initTable();
};

function initTable() {
    generateTable(ACQUISITIONPLANTABLE_ROW_NUM, ACQUISITIONPLANTABLE_ROW_INDEX, "acquisitionPlanTable");
    generateTable(ADMINISTRATIONTABLE_ROW_NUM, ADMINISTRATIONTABLE_ROW_INDEX, "administrationTable");
}

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

        if (tableName == "acquisitionPlanTable") {
            month = "month" + (i + 1);
            date = "date" + (i + 1);

            cell1.innerHTML = getAcquisitionplanTableCell1HTML(month, date);
            cell2.innerHTML = getAcquisitionplanTableCell2HTML();
            cell3.innerHTML = getAcquisitionplanTableCell3HTML();
            cell4.innerHTML = getAcquisitionplanTableCell4HTML();
            cell5.innerHTML = getAcquisitionplanTableCell5HTML();
        }
        else {
            month = "month" + (i + ACQUISITIONPLANTABLE_ROW_NUM + 1);
            date = "date" + (i + ACQUISITIONPLANTABLE_ROW_NUM + 1);

            cell1.innerHTML = getAdministrationTableCell1HTML(month, date);
            cell2.innerHTML = getAdministrationTableCell2HTML();
            cell3.innerHTML = getAdministrationTableCell3HTML();
            cell4.innerHTML = getAdministrationTableCell4HTML();
            cell5.innerHTML = getAdministrationTableCell5HTML();
        }

        controlDate(month, date);
    }
}

function getAcquisitionplanTableCell1HTML(month, date) {
    return ACQUISITIONPLANTABLE_CELL1F_HTML + month + ACQUISITIONPLANTABLE_CELL1M_HTML + date + ACQUISITIONPLANTABLE_CELL1R_HTML;
}

function getAcquisitionplanTableCell2HTML() {
    return ACQUISITIONPLANTABLE_CELL2_HTML;
}

function getAcquisitionplanTableCell3HTML() {
    return ACQUISITIONPLANTABLE_CELL3_HTML;
}

function getAcquisitionplanTableCell4HTML() {
    return ACQUISITIONPLANTABLE_CELL4_HTML;
}

function getAcquisitionplanTableCell5HTML() {
    return ACQUISITIONPLANTABLE_CELL5_HTML;
}

function getAdministrationTableCell1HTML(month, date) {
    return ADMINISTRATIONTABLE_CELL1F_HTML + month + ADMINISTRATIONTABLE_CELL1M_HTML + date + ADMINISTRATIONTABLE_CELL1R_HTML;
}

function getAdministrationTableCell2HTML() {
    return ADMINISTRATIONTABLE_CELL2_HTML;
}

function getAdministrationTableCell3HTML() {
    return ADMINISTRATIONTABLE_CELL3_HTML;
}

function getAdministrationTableCell4HTML() {
    return ADMINISTRATIONTABLE_CELL4_HTML;
}

function getAdministrationTableCell5HTML() {
    return ADMINISTRATIONTABLE_CELL5_HTML;
}

function controlDate(month, date) {
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
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();

    let datesOfYear = [31, countDatesOfFeb(thisYear - 1), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    monthBox.addEventListener("change", (e) => {
        dateBox.innerHTML = '';
        const selectedMonth = e.target.value;
        createOption(date, 1, datesOfYear[selectedMonth - 1], 1);
    });
    createOption(month, 1, 12, thisMonth);
    createOption(date, 1, datesOfYear[thisMonth - 1], thisDate);
}