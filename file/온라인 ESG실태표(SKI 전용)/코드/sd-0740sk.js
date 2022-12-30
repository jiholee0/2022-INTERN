define(
[
    'common/config',
    'common/util',
    'text!views/sd/sd-0740sk-tpl.html'
],
function(
    commonConfig,
    commonUtil,
    tpl
) {

    return Backbone.View.extend({

        tagName : 'section',
        events : {
            "click button[name=step3Last]" : "moveStep4isValid",
            "click button[name=step4Save]" : "step4Save",
            "click button[name=submit]" : "submit",
            "click button[name=moveList]" : "moveList",

            "click .moveStep1" : "moveStep1",
            "click .moveStep2" : "moveStep2",
            "click .moveStep3" : "moveStep3",
            "click .moveStep4" : "moveStep4",

            "click .fileUpload" : "fileUpload",
        },
        initialize : function(model, parent){
            var that = this;
            pageId = model.pageId;
            that.parent = parent;

            that.$el.html(Handlebars.compile( tpl ));
            that.$el.find('.dateinput').mask("9999-99-99");
            that.$el.find('.moneyinput').mask("9,999,999,999",{reverse:true});
            that.$el.find('.moneyinput15').mask("99,999,999,999,999",{reverse:true});
        },
        render : function(){
            var that = this;
            console.log("----- render() START -----");
            // 공통코드 조회.
            that.selectCode();
            if(that.parent.getStep4("openStep") =="true"){
                that.getData();
            }

            //라디오버튼 클릭 시 추가 입력폼 오픈
            $(document).on("click", "input[class='radio-gov']", function(){
                thisRadio = $(this)[0];
            	$('input[id^="'+thisRadio.name+'_form"]').css("display", "none");
            	$('div[id^="'+thisRadio.name+'_form"]').css("display", "none");
            	$('select[id^="'+thisRadio.name+'_form"]').css("display", "none");
        		$('#'+thisRadio.name+'_form_'+thisRadio.value).css("display", "");
            })

            var toDay = new Date();
            toDay =  (new XDate()).toString('yyyy-MM-dd');
            that.$el.find("[name='baseYmd']").val(toDay);

            console.log("----- render() END -----");
            return that;
        },
        afterRender : function(){
            var that = this;
            that.openForm();
            $('html').scrollTop(0);
            return that;
        },
        //저장하기
        step4Save : function(){
            var that = this;
            if(that.parent.isValid("STEP1")){
                commonUtil.redirectRoutePage("#MENUSD0700SK/STEP1");
                return false;
            }
            if(that.parent.isValid("STEP2")){
                commonUtil.redirectRoutePage("#MENUSD0700SK/STEP2");
                return false;
            }
            if(that.parent.isValid("STEP3")){
                commonUtil.redirectRoutePage("#MENUSD0700SK/STEP3");
                return false;
            }
            that.insertStepAll();
        },
        // 공통코드
        selectCode : function(){
            var that = this;
            //주기, 범위
            var cycleCd = commonUtil.getEsgrptComCode('CYCLE_CD')['CYCLE_CD'];
            that.$el.find("[name='gov006_1_1']").html(commonUtil.getSelectOption(cycleCd,'sCd','sNm', '선택'));
            that.$el.find("[name='gov012_1_1']").html(commonUtil.getSelectOption(cycleCd,'sCd','sNm', '선택'));
            var rangeCd = commonUtil.getEsgrptComCode('RANGE_CD')['RANGE_CD'];
            that.$el.find("[name='gov006_1_2']").html(commonUtil.getSelectOption(rangeCd,'sCd','sNm', '선택'));
            that.$el.find("[name='gov012_1_2']").html(commonUtil.getSelectOption(rangeCd,'sCd','sNm', '선택'));
            that.$el.find("[name='gov010_1']").html(commonUtil.getSelectOption(rangeCd,'sCd','sNm', '선택'));
        },
        //신규
        insertStepAll : function(){
            var that = this;
            var param = {};

            param = that.makeData();
            if(that.parent.isValid("STEP4")){
                commonUtil.redirectRoutePage("#MENUSD0700SK/STEP4");
                return false;
            }
            param.step = "6";
            param['wrtStatCd']    =  "20"; //작성상태코드 : 20 작성완료
            var getStep1 = that.parent.getStep1("openStep");
            if(getStep1){
                param['esgrpt']        = that.parent.getStep1("esgrpt");
                param['esgrptCmpOtl']  = that.parent.getStep1("esgrptCmpOtl");
                param['esgrptWkpInfo'] = that.parent.getStep1("esgrptWkpInfo");
            }

            var getStep2 = that.parent.getStep2("openStep");
            if(getStep2){
                param['esgrptAnsr']       = param['esgrptAnsr'].concat(that.parent.getStep2("esgrptAnsr"));
                param['esgrptYStat']      = that.parent.getStep2("esgrptYStat");
                param['esgrptCrtiStat']   = that.parent.getStep2("esgrptCrtiStat");
            }

            var getStep3 = that.parent.getStep3("openStep");
            if(getStep3 == "true"){
                param['esgrptAnsr']        = param['esgrptAnsr'].concat(that.parent.getStep3("esgrptAnsr"));
                param['esgrptCrtiStat']    = param['esgrptCrtiStat'].concat(that.parent.getStep3("esgrptCrtiStat"));
                param['esgrptEmplStat']    = that.parent.getStep3("esgrptEmplStat");
            }

            requestParam = commonUtil.getBxmReqData('', '', param);
            commonUtil.requestBxmAjax(requestParam, {
                beforeSend: function(){
                    $(".loading").show();
                },
                success:  function(response) {
                    $(".loading").hide();
                    var returnCode  = response.returnCode;

                    if(returnCode == "400"){
                        commonUtil.alert("죄송합니다. 저장버튼을 다시 클릭 해주시기 바랍니다. arrCode:"+returnCode);
                        return false;
                    }
                    if(returnCode == "410"){
                        commonUtil.alert("현재 로그인 한 사업자번호와 작성중인 실태표의 사업자번호가 불일치하여 저장할 수 없습니다. <br/> 신청사이트  로그인 ID와 실태표에 입력 된 사업자번호를 확인하여 주시기 바랍니다.");
                        return false;
                    }
                	commonUtil.alertSucc('작성완료 되었습니다.');
                    that.parent.setStep4({wrtStatCd: "20"});
                },
                error : function (e) {
                    $(".loading").hide();
                    commonUtil.alertError("에러입니다. 잠시후 다시시도해주세요.");
                }
            }, true);
        },
        //신규
        insertGovAnsr : function(move){

            var that = this;
            console.log("----- 임시저장() START -----");
            var paramData = that.makeData();
            var move
            requestParam = commonUtil.getBxmReqData('', '',paramData);

            commonUtil.requestBxmAjax(requestParam, {
                beforeSend: function(){
                    $(".loading").show();
                },
                success:  function(response) {
                    $(".loading").hide();
                    var returnCode  = response.returnCode;

                    if(returnCode == "400"){
                        commonUtil.alert("죄송합니다. 저장버튼을 다시 클릭 해주시기 바랍니다. arrCode:"+returnCode);
                        return false;
                    }
                    if(returnCode == "410"){
                        commonUtil.alert("현재 로그인 한 사업자번호와 작성중인 실태표의 사업자번호가 불일치하여 저장할 수 없습니다. <br/> 신청사이트  로그인 ID와 실태표에 입력 된 사업자번호를 확인하여 주시기 바랍니다.");
                        return false;
                    }
                    if(move == true){
                        //탭별로 이동시 알림 메세지 안띄우고 임시저장
                    }else{
                        commonUtil.alertSucc('지배구조(Governance)에 작성하신 내용이 저장됐습니다.');

                        commonUtil.redirectRoutePage("MENUSD0700SK/STEP4");
                    }

                },
                error : function (e) {
                    $(".loading").hide();
                    commonUtil.alertError("에러입니다. 잠시후 다시시도해주세요.");
                }
            }, true);

            console.log("----- 임시저장() END -----");
        },
        //임시저장 데이터
        getData : function(){
            var that = this;
            console.log("----- getData() START -----");
            var esgrpt = that.parent.getStep1("esgrpt");

            var flag = commonUtil.getParameterByName("flag");
            if( flag == null || flag != "R"){
                if(esgrpt){
                    // 지배구조(Governance) 답변
                    var esgrptAnsr = that.parent.getStep4("esgrptAnsr");
                    if(esgrptAnsr) {
                    	for(var i=0; i<esgrptAnsr.length; i++) {
                    		var qstCd = esgrptAnsr[i].qstCd.toLowerCase();
                    		if(qstCd.indexOf('gov') > -1) {
                    			if(qstCd == 'gov014'){
                    				that.$el.find("[name='14_exTaxYear']").val(esgrptAnsr[i].asrCont);
                    			}else if(qstCd == 'gov006_1_1' || qstCd == 'gov006_1_2' || qstCd == 'gov012_1_1' || qstCd == 'gov012_1_2') {
                    				that.$el.find("[name='"+qstCd+"']").val(esgrptAnsr[i].asrCd).prop("selected", true);
                    			}else{
                    				that.$el.find("[name='"+qstCd+"']:input[value='"+esgrptAnsr[i].asrCd+"']").attr("checked", true);
                    				if(qstCd == 'gov010' && esgrptAnsr[i].asrCd == '01') {
                        				that.$el.find("[name='gov010_1']").val(esgrptAnsr[i].asrCont).prop("selected", true);;
                        			}
                    			}
                    		}
                    	}
                    }
                }
            }
            console.log("----- getData() END -----");
        },
        makeData : function(){
        	var that = this;
            console.log("----- makeData() start -----");
            //기업실태표정보
            var esgrptTemp = {};
            if(that.parent.getStep1("esgrptFlag") != 'U'){
                esgrptTemp['wrtStatCd'] = "10"; //작성상태코드
            }

            var mainQst = 0; // main 문항 수

            //ESG실태표 답변
            var setAnsrList = [];
            var num;
            for(var i=0; i < $("div[class^='radio-box']").length; i++ ){
                var ansrTemp = {};

                if(i == 6 || i == 13){ // 추가문항_소문항 : GOV006_1_1, GOV006_1_2, GOV012_1_1, GOV012_1_2
                	if(that.$el.find('[name=gov0'+num+']:checked').val()=='01'){

                	num = mainQst < 10 ? '0'+mainQst : mainQst;
                	ansrTemp['qstCd'] = 'GOV0'+num+'_1_1';
                	ansrTemp['asrSeq'] = 1;
                	if(that.$el.find('[name=gov0'+num+'_1_1]').val() != undefined) {
                		ansrTemp['asrCd'] = that.$el.find('[name=gov0'+num+'_1_1]').val();
                	}
                	if(ansrTemp['asrCd'] != undefined){
                		setAnsrList.push(ansrTemp);
                	}
                	ansrTemp = {};
                	ansrTemp['qstCd'] = 'GOV0'+num+'_1_2';
                	ansrTemp['asrSeq'] = 1;
                	if(that.$el.find('[name=gov0'+num+'_1_2]').val() != undefined) {
                		ansrTemp['asrCd'] = that.$el.find('[name=gov0'+num+'_1_2]').val();
                	}
                	}else{continue;}
                }else{
                	mainQst = mainQst + 1;
                    num = mainQst < 10 ? '0'+mainQst : mainQst;
                	ansrTemp['qstCd'] = 'GOV0'+num;
                	ansrTemp['asrSeq'] = 1;

                	if(i == 15){ // 단답형 GOV014
                		ansrTemp['asrCont'] = that.$el.find('[name=14_exTaxYear]').val();
                	}else if(i == 10 && that.$el.find('[name=gov0'+num+']:checked').val()=='01'){ // GOV010
                		ansrTemp['asrCont'] = that.$el.find('[name=gov010_1]').val();
                		ansrTemp['asrCd'] = that.$el.find('[name=gov0'+num+']:checked').val();
                	}else if(that.$el.find('[name=gov0'+num+']:checked').val() != undefined){
                		ansrTemp['asrCd'] = that.$el.find('[name=gov0'+num+']:checked').val();
                	}
                }
            	if(ansrTemp['asrCont'] != undefined || ansrTemp['asrCd'] != undefined){
            		setAnsrList.push(ansrTemp);
            	}
            }

            var param = {};

            param['step']       		= '4';
            param['rptCmpGb']			= 'SKI';
            param['esgrpt']				= esgrptTemp;
            param['esgrptAnsr']			= setAnsrList;
            console.log(param);

            that.parent.setStep4(param);
            that.parent.setStep4({openStep : "true"});

            console.log("----- makeData() END -----");
            return param;

        },
      //자료제출
        submit : function(){
            var that = this;

            var wrtStatCd = that.parent.getStep4("wrtStatCd");

            if(wrtStatCd != "20"){
                commonUtil.alert('저장 완료 후 제출 가능합니다.');
                return false;
            }

            var param = {};

            param['esgrpt'] = {wrtStatCd : '90'};

            // call service.
            commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', '', param), {
                beforeSend: function(){

                },
                success: function(response) {
                    that.parent.setStep1({openStep : ""});
                    commonUtil.alertSucc('제출 되었습니다.');
                    commonUtil.redirectRoutePage("#MENUSD0600SK");
                }
            },true);

        },
        /******************************************************************************************************* */
        moveList : function(){
            var that = this;
            that.insertGovAnsr(true); //탭별로 클릭 시 임시저장
            that.parent.setStep1({openStep : ""});
            $(".listPaper").trigger("click");
        },
        moveStep1 : function(e){

            e.preventDefault();
            var that = this;
            that.insertGovAnsr(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP1";

        },
        moveStep2 : function(e){
            var that = this;
            e.preventDefault();
            that.insertGovAnsr(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP2";
        },
        moveStep3 : function(e){
            e.preventDefault();
            var that = this;
            that.insertGovAnsr(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP3";
        },
        moveStep4 : function(e){
            e.preventDefault();
            var that = this;
            that.insertGovAnsr(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP4";
        },
        openForm : function(){
            var that = this;
            var esgrptAnsr = that.parent.getStep4("esgrptAnsr");
        	if(esgrptAnsr) {
            	for(var i=0; i<esgrptAnsr.length; i++) {
            		if(esgrptAnsr[i].qstCd.indexOf('GOV') > -1) {
            			$('#'+esgrptAnsr[i].qstCd.toLowerCase()+'_form_'+esgrptAnsr[i].asrCd).css("display", "");
            		}
            	}
        	}
        },
        moveStep4isValid : function(e){
        	var that = this;
            var rtn = false;
            var moveStep = e.target.name;
            var temp = {moveStep:moveStep, that:that}

            if(that.$el.find('[name=gov006]:checked').val() == '01' &&
            		(($('[name=gov006_1_1]').val().length < 1 || $('[name=gov006_1_2]').val().length < 1))){
             	commonUtil.confirm("지배구조(Governance) 6번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else if(that.$el.find('[name=gov010]:checked').val() == '01' &&
            		($('[name=gov010_1]').val().length < 1)){
             	commonUtil.confirm("지배구조(Governance) 10번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else if(that.$el.find('[name=gov012]:checked').val() == '01' &&
            		(($('[name=gov012_1_1]').val().length < 1 || $('[name=gov012_1_2]').val().length < 1))){
             	commonUtil.confirm("지배구조(Governance) 12번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else if($('[name=14_exTaxYear]').val().length < 1) {
             	commonUtil.confirm("지배구조(Governance) 14번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else{
                rtn = true;
            }

            if(rtn){
                that.insertGovAnsr(true); //탭별로 클릭 시 임시저장
                if(moveStep =="step3Last"){
                    location.href = "#MENUSD0700SK/STEP3";
                }
            }

        },
        moveStepConfirm : function(a, temp){
            if(!a){
                return false;
            }
            if(temp.moveStep == "step3Last"){
            	temp.that.insertGovAnsr(true); //탭별로 클릭 시 임시저장
                location.href = "#MENUSD0700SK/STEP3";
            }
        },
        fileUpload : function(e){
            var that =this;
            requestParam = commonUtil.getBxmReqData(
                '', '',
                {
                    apSvcTycd : '50'
                }
            );

            commonUtil.requestBxmAjax(requestParam, {
               success:  function(response) {
                    var useYn = response.returnCheck;
                    var bx_enc_bzno =  response.bxEncBzno;
                    var bx_enc_sno =  response.bxEncSno;

                	sessionStorage.setItem("p_bz_ins_no" , bx_enc_bzno);
                    sessionStorage.setItem("p_s_no" , bx_enc_sno);
                    sessionStorage.setItem("p_file_div_cd", e.target.value);
                    sessionStorage.setItem("p_reg_site_cd","001");
                    sessionStorage.setItem("p_file_cmp_gb","SKI");
                    window.open('pop.html#MENURM0900', "popup-upload", "width=760,height=860,scrollbars=yes");
                },error : function(e){
                    commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");
                    return false;
                }
            });
        },
    });
});//end define