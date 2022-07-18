
// ----------------------------- ------ 공통 --------------------------------

function checkAutoConfirm(confirm) {
    if(confirm) {
        cy.get('#fbxMove_confirm').click();
    }
}

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
 * select fbx Dynatree's subFolder, by Click it's subFolder continuosly
 * @param folderIds Id that represent Childs folderId
 */
export function selectDynatreeSubFolderChain(folderIds) {
    folderIds.forEach(element => cy.get('#dynatree-id-' + element).click().wait(500));
}


// ----------------------------- 파일함 작업 ------------------------------
// 올리기, 내려받기, 새폴더, 삭제, 이동, 복사, 공유, 이름변경, 메일발송

/**
 * select All file and Folders in current Filebox
 */
export function selectAllFileNFolder() {
    cy.get('#fbxList_listEvent .chkbox').click();
}

/**
 * activate CheckBox that have folderId's folderId
 * @param folderIds folder Id that wants to Check
 */
export function selectFolderCheckBoxByNames(folderIds) {
    // 폴더 아이디 배열을 받아 클릭 활성화
    // 밑의 folderChk는 클릭이 되지 않기 때문에 부모요소로 접근하여 클릭한다.
    folderIds.forEach(element => cy.get('._folderChk[data-folder-id="' +element + '"]').first().parent().click());
}

export function selectFileCheckBoxByNames(fileNames) {
    // 파일 이름 배열을 받아 클릭 활성화
    // 밑의 fileChk는 클릭이 되지 않기 때문에 부모요소로 접근하여 클릭한다.
    fileNames.forEach(element => cy.get('._fileChk[data-realfilename="' +element + '"]').first().parent().click());
}

export function selectFncDropboxNMenu(menu) {
    switch(menu) {
        case 'move' :
            cy.get('._btn_move').click({force:true});
            break;
        case 'copy' :
            cy.get('._btn_copy').click({force:true});
            break;
        case 'rename' :
            cy.get('#fbxList_rename').click({force:true});
            break;
        case 'send' :
            cy.get('#fbxList_mailSend').click({force:true});
            break;
    }
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
    fileNames.forEach(element => cy.get('._file[data-realfilename="' +element + '"]').click({force:true}));
}

/*
* activate file download by Checkbox and Dropbox click
* */
export function downloadByCheckBox(fileNames) {
    selectFileCheckBoxByNames(fileNames);
    cy.get('._btn_download').click().wait(500);
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

/**
 * delete All File and Folders in current Filebox
 * ( because confirm is Popup, complete auto delete is still imposiible, have to click popup comfirm button )
 */
export function deleteAll() {
    selectAllFileNFolder();
    cy.get('._btn_delete').click().wait(1000);
}

/**
 * move file to certain folder
 * @param folderId folderId that move files to.
 * @param confirm default value is false. if true, click confirm button
 */
export function move(folderId, confirm) {
    var confirm = false;
    selectFncDropboxNMenu('move');
    cy.get('#fbxMove_folderTree #dynatree-id-' + folderId).click();
    checkAutoConfirm(confirm);
}

/**
 * copy file to certain folder
 * @param folderId folderId that copy files to.
 * @param confirm default value is false. if true, click confirm button
 */
function copy(folderId, confirm) {
    selectFncDropboxNMenu('copy');
    cy.get('#fbxMove_folderTree #dynatree-id-' + folderId).click();
    checkAutoConfirm(confirm);
}

/**
 * copy file to certain folder
 * @param folderId folderId that copy files to.
 * @param confirm default value is false. if true, click confirm button
 */
function changeName(folderId, confirm) {
    selectFncDropboxNMenu('rename');
    cy.get('#fbxMove_folderTree #dynatree-id-' + folderId).click();
    checkAutoConfirm(confirm);
}

function sendMailWithFile() {

}

function fileOpenByAPI() {

}

function fileThumnail() {

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