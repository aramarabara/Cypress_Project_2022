// ----------------------------- ------ 공통 --------------------------------

export function setTestConfig() {
    cy.get("#emlSnbMenu_mailCfg").click();
    cy.wait(1500);
    cy.get('#emlUserCfg_writeOpenNewWindow').then(($checkbox) => {
        if ($checkbox.prop('checked')) {
            cy.get('#emlUserCfg_writeOpenNewWindow').click({
                force : true
            });
        }
    }).then(() => {
        cy.get("#emlUserCfg_btnCfgSave").click();
    });
}

export  function executeMailSend() {
    cy.get("._emlMailReg_sendMailButton").click({
        multiple : true
    })
}

// ----------------------------- 메일 기본기능 ------------------------------

/**
 * 내게 보내는 메일 작성
 * @param mailSubject mail subject
 */
export function writeSimpleMail(mailSubject) {
    cy.get("#emlSnbMenu_mailRegButton").click().then(() => {
        cy.wait(2500);
        cy.get(".sub_div #emlMailReg_subject").type(mailSubject);
    }).then(() => {
        cy.wait(500);
        cy.get("#emlMailReg_sendMeYn").click({
            force : true
        });
    });
}

/**
 * 약속메일 작성
 */
export function writePromiseMail() {
    cy.get("#emlMailReg_promsMailYn").click();
    cy.get("#emlMailReg_promsStartDt").click();
    cy.get("#ui-datepicker-div tbody").contains(5).click();
    cy.get("#emlMailReg_promsEndDt").click();
    cy.get("#ui-datepicker-div tbody").contains(5).click();

    cy.get("#emlMailReg_promsStartTime").click();
    cy.wait(500);
    cy.get(".ui-timepicker-list").contains("00:00").click({
        force : true
    });
    cy.get("#emlMailReg_promsEndTime").click();
    cy.wait(500);
    cy.get('.ui-timepicker-list').each(($element) => {
        cy.wrap($element).contains("00:00").click({
            force : true
        });
    });

    cy.get("#emlMailReg_promsPlace").type("약속메일 장소");
    cy.get("#emlMailReg_promsContent").type("약속메일 내용");
}
