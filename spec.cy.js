// Javascript 로직 임포트
import * as filebox from "./fileBox";
import {
  downloadByCheckBox,
  downloadByClick,
  selectAllFileNFolder,
  selectDynatreeRootFolder,
  selectFncDropboxNMenu
} from "./fileBox";

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
const MODULE_DELAY = 3000; // 모듈 랜더링 대기 시간

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

// ------------------------ Cypress Activate Logic --------------------
function clientAct() {
  //filebox.selectDynatreeRootFolder('G');
  //filebox.makeFolder();
  var folderIds = ['84','89'];
  filebox.selectDynatreeSubFolderChain(folderIds);
  //changeModuleViewSetting('listType_F','몰라')
  //filebox.upload();
  var fileNames = ['1MB.txt', '3MB.txt'];
  //filebox.downloadByCheckBox(fileNames);
  filebox.selectAllFileNFolder();
  //filebox.deleteAll(true);
  //filebox.selectFncDropboxNMenu('move');
  filebox.move('root_my');
}

// ------------------------ Cypress Activate Logic --------------------
function login() {
  cy.get('#userId').type(USER.ID);
  cy.get('#password').type(USER.PW);
  cy.wait(1000);
  cy.get('#btnLogin').click();
  cy.wait(LOGIN_DELAY);
}

// ------------------------ Default_Module Function  --------------------
function AccessModule() {
  cy.contains(MODULE).click();
  cy.wait(MODULE_DELAY);
}
function refreshModule() {
  cy.contains(MODULE).first().click();
  cy.wait(MODULE_DELAY);
}
function changeModuleViewSetting(listTypeDiv, snbWidth) { //fileBox가 Default
  cy.get('.drop_view_optn').click();
  if(listTypeDiv == 'listType_L') {
    cy.get('#listType_L').click();
  } else {
    cy.get('#listType_F').click();
  }
  // 기본, 넓게, 더 넓게
  if(snbWidth == '기본') {
    cy.get('.ico_snb_sml').parent().click();
  } else if(snbWidth == '넓게') {
    cy.get('.ico_snb_med').parent().click();
  } else {
    cy.get('.ico_snb_lar').parent().click();
  }
}