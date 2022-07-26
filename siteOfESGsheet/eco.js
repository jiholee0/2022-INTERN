define(
[
    'common/config',
    'common/util',
    'text!views/sd/sd-0720sk-tpl.html'
],
function(
    commonConfig,
    commonUtil,
    tpl
) { 

    return Backbone.View.extend({

        tagName : 'section',
        events : {
            "click [name=addRow]" : "addRow", 
            "click [name=delRow]" : "delRow",
            
            "keyup .dateinput" : "dateFormat",
            "keyup .moneyinput" : "NumberFormat",
            "keyup .moneyinput15" : "NumberFormat",
            "keyup .moneyinputM" : "NumberFormatM",
            "keyup .numberonly" : "OnlyNumberFormat",
            "keyup .hasDatepicker" : "inputDateFormat",
            
            "click button[name=step1Last]" : "moveStep2isValid",
            "click button[name=step3Next]" : "moveStep2isValid",
            "click button[name=step2Save]" : "insertEnvAnsr",
            
            "blur [name=histYmd]" : "dateChk",
        
            "click .moveStep1" : "moveStep1",
            "click .moveStep2" : "moveStep2",
            "click .moveStep3" : "moveStep3",
            "click .moveStep4" : "moveStep4",
            
            "click .fileUpload" : "fileUpload",
           	"change [name=07_crtiStatCd]": "inputAct",
           	"change [name=06_crtiStatCd]": "inputAct",
           	"change [name=05_crtiStatCd]": "inputAct",
           	"keyup .number" : "numberWithCommas"
        }, 
        
        initialize : function(model, parent){
            var that = this;

            // 각 테이블 행 초기화
            that.env007_crtiStatRowCnt = 1;
            that.env006_crtiStatRowCnt = 1;
            that.env005_crtiStatRowCnt = 1;

            pageId = model.pageId;

            that.parent = parent;

            that.$el.html(Handlebars.compile( tpl ));
            that.$el.find('.dateinput').mask("9999-99-99");
            that.$el.find('.moneyinput').mask("9,999,999,999",{reverse:true});
            that.$el.find('.moneyinput15').mask("99,999,999,999,999",{reverse:true});
            that.code = commonUtil.getComCode('REL_CD');
        },

        render : function(){
            var that = this;
            console.log("----- render() START -----");
            // 공통코드 조회.
            that.selectCode();
            if(that.parent.getStep2("openStep") =="true"){
                that.getData();
            }
            
            // 라디오버튼 클릭 시 추가 입력폼 오픈
            $(document).on("click", "input[class='radio-env']", function(){
                thisRadio = $(this)[0];
            	$('input[id^="'+thisRadio.name+'_form"]').css("display", "none");
            	$('div[id^="'+thisRadio.name+'_form"]').css("display", "none");
        		$('#'+thisRadio.name+'_form_'+thisRadio.value).css("display", "");
            })
            
            console.log("----- render() END -----");
            return that;
        }, 
        afterRender : function(){
            var that = this;
            that.openForm();
            $('html').scrollTop(0);
            return that;
        }
        
        ,
        NumberFormatM : function(e){
            /**
			 * 관계회사 당기순이익 항목은 마이너스도 입력 가능 (2018.03.22)
			 */
            var that = this;
            var numTemp = e.target.value;
            var ngtNum = '';
            var numVal = '';
            if(numTemp.length > 0){
                if(numTemp[0] == '-' || numTemp[0] == '-'){
                    ngtNum = '-';
                }

            }

            if (( (e.keyCode > 48 || e.keyCode < 57)) && (e.keyCode > 96 || e.keyCode < 105)) {
                e.preventDefault();
                numVal = that.sumNumberFormat(numTemp);
                return $(e.target).val(ngtNum+numVal);
            }
        },

        sumNumberFormat : function(sumAmt){
            // 합계금액 콤마
            var v =  sumAmt.toString().replace(/\D/gi,'');
            
            var x = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return x
        },
        NumberFormat : function(e){
            $(e.target).inputMoneyFormat();
        },
        dateFormat : function(e){
         
            $(e.target).val(commonUtil.date_chk(e.target.value, e ));

        },
        inputDateFormat : function(e){
            $(e.target).inputDateFormat();
        },
        OnlyNumberFormat : function(e){
            $(e.target).inputNumberFormat();
        },
        // 공통코드
        selectCode : function(){
            var that = this;
            // 담당자직위코드
            that.$el.find("[name='idpdtChrgPstCd']").html(commonUtil.getSelectOption(
                commonUtil.getEsgrptComCode('CHRG_PST_CD')['CHRG_PST_CD'],'sCd','sNm', '선택'));
            // 05,06,07 인증상태
            var crtiStatCd = commonUtil.getEsgrptComCode('CRTI_STAT_CD')['CRTI_STAT_CD'];            
            that.$el.find("[name='07_crtiStatCd']").html(commonUtil.getSelectOption(crtiStatCd,'sCd','sNm', '선택'));
            that.$el.find("[name='06_crtiStatCd']").html(commonUtil.getSelectOption(crtiStatCd,'sCd','sNm', '선택'));
            that.$el.find("[name='05_crtiStatCd']").html(commonUtil.getSelectOption(crtiStatCd,'sCd','sNm', '선택'));
            // 05,06,07 인증항목
            that.$el.find("[name='07_crtiKindCd']").html(commonUtil.getSelectOption(
                commonUtil.getEsgrptComCode('CRTI_KIND_CD','ENV007SK')['CRTI_KIND_CD'],'sCd','sNm', '선택'));
            that.$el.find("[name='06_crtiKindCd']").html(commonUtil.getSelectOption(
                commonUtil.getEsgrptComCode('CRTI_KIND_CD','ENV006SK')['CRTI_KIND_CD'],'sCd','sNm', '선택'));
            that.$el.find("[name='05_crtiKindCd']").html(commonUtil.getSelectOption(
                commonUtil.getEsgrptComCode('CRTI_KIND_CD','ENV005SK')['CRTI_KIND_CD'],'sCd','sNm', '선택'));
        },
        // 신규
        insertEnvAnsr : function(move){

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
                        // 탭별로 이동시 알림 메세지 안띄우고 임시저장
                    }else{
                        commonUtil.alertSucc('환경(Environmental)에 작성하신 내용이 저장됐습니다.');  
                        
                        commonUtil.redirectRoutePage("MENUSD0700SK/STEP2");
                    }
                    
                },
                error : function (e) {
                    $(".loading").hide();
                    commonUtil.alertError("에러입니다. 잠시후 다시시도해주세요.");
                }
            }, true);

            console.log("----- 임시저장() END -----");
        },
     // 임시저장 데이터
        getData : function(){
            var that = this;
            console.log("----- getData() START -----");
            var esgrpt = that.parent.getStep1("esgrpt");
            
            var flag = commonUtil.getParameterByName("flag"); 
            if( flag == null || flag != "R"){
                if(esgrpt){
                	// 환경(Environmental) 답변
                    var esgrptAnsr = that.parent.getStep2("esgrptAnsr");
                    console.log(esgrptAnsr);
                    if(esgrptAnsr) {
                    	for(var i=0; i<esgrptAnsr.length; i++) {
                    		var qstCd = esgrptAnsr[i].qstCd.toLowerCase();
                    		if(qstCd.indexOf('env') > -1) {
                    			that.$el.find("[name='"+qstCd+"']:input[value='"+esgrptAnsr[i].asrCd+"']").attr("checked", true);
                    			if(qstCd == 'env009' && esgrptAnsr[i].asrCd == '01') {
                    				that.$el.find("[name='09_ecoSalesWt']").val(esgrptAnsr[i].asrCont).prop("selected", true);;
                    			}
                    		}
                    	}
                    }
                    
                 // 년도별현황_1 : ENV010_1(01), ENV016_1(01), ENV022_1(01), ENV027_1(01)
                 // 년도별현황_2 : ENV010_2(01), ENV016_2(01), ENV022_2(01), ENV027_2(01)
                 // 년도별현황_3 : ENV010_3(01), ENV016_3(01), ENV027_3(01)
                 // 년도별현황  : ENV013(01, 02), ENV015(01), ENV016(02), ENV018(01), ENV025(01), ENV027(02)
                    var esgrptYStat = that.parent.getStep2("esgrptYStat");
                    if(esgrptYStat.length > 0) {
                        for(var i=0; i<esgrptYStat.length; i++) {
                        	if(esgrptYStat[i].qstCd.indexOf('ENV') > -1) {
                        		var qstCd = esgrptYStat[i].qstCd.toLowerCase();
                            	var value = that.$el.find("[name='"+qstCd.split('_')[0]+"']:checked").val();
                            	var num = qstCd.replace('env0','').split('_')[0]; // 문항 번호
                            	var tail ="";
                            	if(qstCd.replace('env0','').includes('_')){
                            		tail = '_'+ qstCd.replace('env0','').split('_')[1];
                            	}
                        		that.$el.find("[name='"+num+"_thrYAgo"+value+tail+"']").val(esgrptYStat[i].thrYAgo);    
                                that.$el.find("[name='"+num+"_twoYAgo"+value+tail+"']").val(esgrptYStat[i].twoYAgo);
                                that.$el.find("[name='"+num+"_oneYAgo"+value+tail+"']").val(esgrptYStat[i].oneYAgo);
                        	}
                        }
                    }

                    // 인증현황
                    var esgrptCrtiStat = that.parent.getStep2("esgrptCrtiStat");
                	var arr = ['07','06','05'];
                    for(var i=0; i<arr.length; i++) {
                    	var crtiStatTemp = [];
                    	var qstCd = '';
                        for(var j=0; j<esgrptCrtiStat.length; j++) {
                        	if(esgrptCrtiStat[j].qstCd == 'ENV0'+arr[i]) {
                                if(arr[i] == '07') { that.env007_crtiStatRowCnt = j+1; }
                                else if(arr[i] == '06') { that.env006_crtiStatRowCnt = j+1; }
                                else if(arr[i] == '05') { that.env005_crtiStatRowCnt = j+1; }
                        		qstCd = esgrptCrtiStat[j].qstCd.toLowerCase();
                        		esgrptCrtiStat[j].crtiValiEymd = commonUtil.changeStringToDateString(esgrptCrtiStat[j].crtiValiEymd);
                            	crtiStatTemp.push(esgrptCrtiStat[j]);
                        	}
                        }
                        if(crtiStatTemp.length > 0) {
                        	var value = that.$el.find("[name='"+qstCd+"']:checked").val();
                        	if(value == '01'){
                            	var esgrptCrtiStatTmp = commonUtil.getTemplate(tpl,'esgrptCrtiStat-sbmt-'+qstCd+'_form_01');                            	
                                that.$el.find('#'+qstCd+'-list-id').html(Handlebars.compile(esgrptCrtiStatTmp)({
                                	esgrptCrtiStat:crtiStatTemp,
                                	crtiStatCd:commonUtil.getEsgrptComCode('CRTI_STAT_CD'),
                                	crtiKindCd:commonUtil.getEsgrptComCode('CRTI_KIND_CD', crtiStatTemp[0].qstCd)
                                }));
                                for(var k=0; k<crtiStatTemp.length; k++) {
                                    if(crtiStatTemp[k].crtiStatCd != '01') {
                                		that.$el.find('#'+qstCd+'-list-id > tr:eq('+(k)+') > td').children('[name='+arr[i]+'_crtiNo]').attr("disabled", true);  
                                		that.$el.find('#'+qstCd+'-list-id > tr:eq('+(k)+') > td').children('[name='+arr[i]+'_crtiValiEymd]').attr("disabled", true);
                                		that.$el.find('#'+qstCd+'-list-id > tr:eq('+(k)+') > td').children('[name='+arr[i]+'_crtiNo]').val("");
                                		that.$el.find('#'+qstCd+'-list-id > tr:eq('+(k)+') > td').children('[name='+arr[i]+'_crtiValiEymd]').val("");  
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
            var mainQst = 0; // main 문항 수
            
            // ESG실태표 답변
            var setAnsrList = [];
            var num;
            for(var i=0; i < $("div[class^='radio-box']").length; i++ ){
                var ansrTemp = {};
                if( (i == 2 || i == 5 || i == 7)){ // 추가문항(value=01일 때) : ENV002_1, ENV003_1, ENV004_1
                	if(that.$el.find('[name=env0'+num+']:checked').val()=='01'){
                    	num = mainQst < 10 ? '0'+mainQst : mainQst;
                    	ansrTemp['qstCd'] = 'ENV0'+num+'_1';
                    	ansrTemp['asrSeq'] = 1;
                    	
                    	if(that.$el.find('[name=env0'+num+'_1]:checked').val() != undefined) {
                    		ansrTemp['asrCd'] = that.$el.find('[name=env0'+num+'_1]:checked').val();
                    	}
                	}else{
                		continue;
                	}
                }else if(i == 3 || i == 8){ // 추가문항(value=02일 때) : ENV002_2, ENV004_2
                	if( that.$el.find('[name=env0'+num+']:checked').val()=='02'){
                    	num = mainQst < 10 ? '0'+mainQst : mainQst;
                    	ansrTemp['qstCd'] = 'ENV0'+num+'_2';
                    	ansrTemp['asrSeq'] = 1;
                    	
                    	if(that.$el.find('[name=env0'+num+'_2]:checked').val() != undefined) {
                    		ansrTemp['asrCd'] = that.$el.find('[name=env0'+num+'_2]:checked').val();
                    	}
                	}else{
                		continue;
                	}
                }else if(i == 16){ // 소문항 : ENV012
                	mainQst = mainQst + 1;
                	num = mainQst;
                	ansrTemp['qstCd'] = 'ENV0'+num+'_1';
                	ansrTemp['asrSeq'] = 1;
                	if(that.$el.find('[name=env0'+num+'_1]:checked').val() != undefined) {
                		ansrTemp['asrCd'] = that.$el.find('[name=env0'+num+'_1]:checked').val();
                	}
                	if(ansrTemp['asrCd'] != undefined){
                		setAnsrList.push(ansrTemp);
                	} 
                	ansrTemp = {};
                	ansrTemp['qstCd'] = 'ENV0'+num+'_2';
                	ansrTemp['asrSeq'] = 1;
                	if(that.$el.find('[name=env0'+num+'_2]:checked').val() != undefined) {
                		ansrTemp['asrCd'] = that.$el.find('[name=env0'+num+'_2]:checked').val();
                	}
                	
                }else { // 나머지
                	mainQst = mainQst + 1;
                    num = mainQst < 10 ? '0'+mainQst : mainQst;
                	ansrTemp['qstCd'] = 'ENV0'+num;
                	ansrTemp['asrSeq'] = 1;
                	
                	if(i == 13){ // 친환경 매출 비중 ENV009
                		if(that.$el.find('[name=env0'+num+']:checked').val()=='01'){
                			ansrTemp['asrCont'] = that.$el.find('[name=09_ecoSalesWt]').val();
                		}
                		ansrTemp['asrCd'] = that.$el.find('[name=env0'+num+']:checked').val();
                	}else if(that.$el.find('[name=env0'+num+']:checked').val() != undefined) {
                		ansrTemp['asrCd'] = that.$el.find('[name=env0'+num+']:checked').val();
                	}
                }
                
            	if(ansrTemp['asrCd'] != undefined){
            		setAnsrList.push(ansrTemp);
            	}   	
            }
            // ESG실태표 인증현황 (ENV005,ENV006,ENV007)
            var crtiStatArr = ['05','06','07'];
            var setCrtiStatList = [];
            for(var j=0; j<crtiStatArr.length; j++){  
                var crtiSeq = 1;          	
            	if(that.$el.find('[name=env0'+crtiStatArr[j]+']:checked').val() == '01'){
                    var trCnt = that.$el.find('#env0'+crtiStatArr[j]+'-list-id tr').length;
                    for(var i=0; i<trCnt; i++) {
                    	if(commonUtil.getNotEmptyArray({
                    		arr1 : that.$el.find('[name='+crtiStatArr[j]+'_crtiKindCd]').get(i).value
                           ,arr2 : that.$el.find('[name='+crtiStatArr[j]+'_crtiStatCd]').get(i).value
                           ,arr3 : that.$el.find('[name='+crtiStatArr[j]+'_crtiNm]').get(i).value
                           ,arr4 : that.$el.find('[name='+crtiStatArr[j]+'_crtiNo]').get(i).value
                           ,arr5 : that.$el.find('[name='+crtiStatArr[j]+'_crtiValiEymd]').get(i).value
                    	}).length > 0) {
                            var crtiStatTemp = {};
                            crtiStatTemp['qstCd'] = 'ENV0'+crtiStatArr[j];
                            crtiStatTemp['crtiSeq'] = crtiSeq;
                            crtiStatTemp['crtiKindCd'] = that.$el.find('[name='+crtiStatArr[j]+'_crtiKindCd]').get(i).value;
                            crtiStatTemp['crtiStatCd'] = that.$el.find('[name='+crtiStatArr[j]+'_crtiStatCd]').get(i).value;
                            crtiStatTemp['crtiNm'] = that.$el.find('[name='+crtiStatArr[j]+'_crtiNm]').get(i).value;
                            crtiStatTemp['crtiNo'] = that.$el.find('[name='+crtiStatArr[j]+'_crtiNo]').get(i).value;
                            crtiStatTemp['crtiValiEymd'] = commonUtil.changeDateStringToString(that.$el.find('[name='+crtiStatArr[j]+'_crtiValiEymd]').get(i).value);
                            crtiSeq++;
                            
                            setCrtiStatList.push(crtiStatTemp);
                    	}                	
                    }
                }
            }
            
            // 년도별 현황 
            var yStatArr = ['10', '13', '15', '16', '18', '22', '25', '27'];
            var setYStatList = [];
            for(var j=0; j<yStatArr.length; j++){            	
            	var asrCd = that.$el.find('[name=env0'+yStatArr[j]+']:checked').val();
            	if(asrCd == '01' && (yStatArr[j] == '10' || yStatArr[j]=='16' || yStatArr[j]=='27')){ // ENV010(01),
																										// ENV016(01),
																										// ENV027(01)
                	if(commonUtil.getNotEmptyArray({ 
                		arr1 : that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_1]').val()
                       ,arr2 : that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_1]').val()
                       ,arr3 : that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_1]').val()
                       ,arr4 : that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_2]').val()
                       ,arr5 : that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_2]').val()
                       ,arr6 : that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_2]').val()
                       ,arr7 : that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_3]').val()
                       ,arr8 : that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_3]').val()
                       ,arr9 : that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_3]').val()
                	}).length > 0) {
                        var yStatTemp = {};
                        yStatTemp['qstCd'] = 'ENV0'+yStatArr[j]+'_1';
                        yStatTemp['thrYAgo'] = that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_1]').val();
                        yStatTemp['twoYAgo'] = that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_1]').val();
                        yStatTemp['oneYAgo'] = that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_1]').val();
                        setYStatList.push(yStatTemp);
                        yStatTemp = {};
                        yStatTemp['qstCd'] = 'ENV0'+yStatArr[j]+'_2';
                        yStatTemp['thrYAgo'] = that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_2]').val();
                        yStatTemp['twoYAgo'] = that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_2]').val();
                        yStatTemp['oneYAgo'] = that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_2]').val();
                        setYStatList.push(yStatTemp);
                        yStatTemp = {};
                        yStatTemp['qstCd'] = 'ENV0'+yStatArr[j]+'_3';
                        yStatTemp['thrYAgo'] = that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_3]').val();
                        yStatTemp['twoYAgo'] = that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_3]').val();
                        yStatTemp['oneYAgo'] = that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_3]').val();
                        setYStatList.push(yStatTemp);
                	}   
                }else if(asrCd == '01' && yStatArr[j] == '22'){ // ENV022(01)
                	if(commonUtil.getNotEmptyArray({ 
                		// scope 1
                		arr1 : that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_1]').val()
                       ,arr2 : that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_1]').val()
                       ,arr3 : that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_1]').val()
                       // scope 2
                       ,arr4 : that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_2]').val()
                       ,arr5 : that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_2]').val()
                       ,arr6 : that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_2]').val()
                	}).length > 0) {
                        var yStatTemp = {};
                        yStatTemp['qstCd'] = 'ENV0'+yStatArr[j]+'_1';
                        yStatTemp['thrYAgo'] = that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_1]').val();
                        yStatTemp['twoYAgo'] = that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_1]').val();
                        yStatTemp['oneYAgo'] = that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_1]').val();
                        setYStatList.push(yStatTemp);
                        yStatTemp = {};
                        yStatTemp['qstCd'] = 'ENV0'+yStatArr[j]+'_2';
                        yStatTemp['thrYAgo'] = that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+'_2]').val();
                        yStatTemp['twoYAgo'] = that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+'_2]').val();
                        yStatTemp['oneYAgo'] = that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+'_2]').val();
                        setYStatList.push(yStatTemp);
                	}   
                	
                }else if(asrCd == '01' || (asrCd=='02' && (yStatArr[j]=='13' || yStatArr[j]=='16' || yStatArr[j]=='27'))){ // ENV013(01,02),ENV015(01),ENV016(02),ENV018(01),ENV025(01), ENV027(02)
                	if(commonUtil.getNotEmptyArray({
                		arr1 : that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+']').val()
                       ,arr2 : that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+']').val()
                       ,arr3 : that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+']').val()
                	}).length > 0) {
                        var yStatTemp = {};
                        yStatTemp['qstCd'] = 'ENV0'+yStatArr[j];
                        yStatTemp['thrYAgo'] = that.$el.find('[name='+yStatArr[j]+'_thrYAgo'+asrCd+']').val();
                        yStatTemp['twoYAgo'] = that.$el.find('[name='+yStatArr[j]+'_twoYAgo'+asrCd+']').val();
                        yStatTemp['oneYAgo'] = that.$el.find('[name='+yStatArr[j]+'_oneYAgo'+asrCd+']').val();
                        
                        setYStatList.push(yStatTemp);
                	}   
                }
            }                      
            
            var param = {};
            
            param['step']       		= '2';
            param['rptCmpGb']		= 'SKI';
            param['esgrptAnsr']			= setAnsrList;
            param['esgrptYStat']		= setYStatList;
            param['esgrptCrtiStat']		= setCrtiStatList;
            console.log(param);
            
            that.parent.setStep2(param);
            that.parent.setStep2({openStep : "true"});

            console.log("----- makeData() END -----");
            return param;

        },
        sumNumberFormat : function(sumAmt){
            // 합계금액 콤마
            var v =  sumAmt.toString().replace(/\D/gi,'');
            
            var x = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return x
        }, 
        // 행추가
        addRow : function(e){
            var that = this;
            e.preventDefault();
            var targetAdd = e.target.value; 
           
                
            // ENV007 인증현황 추가
            if(targetAdd == 'env007_crtiStat'){
            	if($('#env007-list-id tr').length == 5){
            		alert("최대 5개까지 입력 가능합니다.");
            		return false;
            	}
                that.env007_crtiStatRowCnt = that.env007_crtiStatRowCnt +1;

                var rowAppendR = '';
                rowAppendR += '<tr id="env007_crtiStatRow' +that.env007_crtiStatRowCnt + '">';
                rowAppendR += '<td name="cnt">' +that.env007_crtiStatRowCnt + '</td>';
                rowAppendR += '<td>';
                rowAppendR += '<select class="form-control select-form" name="07_crtiKindCd" data-form-param="07_crtiKindCd" value="">';
                rowAppendR += '</select>';
                rowAppendR += '</td>';
                rowAppendR += '<td>';
                rowAppendR += '<select class="form-control select-form" name="07_crtiStatCd" data-form-param="07_crtiStatCd" value="">';
                rowAppendR += '</select>';
                rowAppendR += '</td>';
                rowAppendR += '<td><input name="07_crtiNm" id="" value="" type="text" class="layer-12 form-control" placeholder="" maxlength="20"></td>';
                rowAppendR += '<td><input name="07_crtiNo" id="" value="" type="text" class="layer-12 form-control" placeholder="" maxlength="20"></td>';
                rowAppendR += '<td><input name="07_crtiValiEymd" id="" value="" type="date" class="layer-12 form-control data-form" placeholder="" maxlength=""></td>';
                rowAppendR += '<td class="text-center fa-1"><button type="button" class="modBtn btn btn-danger btn-xs" name="delRow"><i class="fa fa-minus" aria-hidden="true"></i> 행삭제</button></td>';
                rowAppendR += '</tr>';

                $('#env007_item_01 > tbody:last').append(rowAppendR);
                
                $('#env007_crtiStatRow'+that.env007_crtiStatRowCnt).find('[name=07_crtiKindCd]').html(commonUtil.getSelectOption(
            			commonUtil.getEsgrptComCode('CRTI_KIND_CD','ENV007SK')['CRTI_KIND_CD'],'sCd','sNm', '선택'));   
                $('#env007_crtiStatRow'+that.env007_crtiStatRowCnt).find('[name=07_crtiStatCd]').html(commonUtil.getSelectOption(
            			commonUtil.getEsgrptComCode('CRTI_STAT_CD')['CRTI_STAT_CD'],'sCd','sNm', '선택'));   
                
                that.replaceRow("env007-list-id"); 
                
            // ENV006 인증현황 추가
            }else if(targetAdd == 'env006_crtiStat'){
            	if($('#env006-list-id tr').length == 5){
            		alert("최대 5개까지 입력 가능합니다.");
            		return false;
            	}
                that.env006_crtiStatRowCnt = that.env006_crtiStatRowCnt +1;

                var rowAppendR = '';
                rowAppendR += '<tr id="env006_crtiStatRow' +that.env006_crtiStatRowCnt + '">';
                rowAppendR += '<td name="cnt">' +that.env006_crtiStatRowCnt + '</td>';
                rowAppendR += '<td>';
                rowAppendR += '<select class="form-control select-form" name="06_crtiKindCd" data-form-param="06_crtiKindCd" value="">';
                rowAppendR += '</select>';
                rowAppendR += '</td>';
                rowAppendR += '<td>';
                rowAppendR += '<select class="form-control select-form" name="06_crtiStatCd" data-form-param="06_crtiStatCd" value="">';
                rowAppendR += '</select>';
                rowAppendR += '</td>';
                rowAppendR += '<td><input name="06_crtiNm" id="" value="" type="text" class="layer-12 form-control" placeholder="" maxlength="20"></td>';
                rowAppendR += '<td><input name="06_crtiNo" id="" value="" type="text" class="layer-12 form-control" placeholder="" maxlength="20"></td>';
                rowAppendR += '<td><input name="06_crtiValiEymd" id="" value="" type="date" class="layer-12 form-control data-form" placeholder="" maxlength=""></td>';
                rowAppendR += '<td class="text-center fa-1"><button type="button" class="modBtn btn btn-danger btn-xs" name="delRow"><i class="fa fa-minus" aria-hidden="true"></i> 행삭제</button></td>';
                rowAppendR += '</tr>';

                $('#env006_item_01 > tbody:last').append(rowAppendR);
                
                $('#env006_crtiStatRow'+that.env006_crtiStatRowCnt).find('[name=06_crtiKindCd]').html(commonUtil.getSelectOption(
            			commonUtil.getEsgrptComCode('CRTI_KIND_CD','ENV006SK')['CRTI_KIND_CD'],'sCd','sNm', '선택'));   
                $('#env006_crtiStatRow'+that.env006_crtiStatRowCnt).find('[name=06_crtiStatCd]').html(commonUtil.getSelectOption(
            			commonUtil.getEsgrptComCode('CRTI_STAT_CD')['CRTI_STAT_CD'],'sCd','sNm', '선택'));   
                
                that.replaceRow("env006-list-id"); 
                
            // ENV005 인증현황 추가
            }else if(targetAdd == 'env005_crtiStat'){
            	if($('#env005-list-id tr').length == 5){
            		alert("최대 5개까지 입력 가능합니다.");
            		return false;
            	}
                that.env005_crtiStatRowCnt = that.env005_crtiStatRowCnt +1;

                var rowAppendR = '';
                rowAppendR += '<tr id="env005_crtiStatRow' +that.env005_crtiStatRowCnt + '">';
                rowAppendR += '<td name="cnt">' +that.env005_crtiStatRowCnt + '</td>';
                rowAppendR += '<td>';
                rowAppendR += '<select class="form-control select-form" name="05_crtiKindCd" data-form-param="05_crtiKindCd" value="">';
                rowAppendR += '</select>';
                rowAppendR += '</td>';
                rowAppendR += '<td>';
                rowAppendR += '<select class="form-control select-form" name="05_crtiStatCd" data-form-param="05_crtiStatCd" value="">';
                rowAppendR += '</select>';
                rowAppendR += '</td>';
                rowAppendR += '<td><input name="05_crtiNm" id="" value="" type="text" class="layer-12 form-control" placeholder="" maxlength="20"></td>';
                rowAppendR += '<td><input name="05_crtiNo" id="" value="" type="text" class="layer-12 form-control" placeholder="" maxlength="20"></td>';
                rowAppendR += '<td><input name="05_crtiValiEymd" id="" value="" type="date" class="layer-12 form-control data-form" placeholder="" maxlength=""></td>';
                rowAppendR += '<td class="text-center fa-1"><button type="button" class="modBtn btn btn-danger btn-xs" name="delRow"><i class="fa fa-minus" aria-hidden="true"></i> 행삭제</button></td>';
                rowAppendR += '</tr>';

                $('#env005_item_01 > tbody:last').append(rowAppendR);
                
                $('#env005_crtiStatRow'+that.env005_crtiStatRowCnt).find('[name=05_crtiKindCd]').html(commonUtil.getSelectOption(
            			commonUtil.getEsgrptComCode('CRTI_KIND_CD','ENV005SK')['CRTI_KIND_CD'],'sCd','sNm', '선택'));   
                $('#env005_crtiStatRow'+that.env005_crtiStatRowCnt).find('[name=05_crtiStatCd]').html(commonUtil.getSelectOption(
            			commonUtil.getEsgrptComCode('CRTI_STAT_CD')['CRTI_STAT_CD'],'sCd','sNm', '선택'));   
                
                that.replaceRow("env005-list-id"); 
            }
        },
        replaceRow : function(tbodyId){
            // 행추가 행삭제 후 번호 매김
            var that = this;
            
            that.$el.find('#'+tbodyId+' tr').each(function(idx, item){
                $(item).find('[name=cnt]').html(idx+1);
           
            });
        },
        delRow : function(e){
            // 행삭제
            var that = this;
            var tbodyId = $(e.target).closest('tbody').attr('id');
            var trCnt = that.$el.find('#'+tbodyId+' tr').length;
            if(trCnt < 2){
                return false;
            }
            $(e.target).closest('tr').remove();
            that.replaceRow(tbodyId);
        },
        dateChk : function(e){
            var dateTemp = commonUtil.changeDateStringToString(e.target.value);

            if(!commonUtil.isEmpty(dateTemp)){
                
                if(dateTemp.length != 8){
                    commonUtil.alert("일자를 바르게 작성바랍니다.");
                    $(e.target).val('');
                }
            }
            
        },
        /** ***************************************************************************************************** */
        moveStep1 : function(e){
            
            e.preventDefault(); 
            var that = this;
            that.insertEnvAnsr(true); // 탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP1";
           
        },
        moveStep2 : function(e){
            var that = this;
            e.preventDefault(); 
            that.insertEnvAnsr(true); // 탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP2";
        },
        moveStep2isValid : function(e){
            var that = this;
            var rtn = false;
            var moveStep = e.target.name;
            var temp = {moveStep:moveStep, that:that}
            
            
	        if(that.$el.find('[name=env005]:checked').val() == '01' &&
            		 ($('[name=05_crtiKindCd]').val().length < 1 || $('[name=05_crtiStatCd]').val().length < 1 || $('[name=05_crtiNm]').val().length < 1 || 
            		 ($('[name=05_crtiNo]').val().length < 1 && $('[name=05_crtiStatCd]').val() == '01') ||
            		 ($('[name=05_crtiValiEymd]').val().length < 1 && $('[name=05_crtiStatCd]').val() == '01'))) {
	        	
            	commonUtil.confirm("환경(Environmental) 5번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if(that.$el.find('[name=env006]:checked').val() == '01' &&
           		 	 ($('[name=06_crtiKindCd]').val().length < 1 || $('[name=06_crtiStatCd]').val().length < 1 || $('[name=06_crtiNm]').val().length < 1 || 
               		 ($('[name=06_crtiNo]').val().length < 1 && $('[name=06_crtiStatCd]').val() == '01') ||
               		 ($('[name=06_crtiValiEymd]').val().length < 1 && $('[name=06_crtiStatCd]').val() == '01'))) {
            	
               	commonUtil.confirm("환경(Environmental) 6번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
               	
            }else if(that.$el.find('[name=env007]:checked').val() == '01' &&
              		 ($('[name=07_crtiKindCd]').val().length < 1 || $('[name=07_crtiStatCd]').val().length < 1 || $('[name=07_crtiNm]').val().length < 1 || 
                     ($('[name=07_crtiNo]').val().length < 1 && $('[name=07_crtiStatCd]').val() == '01') ||
                     ($('[name=07_crtiValiEymd]').val().length < 1 && $('[name=07_crtiStatCd]').val() == '01'))) {
            	
                commonUtil.confirm("환경(Environmental) 7번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
                
            }else if(that.$el.find('[name=env009]:checked').val()=='01' && $('[name=09_ecoSalesWt]').val().length < 1){
            	
            	commonUtil.confirm("환경(Environmental) 9번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if(that.$el.find('[name=env010]:checked').val()=='01' && 
            		($('[name=10_thrYAgo01_1]').val().length < 1 || $('[name=10_twoYAgo01_1]').val().length < 1 || 
            				$('[name=10_oneYAgo01_1]').val().length < 1 || $('[name=10_thrYAgo01_2]').val().length < 1 || 
            				$('[name=10_twoYAgo01_2]').val().length < 1 || $('[name=10_oneYAgo01_2]').val().length < 1 || 
            				$('[name=10_thrYAgo01_3]').val().length < 1 || $('[name=10_twoYAgo01_3]').val().length < 1 || 
            				$('[name=10_oneYAgo01_3]').val().length < 1 )){
            	
            	commonUtil.confirm("환경(Environmental) 10번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if((that.$el.find('[name=env013]:checked').val()=='01' && 
            		($('[name=13_thrYAgo01]').val().length < 1 || $('[name=13_twoYAgo01]').val().length < 1 || 
            				$('[name=13_oneYAgo01]').val().length < 1)) ||
            		(that.$el.find('[name=env013]:checked').val()=='02' && 
            	    ($('[name=13_thrYAgo02]').val().length < 1 || $('[name=13_twoYAgo02]').val().length < 1 || 
            	            $('[name=13_oneYAgo02]').val().length < 1))){
            	
            	commonUtil.confirm("환경(Environmental) 13번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if(that.$el.find('[name=env015]:checked').val()=='01' && 
            		($('[name=15_thrYAgo01]').val().length < 1 || $('[name=15_twoYAgo01]').val().length < 1 || 
            				$('[name=15_oneYAgo01]').val().length < 1)){
            	
            	commonUtil.confirm("환경(Environmental) 15번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if((that.$el.find('[name=env016]:checked').val()=='01' && 
            		($('[name=16_thrYAgo01_1]').val().length < 1 || $('[name=16_twoYAgo01_1]').val().length < 1 || 
            				$('[name=16_oneYAgo01_1]').val().length < 1 || $('[name=16_thrYAgo01_2]').val().length < 1 || 
            				$('[name=16_twoYAgo01_2]').val().length < 1 || $('[name=16_oneYAgo01_2]').val().length < 1 || 
            				$('[name=16_thrYAgo01_3]').val().length < 1 || $('[name=16_twoYAgo01_3]').val().length < 1 || 
            				$('[name=16_oneYAgo01_3]').val().length < 1 )) || 
            		(that.$el.find('[name=env016]:checked').val()=='02' && 
            	    ($('[name=16_thrYAgo02]').val().length < 1 || $('[name=16_twoYAgo02]').val().length < 1 || 
            	            $('[name=16_oneYAgo02]').val().length < 1))){
            	
            	commonUtil.confirm("환경(Environmental) 16번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if(that.$el.find('[name=env018]:checked').val()=='01' && 
            		($('[name=18_thrYAgo01]').val().length < 1 || $('[name=18_twoYAgo01]').val().length < 1 || 
            				$('[name=18_oneYAgo01]').val().length < 1)){
            	
            	commonUtil.confirm("환경(Environmental) 18번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if(that.$el.find('[name=env022]:checked').val()=='01' && 
            		($('[name=22_thrYAgo01_1]').val().length < 1 || $('[name=22_twoYAgo01_1]').val().length < 1 || 
            				$('[name=22_oneYAgo01_1]').val().length < 1 || $('[name=22_thrYAgo01_2]').val().length < 1 || 
            				$('[name=22_twoYAgo01_2]').val().length < 1 || $('[name=22_oneYAgo01_2]').val().length < 1 )){
            	
            	commonUtil.confirm("환경(Environmental) 22번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if(that.$el.find('[name=env025]:checked').val()=='01' && 
            		($('[name=25_thrYAgo01]').val().length < 1 || $('[name=25_twoYAgo01]').val().length < 1 || 
            				$('[name=25_oneYAgo01]').val().length < 1)){
            	
            	commonUtil.confirm("환경(Environmental) 25번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else if((that.$el.find('[name=env027]:checked').val()=='01' && 
            		($('[name=27_thrYAgo01_1]').val().length < 1 || $('[name=27_twoYAgo01_1]').val().length < 1 || 
            				$('[name=27_oneYAgo01_1]').val().length < 1 || $('[name=27_thrYAgo01_2]').val().length < 1 || 
            				$('[name=27_twoYAgo01_2]').val().length < 1 || $('[name=27_oneYAgo01_2]').val().length < 1 || 
            				$('[name=27_thrYAgo01_3]').val().length < 1 || $('[name=27_twoYAgo01_3]').val().length < 1 || 
            				$('[name=27_oneYAgo01_3]').val().length < 1 )) || 
            		(that.$el.find('[name=env027]:checked').val()=='02' && 
            	    ($('[name=27_thrYAgo02]').val().length < 1 || $('[name=27_twoYAgo02]').val().length < 1 || 
            	            $('[name=27_oneYAgo02]').val().length < 1))){
            	
            	commonUtil.confirm("환경(Environmental) 27번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            	
            }else{
                rtn = true;
            }
            if(rtn){
                that.insertEnvAnsr(true); // 탭별로 클릭 시 임시저장
                if(moveStep =="step1Last"){
                    location.href = "#MENUSD0700SK/STEP1";
                }else{
                    location.href = "#MENUSD0700SK/STEP3";
                }                
            }
            
        },
        moveStepConfirm : function(a, temp){ 
            if(!a){
                return false;
            }
            if(temp.moveStep == "step1Last"){
            	temp.that.insertEnvAnsr(true); // 탭별로 클릭 시 임시저장
                location.href = "#MENUSD0700SK/STEP1";
            }else{
            	temp.that.insertEnvAnsr(true); // 탭별로 클릭 시 임시저장
                location.href = "#MENUSD0700SK/STEP3";
            }
        },
        moveStep3 : function(e){           
            e.preventDefault(); 
            var that = this;
            that.insertEnvAnsr(true); // 탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP3";
        },
        moveStep4 : function(e){
            e.preventDefault(); 
            var that = this;
            that.insertEnvAnsr(true); // 탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP4";
        },
        openForm : function(){
            var that = this;
            var esgrptAnsr = that.parent.getStep2("esgrptAnsr");
        	if(esgrptAnsr) {
            	for(var i=0; i<esgrptAnsr.length; i++) {
            		if(esgrptAnsr[i].qstCd.indexOf('ENV') > -1) {
            			if(esgrptAnsr[i].qstCd == 'ENV002') {
            				var notAsrCd;
            				if(esgrptAnsr[i].asrCd == '01'){
            					notAsrCd='02';
            				}else if(esgrptAnsr[i].asrCd == '02'){
            					notAsrCd='01';
            				}
            				$('#'+esgrptAnsr[i].qstCd.toLowerCase()+'_form_'+notAsrCd).css("display", "none");
            			}
            			$('#'+esgrptAnsr[i].qstCd.toLowerCase()+'_form_'+esgrptAnsr[i].asrCd).css("display", "");
            		}
            	}        		
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
        // 7,6,5번 등록번호, 유효기간 활성화 기능
        inputAct : function(e){
            var that =this;
        	var num = $(e.target)[0].name.substring(0,2);    
            var trCnt = that.$el.find('#env0'+num+'-list-id tr').length;  
            for(var i=0; i<trCnt; i++) {
	            if(that.$el.find('[name='+num+'_crtiStatCd]').get(i).value == '01') {
	            	that.$el.find('#env0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiNo]').attr("disabled", false);
	            	that.$el.find('#env0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiValiEymd]').attr("disabled", false);
	            }else {
	            	that.$el.find('#env0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiNo]').attr("disabled", true);  
	            	that.$el.find('#env0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiValiEymd]').attr("disabled", true); 
	            	that.$el.find('#env0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiNo]').val("");
	            	that.$el.find('#env0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiValiEymd]').val(""); 
	            }
            	
            }
        },
        numberWithCommas : function(e){
            var that =this;
        	var value = that.$el.find('[name='+$(e.target)[0].name+']').val().replaceAll(",","");
            var parts = value.replace(/[^0-9.]/gi,"").toString().split(".");
            if(parts[1] != undefined) {
            	parts[1] = parts[1].substring(0,2);            	
            }
            value = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] != undefined ? "." + parts[1] : "");
            that.$el.find('[name='+$(e.target)[0].name+']').val(value);
        }
    });
});// end define
