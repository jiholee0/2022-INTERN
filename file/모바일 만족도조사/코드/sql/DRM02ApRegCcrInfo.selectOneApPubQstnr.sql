SELECT
     AP_NO         AS apNo        /** 신청번호 */      
    ,AP_SVC_GBCD   AS apSvcGbcd   /** 신청서비스구분코드 */ 
    ,DTL_SEQ       AS dtlSeq      /** 상세순번 */      
    ,QSTNR_YMD     AS qstnrYmd    /** 설문일자 */      
    ,QUSTN_NO1     AS qstr1       /** Q1 */    
    ,QUSTN_NO2     AS qstr2       /** Q2 */    
    ,QUSTN_NO3     AS qstr3       /** Q3 */    
    ,QUSTN_NO4     AS qstr4       /** Q4 */    
    ,QUSTN_NO5     AS qstr5       /** Q5 */    
    ,QUSTN_NO6     AS qstr6       /** Q6 */    
    ,QUSTN_NO7     AS qstr7       /** Q7 */    
    ,QUSTN_NO8     AS qstr8       /** Q8 */    
    ,QUSTN_NO9     AS qstr9       /** Q9 */    
    ,QUSTN_NO10    AS qstr10      /** Q10 */    
    ,QUSTN_NO11    AS qstr11      /** Q11 */    
    ,QUSTN_YN1     AS qustn1Yn    /** 질문12여부 */     
    ,QUSTN_TEXT1   AS qustn1Cnts  /** 질문12내용 */     
    ,QUSTN_YN2     AS qustn2Yn    /** 질문13여부 */     
    ,QUSTN_TEXT2   AS qustn2Cnts  /** 질문13내용 */
    ,ETC_TEXT1     AS optQstr1    /** 선택문항1 */
    ,ETC_TEXT2     AS optQstr2    /** 선택문항2 */
    ,MODI_ID       AS modiId      /** 수정자ID */     
    ,MODI_DT       AS modiDt      /** 수정일시 */      
    ,FST_REG_ID    AS fstRegId    /** 최초등록자ID */   
    ,FST_REG_DT    AS fstRegDt    /** 최초등록일시 */    
    ,RSPT_NM       AS rsptNm      /** 응답자명 */      
    ,RSPT_TEL      AS rsptTel     /** 응답자전화번호 */   
    ,RSPNS_STAT_CD AS rspnsStatCd /** 응답상태코드 */
    ,AGREE_YN      AS giftAyn     /** 사은품약관동의여부 */
    ,CONN_GB	     AS connGb     /** 접속구분 */
FROM AP_PUB_QSTNR_NEW 
WHERE 1=1
  AND AP_NO = :apNo
  AND AP_SVC_GBCD = :apSvcGbcd
  UNION ALL
SELECT
     AP_NO         AS apNo        /** 신청번호 */      
    ,AP_SVC_GBCD   AS apSvcGbcd   /** 신청서비스구분코드 */ 
    ,DTL_SEQ       AS dtlSeq      /** 상세순번 */      
    ,QSTNR_YMD     AS qstnrYmd    /** 설문일자 */      
    ,NULL     AS qstr1       /** Q1 */    
    ,NULL     AS qstr2       /** Q2 */    
    ,NULL     AS qstr3       /** Q3 */    
    ,NULL     AS qstr4       /** Q4 */    
    ,NULL     AS qstr5       /** Q5 */    
    ,NULL     AS qstr6       /** Q6 */    
    ,NULL     AS qstr7       /** Q7 */    
    ,NULL     AS qstr8       /** Q8 */    
    ,NULL     AS qstr9       /** Q9 */    
    ,NULL    AS qstr10      /** Q10 */    
    ,NULL    AS qstr11      /** Q11 */    
    ,NULL     AS qustn1Yn    /** 질문12여부 */     
    ,NULL   AS qustn1Cnts  /** 질문12내용 */     
    ,NULL     AS qustn2Yn    /** 질문13여부 */     
    ,NULL   AS qustn2Cnts  /** 질문13내용 */
    ,NULL     AS optQstr1    /** 선택문항1 */
    ,NULL     AS optQstr2    /** 선택문항2 */
    ,MODI_ID       AS modiId      /** 수정자ID */     
    ,MODI_DT       AS modiDt      /** 수정일시 */      
    ,FST_REG_ID    AS fstRegId    /** 최초등록자ID */   
    ,FST_REG_DT    AS fstRegDt    /** 최초등록일시 */    
    ,RSPT_NM       AS rsptNm      /** 응답자명 */      
    ,RSPT_TEL      AS rsptTel     /** 응답자전화번호 */   
    ,RSPNS_STAT_CD AS rspnsStatCd /** 응답상태코드 */
    ,''      AS giftAyn     /** 사은품약관동의여부 */
    ,NULL      AS connGb     /** 접속구분 */
FROM AP_PUB_QSTNR
 WHERE 1=1 
  AND AP_NO = :apNo
  AND AP_SVC_GBCD = :apSvcGbcd
  ORDER BY QSTNRYMD DESC FETCH FIRST 1 ROW ONLY