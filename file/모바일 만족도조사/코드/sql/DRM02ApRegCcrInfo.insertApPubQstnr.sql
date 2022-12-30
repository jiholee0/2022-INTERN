MERGE INTO AP_PUB_QSTNR_NEW 
USING DUAL 
	ON (AP_NO = :apNo 
	AND AP_SVC_GBCD = :apSvcGbcd 
	<if test="dtlSeq != null and dtlSeq != ''">
	AND DTL_SEQ = :dtlSeq 
	</if>)
WHEN MATCHED THEN
UPDATE SET 
     QSTNR_YMD =  TO_CHAR(SYSDATE , 'YYYYMMDD')    /** 설문일자 */      
    ,QUSTN_NO1	= :qstr1    /** 질문1 */     
    ,QUSTN_NO2	= :qstr2    /** 질문2 */     
    ,QUSTN_NO3	= :qstr3    /** 질문3 */     
    ,QUSTN_NO4	= :qstr4    /** 질문4 */     
    ,QUSTN_NO5	= :qstr5    /** 질문5 */     
    ,QUSTN_NO6	= :qstr6    /** 질문6 */     
    ,QUSTN_NO7	= :qstr7    /** 질문7 */     
    ,QUSTN_NO8	= :qstr8    /** 질문8 */     
    ,QUSTN_NO9	= :qstr9    /** 질문9 */     
    ,QUSTN_NO10	= :qstr10   /** 질문10 */     
    ,QUSTN_NO11	= :qstr11   /** 질문11 */     
    ,QUSTN_YN1    = :qustn1Yn    /** 질문12여부 */     
    ,QUSTN_TEXT1  = :qustn1Cnts  /** 질문12내용 */     
    ,QUSTN_YN2    = :qustn2Yn    /** 질문13여부 */     
    ,QUSTN_TEXT2  = :qustn2Cnts  /** 질문13내용 */     
    ,ETC_TEXT1	=  :optQstr1  /** 선택문항1 */     
    ,ETC_TEXT2 =  :optQstr2  /** 선택문항2 */     
    ,MODI_ID       = :modiId      /** 수정자ID */     
    ,MODI_DT       = SYSDATE          /** 수정일시 */         
    ,RSPT_NM       = :rsptNm      /** 응답자명 */      
    ,RSPT_TEL      = :rsptTel     /** 응답자전화번호 */   
    ,RSPNS_STAT_CD = :rspnsStatCd /** 응답상태코드 */
    ,AGREE_YN	=  :giftAyn /** 사은품약관동의 */
    ,QUSTN_NO12 	=  :optQstr1No /** 기타문항14 숫자 */
    ,CONN_GB 	= :connGb /** 접속구분 */
WHEN NOT MATCHED THEN
INSERT (
     AP_NO         		/** 신청번호 */      
    ,AP_SVC_GBCD   /** 신청서비스구분코드 */ 
    ,DTL_SEQ      		/** 상세순번 */      
    ,QSTNR_YMD     	/** 설문일자 */      
    ,QUSTN_NO1		/** 질문1 */
    ,QUSTN_NO2		/** 질문2 */
    ,QUSTN_NO3		/** 질문3 */
    ,QUSTN_NO4		/** 질문4 */
    ,QUSTN_NO5		/** 질문5 */
    ,QUSTN_NO6		/** 질문6 */
    ,QUSTN_NO7		/** 질문7 */
    ,QUSTN_NO8		/** 질문8 */
    ,QUSTN_NO9		/** 질문9 */
    ,QUSTN_NO10		/** 질문10 */
    ,QUSTN_NO11		/** 질문11 */
    ,QUSTN_YN1    	/** 질문1여부 */     
    ,QUSTN_TEXT1    /** 질문1내용 */     
    ,QUSTN_YN2    	/** 질문2여부 */     
    ,QUSTN_TEXT2	    /** 질문2내용 */  
    ,ETC_TEXT1   		/** 선택문항1 */  
    ,ETC_TEXT2			/** 선택문항2 */  
    ,FST_REG_ID    	/** 최초등록자ID */   
    ,FST_REG_DT    	/** 최초등록일시 */    
    ,RSPT_NM      		/** 응답자명 */      
    ,RSPT_TEL      		/** 응답자전화번호 */   
    ,RSPNS_STAT_CD /** 응답상태코드 */
    ,AGREE_YN			/** 사은품약관동의 */
    ,QUSTN_NO12    /** 기타문항14 숫자 */
    ,CONN_GB			/** 접속구분  */
)
VALUES(
     :apNo /** 신청번호  */           
    ,:apSvcGbcd /** 신청서비스구분코드  */ 
    ,(  SELECT NVL(MAX(DTL_SEQ),0)+1
          FROM AP_PUB_QSTNR_NEW 
         WHERE AP_NO = :apNo 
           AND AP_SVC_GBCD = :apSvcGbcd)  /** 상세순번  */          
    ,TO_CHAR(SYSDATE , 'YYYYMMDD') /** 설문일자  */       
    ,:qstr1 /** 질문1  */      
    ,:qstr2 /** 질문2  */      
    ,:qstr3 /** 질문3  */      
    ,:qstr4 /** 질문4  */      
    ,:qstr5 /** 질문5  */      
    ,:qstr6 /** 질문6  */      
    ,:qstr7 /** 질문7  */      
    ,:qstr8 /** 질문8  */      
    ,:qstr9 /** 질문9  */      
    ,:qstr10 /** 질문10  */      
    ,:qstr11 /** 질문11  */      
    ,:qustn1Yn /** 질문1여부  */      
    ,:qustn1Cnts /** 질문1내용  */    
    ,:qustn2Yn /** 질문2여부  */      
    ,:qustn2Cnts /** 질문2내용  */    
    ,:optQstr1 /** 선택문항1  */    
    ,:optQstr2 /** 선택문항2  */    
    ,:fstRegId /** 최초등록자ID  */    
    ,SYSDATE /** 최초등록일시  */            
    ,:rsptNm /** 응답자명  */         
    ,:rsptTel /** 응답자전화번호  */     
    ,:rspnsStatCd /** 응답상태코드  */
    ,:giftAyn /** 사은품약관동의  */
    ,:optQstr1No /** 기타문항14 숫자 */
    ,:connGb /** 접속구분 */
)