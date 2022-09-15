define(
    [
     	'common/config',
     	'common/util',
     	'common/utils/nicednb-util',
     	'common/component/loading-bar/_loading-bar',
        'text!views/rm/rm-0223-tpl.html'
    ],
    function(
        commonConfig,
        commonUtil,
        dateUtil,
        LoadingBar,
        tpl 
    ) {
        var RM_0223_VIEW = Backbone.View.extend({

            events : {
            	'click #btn' : 'goLogin',
            },
            initialize : function(){
                var that = this;
            },
            render : function(){
            	var that = this,
                template = Handlebars.compile( tpl ),
                html = template({date : dateUtil.today('-')});
                that.$el.html(html);      
                return that;
            },
            afterRender : function(){
                var that = this;  
            },
            goLogin : function(e){
                var that =this; 
            
                var $loginForm = $('#login-form'),
                userId = $loginForm.find('input[name=userId]').val().trim(),
                userPwd = $loginForm.find('input[name=userPwd]').val().trim(),
                lang = 'ko';         
  
                // 필수값 체크
                if( userId.length!=10 ){
                    $loginForm.find('input[name=userId]').focus();
                    commonUtil.alert("사업자번호(ID)가 잘못되었습니다.");
                    return false; 
                }
                if (userId === '') {
                    $loginForm.find('input[name=userId]').focus();
                    commonUtil.alert("아이디를 넣어주십시오");
                    return; 
                } else if (userPwd === '') {
                    $loginForm.find('input[name=userPwd]').focus();
                    commonUtil.alert("패스워드를 넣어주십시오");
                    return false;
                }
                var affsindexs = $.cookie('affslink');
                requestParam = commonUtil.getBxmReqData(
                    '', '',
                    {
                        userId: userId,
                        userPwd: userPwd,
                        domainId: "DEFAULT" 
                    }
                );   
                commonUtil.requestBxmAjax(requestParam, {
                    beforeSend: function(){
                        $(".loading").show();
                    },
                    success:  function(response) {
                        $(".loading").hide();
                        var code = response.SYM040101OutDto.code;         
                        if(code === 100){
                            logger.log(response); 
                            $.cookie('mainpop', "Y", { expires: 1 }); 
                            commonConfig.userId = userId; 
                          
                            var bzno = response.SYM040101OutDto.bzno; 
                            var bznoName = response.SYM040101OutDto.cmpNm; 
                          
                            $.cookie('userBzno', bzno, { expires: 1 });                
                            $.cookie('userName',  bznoName, { expires: 1 });                        

                            setTimeout(function(){ 
                            	that.checkSurvey(); 
                            },1000);
                        }else if(code === 101){  
                            commonUtil.alert('아이디 또는 패스워드가 맞지 않습니다.');
                        }else if(code === 102){
                            commonUtil.alert('아이디 또는 패스워드가 맞지 않습니다.');
                        }else if(code === 107){
                             $.cookie('mainpop', "Y", { expires: 1 }); 
                             commonConfig.userId = userId; 
                           
                             var bzno = response.SYM040101OutDto.bzno; 
                             var bznoName = response.SYM040101OutDto.cmpNm; 
                           
                             $.cookie('userBzno', bzno, { expires: 1 });                
                             $.cookie('userName',  bznoName, { expires: 1 });                        
                             $.cookie('affs', affsindexs, { expires: 1 });  
                                  
                             setTimeout(function(){ 
                            	 that.checkSurvey(); 
                            },2000);
                        }else if(code === 105){
                            commonUtil.alert('패스워드가 5회 이상 틀렸습니다.\n로그인이 불가능합니다.\n관리자에게 문의바랍니다.');
                            return;
                        }else if(code === 110){
                        	$(".passChange").show();
                            return;
                        }
                    }
                }, true);
                return;  
            },
        	checkSurvey : function(e){
            	var that = this;

            	// 평가 결과 조회
            	requestParam = commonUtil.getBxmReqData( 
            		'', 'SRM02ApRegCcrInfoInDto',
            		{   
            			//apSvcTycd : '20'  
                     }
            	); 
            	 commonUtil.requestBxmAjax(requestParam, { 
                     success:  function(response) { 
                         var response_cnt = response.SRM02ApRegCcrInfoOutDto.subOmmCnt;
                         var response_list;

                         if(response_cnt < 1){
                        	 commonUtil.alert("평가 완료 건이 없습니다.");
                             return false;
                         }else{
                             response_list = response.SRM02ApRegCcrInfoOutDto.subOmm;
                             var apNo = response_list[0].apNo;
                             var evlFymd = response_list[0].gDate.toString(); 
                             
                             var diff ='';
                             if(evlFymd != null){
                                 var today = new Date();
                                 var evlFDate =  new Date();
                                 var evlFDateTemp = new Date(Number(evlFymd.substr(0,4)), Number(evlFymd.substr(4,2))-1,Number(evlFymd.substr(6,2)));
                                 evlFDate.setTime(evlFDateTemp);
                                 diff = parseInt((today-evlFDate)/(24*60*60*1000)); 
                             }
                             
                             // 만족도조사 조회
                             requestParam = commonUtil.getBxmReqData( 
                                 '', 'SRM01ApPubQstnrInDto',
                                 {                    
                                     apNo : apNo
                                     ,apSvcGbcd : '2111'
                                 }
                             );  
                             commonUtil.requestBxmAjax(requestParam, {                 
                                 success:  function(response) { 
                                     var apPubQstnr = response.SRM01ApPubQstnrOutDto.apPubQstnr;

                                     if(diff <= 90){
                                         if(apPubQstnr == null || apPubQstnr.rspnsStatCd == '80' ){
                                             var dtlSeq = '';
                                             if(apPubQstnr != null){
                                                 dtlSeq = apPubQstnr.dtlSeq;
                                             }
                                             that.goSurvey(apNo, dtlSeq);
                                         }else {
                                         	commonUtil.alert("해당 업체의 만족도조사 제출이 완료되었습니다.");
                                         }
                                     }else{
                                     	commonUtil.alert("만족도조사 기간이 만료되었습니다.");
                                     }
                                     return;                      
                                 },error : function(e){                        
                                     commonUtil.alert("에러입니다. 잠시후 다시 시도해주세요.");       
                                     return false;                             
                             	}
                         	},false);
                         }            
                     },error : function(e){
                         commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");       
                         return false;                             
                     }
                 });   
            },
            goSurvey : function(apNo, dtlSeq){
            	location.href='#MENURM0224?apNo='+apNo+'&apSvcGbcd=2111&dtlSeq='+dtlSeq;
            	return;
            }
        });
         return RM_0223_VIEW;
     });//end define
