// acquisitionplanTableの挿入行数
const ACQUISITIONPLANTABLE_ROW_NUM = 3;
// acquisitionplanTableに行を挿入するインデックス（0オリジン）
const ACQUISITIONPLANTABLE_ROW_INDEX = 2;

// 備考欄の最大文字数
const REMARKSCOL_MAX_CHARNUM = 40;
// 理由欄の最大文字数
const REASONCOL_MAX_CHARNUM = 40;

// acquisitionplanTableの日付セルのHTML（idを挿入するために3分割）
const ACQUISITIONPLANTABLE_CELL1F_HTML = '<select id="';
const ACQUISITIONPLANTABLE_CELL1M_HTML = '" name="month"></select> / <select id="';
const ACQUISITIONPLANTABLE_CELL1R_HTML = '" name="date"></select>';
// acquisitionplanTableの区分セルのHTML
const ACQUISITIONPLANTABLE_CELL2_HTML = '<select name="区分" onChange="changeClassification(this)"><option value="空白"></option><option value="計画年休">計画年休</option></select>';
// acquisitionplanTableの取得日数(通算)セルのHTML
const ACQUISITIONPLANTABLE_CELL3_HTML = '';
// acquisitionplanTableの残日数セルのHTML
const ACQUISITIONPLANTABLE_CELL4_HTML = '';
// acquisitionplanTableの備考セルのHTML
const ACQUISITIONPLANTABLE_CELL5_HTML = '<input type="text" style="width:98%" value="" onchange="verifyText(this,' + REMARKSCOL_MAX_CHARNUM + ')">';

// administrationTableの挿入行数
const ADMINISTRATIONTABLE_ROW_NUM = 5;
// administrationTableに行を挿入するインデックス（0オリジン）
const ADMINISTRATIONTABLE_ROW_INDEX = 2;

// administrationTableの日付セルのHTML（idを挿入するために3分割）
const ADMINISTRATIONTABLE_CELL1F_HTML = '<select id="';
const ADMINISTRATIONTABLE_CELL1M_HTML = '" name="month"></select> / <select id="';
const ADMINISTRATIONTABLE_CELL1R_HTML = '" name="date"></select>';
// administrationTableの区分セルのHTML取得
const ADMINISTRATIONTABLE_CELL2_HTML = '<select style="width:98%;" name="区分" onChange="changeClassification(this)"><option value="空白"></option><option value="全休">全休</option><option value="午前半休">午前半休</option><option value="午後半休">午後半休</option></select>';
// administrationTableの取得日数(通算)セルのHTML取得
const ADMINISTRATIONTABLE_CELL3_HTML = '';
// administrationTableの残日数セルのHTML取得
const ADMINISTRATIONTABLE_CELL4_HTML = '';
// administrationTableの理由セルのHTML取得
const ADMINISTRATIONTABLE_CELL5_HTML = '<input type="text" style="width:98%" value="" onchange="verifyText(this,' + REASONCOL_MAX_CHARNUM + ')">';

// // メッセージ 前年度繰越日数が未入力：「前年度繰越日数を入力してください。」
// const MESSAGE_CARRYFORWARDDAYS_ERROR = "前年度繰越日数を入力してください。";
// // メッセージ 新規付与日数が未入力：「新規付与日数を入力してください。」
// const MESSAGE_GRANTDAYS_ERROR = "新規付与日数を入力してください。";

// メッセージ 年休の残日数が不足：「年休の残日数が不足しています。」
const MESSAGE_TOTALPAIDDAYS_ERROR = "年休の残日数が不足しています。";
