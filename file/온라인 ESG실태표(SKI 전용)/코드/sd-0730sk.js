define(
[
    'common/config',
    'common/util',
    'text!views/sd/sd-0730sk-tpl.html'
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

            "click button[name=step2Last]" : "moveStep3isValid",
            "click button[name=step4Next]" : "moveStep3isValid",
            "click button[name=step3Save]" : "insertSocAnsr",

            "blur [name=histYmd]" : "dateChk",

            "click .moveStep1" : "moveStep1",
            "click .moveStep2" : "moveStep2",
            "click .moveStep3" : "moveStep3",
            "click .moveStep4" : "moveStep4",

            "click .fileUpload" : "fileUpload",
            "click #soc039_16" : "checkboxAct",
           	"change [name=08_crtiStatCd]": "inputAct",
           	"change [name=09_crtiStatCd]": "inputAct",
           	"change [name=36_crtiStatCd]": "inputAct",
           	"keyup .number" : "numberWithCommas"
        },

        initialize : function(model, parent){
            var that = this;

            //각 테이블 행 초기화
            that.soc024_crtiStatRowCnt = 1;

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
            if(that.parent.getStep3("openStep") =="true"){
                that.getData();
            }

            //라디오버튼 클릭 시 추가 입력폼 오픈
            $(document).on("click", "input[class='radio-soc']", function(){
                thisRadio = $(this)[0];
            	$('input[id^="'+thisRadio.name+'_form"]').css("display", "none");
            	$('div[id^="'+thisRadio.name+'_form"]').css("display", "none");
            	$('select[id^="'+thisRadio.name+'_form"]').css("display", "none");
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
            //합계금액 콤마
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
            //인증상태
            var crtiStatCd = commonUtil.getEsgrptComCode('CRTI_STAT_CD')['CRTI_STAT_CD'];
            that.$el.find("[name='24_crtiStatCd']").html(commonUtil.getSelectOption(crtiStatCd,'sCd','sNm', '선택'));
            //주기, 범위
            var cycleCd = commonUtil.getEsgrptComCode('CYCLE_CD')['CYCLE_CD'];
            that.$el.find("[name='soc008_1_1']").html(commonUtil.getSelectOption(cycleCd,'sCd','sNm', '선택'));
            that.$el.find("[name='soc018_1_1']").html(commonUtil.getSelectOption(cycleCd,'sCd','sNm', '선택'));
            var rangeCd = commonUtil.getEsgrptComCode('RANGE_CD')['RANGE_CD'];
            that.$el.find("[name='soc008_1_2']").html(commonUtil.getSelectOption(rangeCd,'sCd','sNm', '선택'));
            that.$el.find("[name='soc018_1_2']").html(commonUtil.getSelectOption(rangeCd,'sCd','sNm', '선택'));
            //SOC024 인증종류
            that.$el.find("[name='24_crtiKindCd']").html(commonUtil.getSelectOption(
                commonUtil.getEsgrptComCode('CRTI_KIND_CD','SOC024SK')['CRTI_KIND_CD'],'sCd','sNm', '선택'));
        },
        //신규
        insertSocAnsr : function(move){

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
                        commonUtil.alertSucc('사회(Social)에 작성하신 내용이 저장됐습니다.');

                        commonUtil.redirectRoutePage("MENUSD0700SK/STEP3");
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
                    // 사회(Social) 답변
                    var esgrptAnsr = that.parent.getStep3("esgrptAnsr");
                    if(esgrptAnsr) {
                    	for(var i=0; i<esgrptAnsr.length; i++) {
                    		if(esgrptAnsr[i].qstCd.indexOf('SOC') > -1) {
                            	var qstCd = esgrptAnsr[i].qstCd.toLowerCase();
                    			if( qstCd == 'soc008_1_1' || qstCd == 'soc008_1_2' || qstCd == 'soc018_1_1' || qstCd == 'soc018_1_2') {
                    				that.$el.find("[name='"+qstCd+"']").val(esgrptAnsr[i].asrCd).prop("selected", true);
                    			}else{
                    				that.$el.find("[name='"+qstCd+"']:input[value='"+esgrptAnsr[i].asrCd+"']").attr("checked", true);
                    			}
                    		}
                    	}
                    }

                    // 인증현황
                    var esgrptCrtiStat = that.parent.getStep3("esgrptCrtiStat");
                	var arr = ['24'];
                    for(var i=0; i<arr.length; i++) {
                    	var crtiStatTemp = [];
                    	var qstCd = '';
                        for(var j=0; j<esgrptCrtiStat.length; j++) {
                        	if(esgrptCrtiStat[j].qstCd == 'SOC0'+arr[i]) {
                                if(arr[i] == '24') { that.soc024_crtiStatRowCnt = j+1; }
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

                    // 종업원현황
                    var esgrptEmplStat = that.parent.getStep3("esgrptEmplStat");
                    if(esgrptEmplStat.length > 0) {
                        for(var i=0; i<esgrptEmplStat.length; i++) {
                        	if(esgrptEmplStat[i].qstCd.indexOf('SOC') > -1) {
                            	var qstCd = esgrptEmplStat[i].qstCd.toLowerCase();
                            	if(qstCd == 'soc011'){
                                    that.$el.find("[name='11_emplWCnt']").val(esgrptEmplStat[i].emplWCnt);
                                    that.$el.find("[name='11_emplMCnt']").val(esgrptEmplStat[i].emplMCnt);
                            	}else if(qstCd == 'soc012'){
                                    that.$el.find("[name='12_emplDisabldCnt']").val(esgrptEmplStat[i].emplDisabldCnt);
                                    that.$el.find("[name='12_exptDisabldCnt']").val(esgrptEmplStat[i].exptDisabldCnt);
                            	}
                        	}
                        }
                    }

                    // 산업재해 3개년
                    var esgrptYStat = that.parent.getStep3("esgrptYStat");
                    if(esgrptYStat.length > 0) {
                        for(var i=0; i<esgrptYStat.length; i++) {
                        	if(esgrptYStat[i].qstCd.indexOf('SOC') > -1) {
                        		var qstCd = esgrptYStat[i].qstCd.toLowerCase();
                            	if(qstCd == 'soc022'){
                              		that.$el.find("[name='22_thrYAgo']").val(esgrptYStat[i].thrYAgo);
                                    that.$el.find("[name='22_twoYAgo']").val(esgrptYStat[i].twoYAgo);
                                    that.$el.find("[name='22_oneYAgo']").val(esgrptYStat[i].oneYAgo);
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

            //ESG실태표 답변
            var setAnsrList = [];
            var num;
            for(var i=0; i < $("div[class^='radio-box']").length; i++ ){
                var ansrTemp = {};
                if(i == 4 || i == 12 || i == 19){ // 추가문항(value=01일 때) : SOC004_1, SOC010_1, SOC016_1
                	if(that.$el.find('[name=soc0'+num+']:checked').val()=='01'){
                	num = mainQst < 10 ? '0'+mainQst : mainQst;
                	ansrTemp['qstCd'] = 'SOC0'+num+'_1';
                	ansrTemp['asrSeq'] = 1;

                	if(that.$el.find('[name=soc0'+num+'_1]:checked').val() != undefined) {
                		ansrTemp['asrCd'] = that.$el.find('[name=soc0'+num+'_1]:checked').val();
                	}
                	}else{
                		continue;
                	}

                }else if(i == 9 || i == 22){ // 추가문항_소문항 : SOC008_1_1, SOC008_1_2, SOC018_1_1, SOC018_1_2
                	if(that.$el.find('[name=soc0'+num+']:checked').val()=='01'){
                	num = mainQst < 10 ? '0'+mainQst : mainQst;
                	ansrTemp['qstCd'] = 'SOC0'+num+'_1_1';
                	ansrTemp['asrSeq'] = 1;
                	if(that.$el.find('[name=soc0'+num+'_1_1]').val() != undefined) {
                		ansrTemp['asrCd'] = that.$el.find('[name=soc0'+num+'_1_1]').val();
                	}
                	if(ansrTemp['asrCd'] != undefined){
                		setAnsrList.push(ansrTemp);
                	}
                	ansrTemp = {};
                	ansrTemp['qstCd'] = 'SOC0'+num+'_1_2';
                	ansrTemp['asrSeq'] = 1;
                	if(that.$el.find('[name=soc0'+num+'_1_2]').val() != undefined) {
                		ansrTemp['asrCd'] =  that.$el.find('[name=soc0'+num+'_1_2]').val();
                	}
                	}else{
                		continue;
                	}
                	// soc select문 값이 저장이 안됨(soc008_1 수정 요망..)
                }else if(i == 33){ // 소문항 : SOC029_1, SOC029_2, SOC029_3, SOC029_4
                	mainQst = mainQst + 1;
                	num = mainQst;
                	for(var j = 1;j<=4;j++){
                		ansrTemp = {};
                		ansrTemp['qstCd'] = 'SOC0'+num+'_'+j;
                    	ansrTemp['asrSeq'] = 1;
                    	if(that.$el.find('[name=soc0'+num+'_'+j+']:checked').val() != undefined) {
                    		ansrTemp['asrCd'] = that.$el.find('[name=soc0'+num+'_'+j+']:checked').val();
                    	}
                    	if(ansrTemp['asrCd'] != undefined && j != 4){
                    		setAnsrList.push(ansrTemp);
                    	}
                	}
            	}else { // 나머지
                	mainQst = mainQst + 1;
                    num = mainQst < 10 ? '0'+mainQst : mainQst;
                	ansrTemp['qstCd'] = 'SOC0'+num;
                	ansrTemp['asrSeq'] = 1;

                	if(i==7 || i==38){ // 복수 선택 : SOC007
                		$('input:checkbox[name=soc0'+num+']:checked').each(function(j, jval) {
                			if($('input:checkbox[name=soc0'+num+']:checked').length > j+1) {
                				var ansrTemp2 = {};
                            	ansrTemp2['qstCd'] = 'SOC0'+num;
                            	ansrTemp2['asrSeq'] = j+1;
                				ansrTemp2['asrCd'] = jval.value;
                				setAnsrList.push(ansrTemp2);
                			}else {
                            	ansrTemp['asrSeq'] = j+1;
                				ansrTemp['asrCd'] = jval.value;
                			}
                		});
                	}else if(that.$el.find('[name=soc0'+num+']:checked').val() != undefined) {
                		ansrTemp['asrCd'] = that.$el.find('[name=soc0'+num+']:checked').val();
                	}
                }
            	if(ansrTemp['asrCd'] != undefined || ansrTemp['asrCont'] != undefined ){
            		setAnsrList.push(ansrTemp);
            		console.log('makedata : '+ansrTemp['qstCd']+ansrTemp['asrCd']);
            	}
            }

            //ESG실태표 인증현황 (SOC024)
            var crtiStatArr = ['24'];
            var setCrtiStatList = [];
            for(var i=0; i<crtiStatArr.length; i++){
                var crtiSeq = 1;
            	if(that.$el.find('[name=soc0'+crtiStatArr[i]+']:checked').val() == '01'){
                    var trCnt = that.$el.find('#soc0'+crtiStatArr[i]+'-list-id tr').length;
                    for(var i=0; i<trCnt; i++) {
                    	if(commonUtil.getNotEmptyArray({
                    		arr1 : that.$el.find('[name='+crtiStatArr[i]+'_crtiKindCd]').get(i).value
                           ,arr2 : that.$el.find('[name='+crtiStatArr[i]+'_crtiStatCd]').get(i).value
                           ,arr3 : that.$el.find('[name='+crtiStatArr[i]+'_crtiNm]').get(i).value
                           ,arr4 : that.$el.find('[name='+crtiStatArr[i]+'_crtiNo]').get(i).value
                           ,arr5 : that.$el.find('[name='+crtiStatArr[i]+'_crtiValiEymd]').get(i).value
                    	}).length > 0) {
                            var crtiStatTemp = {};
                            crtiStatTemp['qstCd'] = 'SOC0'+crtiStatArr[i];
                            crtiStatTemp['crtiSeq'] = crtiSeq;
                            crtiStatTemp['crtiKindCd'] = that.$el.find('[name='+crtiStatArr[i]+'_crtiKindCd]').get(i).value;
                            crtiStatTemp['crtiStatCd'] = that.$el.find('[name='+crtiStatArr[i]+'_crtiStatCd]').get(i).value;
                            crtiStatTemp['crtiNm'] = that.$el.find('[name='+crtiStatArr[i]+'_crtiNm]').get(i).value;
                            crtiStatTemp['crtiNo'] = that.$el.find('[name='+crtiStatArr[i]+'_crtiNo]').get(i).value;
                            crtiStatTemp['crtiValiEymd'] = commonUtil.changeDateStringToString(that.$el.find('[name='+crtiStatArr[i]+'_crtiValiEymd]').get(i).value);
                            crtiSeq++;

                            setCrtiStatList.push(crtiStatTemp);
                    	}
                    }
                }
            }

          //ESG실태표 산업재해 3개년 (SOC022)
            var yStatArr = ['22'];
            var setYStatList = [];
            for(var i=0; i<yStatArr.length; i++){
            	if(yStatArr[i] == '22'){ // SOC022
                	if(commonUtil.getNotEmptyArray({
                		arr1 : that.$el.find('[name='+yStatArr[i]+'_thrYAgo]').val()
                       ,arr2 : that.$el.find('[name='+yStatArr[i]+'_twoYAgo]').val()
                       ,arr3 : that.$el.find('[name='+yStatArr[i]+'_oneYAgo]').val()
                	}).length > 0) {
                        var yStatTemp = {};
                        yStatTemp['qstCd'] = 'SOC0'+yStatArr[i];
                        yStatTemp['thrYAgo'] = that.$el.find('[name='+yStatArr[i]+'_thrYAgo]').val();
                        yStatTemp['twoYAgo'] = that.$el.find('[name='+yStatArr[i]+'_twoYAgo]').val();
                        yStatTemp['oneYAgo'] = that.$el.find('[name='+yStatArr[i]+'_oneYAgo]').val();

                        setYStatList.push(yStatTemp);
                	}
                }
            }

            //ESG실태표 종업원현황 (SOC011, SOC012)
            var emplStatArr = ['11','12'];
            var setEmplStatList = [];
            for(var i=0; i<emplStatArr.length; i++){
                var setEmplStatTemp = {};
                setEmplStatTemp['qstCd'] = 'SOC0'+emplStatArr[i];
                if(emplStatArr[i] == '11') {
                	setEmplStatTemp['emplWCnt'] = commonUtil.nvl(that.$el.find('[name=11_emplWCnt]').val(),'0');
                	setEmplStatTemp['emplMCnt'] = commonUtil.nvl(that.$el.find('[name=11_emplMCnt]').val(),'0');
                    setEmplStatList.push(setEmplStatTemp);
                }else if(emplStatArr[i] == '12') {
                	setEmplStatTemp['emplDisabldCnt'] = commonUtil.nvl(that.$el.find('[name=12_emplDisabldCnt]').val(),'0');
                	setEmplStatTemp['exptDisabldCnt'] = commonUtil.nvl(that.$el.find('[name=12_exptDisabldCnt]').val(),'0');
                    setEmplStatList.push(setEmplStatTemp);
                }
            }

            var param = {};
            param['step']       		= '3';
            param['rptCmpGb']		= 'SKI';
            param['esgrptAnsr']			= setAnsrList;
            param['esgrptCrtiStat']		= setCrtiStatList;
            param['esgrptYStat']	= setYStatList;
            param['esgrptEmplStat']		= setEmplStatList;
            console.log(param);

            that.parent.setStep3(param);
            that.parent.setStep3({openStep : "true"});

            console.log("----- makeData() END -----");
            return param;

        },
        sumNumberFormat : function(sumAmt){
            //합계금액 콤마
            var v =  sumAmt.toString().replace(/\D/gi,'');

            var x = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return x
        },
        //행추가
        addRow : function(e){
            var that = this;
            e.preventDefault();
            var targetAdd = e.target.value;

            //SOC024 인증현황 추가
            if(targetAdd == 'soc024_crtiStat'){
            	if($('#soc024-list-id tr').length == 5){
            		alert("최대 5개까지 입력 가능합니다.");
            		return false;
            	}
                that.soc024_crtiStatRowCnt = that.soc024_crtiStatRowCnt +1;

                var rowAppendR = '';
                rowAppendR += '<tr id="soc024_crtiStatRow' +that.soc024_crtiStatRowCnt + '">';
                rowAppendR += '<td name="cnt">' +that.soc024_crtiStatRowCnt + '</td>';
                rowAppendR += '<td>';
                rowAppendR += '<select class="form-control select-form" name="24_crtiKindCd" data-form-param="24_crtiKindCd" value="">';
                rowAppendR += '</select>';
                rowAppendR += '</td>';
                rowAppendR += '<td>';
                rowAppendR += '<select class="form-control select-form" name="24_crtiStatCd" data-form-param="24_crtiStatCd" value="">';
                rowAppendR += '</select>';
                rowAppendR += '</td>';
                rowAppendR += '<td><input name="24_crtiNm" id="" value="" type="text" class="layer-12 form-control" placeholder="" maxlength="20"></td>';
                rowAppendR += '<td><input name="24_crtiNo" id="" value="" type="text" class="layer-12 form-control" placeholder="" maxlength="20"></td>';
                rowAppendR += '<td><input name="24_crtiValiEymd" id="" value="" type="date" class="layer-12 form-control data-form" placeholder="" maxlength=""></td>';
                rowAppendR += '<td class="text-center fa-1"><button type="button" class="modBtn btn btn-danger btn-xs" name="delRow"><i class="fa fa-minus" aria-hidden="true"></i> 행삭제</button></td>';
                rowAppendR += '</tr>';

                $('#soc024_item_01 > tbody:last').append(rowAppendR);

                $('#soc024_crtiStatRow'+that.soc024_crtiStatRowCnt).find('[name=24_crtiKindCd]').html(commonUtil.getSelectOption(
            			commonUtil.getEsgrptComCode('CRTI_KIND_CD','SOC024SK')['CRTI_KIND_CD'],'sCd','sNm', '선택'));
                $('#soc024_crtiStatRow'+that.soc024_crtiStatRowCnt).find('[name=24_crtiStatCd]').html(commonUtil.getSelectOption(
            			commonUtil.getEsgrptComCode('CRTI_STAT_CD')['CRTI_STAT_CD'],'sCd','sNm', '선택'));

                that.replaceRow("soc024-list-id");
            }
        },
        replaceRow : function(tbodyId){
            //행추가 행삭제 후 번호 매김
            var that = this;

            that.$el.find('#'+tbodyId+' tr').each(function(idx, item){
                $(item).find('[name=cnt]').html(idx+1);
            });
        },
        delRow : function(e){
            //행삭제
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
        /******************************************************************************************************* */
        moveStep1 : function(e){
            e.preventDefault();
            var that = this;
            that.insertSocAnsr(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP1";

        },
        moveStep2 : function(e){
            var that = this;
            e.preventDefault();
            that.insertSocAnsr(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP2";
        },
        moveStep3isValid : function(e){
            var that = this;
            var rtn = false;
            var moveStep = e.target.name;
            var temp = {moveStep:moveStep, that:that}

            if(that.$el.find('[name=soc008]:checked').val() == '01' &&
            		(($('[name=soc008_1_1]').val().length < 1 || $('[name=soc008_1_2]').val().length < 1))){
             	commonUtil.confirm("사회(Social) 8번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else if($('[name=11_emplMCnt]').val().length < 1 || $('[name=11_emplWCnt]').val().length < 1) {
             	commonUtil.confirm("사회(Social) 11번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else if($('[name=12_emplDisabldCnt]').val().length < 1 || $('[name=12_exptDisabldCnt]').val().length < 1) {
             	commonUtil.confirm("사회(Social) 12번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else if(that.$el.find('[name=soc018]:checked').val() == '01' &&
            		(($('[name=soc018_1_1]').val().length < 1 || $('[name=soc018_1_2]').val().length < 1))){
             	commonUtil.confirm("사회(Social) 18번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else if($('[name=22_thrYAgo]').val().length < 1 || $('[name=22_twoYAgo]').val().length < 1 || $('[name=22_oneYAgo]').val().length < 1) {
             	commonUtil.confirm("사회(Social) 22번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else if(that.$el.find('[name=soc024]:checked').val() == '01' &&
         		 	 ($('[name=24_crtiKindCd]').val().length < 1 || $('[name=24_crtiStatCd]').val().length < 1 || $('[name=24_crtiNm]').val().length < 1 ||
                     ($('[name=24_crtiNo]').val().length < 1 && $('[name=24_crtiStatCd]').val() == '01') ||
                     ($('[name=24_crtiValiEymd]').val().length < 1 && $('[name=24_crtiStatCd]').val() == '01'))) {
                 commonUtil.confirm("사회(Social) 24번 문항을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, temp);
            }else{
                rtn = true;
            }

            if(rtn){
                that.insertSocAnsr(true); //탭별로 클릭 시 임시저장
                if(moveStep =="step2Last"){
                    location.href = "#MENUSD0700SK/STEP2";
                }else{
                    location.href = "#MENUSD0700SK/STEP4";
                }
            }

        },
        moveStepConfirm : function(a, temp){
            if(!a){
                return false;
            }
            if(temp.moveStep == "step2Last"){
            	temp.that.insertSocAnsr(true); //탭별로 클릭 시 임시저장
                location.href = "#MENUSD0700SK/STEP2";
            }else{
            	temp.that.insertSocAnsr(true); //탭별로 클릭 시 임시저장
                location.href = "#MENUSD0700SK/STEP4";
            }
        },
        moveStep3 : function(e){
            e.preventDefault();
            var that = this;
            that.insertSocAnsr(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP3";
        },
        moveStep4 : function(e){
            e.preventDefault();
            var that = this;
            that.insertSocAnsr(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP4";
        },
        openForm : function(){
            var that = this;
            var esgrptAnsr = that.parent.getStep3("esgrptAnsr");
        	if(esgrptAnsr) {
            	for(var i=0; i<esgrptAnsr.length; i++) {
            		if(esgrptAnsr[i].qstCd.indexOf('SOC') > -1) {
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
        // 24번 등록번호, 유효기간 활성화 기능
        inputAct : function(e){
            var that =this;
        	var num = $(e.target)[0].name.substring(0,2);
            var trCnt = that.$el.find('#soc0'+num+'-list-id tr').length;
            for(var i=0; i<trCnt; i++) {
            	if(that.$el.find('[name='+num+'_crtiStatCd]').get(i).value == '01') {
            		that.$el.find('#soc0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiNo]').attr("disabled", false);
            		that.$el.find('#soc0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiValiEymd]').attr("disabled", false);
            	}else {
            		that.$el.find('#soc0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiNo]').attr("disabled", true);
            		that.$el.find('#soc0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiValiEymd]').attr("disabled", true);
            		that.$el.find('#soc0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiNo]').val("");
            		that.$el.find('#soc0'+num+'-list-id > tr:eq('+(i)+') > td').children('[name='+num+'_crtiValiEymd]').val("");
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
});//end define