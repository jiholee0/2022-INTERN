define(
    [
        'common/config',
        'common/util',
        'common/utils/nicednb-jquery-input',
        'text!views/rm/rm-0224-tpl.html'
    
    ],
    function(
        commonConfig,
        commonUtil,
        inputUtil,
        tpl 
    ) {
    	var v_qstr1		= "3";
    	var v_qstr2		= "3";
    	var v_qstr3		= "3";
    	var v_qstr4		= "3";
    	var v_qstr5		= "3";
    	var v_qstr6		= "3";
    	var v_qstr7		= "3";
    	var v_qstr8		= "3";
    	var v_qstr9		= "3";
    	var v_qstr10	= "3";
    	var v_qstr11	= "3";
    	var v_qstr12	="";
    	var v_qstr13	="";
    	var v_confirm	= false;
    	
        var RM_0224_VIEW = Backbone.View.extend({

            events : {
            	"keyup .numberonly"   : "OnlyNumberFormat", 
            	"click .star_rating"  : "star_rating", 		// 별점 이벤트
            	
                "click .step1Next"	  : "step1Next",
                "click .step2Next"	  : "step2Next",
                "click .step3Next"	  : "step3Next",
                "click .step4Next"	  : "step4Next",
                "click .step2Prev"	  : "step2Prev",
                "click .step3Prev"	  : "step3Prev",
                "click .step4Prev"	  : "step4Prev",
                "click .step5Prev"	  : "step5Prev",
                
                "click .surveySubmit" : "surveySubmit", 	// 응답완료
                //"click .LastStepBt"	  : "lastStepBt",		// 나가기                
            },
            initialize : function(){
                var that = this;
                that.$el.html(Handlebars.compile( tpl ));
                that.apNo = commonUtil.getParameterByName("apNo");
                that.apSvcGbcd = commonUtil.getParameterByName("apSvcGbcd");
                that.dtlSeq = commonUtil.getParameterByName("dtlSeq");
            },
            render : function(){
                var that = this;
                
                // 라디오버튼 클릭 시 추가 입력폼 오픈
                $(document).on("click", "li[class='radio_qustn']", function(){
                	$(this).parent().children().last().css({display:'none'});
                })
                $(document).on("click", "li[class='radio_qustn on']", function(){
                	$(this).parent().children().last().css({display:'block'});
                })
                return that;
            },
            OnlyNumberFormat : function(e){
                $(e.target).inputNumberFormat();
            },
            star_rating : function(e){
            	var that = this;
            	$(e.target).parent().children("a").removeClass("on");
                $(e.target).addClass("on").prevAll("a").addClass("on");
                
                if($(e.target).attr("name") == 'qstr1')		{ v_qstr1	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr2')		{ v_qstr2	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr3')		{ v_qstr3	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr4')		{ v_qstr4	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr5')		{ v_qstr5	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr6')		{ v_qstr6	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr7')		{ v_qstr7	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr8')		{ v_qstr8	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr9')		{ v_qstr9	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr10')	{ v_qstr10	= $(e.target).attr("value") }
                if($(e.target).attr("name") == 'qstr11')	{ v_qstr11	= $(e.target).attr("value") }
                
                return false;
            },            
            step1Next : function(e){
            	$('.survey_title').css({display:'block'});
                $('.survey_content_first').css({display:'none'});
                $('.survey_content_second').css({display:'block'});
                $('html').animate({scrollTop:0},0);
            },
            step2Next : function(e){
            	$('.survey_title').css({display:'block'});
                $('.survey_content_second').css({display:'none'});
                $('.survey_content_third').css({display:'block'});
                $('html').animate({scrollTop:0},0);
            },
            step3Next : function(e){
            	$('.survey_title').css({display:'block'});
                $('.survey_content_third').css({display:'none'});
                $('.survey_content_fourth').css({display:'block'});
                $('html').animate({scrollTop:0},0);
            },
            step4Next : function(e){
            	var that = this;
            	var step = '4';
            	
            	if(!that.isValid(step)){
                    return false;
                }
                $('.survey_title').css({display:'none'});
                $('.survey_content_fourth').css({display:'none'});
                $('.survey_content_five').css({display:'block'});
                $('html').animate({scrollTop:0},0);
            },
            step2Prev : function(e){
            	$('.survey_title').css({display:'block'});
                $('.survey_content_second').css({display:'none'});
                $('.survey_content_first').css({display:'block'});
                $('html').animate({scrollTop:0},0);
            },
            step3Prev : function(e){
            	$('.survey_title').css({display:'block'});
                $('.survey_content_third').css({display:'none'});
                $('.survey_content_second').css({display:'block'});
                $('html').animate({scrollTop:0},0);
            },
            step4Prev : function(e){
            	$('.survey_title').css({display:'block'});
                $('.survey_content_fourth').css({display:'none'});
                $('.survey_content_third').css({display:'block'});
                $('html').animate({scrollTop:0},0);
            },
            step5Prev : function(e){
            	$('.survey_title').css({display:'block'});
                $('.survey_content_five').css({display:'none'});
                $('.survey_content_fourth').css({display:'block'});
                $('html').animate({scrollTop:0},0);
            },
            surveySubmit : function(e){
                var that = this;
                var step = '5';
                
                if(!that.isValid(step)){
                    return false;
                }
                // 사은품 지급 미 동의시 1회 알림.
                if(!v_confirm && that.$el.find('input:radio[name=agreeYn]:checked').val() != "Y") {
                	commonUtil.alert("사은품 지급 관련 제공동의 및 주의사항에 동의하여 주시기 바랍니다. 미 동의시 모바일상품권 등의 사은품이 지급되지 않습니다.");
                    v_confirm = true;
                    return false;
                }
                if(that.$el.find('input:radio[name=qustn12Yn]:checked').val() == 'N'){
                	v_qstr12 = that.$el.find("[name=qustn12No]").val();
                }
                if(that.$el.find('input:radio[name=qustn13Yn]:checked').val() == 'Y'){
                	v_qstr13 = that.$el.find("[name=qustn13Yes]").val();
                }
                var param = {};
                param = {
                         apNo        	: that.apNo			// 신청번호
                        ,apSvcGbcd   	: that.apSvcGbcd	// 신청서비스구분코드           
                        ,dtlSeq      	: that.dtlSeq		// 상세순번  
                        ,qstr1      	: v_qstr1			// Q1           
                        ,qstr2      	: v_qstr2			// Q2
                        ,qstr3      	: v_qstr3			// Q3
                        ,qstr4      	: v_qstr4			// Q4
                        ,qstr5      	: v_qstr5			// Q5
                        ,qstr6      	: v_qstr6			// Q6
                        ,qstr7      	: v_qstr7			// Q7
                        ,qstr8      	: v_qstr8			// Q8
                        ,qstr9      	: v_qstr9			// Q9
                        ,qstr10      	: v_qstr10			// Q10
                        ,qstr11      	: v_qstr11			// Q11
                        ,qustn1Yn		: that.$el.find('input:radio[name=qustn12Yn]:checked').val()	// Q12
                        ,qustn1Cnts		: v_qstr12														// Q12 상세
                        ,qustn2Yn		: that.$el.find('input:radio[name=qustn13Yn]:checked').val()	// Q13
                        ,qustn2Cnts		: v_qstr13														// Q13 상세
                        ,optQstr1		: that.$el.find("[name=opt_qstr1]").val()						// 선택문항1
                        ,optQstr2		: that.$el.find("[name=opt_qstr2]").val()						// 선택문항2
                        ,rsptNm			: that.$el.find('.user_name').val()								// 응답자성명
                        ,rsptTel		: that.$el.find('.usrTel1').val()+that.$el.find('.usrTel2').val()+that.$el.find('.usrTel3').val()	// 응답자 핸드폰
                        ,giftAyn		: that.$el.find('input:radio[name=agreeYn]:checked').val()		// 사은품약관동의
                        ,rspnsStatCd 	: '10' 				// 응답상태코드 
                        ,connGb 		: 'MB' 				// 접속구분
                };
                
                if(that.doService(param)){
                    $('.survey_title').css({display:'none'});
                    $('.survey_content_five').css({display:'none'});
                    $('.survey_content_last').css({display:'block'});
                    $('html').animate({scrollTop:0},0);
                }else{
                    commonUtil.alert("다시 시도해 주시기 바랍니다.");
                };
            },
            doService : function(param){
                var rtn = false;
                if(param == null){
                    return false;
                }
                commonUtil.requestBxmAjax(commonUtil.getBxmReqData('RM0201R031', 'SRM01ApPubQstnrInDto', param), {
                    beforeSend: function(){
                    },
                    success: function(response) {
                    	rtn = true;
                    },error : function(e){
                    	commonUtil.alert("에러가 발생했습니다. 잠시후 다시시도해주세요.");       
                        return false;                             
                    }
                },false);

                return rtn;
            },
            isValid : function(step){
                var that = this;
                var rtn = true;
                if(step == '4'){
                	if(that.$el.find('input:radio[name=qustn12Yn]:checked').val() == 'N'){
                    	if( that.$el.find("[name=qustn12No]").val() == ""){
                    		commonUtil.alert("12번 질문에서 [아니요]를 선택하셨습니다. 관련내용을 기재하여 주시기 바랍니다.");
                            rtn = false;
                            return false;
                        }
                    }
                    if(that.$el.find('input:radio[name=qustn13Yn]:checked').val() == 'Y'){
                    	if( that.$el.find("[name=qustn13Yes]").val() == ""){
                    		commonUtil.alert('13번 질문에서 [예]를 선택하셨습니다. 관련내용을 기재하여 주시기 바랍니다.');
                            rtn = false;
                            return false;
                        }
                    }
                }
                else if(step == '5'){
                	if( $('.user_name').val() == ""){
                    	commonUtil.alert('응답자 성명을 기재해 주세요.');
                        rtn = false;
                        return false;
                    }
                    if( $('.usrTel1').val().length != 3 ||
                    		$('.usrTel2').val() == ""||
                    		$('.usrTel3').val() == ""){
                    	commonUtil.alert('응답자 핸드폰번호를 정확하게 기재해 주세요.');
                        rtn = false;
                        return false;
                    }
                }
                return rtn;
            },
            /*lastStepBt : function(e){
            	// commonUtil.alert("나가기");
            },*/
        });
         return RM_0224_VIEW;
     });//end define
