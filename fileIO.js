/*
関数概要　：JSONデータファイル読込
引数　　　：無し
戻り値　　：無し
*/
function readJSON() {
    const fileSelect = document.getElementById("readJSON");
    if (fileSelect.files.length == 0) {
        return;
    }

    let reader = new FileReader();
    reader.readAsText(fileSelect.files[0]);
    reader.onloadend = () => {
        // console.log(reader.result);
        block_id = JSON.parse(reader.result);
        if (block_id.keyword != "PHMWebApp") {
            alert(MESSAGE_PAIDDAYSDATAFILE_ERROR);
            return;
        }
        setJSONData(block_id);
    }
}

/*
関数概要　：同一JSONデータファイル読込用の処理
引数　　　：無し
戻り値　　：無し
*/
function onClickReadJSON(e) {
    // console.log("onClickReadJSON");
    e.value = "";
}
