# 2022-INTERN(07.01~12.31)

2022년 하반기 인턴 생활을 기록한 곳입니다.<br>
코드 파일들은 모두 보안 처리한 후 업로드하였으므로, 정상적인 실행이 되지 않을 수 있습니다.

<h3> 주차별 업무 정리 </h3>

<details>
<summary><b>07.01~07.07</b></summary>

 ####  ✔ 업무 환경 및 개발 환경 세팅
 * 사내 메신저, 자료 교환, 그룹웨어 등 계정 생성 및 승인.
 * 관리망과 인터넷망에 개발 환경 세팅(PYCHARM, Intellij, JAVA, Python 등 설치)
 ####  ✔ 정제 및 매핑 업무
 * 사용자가 특정한 서식 없이 입력한 데이터들을 조건에 맞게 정제하고, 키워드를 토대로 매핑하는 프로그램을 설계.
 * 사용 언어 : JAVA
 * 사용 자료 구조 : 이중 리스트, 해시맵
 * 데이터 셋 : A(400만), B(20만), C, D
 * 결과물 : A의 키워드와 B의 키워드를 각각 정제한 후, 각 키워드를 토대로 매핑(일치 또는 포함)한다. 매핑 결과 output을 csv 형식으로 출력하고, 이외의 필요한 정보는 C, D에서 추출한다.<br>
<br></details>
 
<details>
<summary><b>07.08~07.14</b></summary>

 #### ✔ 내부 서비스 개편으로 인한 오류 해결 프로그램
 * 이메일 파일의 특정 정보들을 추출해 엑셀 파일로 리스트업하는 프로그램 제작.
 * 사용 언어 : PYTHON
 * 사용 라이브러리 : pandas, openpyxl, configparser, bs4
 * 사용 자료 구조 : 딕셔너리
 * 데이터 셋 : *.eml
 * 결과물 : *.eml 을 email.parser를 이용하여 데이터를 딕셔너리 식으로 저장한 후, 주어진 경로의 엑셀 파일로 출력한다.
 * 특징 : 해당 프로젝트는 오프라인 환경에서 실행되어야 하므로, 사용한 패키지의 *.whl, *.gz 파일을 다운로드 한 후, 실행 환경에서 패키지를 설치하였다.
 #### ✔ 매핑 추가 작업
 * 품목DB와의 추가 매핑.<br>
<br></details>
 
