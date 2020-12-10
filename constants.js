// acquisitionplanTableの挿入行数
const ACQUISITIONPLANTABLE_ROW_NUM = 3;
// acquisitionplanTableに行を挿入するインデックス（0オリジン）
const ACQUISITIONPLANTABLE_ROW_INDEX = 2;

// acquisitionplanTableの日付セルのHTML（idを挿入するために3分割）
const ACQUISITIONPLANTABLE_CELL1F_HTML = '<select id="';
const ACQUISITIONPLANTABLE_CELL1M_HTML = '" name="month"></select> / <select id="';
const ACQUISITIONPLANTABLE_CELL1R_HTML = '" name="date"></select>';
// acquisitionplanTableの区分セルのHTML
const ACQUISITIONPLANTABLE_CELL2_HTML = '<select name="区分"><option value="空白"></option><option value="計画年休">計画年休</option></select>';
// acquisitionplanTableの取得日数(通算)セルのHTML
const ACQUISITIONPLANTABLE_CELL3_HTML = '日';
// acquisitionplanTableの残日数セルのHTML
const ACQUISITIONPLANTABLE_CELL4_HTML = '日';
// acquisitionplanTableの備考セルのHTML
const ACQUISITIONPLANTABLE_CELL5_HTML = '<input type="text" style="width:98%" value="">';

// administrationTableの挿入行数
const ADMINISTRATIONTABLE_ROW_NUM = 5;
// administrationTableに行を挿入するインデックス（0オリジン）
const ADMINISTRATIONTABLE_ROW_INDEX = 2;

// administrationTableの日付セルのHTML（idを挿入するために3分割）
const ADMINISTRATIONTABLE_CELL1F_HTML = '<select id="';
const ADMINISTRATIONTABLE_CELL1M_HTML = '" name="month"></select> / <select id="';
const ADMINISTRATIONTABLE_CELL1R_HTML = '" name="date"></select>';
// administrationTableの区分セルのHTML取得
const ADMINISTRATIONTABLE_CELL2_HTML = '<select style="width:98%;" name="区分"><option value="空白"></option><option value="全休">全休</option><option value="午前半休">午前半休</option><option value="午後半休">午後半休</option></select>';
// administrationTableの取得日数(通算)セルのHTML取得
const ADMINISTRATIONTABLE_CELL3_HTML = '日';
// administrationTableの残日数セルのHTML取得
const ADMINISTRATIONTABLE_CELL4_HTML = '日';
// administrationTableの理由セルのHTML取得
const ADMINISTRATIONTABLE_CELL5_HTML = '<input type="text" style="width:98%" value="">';
