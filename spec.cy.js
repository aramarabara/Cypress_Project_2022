// Javascript 로직 임포트
// ------------------------ 기본 테스트로직 --------------------------

// ------------------------  계정 정보  -----------------------------
const ADMIN = { ID: 'systemadmin', PW: 'where0407'};
const ME = { ID: 'zaxscd95', PW: '1234'};
const USER1 = { ID: 'zaxscd15', PW: '1234'};
const USER2 = { ID: 'zaxscd25', PW: '1234'};
const USER3 = { ID: 'zaxscd35', PW: '1234'};
const USER4= { ID: 'zaxscd45', PW: '1234'};
const URL = `http://111.naonsoft.kr/ekp`;
const LOGIN_DELAY = 3000; // 페이지 랜더링 대기 시간

// ------------------------ 로그인 및 모듈정보 입력 --------------------
const USER = USER1;
const MODULE = '파일관리'
const SITE = {name : 'sq7', isServer : false };
/*const LOGIC = DefaultFileBox;*/

// ------------------------ Cypress 로직실행  --------------------
// 하나의 IT에서 로직 실행 ( 그렇지 않으면 SESSION이 만료된다. )
it('LOGIN', () => {
  cy.visit(visit(SITE.name, SITE.isServer))
  login();
  AccessModule();
  clientAct();
})

// ------------------------ 로그인 & 방문 및 클라이언트 로직 실행 함수 --------------------
function visit(site, isServer) {
  let defaultSite = URL;
  if(isServer) {
    defaultSite = defaultSite.replace('/ekp', "");
  }
  defaultSite = defaultSite.replace('111', site);
  return defaultSite
}

function login() {
  cy.get('#userId').type(USER.ID);
  cy.get('#password').type(USER.PW);
  cy.wait(1000);
  cy.get('#btnLogin').click();
  cy.wait(LOGIN_DELAY);
}

function AccessModule() {
  cy.contains(MODULE)
      .click();
}

function clientAct() {
  cy.wait(3000);
  selectRootFolder('MY')
  cy.wait(3000);
  //makeFolder();
  var names = ['zaxscd15-새폴더-2022. 7. 15.-24829']
  selectFolderCheckBoxByNames(names);

}


function selectRootFolder(fldType) {
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

function makeFolder() {
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

