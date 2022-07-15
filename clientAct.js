export function act() {

}

export function selectRootFolder(fldType) {
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
}

function selectFolderCheckBoxByNames(names) {
    names.forEach(element => cy.contains(element).click());
    //'zaxscd15-새폴더-2022. 7. 15.-24829'
}

function selectCurrentPagesAllCheckBox() {
    cy.get('.frst .chkbox');
}

function activateFileSearch() {

}

function activateFolderSearch() {

}