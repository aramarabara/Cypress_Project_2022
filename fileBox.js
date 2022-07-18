
// ----------------------------- 파일함 접근하기 ------------------------------

/**
 * select fbx Dynatree's rootFolder
 * @param fldType Dynatree's rootFolderType, MY= root_My, I=root_Joint, G=root_public, W=root_tws
 */
export function selectDynatreeRootFolder(fldType) {
    if(!fldType) fldType = 'MY';
    if(fldType === 'MY') {

    } else if(fldType === 'I') {
        cy.get('#dynatree-id-root_joint').click();
    } else if(fldType === 'G') {
        cy.get('#dynatree-id-root_public').click();
    } else if(fldType === 'W') {
        cy.get('#dynatree-id-root_tws').click();
    }
}

/**
 * select fbx Dynatree's subFolder
 * @param folderId Id that represent single folderId
 */
export function selectDynatreeSubFolder(folderId) {
    cy.get('#dynatree-id-' + folderId).wait(500);
}

/**
 * select fbx Dynatree's subFolder, by Click it's subFolder continuosly
 * @param folderIds Id that represent Childs folderId
 */
export function selectDynatreeSubFolderChain(folderIds) {
    folderIds.forEach(element => cy.get('#dynatree-id-' + element).click().wait(500));
}


// ----------------------------- 파일함 작업 ------------------------------
// 올리기, 내려받기, 새폴더, 삭제, 이동, 복사, 공유, 이름변경, 메일발송

/**
 * activate CheckBox that have folderId's folderId
 * @param folderIds folder Id that wants to Check
 */
export function selectFolderCheckBoxByNames(folderIds) {
    // 폴더 아이디 배열을 받아 클릭 활성화
    // 밑의 folderChk는 클릭이 되지 않기 때문에 부모요소로 접근하여 클릭한다.
    folderIds.forEach(element => cy.get('._folderChk[data-folder-id="' +element + '"]').first().parent().click());
}

/**
 * actviate upload Dialog ( Common Dialog )
 */
export function upload() {
    cy.get('._btn_upload').click().wait(500);
    cy.get('.fileinput-button').click().wait(500);
}

/*
* activate file download by click file Directly
* */
export function downloadByClick(fileNames) {
    fileNames.forEach(element => cy.get('._file[data-realfilename="' +element + '"]').click());
}

/*
* activate file download by Checkbox and Dropbox click
* */
function downloadByCheckBox(files) {
    folderIds.forEach(element => cy.get('._folderChk[data-file-id="' +element + '"]').first().parent().click());
}

/**
 * make new Folder in Current FileBox
 * ** fileBox's name become union of user's ID + CurrentTime + Random 7 number
 * ** and also write all i18n content as same value
 */
export function makeFolder() {
    let now = new Date();
    now = now.toLocaleDateString();
    let randomValue = Math.round(Math.random() * 1000000);
    let folderNameKor = `${USER.ID}-새폴더-${now}-${randomValue}`
    cy.get('._btn_newfolder')
        .click();
    cy.get('#fbxList_newFolder_ko')
        .type(folderNameKor)
    cy.get('#fbxList_newFolder_en')
        .type(folderNameKor)
    cy.get('#fbxList_newFolder_zh')
        .type(folderNameKor)
    cy.get('#fbxList_newFolder_ja')
        .type(folderNameKor)
    cy.get('#fbxList_newFolder_vi')
        .type(folderNameKor)
    cy.get('#fbxList_newFolderSave')
        .click();
    cy.wait(500);
}

function deleteAll() {

}

function move() {

}

function copy() {

}

function changeName() {

}

function sendMailWithFile() {

}

function fopen() {

}

function fThumnail() {

}

/*
* activate All CheckBox that Current Filebox have.
* */
function selectCurrentPagesAllCheckBox() {
    cy.get('.frst .chkbox').click();
}


// ----------------------------- 파일함 검색기능 ------------------------------

function activateFileSearch(fileIds) {

}

function activateFolderSearch() {

}

function enterLogPage() {

}
// ----------------------------- 파일함 관리자 설정 ------------------------------

function enterJointPage() {

}

function enterAdminPage() {

}

function enterBasicConfig() {

}

function enterOuterConfig() {

}

function enterLogConfig() {

}


// ----------------------------- 파일함 외부폴더 ------------------------------