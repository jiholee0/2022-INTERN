# 2022-INTERN(07.01~12.31)

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
 * 결과물 : A의 키워드와 B의 키워드를 각각 정제한 후, 각 키워드를 토대로 매핑(일치 또는 포함)한다. 매핑 결과 output을 csv 형식으로 출력하고, 이외의 필요한 정보는 C, D에서 추출한다.
</details>
 
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
 * 품목DB와의 추가 매핑.
</details>
 
<details>
<summary><b>07.15~07.29</b></summary>
 
 #### ✔ 개발 환경 세팅
 * BXM, ORACLE 설치 및 네트워크 연결
 #### ✔ 온라인 ESG 실태표 작성 페이지(SK이노베이션 계열 전용) 개발
 * 기존 온라인 실태표 작성 페이지를 참고하여 SK이노베이션 계열 전용 온라인 ESG 실태표 작성 페이지 개발.
 * 사용 언어 : html, backbone.js, java
 * DBMS : Oracle
 * 사용 프레임워크 : BXM
 * [문제해결] 신규 개발 업무를 진행하면서, 기존 코드의 오류를 세 가지 발견하였고, 해결하였다.
      - 팝업창 close 버튼 작동 안되는 오류 : 단순 이벤트 처리 함수를 추가하여 해결
      - 버튼의 이미지 클릭 시 작동 안되는 오류 : 이미지에도 동일한 name 값을 주어 해결
      - 일부 데이터가 render 시 초기화되는 오류 : 코드를 수정하여 해결
 </details>
  
 <details>
<summary><b>08.01~08.07</b></summary>
 
 #### ✔ 온라인 ESG 실태표 작성 페이지(SK이노베이션 계열 전용) 운영 및 문의 대응
 * 추가 수정 요건 반영
 * 배포 및 실제 서비스 운영
 * 운영 서버 테스트
  #### ✔ Internet Explorer 종료 알림 배너 개발
 * Internet Explorer로 접속 시 IE 종료 알림 배너 개발
 * 오늘 하루 동안 열지 않음 버튼 클릭 시 쿠키를 설정하여 하루 동안 배너를 숨긴다.
 * 사용 언어 : html, css, JavaScript
 </details>