<details>
<summary><b>07.15~07.29</b></summary>
 
 #### ✔ 개발 환경 세팅
 * BXM, ORACLE 설치 및 네트워크 연결
 #### ✔ 온라인 ESG 실태표 작성 페이지(SK이노베이션 계열 전용) 개발
 * 기존 온라인 실태표 작성 페이지를 참고하여 SK이노베이션 계열 전용 온라인 ESG 실태표 작성 페이지 개발.
 * 사용 언어 : html, backbone.js, java
 * DBMS : Oracle
 * 사용 프레임워크 : BXM
 * 신규 개발 업무를 진행하면서, 기존 코드의 오류를 세 가지 발견하였고, 해결하였다.
      - 팝업창 close 버튼 작동 안되는 오류 : 단순 이벤트 처리 함수를 추가하여 해결
      - 버튼의 이미지 클릭 시 작동 안되는 오류 : 이미지에도 동일한 name 값을 주어 해결
      - 일부 데이터가 render 시 초기화되는 오류 : 코드를 수정하여 해결
 * ScreenShot<br>
 ![Title](https://user-images.githubusercontent.com/42367169/182604676-24552c7e-930b-45f1-b0ca-38c3cd1c613e.png)<br>
 <br></details>
  
 <details>
<summary><b>08.01~08.07</b></summary>
 
 #### ✔ 온라인 ESG 실태표 작성 페이지(SK이노베이션 계열 전용) 테스트
 * 개발 및 운영 서버 테스트
 * 추가 수정 요건 반영

  #### ✔ Internet Explorer 브라우저 지원 종료 배너 개발
 * Internet Explorer로 접속 시 IE 지원 종료 배너 개발.
 * '오늘 하루 동안 열지 않음' 버튼 클릭 시 쿠키를 설정하여 하루 동안 배너 숨김 처리.
 * 사용 언어 : html/css, JavaScript
 * 사용 프레임워크 : BXM
 * ScreenShot<br>
 ![IE Browser Banner](https://user-images.githubusercontent.com/42367169/182975544-4d8da600-df3d-421c-9b59-561b6d009d74.PNG)<br>
 <br></details>
   
 <details>
<summary><b>08.08~08.14</b></summary>
 
 #### ✔ 코로나-19 확진으로 인한 휴가<br>
<br></details>
 
  <details>
<summary><b>08.16~08.21</b></summary>
 
 #### ✔ 온라인 ESG 실태표 작성 페이지(SK이노베이션 계열 전용) 데드락 문제 해결
 * 한 페이지의 데이터를 연달아 두 번 저장하는 과정에서 데드락 발생
 * 여러 명의 사용자가 동시에 하나의 테이블에 접근해서 DML문으로 데이터베이스를 변경하면 오라클은 특정 사용자가 자원을 독점하지 못하게 하기 위해서 락(잠금)을 발생시킨다. 서로 락을 풀어주기 전까지 대기 상태에 놓이며 데드락(교착 상태)가 발생한다.
 * 따라서 동시에 DB에 접근하지 않게끔 처리하였다.   
 
  <b>[ 수정 전 - 데드락 발생 ]</b>
  ```javascript
  // 임시저장(설문 답변 DB 접근)
  that.insertGovAnsr(true); 
  
  // 각 STEP별 데이터 유효성 검사
  if(that.parent.isValid("STEP1")){ 
      commonUtil.redirectRoutePage("MENUSD0700SK/STEP1");
      return false;
  }
  if(that.parent.isValid("STEP2")){
      commonUtil.redirectRoutePage("MENUSD0700SK/STEP2");
      return false;
  }
  if(that.parent.isValid("STEP3")){
      commonUtil.redirectRoutePage("MENUSD0700SK/STEP3");
      return false;
  }
  
  // 데이터가 모두 유효한 경우 설문 답변 모두 저장(설문 답변 DB 접근)
  that.insertStepAll();
  ```
  <b>[ 수정 후 - 데드락 발생 X ]</b>
  ```javascript
  // 각 STEP별 데이터 유효성 검사
  if(that.parent.isValid("STEP1")){ 
      // 임시저장(설문 답변 DB 접근)
      that.insertGovAnsr(true); 
      commonUtil.redirectRoutePage("MENUSD0700SK/STEP1");
      return false;
  }
  if(that.parent.isValid("STEP2")){
      // 임시저장(설문 답변 DB 접근)
      that.insertGovAnsr(true); 
      commonUtil.redirectRoutePage("MENUSD0700SK/STEP2");
      return false;
  }
  if(that.parent.isValid("STEP3")){
      // 임시저장(설문 답변 DB 접근)
      that.insertGovAnsr(true);
      commonUtil.redirectRoutePage("MENUSD0700SK/STEP3");
      return false;
  }
  
  // 데이터가 모두 유효한 경우 설문 답변 모두 저장(설문 답변 DB 접근)
  that.insertStepAll();
  ```
   #### ✔ 온라인 ESG 실태표 작성 페이지 오류 해결
   * 유효하지 않은 데이터임에도 경고 문구 출력 후 다음 단계로 넘어가는 오류, 저장 후에도 임시저장을 해야 한다는 문구가 출력되는 오류, 데이터 무결성 오류 등 기존 실태표 사이트 전반에서 발생하는 오류들 해결
   * 본인이 작성하지 않은 코드에서의 오류를 해결하며 코드 분석 능력, 문제 해결 능력, 의사소통 능력을 키움.
 
  #### ✔ 행정구역(광역시도, 시군구명) 코드화 작업
   * 행정표준코드관리시스템(https://www.code.go.kr/stdcode/roadCodeL.do) 에서 행정구역(광역시도, 시군구명) 데이터 입수
   * 입수한 데이터를 DB에 INSERT하고, 하드코딩으로 되어 있던 소스코드 수정.<br>
 <br></details>
 
   <details>
<summary><b>08.22~08.31</b></summary>
 
  #### ✔ 만족도조사 팝업창 웹페이지 코드 분석
  * PC에 최적화된 팝업창 형식의 만족도조사 웹페이지 코드 분석
  * 추후 반응형 웹페이지로 개발하기 위한 사전 학습, 요건 정의서에 따른 화면 구성과 로직 설계<br>
 <br></details>
 
    <details>
<summary><b>09.01~09.08</b></summary>

  #### ✔ 만족도조사 반응형 웹페이지 개발
  * 기존 PC 한정 만족도조사 페이지를 반응형 웹페이지로 수정하여 모바일에서도 사용 가능하게끔 한다.
  * 별도의 링크가 만족도 조사 대상자에게 전송되면, 대상자는 해당 링크로 접속하여 로그인과 만족도 조사를 시행할 수 있다.
  * 사용 언어 : HTML/CSS, Backbone.js, JAVA, SQL
  * DBMS : Oracle
 
 #### ✔ 금융보안원 정보보호 온라인교육 수강
  * 정보보호 인식을 주제로 한 온라인교육 수강
  * 정보보호 인식 강의에서 정보화 사회의 개념, 정보보호를 위해 지켜야 할 사항, 정보 윤리의 필요성, APT방식의 개인정보 유출, 개인정보보호 실천 수칙, 금융권 윤리헌장, 정보보호 관련 법령의 변화(데이터 3법 개정), 정보보호를 위한 프로세스 개선, 정보보호 진단 프레임워크를 통한 수준 진단 등을 학습함.<br>
 <br></details>
 
     <details>
<summary><b>09.13~09.16</b></summary>

 #### ✔ 금융보안원 정보보호 온라인교육 수강
  * 웹 애플리케이션 보안, 개인/신용 정보보호, 금융권 개인정보보호, 시큐어코딩을 주제로 한 온라인교육 수강
  * 웹 애플리케이션 보안 강의에서 Attack Surface, Data Flow, State 관리, HTML5 보안, OWASP Top 10, 자바스크립트 프레임워크 보안성 향상(맞춤 기능보다는 Plugin, Built-in 형태로 기능을 활용할 것), Request/Response에 대한 단계별 필터 적용으로 보안성 향상 등을 학습함.
  * 개인/신용 정보보호 강의에서 신용정보법 및 개인정보보호법, 각 위반 사례를 통한 보호 방안, 개인정보 유출/노출의 이해 및 대응, 개인신용정보의 보안 대책(기술적 : 접근권한, 접속기록, 암호화, 파기, 이용제한 등 물리적 : 단말기 보호, 보안 프로그램 등) 등을 학습함.
  * 금융권 개인정보보호 강의에서 개인정보보호의 필요성, 실천수칙, 사례를 통한 개인정보보호 등을 학습함.
  * 시큐어코딩 강의 1차시에서 시큐어코딩의 정의, 필요성, 사고 사례(SQL 인젝션 취약점으로 개인정보 유출, URL 파라미터 조작 개인정보 노출, 무작위 대입공격 기프트카드 정보 유출 등), 보안 약점과 보안 취약점, 소프트웨어 개발보안 방법 등을 학습함. 
  * 시큐어코딩 강의 2차시에서 시큐어코딩 적용 기준(행정안전부 47개 보안 약점), SQL 삽입(JDBC API 사용 시 SQL 인젝션,  Hibernate ORM 사용 시 SQL 인젝션, MyBatis ORM 사용 시 SQL 인젝션, 입력값 필터링), Reflective XSS, Stroed XSS, 파일 업로드 시 취약점 진단 및 제거 방법 등을 학습함.
  
   #### ✔ 이메일 파서 프로그램 수정
 * 이메일 파일의 특정 정보들을 추출해 엑셀 파일로 리스트업하는 프로그램 요청사항 수정
 * 사용 언어 : PYTHON<br>
 <br></details>
