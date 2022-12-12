# 2022-INTERN
2022년도 하반기 인턴(07.01~12.31)

2022년 하반기 인턴 생활을 기록한 곳입니다.<br>
코드 파일들은 모두 보안 처리한 후 업로드하였으므로, 정상적인 실행이 되지 않을 수 있습니다.

<h3> 주차별 업무 정리 </h3>

<details>
<summary><b>07.01~07.07</b></summary>

 ####  ✔ 업무 환경 및 개발 환경 세팅
 - 사내 메신저, 자료 교환, 그룹웨어 등 계정 생성 및 승인.
 - 관리망과 인터넷망에 개발 환경 세팅(PYCHARM, Intellij, JAVA, Python 등 설치)
 ####  ✔ 정제 및 매핑 업무
 - 사용자가 특정한 서식 없이 입력한 데이터들을 조건에 맞게 정제하고, 키워드를 토대로 매핑하는 프로그램을 설계.
 - 사용 언어 : JAVA
 - 사용 자료 구조 : 이중 리스트, 해시맵
 - 데이터 셋 : A(400만), B(20만), C, D
 - 결과물 : A의 키워드와 B의 키워드를 각각 정제한 후, 각 키워드를 토대로 매핑(일치 또는 포함)한다. 매핑 결과 output을 csv 형식으로 출력하고, 이외의 필요한 정보는 C, D에서 추출한다.<br>
 
<br></details>
 
<details>
<summary><b>07.08~07.14</b></summary>

 #### ✔ 내부 서비스 개편으로 인한 오류 해결 프로그램
 - 이메일 파일의 특정 정보들을 추출해 엑셀 파일로 리스트업하는 프로그램 제작.
 - 사용 언어 : PYTHON
 - 사용 라이브러리 : pandas, openpyxl, configparser, bs4
 - 사용 자료 구조 : 딕셔너리
 - 데이터 셋 : *.eml
 - 결과물 : *.eml 을 email.parser를 이용하여 데이터를 딕셔너리 식으로 저장한 후, 주어진 경로의 엑셀 파일로 출력한다.
 - 특징 : 해당 프로젝트는 오프라인 환경에서 실행되어야 하므로, 사용한 패키지의 *.whl, *.gz 파일을 다운로드 한 후, 실행 환경에서 패키지를 설치하였다.
 #### ✔ 매핑 추가 작업
 - 품목DB와의 추가 매핑.<br>
 
<br></details>
 
