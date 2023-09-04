//  ** Cypress는 현재 팝업 윈도우 테스팅을 지원하지 않음, 모든 팝업창 기능은 테스트에서 제외됨

// Javascript 로직 임포트
import * as filebox from "./fileBox";
import * as organization from "./organization";

// ------------------------ 기본 테스트로직 --------------------------

// ------------------------  계정 정보  -----------------------------
const ADMIN = { ID: 'systemadmin', PW: 'paging0809'};
const ME = { ID: 'zaxscd95', PW: '1234'};
const USER1 = { ID: 'zaxscd15', PW: '1234'};
const USER2 = { ID: 'zaxscd25', PW: '1234'};
const USER3 = { ID: 'zaxscd35', PW: '1234'};
const USER4= { ID: 'zaxscd45', PW: '1234'};
const URL = `http://111.naonsoft.kr/ekp`;
const LOGIN_DELAY = 5000; // 페이지 랜더링 대기 시간
const MODULE_DELAY = 3000; // 모듈 랜더링 대기 시간

// ------------------------ 로그인 및 모듈정보 입력 --------------------
const USER = ADMIN;
const MODULE = '관리자'
const ETC_MODULE_SELECTOR = '.gnb_menu .mn_admin a'
const SITE = {name : 'oq7', isServer : false };

// ------------------------ 테스트 일감 정보 입력 ----------------------
const TASK_NUMBER = '#69906 통합권한관리>권한관리>파일관리 외부폴더 출력권한 제거(DML 있음)';

// ------------------------ Cypress 로직실행  ------------------------
// it을 분리하게 되면 Session이 만료된다.
// cypress는 it을 모두 실행시킨 후 순서에 맞게 다시 rewind하는 방법으로 테스트를 진행한다.
describe(`${TASK_NUMBER}_TEST`, () => {
  it('LOGIN_ACCESS_MODULE', () => {
    cy.visit(visit(SITE.name, SITE.isServer))
    //login() - SSO로 로그인 절차 생략가능
    AccessModule(true);
    clientAct();
  })

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
  organization.accessAdminMenuWithId('#roleMgt');
  cy.wait(300)
  cy.get("#cmmRoleMngMain_tabs li a").contains('권한관리').click();
  cy.get('.dynatree-container').contains('파일관리').click();
  cy.get('.dynatree-container').should('not.contain', '외부폴더');
}

// ------------------------ Cypress Activate Logic --------------------
/*function login() {
  cy.get('#userId').type(USER.ID);
  cy.get('#password').type(USER.PW);
  cy.wait(2000);
  cy.get('#btnLogin').click();
  cy.wait(LOGIN_DELAY);
}*/

// ------------------------ Default_Module Function  --------------------
function AccessModule(etcMenu) {
  if(etcMenu) {
    let cyObject = cy.get(`${ETC_MODULE_SELECTOR}`).click({
      multiple : true,
      force : true
    });
  } else {
    cy.contains(MODULE).click();
  }
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