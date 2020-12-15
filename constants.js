// infoTableのデータ・コントロールが存在する行のインデックス（0オリジン）
const INFOTABLE_ROW_INDEX = 2;

// infoTableの基準日の行のインデックス（0オリジン）
const INFOTABLE_REFE_ROWS = 0;
// infoTableの年度末の行のインデックス（0オリジン）
const INFOTABLE_YEAR_ROWS = 1;

// infoTableのデータ・コントロールが存在するセルのインデックス（0オリジン）
const INFOTABLE_EMPL_CELLS = 1;
const INFOTABLE_NAME_CELLS = 3;
const INFOTABLE_CARR_CELLS = 5;
const INFOTABLE_GRAN_CELLS = 7;

// acquisitionplanTableの挿入行数
const ACQUISITIONPLANTABLE_ROW_NUM = 3;
// acquisitionplanTableに行を挿入するインデックス（0オリジン）
const ACQUISITIONPLANTABLE_ROW_INDEX = 2;

// acquisitionplanTableのデータ・コントロールが存在するセルのインデックス（0オリジン）
const ACQUTABLE_MONT_CELLS = 0;
const ACQUTABLE_DATE_CELLS = 0;
const ACQUTABLE_CLAS_CELLS = 1;
const ACQUTABLE_ACQD_CELLS = 2;
const ACQUTABLE_REMD_CELLS = 3;
const ACQUTABLE_REMA_CELLS = 4;

// acquisitionplanTableの日付コントロールが存在するセル中のインデックス（0オリジン）
const ACQUTABLE_MONT_CEIDX = 0;
const ACQUTABLE_DATE_CEIDX = 1;

// 備考欄の最大文字数
const REMARKSCOL_MAX_CHARNUM = 40;
// 理由欄の最大文字数
const REASONCOL_MAX_CHARNUM = 40;

// acquisitionplanTableの日付セルのHTML（idを挿入するために3分割）
const ACQUISITIONPLANTABLE_CELL1F_HTML = '<select id="';
const ACQUISITIONPLANTABLE_CELL1M_HTML = '" name="month"></select> / <select id="';
const ACQUISITIONPLANTABLE_CELL1R_HTML = '" name="date"></select>';
// acquisitionplanTableの区分セルのHTML
const ACQUISITIONPLANTABLE_CELL2_HTML = '<select style="width:98%;" name="区分" onChange="changeClassification(this)"><option value="空白"></option><option value="計画年休">計画年休</option></select>';
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

// administrationTableのデータ・コントロールが存在するセルのインデックス（0オリジン）
const ADMITABLE_MONT_CELLS = 0;
const ADMITABLE_DATE_CELLS = 0;
const ADMITABLE_CLAS_CELLS = 1;
const ADMITABLE_ACQD_CELLS = 2;
const ADMITABLE_REMD_CELLS = 3;
const ADMITABLE_REMA_CELLS = 4;

// administrationTableの日付コントロールが存在するセル中のインデックス（0オリジン）
const ADMITABLE_MONT_CEIDX = 0;
const ADMITABLE_DATE_CEIDX = 1;

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

// メッセージ 年休の残日数が不足：「表が初期化されますが、有給データを読み込みますか？」
const MESSAGE_READPAIDDAYSDATA_CONFIRM = "表が初期化されますが、有給データを読み込みますか？";
// メッセージ 有給データファイル不正：「正しい有給データではありません。」
const MESSAGE_PAIDDAYSDATAFILE_ERROR = "正しい有給データではありません。";