<details>
<summary><b>07.15~07.29</b></summary>
 
 #### ✔ 개발 환경 세팅
 - BXM, ORACLE 설치 및 네트워크 연결
 #### ✔ 온라인 ESG 실태표 작성 페이지(SK이노베이션 계열 전용) 개발
 - 기존 온라인 실태표 작성 페이지를 참고하여 SK이노베이션 계열 전용 온라인 ESG 실태표 작성 페이지 개발.
 - 사용 언어 : html, backbone.js, java
 - DBMS : Oracle
 - 사용 프레임워크 : BXM
 - 신규 개발 업무를 진행하면서, 기존 코드의 오류를 세 가지 발견하였고, 해결하였다.
      - 팝업창 close 버튼 작동 안되는 오류 : 단순 이벤트 처리 함수를 추가하여 해결
      - 버튼의 이미지 클릭 시 작동 안되는 오류 : 이미지에도 동일한 name 값을 주어 해결
      - 일부 데이터가 render 시 초기화되는 오류 : 코드를 수정하여 해결
 - ScreenShot<br>
 ![Title](https://user-images.githubusercontent.com/42367169/182604676-24552c7e-930b-45f1-b0ca-38c3cd1c613e.png)<br>
 
 <br></details>
  
<details>
<summary><b>08.01~08.07</b></summary>
 
 #### ✔ 온라인 ESG 실태표 작성 페이지(SK이노베이션 계열 전용) 테스트
 - 개발 및 운영 서버 테스트
 - 추가 수정 요건 반영
  #### ✔ Internet Explorer 브라우저 지원 종료 배너 개발
 - Internet Explorer로 접속 시 IE 지원 종료 배너 개발.
 - '오늘 하루 동안 열지 않음' 버튼 클릭 시 쿠키를 설정하여 하루 동안 배너 숨김 처리.
 - 사용 언어 : html/css, JavaScript
 - 사용 프레임워크 : BXM
 - ScreenShot<br>
 ![IE Browser Banner](https://user-images.githubusercontent.com/42367169/182975544-4d8da600-df3d-421c-9b59-561b6d009d74.PNG)<br>
 
 <br></details>
   
<details>
<summary><b>08.08~08.14</b></summary>
 
 #### ✔ 코로나-19 확진으로 인한 휴가<br>
<br></details>
 
<details>
<summary><b>08.16~08.21</b></summary>
 
 #### ✔ 온라인 ESG 실태표 작성 페이지(SK이노베이션 계열 전용) 데드락 문제 해결
 - 한 페이지의 데이터를 연달아 두 번 저장하는 과정에서 데드락 발생
 - 여러 명의 사용자가 동시에 하나의 테이블에 접근해서 DML문으로 데이터베이스를 변경하면 오라클은 특정 사용자가 자원을 독점하지 못하게 하기 위해서 락(잠금)을 발생시킨다. 서로 락을 풀어주기 전까지 대기 상태에 놓이며 데드락(교착 상태)가 발생한다.
 - 따라서 동시에 DB에 접근하지 않게끔 처리하였다.   
 
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
   - 유효하지 않은 데이터임에도 경고 문구 출력 후 다음 단계로 넘어가는 오류, 저장 후에도 임시저장을 해야 한다는 문구가 출력되는 오류, 데이터 무결성 오류 등 기존 실태표 사이트 전반에서 발생하는 오류들 해결
   - 본인이 작성하지 않은 코드에서의 오류를 해결하며 코드 분석 능력, 문제 해결 능력, 의사소통 능력을 키움.
  #### ✔ 행정구역(광역시도, 시군구명) 코드화 작업
   - 행정표준코드관리시스템(https://www.code.go.kr/stdcode/roadCodeL.do) 에서 행정구역(광역시도, 시군구명) 데이터 입수
   - 입수한 데이터를 DB에 INSERT하고, 하드코딩으로 되어 있던 소스코드 수정.<br>
   
 <br></details>
 
<details>
<summary><b>08.22~08.31</b></summary>
 
#### ✔ 만족도조사 팝업창 웹페이지 코드 분석
- PC에 최적화된 팝업창 형식의 만족도조사 웹페이지 코드 분석
- 추후 반응형 웹페이지로 개발하기 위한 사전 학습, 요건 정의서에 따른 화면 구성과 로직 설계<br>
  
<br></details>
 
<details>
<summary><b>09.01~09.08</b></summary>

  #### ✔ 만족도조사 반응형 웹페이지 개발
  - 기존 PC 한정 만족도조사 페이지를 반응형 웹페이지로 수정하여 모바일에서도 사용 가능하게끔 한다.
  - 별도의 링크가 만족도 조사 대상자에게 전송되면, 대상자는 해당 링크로 접속하여 로그인과 만족도 조사를 시행할 수 있다.
  - 사용 언어 : HTML/CSS, Backbone.js, JAVA, SQL
  - DBMS : Oracle
 #### ✔ 금융보안원 정보보호 온라인교육 수강
  - 정보보호 인식을 주제로 한 온라인교육 수강
  - 정보보호 인식 강의에서 정보화 사회의 개념, 정보보호를 위해 지켜야 할 사항, 정보 윤리의 필요성, APT방식의 개인정보 유출, 개인정보보호 실천 수칙, 금융권 윤리헌장, 정보보호 관련 법령의 변화(데이터 3법 개정), 정보보호를 위한 프로세스 개선, 정보보호 진단 프레임워크를 통한 수준 진단 등을 학습함.<br>
  
 <br></details>
 
<details>
<summary><b>09.13~09.16</b></summary>

 #### ✔ 금융보안원 정보보호 온라인교육 수강
  - 웹 애플리케이션 보안, 개인/신용 정보보호, 금융권 개인정보보호, 시큐어코딩을 주제로 한 온라인교육 수강
  - 웹 애플리케이션 보안 강의에서 Attack Surface, Data Flow, State 관리, HTML5 보안, OWASP Top 10, 자바스크립트 프레임워크 보안성 향상(맞춤 기능보다는 Plugin, Built-in 형태로 기능을 활용할 것), Request/Response에 대한 단계별 필터 적용으로 보안성 향상 등을 학습함.
  - 개인/신용 정보보호 강의에서 신용정보법 및 개인정보보호법, 각 위반 사례를 통한 보호 방안, 개인정보 유출/노출의 이해 및 대응, 개인신용정보의 보안 대책(기술적 : 접근권한, 접속기록, 암호화, 파기, 이용제한 등 물리적 : 단말기 보호, 보안 프로그램 등) 등을 학습함.
  - 금융권 개인정보보호 강의에서 개인정보보호의 필요성, 실천수칙, 사례를 통한 개인정보보호 등을 학습함.
  - 시큐어코딩 강의 1차시에서 시큐어코딩의 정의, 필요성, 사고 사례(SQL 인젝션 취약점으로 개인정보 유출, URL 파라미터 조작 개인정보 노출, 무작위 대입공격 기프트카드 정보 유출 등), 보안 약점과 보안 취약점, 소프트웨어 개발보안 방법 등을 학습함. 
  - 시큐어코딩 강의 2차시에서 시큐어코딩 적용 기준(행정안전부 47개 보안 약점), SQL 삽입(JDBC API 사용 시 SQL 인젝션,  Hibernate ORM 사용 시 SQL 인젝션, MyBatis ORM 사용 시 SQL 인젝션, 입력값 필터링), Reflective XSS, Stroed XSS, 파일 업로드 시 취약점 진단 및 제거 방법 등을 학습함.

 <br></details>
 
 <details>
 <summary><b>09.19~09.23</b></summary>
  
 #### ✔ 이메일 파서 프로그램 수정
 - 기존에 개발하였던 이메일 파일의 특정 정보들을 추출해 엑셀 파일로 리스트업하는 프로그램의 추가 요청사항 반영
 - output 파일명을 '대외의뢰서 변환 날짜_시분'으로 변경함.
 - 출력되는 데이터를 일부 추가함.
 - 보안 상 자동 암호화처리되는 엑셀 파일로 인해 제대로 실행되지 않는 문제를 해결함. 엑셀 파일이 아닌 텍스트 파일로 변경 후 접근함.
 - 사용 언어 : PYTHON<br>
 
  <br></details>
 
 <details>
 <summary><b>09.26~09.30</b></summary>
 
 #### ✔ 웹 스크래핑 프로그램 에러 분석
 - TDB 웹사이트 스크래핑 프로그램에서 발생하는 에러를 분석하고 해결함.
 - 스크래핑 시 여러 에러가 발견됨. 데이터 값이 들어가지 않아 NULL 에러, IndexOutOfBounds 에러, Malformed URL 에러, UnknownHost 에러 등이 발생하였다.
 - 해당 에러들의 원인으로 웹사이트 내부에서 행한 스크래핑 차단이라 추측함.
 - 해결 방법 : 사용자가 실제 사이트에 접속해서 활동하는 것보다 더 빠르게 여러 페이지에 접속하고 온라인 폼을 채워서 스크래핑 한다면 일단 사용자가 아니라는 인식을 주게 되어 차단될 수 있다. 또한, 반복문으로 여러 페이지를 로딩하여 처리하거나 멀티 쓰레드 프로그래밍 방식으로 처리하면 서버에 부하를 많이 줄 수 있게 된다. 각 페이지에 접속하고 데이터 요청을 하는 건 최소한으로 하는게 좋다. 따라서 ime.sleep문으로 각 페이지에 접속 시 간격을 두어 부하를 줄였다.<br>
 
 <br></details>
 
 <details>
 <summary><b>10.04~10.14</b></summary>
 
 #### ✔ Internet Explorer 브라우저 지원 종료 안내 팝업 개발
 - Internet Explorer로 접속 시 뜨는 IE 브라우저 지원 종료 안내 페이지 개발
 - 기존 배너 형식에서 페이지 전환 방식으로 수정
 - 사용 언어 : html/css, JavaScript
 - 사용 프레임워크 : BXM <br>
 
 <br></details>
 
 <details>
 <summary><b>10.17~10.28</b></summary>
 
 #### ✔ OPEN DART의 공시검색 OPEN API 활용
 - 전자 공시에서 제공하는 open api를 활용하여 원하는 데이터(본사에서 제출한 공시보고서 및 특정 기업들의 공시보고서 제출 내역)를 입수하였다.
 - 기업의 전자 공시 정보를 얻기 위해 필요한 값인 '고유 번호(corp_code)'의 api를 호출하여 원하는 기업들의 고유 번호를 추출하였고, 이후 추출한 고유 번호를 이용하여 공시보고서 제출 내역을 입수하였다. 고유 번호 open api의 경우 zip file(binary) 형식으로 데이터를 제공하므로 xml 파일로 변환한 후 기업들의 고유 번호, 정식명칭, 종목코드 데이터를 입수하였다.
 #### ✔ 이메일 파서 프로그램 수정
 - 해당 프로그램 사용 부서 측 요구 사항을 반영하였다.
 - 국가 코드와 국가명을 매핑하여 추출 데이터에 국가명 뿐 아니라 국가 코드도 함께 들어가게끔 수정하였다.
 - 출력되는 데이터를 일부 수정하였다.(불필요한 데이터 삭제, 데이터 정제)<br>
 
 <br></details>
 
 <details>
 <summary><b>11.01~11.08</b></summary>
 
 #### ✔ OZ REPORT 기반 보고서 양식 개발
- 웹 기반 레포팅 솔루션인 "OZ REPORT" 툴의 사용법을 학습하였다.
- 이후 OZ REPORT 기반 보고서 양식 개발을 위한 환경을 세팅하였다.
- 기존에 AI REPORT로 개발된 보고서들을 참고하여 OZ REPORT 기반의 양식을 개발하였다.
- 민간제출용 TCB 보고서, 국문/영문 등급 확인서, 당좌거래 용 신용평가등급확인서, 기업신용평가등급확인서 총 4개의 보고서를 담당하여 AI REPORT와 PDF로 출력된 형식에 맞게 OZ REPORT 툴을 활용하여 템플릿을 개발하였다.<br>

 <br></details>
 
 <details>
 <summary><b>11.09~11.16</b></summary>
 
 #### ✔ Apache NIFI 교육 수강
- 시스템 간 데이터 전달 처리, 관리, 모니터링 시스템인 Apache NIFI 교육을 수강하였다.
- 실습을 진행하며 추후 사내에 활용할 NIFI 오픈소스를 경험해보고 학습하였다.
 #### ✔ 웹 로그 수집 및 기록 분석
- 웹 서버에서 제공하는 로그 수집
- 세션을 이용하여 로그 수집
- 스크립트 코드를 삽입하여 수집
- 방문객이 웹 서버에 접속할 때 발생되는 세션 정보를 이용하여 방문자 세션을 구분하고, 세션 정보가 존재하지 않는 로그에 대해서는 최대 유휴 시간을 적용하여 구분한다. whois 정보를 이용하여 방문 ip 주소에 대한 정보 얻을 수 있다.<br>

 <br></details>
 
<details>
<summary><b>11.17~11.25</b></summary>
 
 #### ✔ 스크래핑 프로그램 확대 개발
- 스크래핑 항목을 확대하여 수정하였다.
- 신규 스크래핑 : 개인사업자 납세증명서 데이터 입수를 테스트하고 반영하였다.
- 개인 사업자 종합 소득세 신고서 결산 연/월 데이터 입수 방식을 변경하여 수정 개발하였다.
 #### ✔ 주민등록번호 데이터 마스킹 처리 개발
- 주민등록번호 데이터 입수 시 DB에 마스킹 처리되어 저장되도록 기존 코드를 수정하여 개발하였다.<br>

 <br></details>
 
<details>
<summary><b>11.28~11.30</b></summary>
 
 #### ✔ 공동대표자 데이터 입수 방식 변경 개발
- 해당 부서의 요청 수정 사항을 반영하였다.
- 공동 대표자 데이터 입수 방식을 일부 변경하고 반영하였다.<br>

 <br></details>
 
<details>
<summary><b>12.01~12.09</b></summary>
 
 #### ✔ 통합신청 제출서류 파일 확장자 제한 형식 수정
- 기존에는 블랙 리스트 방식으로 관리되던 업로드 파일 확장자 제한을 화이트 리스트 방식으로 변경하였다.
- 사용 가능한 확장자만 검증 처리를 하여 보안을 강화하고자 하였다.

  <b>[ 기존 코드 ]</b>
  ```javascript
  if(fileExt == "zip" || fileExt == "egg" || fileExt == "tif" || fileExt == "gif" ||
     fileExt == "exe" || fileExt == "tiff" || fileExt == "url" || fileEx == "ctf") {
      commonUtil.alertError("zip, egg, tif, gif, exe, tiff, url, ctf 파일은 업로드가 제한됩니다.");
      continue;
  }
  ```
  <b>[ 수정한 코드 ]</b>
  ```javascript
  var fileWhiteList = ["csv", "png", "doc", "docx", "ppt", "pptx", "gif", "tif", "tiff", 
                       "hwp", "jpeg", "jpg", "pdf", "txt", "xls", "xlsx", "zip"];
  if(!fileWhiteList.includes(fileExt)){
    commonUtil.alertError(fileExt+" 파일은 업로드가 제한됩니다.");
    continue;
  }
  ```
  <br><br></details>

