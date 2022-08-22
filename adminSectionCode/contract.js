define(
    [
        'common/config',
        'common/util',
        'common/utils/nicednb-jquery-input',
        'text!views/ri/ri-2142-tpl.html',
        "common/component/nicetable/nicetable"
    ],
    function(
        commonConfig,
        commonUtil,
        inputUtil,
        tpl,
        NiceTable
    ) {
        var RI_2142_VIEW = Backbone.View.extend({
            tagName : 'section',
            events : {
            	  "change .moneyinput" : "NumberFormat",//금액 포맷
            	  "keyup .dateinput" : "dateFormat",//날짜 포맷
            	  "change .dateinput" : "dateChk",//날짜 포맷
                  "keyup .numberonly" : "OnlyNumberFormat",// 숫자 입력 필드
                  "click .add-cntr-normal" : "addCntrNormal",//기본계약 추가
                  "click .add-cntr-change" : "addCntrChange",//변경계약 추가
                  "click .delete-cntr" : "deleteSub",//계약삭제
                  "click button[name=saveBt]" : "saveCnstCntr",//저장
                  "click button[name=submitBt]" : "submitSub",//제출
                  "click .update-cmpl" : "updateCmpl",//단순 기성금액 변경
            	  "change [name=input_cmpl_amt]" : "changeAmt",//기성액 변경
            	  "change [name=input_cntr_amt]" : "changeAmt",//계약액 변경
            	  "change [name=input_end_yn]" : "changeEndYn",//종료 여부 변경
            	  "click [name=pop]": "pop", //면허 팝업
                  "click [name=itemCd]": "clickItemCd", //면허 클릭시
                  "enter-component [name=prdNm]": "selectItemListEnter", //면허 검색어
                  "keyup [name=prdNm]": "selectItemListEnter",
                  "click .popup-title > .right, .btn-close" : "closePop", //팝업 닫기
                  "click [name=closeItemCd]" : "closePop",
                  "click [name=selectedItemCd]": "selectedItemCd", //면허 선택 클릭시
                  "click .btn-excel" : "onClickBtnExcel",//엑셀다운로드
                  "change [name=input_sido]" : "changeAdminCd"//행정구역(광역시도) 변경
            },
            initialize : function(model, parent){
                var that = this;

                that.parent = parent;
                that.$el.html(Handlebars.compile(tpl));
                //검수 데이터 유무 확인
                that.submitFlag = true;
                //년도, 분기
                that.cnstY = commonUtil.getParameterByName("cnstY");
                that.cnstQ = commonUtil.getParameterByName("cnstQ");
                //분류코드 불러오기
                that.clsCode = commonUtil.getComCode('CLS')['CLS'];
                that.cntrGbCode = commonUtil.getComCode('CNTR_GB')['CNTR_GB'];
                that.adminCode = commonUtil.getComCode('AD_KOR_NM')['AD_KOR_NM'];
                that.cityCode = commonUtil.getComCode('CT_KOR_NM')['CT_KOR_NM'];
                that.adminCode.sort(function compare(a,b){ // 코드 순
                	return a.sCd - b.sCd;
                });
                that.cityCode.sort(function compare(a,b){ // 이름 순
                	return a.sNm == b.sNm ? 0 : a.sNm < b.sNm ? -1 : 1;
                });
            },
            render : function(){
                var that = this;
                that.loginCheck();
                that.selectCode();
                that.$el.find(".datepicker").datepicker(commonConfig.datepicker);
                return that;
            },
            afterRender : function(){
            	var that = this;
                $("#cnstYQ").html("("+that.cnstY+"년 "+that.cnstQ+"분기)");
                return that;
            },
            loginCheck : function(){
                var that =this;
                var keyTemp="ipadfi1092";

                requestParam = commonUtil.getBxmReqData(
                    '', '',
                    {
                        keyType : keyTemp
                    }
                );
                commonUtil.requestBxmAjax(requestParam, {
                    success:  function(response) {
                        var keyValue = response.sValue;

                        if(keyValue =='N'){
                            $.removeCookie('userBzno');
                            $.removeCookie('userName');
                            commonUtil.alert("로그인 후 이용해주시기 바랍니다.");
                            location.href = "#";
                        }else{
                        	//이전 공사계약 실적 입력 내용 가져오기
                            that.selectCnstCntr();
                        }
                    },error : function(e){
                        commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");
                        return false;
                    }
                },false);
            },
            // 공통코드
            selectCode : function(){
                var that = this;
                //분류코드 불러오기
                that.$el.find("[name='input_cls']").html(commonUtil.getSelectOption(that.clsCode,'sCd','sNm', '선택'));
                //계약구분코드 불러오기
                that.$el.find("[name='input_cntr_gb']").html(commonUtil.getSelectOption(that.cntrGbCode,'sCd','sNm', '선택'));
                //광역시도 불러오기
                that.$el.find("[name='input_sido']").html(commonUtil.getSelectOption(that.adminCode,'sCd','sNm', '선택'));
            },
            //금액 포맷 변경
            NumberFormat : function(e){
            	if($(e.target).val().replace(/,/g,"").length>15){
            		commonUtil.alert("15자리 금액까지 입력할 수 있습니다.");
            		$(e.target).val('');
            	}else{
	                var x = $(e.target).val().replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	                $(e.target).val(x);
            	}
            },
            //날짜 포맷 변경
            dateFormat : function(e){
                $(e.target).val(commonUtil.date_chk(e.target.value, e));
            },
            dateChk : function(e){
                var dateTemp = commonUtil.changeDaringToString(e.target.value);

                if(!commonUtil.isEmpty(dateTemp)){
                    if(dateTemp.length != 8){
                        commonUtil.alert("일자를 바르게 작성바랍니다.");
                        $(e.target).val('');
                    }
                }
            },
            OnlyNumberFormat : function(e){
                $(e.target).inputNumberFormat();
            },
            //이전 공사 계약 실태표 입력 내용 불러오기
            selectCnstCntr : function(){
            	var that = this;
                var param = {
        			bzno : $.cookie('userBzno'),
        			cnstY : that.cnstY,
        			cnstQ : that.cnstQ
                };

                commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', '', param), {
                    beforeSend: function(){
                        $(".loading").show();
                    },
                    success: function(response){
                        if(response.cnstCntrList.length > 0){
                            var cnstCntr = response.cnstCntrList;
                            var cnstCntrTmp = commonUtil.getTemplate(tpl,'cnstCntrTable-setting-tmp');

                            for(var i=0; i<cnstCntr.length; i++){
                            	if (cnstCntr[i].cntrDate!=null)
                            		cnstCntr[i].cntrDate = cnstCntr[i].cntrDate.substr(0,4)+"-"+ cnstCntr[i].cntrDate.substr(4,2)+"-"+ cnstCntr[i].cntrDate.substr(6,2);
                            	if (cnstCntr[i].stcsDate!=null)
                            		cnstCntr[i].stcsDate = cnstCntr[i].stcsDate.substr(0,4)+"-"+ cnstCntr[i].stcsDate.substr(4,2)+"-"+ cnstCntr[i].stcsDate.substr(6,2);
                            	if (cnstCntr[i].cmplcDate!=null)
                            		cnstCntr[i].cmplcDate = cnstCntr[i].cmplcDate.substr(0,4)+"-"+ cnstCntr[i].cmplcDate.substr(4,2)+"-"+ cnstCntr[i].cmplcDate.substr(6,2);
                            }
                            if(cnstCntrTmp){
                                $('#cnstCntrTable-list-id').html(Handlebars.compile(cnstCntrTmp)({
                                	cnstCntrList:cnstCntr
                                }));
                                for(var i=0; i<cnstCntr.length; i++){
                                	var row_id = cnstCntr[i].seq+ "_" + cnstCntr[i].seqGb;

                                	//검수 데이터 유무 확인
                                	if(Number(cnstCntr[i].cnstStatCd) >= 20){
                                		that.submitFlag = false;
                            	 	}
                                	if(cnstCntr[i].cnstStatCd!='10'){
                                		$("#cnstCntrTableRow"+row_id).find("[name='input_cntr_date']").datepicker(commonConfig.datepicker);
                                		$("#cnstCntrTableRow"+row_id).find("[name='input_stcs_date']").datepicker(commonConfig.datepicker);
                                		$("#cnstCntrTableRow"+row_id).find("[name='input_cmplc_date']").datepicker(commonConfig.datepicker);
                                		$("#cnstCntrTableRow"+row_id).find("[name='input_cntr_date']").datepicker('disable').removeAttr("disabled");
                                		$("#cnstCntrTableRow"+row_id).find("[name='input_stcs_date']").datepicker('disable').removeAttr("disabled");
                                		$("#cnstCntrTableRow"+row_id).find("[name='input_cmplc_date']").datepicker('disable').removeAttr("disabled");
	                                	$("#cnstCntrTableRow"+row_id).find("[name='input_cntr_date']").attr("disabled", true);
	                                	$("#cnstCntrTableRow"+row_id).find("[name='input_stcs_date']").attr("disabled", true);
	                                	$("#cnstCntrTableRow"+row_id).find("[name='input_cmplc_date']").attr("disabled", true)
                                	}
                                	//금액 자릿수
                                	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_amt']").val(String(cnstCntr[i].cntrAmt).replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                	$('#cnstCntrTableRow'+row_id).find("[name='input_cmpl_amt']").val(String(cnstCntr[i].cmplAmt).replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                	$('#cnstCntrTableRow'+row_id).find("[name='input_bal']").val(String(cnstCntr[i].bal).replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));

                                	//분류코드 불러오기
                                 	$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").html(commonUtil.getSelectOption(that.clsCode,'sCd','sNm', '선택'));
                                    //계약구분 불러오기
                                 	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_gb']").html(commonUtil.getSelectOption(that.cntrGbCode,'sCd','sNm', '선택'));
                                 	//광역시도 불러오기
                                 	$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").html(commonUtil.getSelectOption(that.adminCode,'sCd','sNm', '선택'));
                                 	//시군구명 불러오기
                                  	var partCity = that.cityCode.filter(function(city){
                                  		return city.rmk == cnstCntr[i].sido;
                                  	});
                                 	$('#cnstCntrTableRow'+row_id).find("[name='input_si']").html(commonUtil.getSelectOption(partCity,'sCd','sNm', '선택'));
                                 	//계약구분 select 값 지정
                                 	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_gb']").val(cnstCntr[i].cntrGb).prop("selected", true);
                                 	//분류 select 값 지정
                                 	$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").val(cnstCntr[i].cls).prop("selected", true);
                                	//광역시도 select 값 지정
                                	$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").val(cnstCntr[i].sido).prop("selected", true);
                                	//시군구명 select 값 지정
                                	$('#cnstCntrTableRow'+row_id).find("[name='input_si']").val(cnstCntr[i].si).prop("selected", true);
                                	//종료여부 select 값 지정
                                	$('#cnstCntrTableRow'+row_id).find("[name='input_end_yn']").val(cnstCntr[i].endYn).prop("selected", true);
                                	//기제출된 서류 select 값 지정
                                	$('#cnstCntrTableRow'+row_id).find("[name='input_bf_sbmt_doc_yn']").val(cnstCntr[i].bfSbmtDocYn).prop("selected", true);
                                	//종료여부가 Y거나 상태값이 삭제(90)인 경우 가리기 교체
                                	if(cnstCntr[i].cnstStatCd=='90'){
                                		$("#cnstCntrTableRow"+row_id).attr("hidden", true);
                                	}
                                	//저장된 값 block 풀기
                                	if(cnstCntr[i].cnstStatCd == '10'){
                                		$('#cnstCntrTableRow'+row_id+' .tax-com-btn').attr("disabled", false);
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").removeAttr("disabled");
                                    	//$('#cnstCntrTableRow'+row_id).find("[name='prdItemCd']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_si']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_orgn_cntr']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_scntr']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_ordpr_nm']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_pmcntr_org_nm']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno1']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno2']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno3']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_amt']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_cmpl_amt']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_date']").datepicker(commonConfig.datepicker);
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_stcs_date']").datepicker(commonConfig.datepicker);
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_cmplc_date']").datepicker(commonConfig.datepicker);
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_end_yn']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_note']").removeAttr("disabled");
                                    	$('#cnstCntrTableRow'+row_id).find("[name='input_bf_sbmt_doc_yn']").removeAttr("disabled");
                                	}
                                	console.log(row_id);
                                }
                            }
                        }else { // 데이터가 없는 경우 전 분기 데이터 가져오기
                        	var param = {
                    			bzno : $.cookie('userBzno'),
                    			cnstY : that.cnstQ == 1 ? that.cnstY-1 : that.cnstY,
                    			cnstQ : that.cnstQ == 1 ? 4 : that.cnstQ-1
                            };
                            commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', '', param), {
                                beforeSend: function(){
                                    $(".loading").show();
                                },
                                success: function(response){
                                    if(response.cnstCntrList.length > 0){
                                        var cnstCntr = response.cnstCntrList;
                                        var cnstCntrTmp = commonUtil.getTemplate(tpl,'cnstCntrTable-setting-tmp');

                                        for(var i=0; i<cnstCntr.length; i++){
                                        	if (cnstCntr[i].cntrDate!=null)
                                        		cnstCntr[i].cntrDate = cnstCntr[i].cntrDate.substr(0,4)+"-"+ cnstCntr[i].cntrDate.substr(4,2)+"-"+ cnstCntr[i].cntrDate.substr(6,2);
                                        	if (cnstCntr[i].stcsDate!=null)
                                        		cnstCntr[i].stcsDate = cnstCntr[i].stcsDate.substr(0,4)+"-"+ cnstCntr[i].stcsDate.substr(4,2)+"-"+ cnstCntr[i].stcsDate.substr(6,2);
                                        	if (cnstCntr[i].cmplcDate!=null)
                                        		cnstCntr[i].cmplcDate = cnstCntr[i].cmplcDate.substr(0,4)+"-"+ cnstCntr[i].cmplcDate.substr(4,2)+"-"+ cnstCntr[i].cmplcDate.substr(6,2);
                                        }
                                        if(cnstCntrTmp){
                                            $('#cnstCntrTable-list-id').html(Handlebars.compile(cnstCntrTmp)({
                                            	cnstCntrList:cnstCntr
                                            }));
                                            for(var i=0; i<cnstCntr.length; i++){
                                            	var row_id = cnstCntr[i].seq+ "_" + cnstCntr[i].seqGb;

                                            	if(cnstCntr[i].cnstStatCd!='10'){
                                            		$("#cnstCntrTableRow"+row_id).find("[name='input_cntr_date']").datepicker(commonConfig.datepicker);
                                            		$("#cnstCntrTableRow"+row_id).find("[name='input_stcs_date']").datepicker(commonConfig.datepicker);
                                            		$("#cnstCntrTableRow"+row_id).find("[name='input_cmplc_date']").datepicker(commonConfig.datepicker);
                                            		$("#cnstCntrTableRow"+row_id).find("[name='input_cntr_date']").datepicker('disable').removeAttr("disabled");
                                            		$("#cnstCntrTableRow"+row_id).find("[name='input_stcs_date']").datepicker('disable').removeAttr("disabled");
                                            		$("#cnstCntrTableRow"+row_id).find("[name='input_cmplc_date']").datepicker('disable').removeAttr("disabled");
            	                                	$("#cnstCntrTableRow"+row_id).find("[name='input_cntr_date']").attr("disabled", true);
            	                                	$("#cnstCntrTableRow"+row_id).find("[name='input_stcs_date']").attr("disabled", true);
            	                                	$("#cnstCntrTableRow"+row_id).find("[name='input_cmplc_date']").attr("disabled", true)
                                            	}
                                            	//금액 자릿수
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_amt']").val(String(cnstCntr[i].cntrAmt).replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_cmpl_amt']").val(String(cnstCntr[i].cmplAmt).replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_bal']").val(String(cnstCntr[i].bal).replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));

                                            	//분류코드 불러오기
                                             	$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").html(commonUtil.getSelectOption(that.clsCode,'sCd','sNm', '선택'));
                                                //계약구분 불러오기
                                             	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_gb']").html(commonUtil.getSelectOption(that.cntrGbCode,'sCd','sNm', '선택'));
                                             	//광역시도 불러오기
                                             	$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").html(commonUtil.getSelectOption(that.adminCode,'sCd','sNm', '선택'));
                                             	//시군구명 불러오기
                                              	var partCity = that.cityCode.filter(function(city){
                                              		return city.rmk == cnstCntr[i].sido;
                                              	});
                                             	$('#cnstCntrTableRow'+row_id).find("[name='input_si']").html(commonUtil.getSelectOption(partCity,'sCd','sNm', '선택'));
                                             	//계약구분 select 값 지정
                                             	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_gb']").val(cnstCntr[i].cntrGb).prop("selected", true);
                                             	//분류 select 값 지정
                                             	$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").val(cnstCntr[i].cls).prop("selected", true);
                                            	//광역시도 select 값 지정
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").val(cnstCntr[i].sido).prop("selected", true);
                                            	//시군구명 select 값 지정
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_si']").val(cnstCntr[i].si).prop("selected", true);
                                            	//종료여부 select 값 지정
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_end_yn']").val(cnstCntr[i].endYn).prop("selected", true);
                                            	//기제출된 서류 select 값 지정
                                            	if(cnstCntr[i].bfSbmtDocYn) {
                                            		$('#cnstCntrTableRow'+row_id).find("[name='input_bf_sbmt_doc_yn']").val(cnstCntr[i].bfSbmtDocYn).prop("selected", true);
                                            	}
                                            	//종료여부가 Y거나 상태값이 삭제(90)인 경우 가리기 교체
                                            	if(cnstCntr[i].endYn=='Y' || cnstCntr[i].cnstStatCd=='90'){
                                            		$("#cnstCntrTableRow"+row_id).attr("hidden", true);
                                            	}
                                            	//저장된 값 block 풀기
                                        		$('#cnstCntrTableRow'+row_id+' .tax-com-btn').attr("disabled", false);
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").removeAttr("disabled");
                                            	//$('#cnstCntrTableRow'+row_id).find("[name='prdItemCd']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_si']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_orgn_cntr']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_scntr']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_ordpr_nm']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_pmcntr_org_nm']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno1']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno2']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno3']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_amt']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_cmpl_amt']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_date']").datepicker(commonConfig.datepicker);
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_stcs_date']").datepicker(commonConfig.datepicker);
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_cmplc_date']").datepicker(commonConfig.datepicker);
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_end_yn']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_note']").removeAttr("disabled");
                                            	$('#cnstCntrTableRow'+row_id).find("[name='input_bf_sbmt_doc_yn']").removeAttr("disabled");
                                            }
                                        }
                                    }
                                },error : function(e){
                                    $(".loading").hide();
                                    commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");
                                    return false;
                                }
                            });
                        }
                        $(".loading").hide();
                        setTimeout(function(){that.replaceRow(-1,-1);}, 100);
                    },error : function(e){
                        $(".loading").hide();
                        commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");
                        return false;
                    }
                });
            },
            //검수 체크
            submitCheck: function(){
            	var that = this;
            	if(that.submitFlag==false){
            		commonUtil.alert("최종제출 이후에는 입력이 제한됩니다.");
            		return false;
            	}
            },
            //기본계약 추가
            addCntrNormal : function(e){
            	var that = this;
            	var addSeqId;

            	if(that.submitCheck()==false){
            		return false;
            	}
            	if($('#cnstCntrTable-list-id tr:last').attr('id')){
            		var trId = $('#cnstCntrTable-list-id tr:last').attr('id');
            		var beforeSplit = trId.substr(16);
            		var splitId = beforeSplit.split("_");
            		var seqId = parseInt(splitId[0]);
            		var seqGbId = parseInt(splitId[1]);

            		addSeqId=seqId+1;
            	}else{
            		addSeqId=1;
            	}
            	var addSeqGbId=0;
            	var data={ seqId:addSeqId, seqGbId: addSeqGbId}
            	var cnstCntrTmp=commonUtil.getTemplate(tpl,'cnstCntrTable-add-tmp');
            	var maxSeq=0;

            	if(cnstCntrTmp){
            		$('#cnstCntrTable > tbody:last').append(Handlebars.compile(cnstCntrTmp)(data));
            		var row_id = addSeqId.toString()+"_"+addSeqGbId.toString();
                 	$("#cnstCntrTableRow"+row_id).find("[name='input_cntr_date']").datepicker(commonConfig.datepicker);
                 	$("#cnstCntrTableRow"+row_id).find("[name='input_stcs_date']").datepicker(commonConfig.datepicker);
                 	$("#cnstCntrTableRow"+row_id).find("[name='input_cmplc_date']").datepicker(commonConfig.datepicker);
                 	//분류
                 	$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").html(commonUtil.getSelectOption(that.clsCode,'sCd','sNm', '선택'));
                    //계약구분
                 	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_gb']").html(commonUtil.getSelectOption(that.cntrGbCode,'sCd','sNm', '선택'));
                 	//광역시도
                 	$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").html(commonUtil.getSelectOption(that.adminCode,'sCd','sNm', '선택'));
                 	//계약구분에서 기본 계약 selected 설정
                 	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_gb']").val('10').prop("selected", true);
                 	$('#cnstCntrTableRow'+row_id).css("background-color","#def7f7");
                 	//setTimeout(function(){$('#cnstCntrTableRow'+row_id).css("background-color","#fff");}, 400);
                 	that.replaceRow(-1,-1);
                 }
            },
            //변경계약추가
            addCntrChangeSub : function(e){
                var that=this;

                if(that.submitCheck()==false){
            		return false;
            	}

            	var checkbox = $("input[name=input_check]:checked");
            	var flag=true;
            	var chkChk = false;
            	checkbox.each(function(i){
              		chkChk=true;
            	})
            	if(chkChk){
            		checkbox.each(function(i){
	                  	//변경계약으로 체크 된 사항이 있으면 confirm
	                  	var tr = checkbox.parent().parent().eq(i);
	                  	var trId = tr.attr('id');
	                  	var beforeSplit = trId.substr(16);
	                  	var splitId = beforeSplit.split("_");
	                  	if(splitId[1]!='0'){
	                  		flag=false;
	                  	}
            		})
            	}else{
              		commonUtil.alert("변경 계약을 추가할 기본 계약을 선택해주세요.");
            	}
            	if(!flag){
            		commonUtil.alert("변경계약 추가시, 기본 계약 행만을 선택해야 합니다.");
            	}
                return flag;
            },
            addCntrChange : function(e){
            	var that = this;

            	if(that.addCntrChangeSub()){
            		var rowData = new Array();
            		var tdArr =  new Array();
            		var checkbox = $("input[name=input_check]:checked");
            		var maxList = [];
            		var lastTrId = $('#cnstCntrTable-list-id tr:last').attr('id');
            		var sgetBeforeSplit = lastTrId.substr(16);
            		var sgetSplitId = sgetBeforeSplit.split("_");
            		var sgetSeqId = sgetSplitId[0];
            		var sgetSeqGbId = sgetSplitId[1];
           	 		var m = Number(sgetSeqId);

           	 		for(var i=0; i<m; i++){
           	 			maxList[i]=-1;
           	 		}
           	 		//전체 리스트에서 각각의 row 별로 max seqGbId 값 가져오기
           	 		for(var i=0; i<that.$el.find('#cnstCntrTable tbody tr').length; i++){
           	 			var getTrId = $('#cnstCntrTable-list-id tr:eq('+i+')').attr('id');
           	 			var getBeforeSplit = getTrId.substr(16);
           	 			var getSplitId = getBeforeSplit.split("_");
           	 			var getSeqId = parseInt(getSplitId[0]);
           	 			var getSeqGbId = parseInt(getSplitId[1]);

           	 			if(getSeqGbId>=maxList[getSeqId-1]){
           	 				maxList[getSeqId-1]=parseInt(getSeqGbId);
           	 			}
           	 		}
           	 		checkbox.each(function(i){
           	 			//체크된 항목의 tr id 값 가져오기
           	 			var tr = checkbox.parent().parent().eq(i);
           	 			var trId = tr.attr('id');
           	 			var beforeSplit = trId.substr(16);
           	 			var splitId = beforeSplit.split("_");
           	 			var seqId = parseInt(splitId[0]);
           	 			var seqGbId = parseInt(splitId[1]);
           	 			var plusSeqGbId = maxList[seqId-1]+1;
           	 			var data = { seqId:seqId, seqGbId: plusSeqGbId}
           	 			var cnstCntrTmp = commonUtil.getTemplate(tpl,'cnstCntrTable-add-tmp');
           	 			var maxSeq = 0;

           	 			if(cnstCntrTmp){
           	 				$("#cnstCntrTableRow"+seqId+"_"+maxList[seqId-1]).after(Handlebars.compile(cnstCntrTmp)(data));
           	 				var row_id = seqId.toString()+"_"+plusSeqGbId.toString();
           	 				var base_row_id = seqId.toString()+"_0";
           	 				$("#cnstCntrTableRow"+row_id).find("[name='input_cntr_date']").datepicker(commonConfig.datepicker);
           	 				$("#cnstCntrTableRow"+row_id).find("[name='input_stcs_date']").datepicker(commonConfig.datepicker);
           	 				$("#cnstCntrTableRow"+row_id).find("[name='input_cmplc_date']").datepicker(commonConfig.datepicker);
           	 				//분류
           	 				$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").html(commonUtil.getSelectOption(that.clsCode,'sCd','sNm', '선택'));
           	 				//계약구분
           	 				$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_gb']").html(commonUtil.getSelectOption(that.cntrGbCode,'sCd','sNm', '선택'));
           	 				//광역시도
           	 				$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").html(commonUtil.getSelectOption(that.adminCode,'sCd','sNm', '선택'));
           	 				//변경계약 select 값 지정
           	 				$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_gb']").val('20').prop("selected", true);
	                		/*기본계약 값 불러오기
	                		 * 분류/면허/광역시도/시/원도급/하도급/발주자명/원청사명/사업자번호/계약액/기성액/계약일/착공일/준공일/종료여부/기제출된 서류/비고
	                		 */
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_cls']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_cls']").val()).prop("selected", true);
		                   	$('#cnstCntrTableRow'+row_id).find("[name='prdItemCd']").val($('#cnstCntrTableRow'+base_row_id).find("[name='prdItemCd']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='prdItemCd']").attr('prdCd', $('#cnstCntrTableRow'+base_row_id).find("[name='prdItemCd']").attr('prdCd'));
		                  	$('#cnstCntrTableRow'+row_id).find("[name='input_sido']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_sido']").val()).prop("selected", true);
				//시군구명 불러오기
				var partCity = that.cityCode.filter(function(city){
					return city.rmk == $('#cnstCntrTableRow'+row_id).find("[name='input_sido']").val();
				});
				$('#cnstCntrTableRow'+row_id).find("[name='input_si']").html(commonUtil.getSelectOption(partCity,'sCd','sNm', '선택'));
		                  	$('#cnstCntrTableRow'+row_id).find("[name='input_si']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_si']").val()).prop("selected", true);
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_orgn_cntr']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_orgn_cntr']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_scntr']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_scntr']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_ordpr_nm']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_ordpr_nm']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_pmcntr_org_nm']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_pmcntr_org_nm']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno1']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_bzno1']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno2']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_bzno2']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_bzno3']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_bzno3']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_amt']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_cntr_amt']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_cmpl_amt']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_cmpl_amt']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_bal']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_bal']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_cntr_date']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_cntr_date']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_stcs_date']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_stcs_date']").val());
		                   	$('#cnstCntrTableRow'+row_id).find("[name='input_cmplc_date']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_cmplc_date']").val());
		                  	$('#cnstCntrTableRow'+row_id).find("[name='input_end_yn']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_end_yn']").val()).prop("selected", true);
		                  	$('#cnstCntrTableRow'+row_id).find("[name='input_bf_sbmt_doc_yn']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_bf_sbmt_doc_yn']").val()).prop("selected", true);
		                  	$('#cnstCntrTableRow'+row_id).find("[name='input_note']").val($('#cnstCntrTableRow'+base_row_id).find("[name='input_note']").val());
		                  	$('#cnstCntrTableRow'+row_id).css("background-color","#def7f7");
		                  	//setTimeout(function(){$('#cnstCntrTableRow'+row_id).css("background-color","#fff");}, 400);
	                        that.replaceRow(-1,-1);
	                    }
           	 		})
            	}
            },
            chkBox: function(){
            	var checkbox = $("input[name=input_check]:checked");
            	var flag=false;

            	checkbox.each(function(i){
                  	flag=true;
                 })
                return flag;
            },
            //삭제 confirm 메세지
            deleteSub: function(){
            	var that = this;

            	if(that.submitCheck()==false){
            		return false;
            	}
            	if(that.chkBox()){
	                var code = {code:'D', that:that}
	            	commonUtil.confirm("선택하신 계약 건이 삭제됩니다. 삭제 후에는 되돌리실 수 없습니다. </br> 그래도 삭제하시겠습니까?", that.moveConfirm, code);
            	}else{
            		commonUtil.alert("삭제할 계약을 선택해주세요.");
            	}
            },
            //함수 호출, S:제출, D:삭제
            moveConfirm : function(a, code){
            	var that = this;

                if(!a){
                    return false;
                }else{
                	if(code.code=='D'){
                		code.that.deleteCntr();
                	}else if(code.code=='S'){
                		code.that.saveCnstCntr(code.e);
                	}
                }
            },
            //행 정렬
            replaceRow : function(seq, seqGb){
                var that = this;
                var new_seq = 1;
                var before_seq = -1;
                var before_seqGb = -1;
                for(var i=0; i<that.$el.find('#cnstCntrTable tbody tr').length; i++){
       	 			var getTrId = $('#cnstCntrTable-list-id tr:eq('+i+')').attr('id');
       	 			var getBeforeSplit = getTrId.substr(16);
       	 			var getSplitId = getBeforeSplit.split("_");
       	 			var getSeqId = parseInt(getSplitId[0]);
       	 			var getSeqGbId = parseInt(getSplitId[1]);

       	 			if($("#"+getTrId).attr('hidden')!='hidden' && getBeforeSplit!=seq+"_"+seqGb){
       	 				if(before_seq==-1){
	       	 				$("#"+getTrId).find('[name=cnt]').text(new_seq);
	       	 				before_seq = getSeqId;
	       	 				before_seqGb = 0;
	       	 			}else{
	       	 				if(getSeqId==before_seq){
	       	 					$("#"+getTrId).find('[name=cnt]').text(new_seq+"-"+String(before_seqGb+1));
	       	 					before_seqGb+=1;
	       	 				}else{
	       	 					new_seq+=1;
	       	 					before_seq = getSeqId;
	       	 					before_seqGb = 0;
	       	 					$("#"+getTrId).find('[name=cnt]').text(new_seq);
	       	 				}
	       	 			}
       	 			}
       	 		}
            },
            //변경계약 크기 반환
            maxSeqgb : function(search_seq){
            	var that = this;
            	var maxList = [];
        		var lastTrId = $('#cnstCntrTable-list-id tr:last').attr('id');
        		var sgetBeforeSplit = lastTrId.substr(16);
        		var sgetSplitId = sgetBeforeSplit.split("_");
        		var sgetSeqId = sgetSplitId[0];
        		var sgetSeqGbId = sgetSplitId[1];
       	 		var m = Number(sgetSeqId);

       	 		for(var i=0; i<m; i++){
       	 			maxList[i]=-1;
       	 		}
       	 		for(var i=0; i<that.$el.find('#cnstCntrTable tbody tr').length; i++){
       	 			var getTrId = $('#cnstCntrTable-list-id tr:eq('+i+')').attr('id');
       	 			var getBeforeSplit = getTrId.substr(16);
       	 			var getSplitId = getBeforeSplit.split("_");
       	 			var getSeqId = parseInt(getSplitId[0]);
       	 			var getSeqGbId = parseInt(getSplitId[1]);

       	 			if(getSeqGbId>=maxList[getSeqId-1]){
       	 				maxList[getSeqId-1]=parseInt(getSeqGbId);
       	 			}
       	 		}
       	 		return Number(maxList[search_seq-1]);
            },
            //변경계약을 갖고 있는 기본 계약인지 확인
            chgCntrCheck: function(deleteList){
            	var that = this;
            	var flag = true;
            	for(var i=0; i<deleteList.length; i++){
            		if(deleteList[i].seqGb=='0'){
            			var max_len = that.maxSeqgb(Number(deleteList[i].seq));
            			if(max_len>=1){
            				for(var j=1; j<=max_len; j++){
            					if($('#cnstCntrTableRow'+Number(deleteList[i].seq)+"_"+j).attr('hidden')!='hidden'){
            						flag=false;
            						break;
            					}
            				}
            			}
            		}
            	}
            	return flag;
            },
            //계약 삭제
            deleteCntr : function(){
            	var that = this;
            	var checkbox = $("input[name=input_check]:checked");
            	var deleteList = [];
            	checkbox.each(function(i){
            		var tr = checkbox.parent().parent().eq(i);
                  	var trId = tr.attr('id');
                  	var beforeSplit = trId.substr(16);
                  	var splitId = beforeSplit.split("_");
                  	var seqId = splitId[0];
                  	var seqGbId = splitId[1];
                  	if(commonUtil.getNotEmptyArray({
                  		seq: seqId,
                  		seqGb: seqGbId
                  	}).length > 0){
                  		var temp1 = {};
                  		temp1['seq'] =  seqId;
                  		temp1['seqGb'] = seqGbId;
                  		deleteList.push(temp1);
                  	}
            	})
            	if(that.chgCntrCheck(deleteList)){
	                var param = {};
	                param['cnstCntrList'] = deleteList;
	                var paramData = param;
	                var requestParam = commonUtil.getBxmReqData('', '', paramData);

	                commonUtil.requestBxmAjax(requestParam, {
	                    beforeSend: function(){
	                        $(".loading").show();
	                    },
	                    success:  function(response) {
	                        $(".loading").hide();
	                        var returnCode  = response.resultCd;

	                        if(returnCode == "SUCCESS"){
	                        	//기본계약 삭제 seq정렬
	                        	var g_list = [];
	                        	var d_list = []
	                        	var g_index = 0;
	                        	var d_index = 0;
	                        	for(var i=0; i<that.$el.find('#cnstCntrTable tbody tr').length; i++){
	                    	 		var getTrId = $('#cnstCntrTable-list-id tr:eq('+i+')').attr('id');
	                	 			var getBeforeSplit = getTrId.substr(16);
	                	 			var getSplitId = getBeforeSplit.split("_");
	                	 			var getSeqId = parseInt(getSplitId[0]);
	                	 			var getSeqGbId = parseInt(getSplitId[1]);

	                	 			if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bf_cnst_stat_cd']").val()=="" && getSeqGbId==0){
	                	 				if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_check']").prop("checked")==false){
	                    	 				g_list[g_index] = getBeforeSplit;
	                    	 				g_index++;
	                	 				}else{
	                    	 				d_list[d_index] = getBeforeSplit;
	                    	 				d_index++;
	                	 				}
	                	 			}
	                    	 	}
	                        	for(var k=0; k<g_index; k++){
	                        		var minus_cnt = 0;
	                        		for(var x=0; x<d_index; x++){
	                        			if(Number(g_list[k].split('_')[0])>Number(d_list[x].split('_')[0])){
	                        				minus_cnt++;
	                        			}
	                        		}
		                    		var change_id = String(Number(g_list[k].split('_')[0])-minus_cnt)+"_0";
		                    		$('#cnstCntrTableRow'+g_list[k]).attr('id', 'cnstCntrTableRow'+change_id);
		     						var maxSeq = that.maxSeqgb(Number(g_list[k].split('_')[0]));
		     						if(maxSeq!=-1){
		     							var change_id = String(Number(g_list[k].split('_')[0])-minus_cnt)+"_";
		     							for(var q=1; q<=maxSeq; q++){
		     								$('#cnstCntrTableRow'+g_list[k].split('_')[0]+'_'+q).attr('id', 'cnstCntrTableRow'+change_id+q);
		     							}
		         					}
	                        	}
	                        	//변경계약 삭제 seq정렬
	                        	var c_list = [];
	                         	var dc_list = []
	                         	var c_index = 0;
	                         	var dc_index = 0;
	                         	for(var i=0; i<that.$el.find('#cnstCntrTable tbody tr').length; i++){
		                     	 	var getTrId = $('#cnstCntrTable-list-id tr:eq('+i+')').attr('id');
		                     	 	var getBeforeSplit = getTrId.substr(16);
		                     	 	var getSplitId = getBeforeSplit.split("_");
		                     	 	var getSeqId = parseInt(getSplitId[0]);
		                     	 	var getSeqGbId = parseInt(getSplitId[1]);
	                 	 			if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bf_cnst_stat_cd']").val()=="" && getSeqGbId!=0){
	                 	 				if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_check']").prop("checked")==false){
	                     	 				c_list[c_index] = getBeforeSplit;
	                     	 				c_index++;
	                 	 				}else{
	                     	 				dc_list[dc_index] = getBeforeSplit;
	                     	 				dc_index++;
	                 	 				}
	                 	 			}
	                     	 	}
	                         	for(var k=0; k<c_index; k++){
	                         		var minus_cnt = 0;
	                         		for(var x=0; x<dc_index; x++){
	                         			if(Number(c_list[k].split('_')[1])>Number(dc_list[x].split('_')[1])){
	                         				minus_cnt++;
	                         			}
	                         		}
	                         		var change_id =c_list[k].split('_')[0]+"_"+String(Number(c_list[k].split('_')[1])-minus_cnt);
	                         		$('#cnstCntrTableRow'+c_list[k]).attr('id', 'cnstCntrTableRow'+change_id);
	                         	 }
	                        	for(var i=0; i<deleteList.length; i++){
	                        		if($('#cnstCntrTableRow'+deleteList[i].seq+"_"+deleteList[i].seqGb).find("[name='input_bf_cnst_stat_cd']").val()==""){
	                        			$("#cnstCntrTableRow"+deleteList[i].seq+"_"+deleteList[i].seqGb).remove();
	                        		}else{
	                        			$("#cnstCntrTableRow"+deleteList[i].seq+"_"+deleteList[i].seqGb).attr("hidden", true);
	                        			$("#cnstCntrTableRow"+deleteList[i].seq+"_"+deleteList[i].seqGb).find("[name='input_check']:checked").prop("checked", false);
	                        			$('#cnstCntrTableRow'+deleteList[i].seq+"_"+deleteList[i].seqGb).find("[name='input_bf_cnst_stat_cd']").val('90');
	                        		}
	                        		that.replaceRow(-1,-1);
	                        	}
	                        	commonUtil.alert("삭제되었습니다");
		                    }
	                        else{
	                            commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");
	                            return false;
	                        }
	                    },
	                    error : function (e) {
	                        $(".loading").hide();
	                        commonUtil.alertError("에러입니다. 잠시후 다시시도해주세요.");
	                    }
	                }, true);
            	}else{
                	commonUtil.alert("변경 계약이 있는 기본 계약은 삭제할 수 없습니다.");
            	}
            },
            //잔여액 변경
            changeAmt: function(e){
              	//기성액 변경 시, 상태코드 update
              	var that = this;
              	var getTrId = $(e.target).parent().parent().attr('id');
              	var beforeSplit = getTrId.substr(16);
               	var splitId = beforeSplit.split("_");
               	var seqId = splitId[0];
               	var seqGbId = splitId[1];
              	var getCntrAmt = $('#cnstCntrTableRow'+beforeSplit).find("[name='input_cntr_amt']").val().replace(/,/g,"");
                var getCmplAmt = $('#cnstCntrTableRow'+beforeSplit).find("[name='input_cmpl_amt']").val().replace(/,/g,"");
                var getBal = String(Number(getCntrAmt)-Number(getCmplAmt));

                if(getCntrAmt != null && getCmplAmt != null && getCntrAmt.length > 0 && getCmplAmt.length > 0 && getBal < 0){
                    commonUtil.alert("기성액이 계약액보다 큽니다. 다시 입력해주세요.");
                    if($("#cnstCntrTableRow"+beforeSplit).find("[name='input_cntr_amt']").attr("disabled")==false){
                    	$('#cnstCntrTableRow'+beforeSplit).find("[name='input_cntr_amt']").val(0);
                    	$('#cnstCntrTableRow'+beforeSplit).find("[name='input_cmpl_amt']").val(0);
                        $('#cnstCntrTableRow'+beforeSplit).find("[name='input_bal']").val(0);
                    }else{
                        $('#cnstCntrTableRow'+beforeSplit).find("[name='input_cmpl_amt']").val(0);
                        var n_getBal= String(Number(getCntrAmt)-0);
                        $('#cnstCntrTableRow'+beforeSplit).find("[name='input_bal']").val(n_getBal.replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    }
                }else{
                	var x = getBal.replace(/\D/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                	$('#cnstCntrTableRow'+beforeSplit).find("[name='input_bal']").val(x);
                }
                if(Number($('#input_bf_cnst_stat_cd'+beforeSplit).val()) >= 20){
                	$('#cnstCntrTableRow'+beforeSplit).find("[name='save_yn']").val('Y');
                }
            },
      		//종료여부 변경
            changeEndYn: function(e){
            	var that = this;
            	var getTrId = $(e.target).attr('id');
            	var beforeSplit = getTrId.substr(12);
            	var splitId = beforeSplit.split("_");
            	var seqId = splitId[0];
            	var seqGbId = splitId[1];

            	if(Number($('#cnstCntrTableRow'+beforeSplit).find("[name='input_bf_cnst_stat_cd']").val())>=20){
            		$('#cnstCntrTableRow'+beforeSplit).find("[name='save_yn']").val('Y');
            	}
            },
            //광역시도 변경
            changeAdminCd: function(e){
            	var that = this;
            	var getTrId = $(e.target).parent().parent().attr('id');
              	var beforeSplit = getTrId.substr(16);
              	var adminCd = $('#cnstCntrTableRow'+beforeSplit).find("[name='input_sido']").val();
              	var partCity = that.cityCode.filter(function(city){
              		return city.rmk == adminCd;
              	});
              	//시군구명 불러오기
                that.$('#cnstCntrTableRow'+beforeSplit).find("[name='input_si']").html(commonUtil.getSelectOption(partCity,'sCd','sNm', '선택'));
            },
            //단순 기성금액 변경
            updateCmpl : function(){
        	  	var that = this;
                var rowData = new Array();
                var tdArr =  new Array();

                if(that.submitCheck()==false){
            		return false;
            	}
                if(that.chkBox()){
                	var checkbox = $("input[name=input_check]:checked");
	                checkbox.each(function(i){
	                	//체크된 항목의 tr id 값 가져오기
	                	var tr = checkbox.parent().parent().eq(i);
	                	var trId = tr.attr('id');
	                	var beforeSplit = trId.substr(16);
	                	var splitId = beforeSplit.split("_");
	                	var seqId = splitId[0];
	                	var seqGbId = splitId[1];
	                	$("#cnstCntrTableRow"+seqId+"_"+seqGbId).find("[name='input_cmpl_amt']").attr("disabled", false);
	                })
                }else{
                    commonUtil.alert("기성금액을 변경할 계약을 선택해주세요.");
                }
            },
            //입력값 유효성 검증
            moveValid : function(){
                var that = this;
                var rtn = true;
                var hiddenCnt = 0;
                var tableRowCnt = that.$el.find('#cnstCntrTable tbody tr').length;

                for(var i=0; i<tableRowCnt; i++){
                  	var getTrId = $('#cnstCntrTable-list-id tr:eq('+i+')' ).attr('id');
                  	var getBeforeSplit = getTrId.substr(16);
                 	var getSplitId = getBeforeSplit.split("_");
                 	var getSeqId = getSplitId[0];
                 	var getSeqGbId = getSplitId[1];
                 	var name=$("#"+getTrId).find('[name=cnt]').text();

                	if($('#cnstCntrTableRow'+getBeforeSplit).attr('hidden')=='hidden'){
                		hiddenCnt += 1;
                		continue;
                	}
                	if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cls']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cls']").val().length<1){//분류
                		$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cls']").focus();
                		commonUtil.alert("순번"+name+"에 분류를 입력하지 않았습니다.");
                		rtn=false;
                		break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='prdItemCd']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='prdItemCd']").val().length<1){//면허
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='prdItemCd']").focus();
                    	commonUtil.alert("순번"+name+"에 면허를 입력하지 않았습니다.");
                    	rtn=false;
                		break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_sido']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_sido']").val().length<1){//광역시도
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_sido']").focus();
                    	commonUtil.alert("순번"+name+"에 광역시도를 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_si']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_si']").val().length<1){//시
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_si']").focus();
                    	commonUtil.alert("순번"+name+"에 시를 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_orgn_cntr']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_orgn_cntr']").val().length<1){//원도급
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_orgn_cntr']").focus();
                    	commonUtil.alert("순번"+name+"에 원도급을 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_scntr']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_scntr']").val().length<1){//하도급
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_scntr']").focus();
                    	commonUtil.alert("순번"+name+"에 하도급을 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_ordpr_nm']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_ordpr_nm']").val().length<1){//발주자명
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_ordpr_nm']").focus();
                    	commonUtil.alert("순번"+name+"에 발주자명을 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_pmcntr_org_nm']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_pmcntr_org_nm']").val().length<1){//원청사명
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_pmcntr_org_nm']").focus();
                    	commonUtil.alert("순번"+name+"에 원청사명을 입력하지 않았습니다.");
                    	rtn=false;
                     	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno1']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno2']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno3']").val()==null ||
                    		 $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno1']").val()!=null && $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno2']").val()!=null && $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno3']").val()!=null &&
                    		 $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno1']").val().length+$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno2']").val().length+$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno3']").val().length!=10){
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bzno1']").focus();
                    	commonUtil.alert("순번"+name+"에 원청사 사업자 번호를 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cntr_amt']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cntr_amt']").val().length<1){//계약액
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cntr_amt']").focus();
                    	commonUtil.alert("순번"+name+"에 계약액을 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cmpl_amt']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cmpl_amt']").val().length<1){//기성액
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cmpl_amt']").focus();
                    	commonUtil.alert("순번"+name+"에 기성액을 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cntr_date']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cntr_date']").val().length<1){//계약일
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cntr_date']").focus();
                    	commonUtil.alert("순번"+name+"에 계약일을 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_stcs_date']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_stcs_date']").val().length<1){//착공일
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_stcs_date']").focus();
                    	commonUtil.alert("순번"+name+"에 착공일을 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cmplc_date']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cmplc_date']").val().length<1){//준공일
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_cmplc_date']").focus();
                    	commonUtil.alert("순번"+name+"에 준공일을 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_end_yn']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_end_yn']").val().length<1){//종료여부
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_end_yn']").focus();
                    	commonUtil.alert("순번"+name+"에 종료여부를 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }else if($('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bf_sbmt_doc_yn']").val()==null || $('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bf_sbmt_doc_yn']").val().length<1){//기제출된 서류 여부
                    	$('#cnstCntrTableRow'+getBeforeSplit).find("[name='input_bf_sbmt_doc_yn']").focus();
                    	commonUtil.alert("순번"+name+"에 기제출된 서류 여부를 입력하지 않았습니다.");
                    	rtn=false;
                    	break;
                    }
            	}
            	if(tableRowCnt==hiddenCnt&& tableRowCnt==i){
            		commonUtil.alert("작성된 내역이 없습니다.");
            		return false;
            	}
            	else if(tableRowCnt-hiddenCnt>0 && rtn==true){
            		return true;
            	}
            },
            moveStepConfirm : function(a, that){
                if(!a){
                    return false;
                }
                location.href = "#MENURI2142";
            },
            //저장 또는 제출할 데이터 생성
            makeData : function(cnstStatCd){
                var that = this;
                var setCnstCntrList = [];

                for(var i=0; i < that.$el.find('#cnstCntrTable tbody tr').length; i++){
                	 var trId = $('#cnstCntrTable-list-id tr:eq('+i+')' ).attr('id');
                	 trId = trId.substr(16,trId.length-16);
                	 var seqId = trId.split('_');
                	 if($('#cnstCntrTableRow'+trId).attr('hidden') == 'hidden') { continue; }

                     if(commonUtil.getNotEmptyArray({
                    	 cntrGb : $('#cnstCntrTableRow'+trId).find("[name='input_cntr_gb'] option:selected").val()
                    	 ,cls : $('#cnstCntrTableRow'+trId).find("[name='input_cls'] option:selected").val()
                    	 ,lcns : $('#cnstCntrTableRow'+trId).find("[name='prdItemCd']").attr('prdCd')
                    	 ,sido : $('#cnstCntrTableRow'+trId).find("[name='input_sido'] option:selected").val()
                    	 ,si : $('#cnstCntrTableRow'+trId).find("[name='input_si'] option:selected").val()
                    	 ,orgnCntr : $('#cnstCntrTableRow'+trId).find("[name='input_orgn_cntr']").val()
                    	 ,scntr : $('#cnstCntrTableRow'+trId).find("[name='input_scntr']").val()
                    	 ,ordprNm : $('#cnstCntrTableRow'+trId).find("[name='input_ordpr_nm']").val()
                    	 ,pmcntrOrgNm : $('#cnstCntrTableRow'+trId).find("[name='input_pmcntr_org_nm']").val()
                    	 ,pmcntrOrgBzno :  $('#cnstCntrTableRow'+trId).find("[name='input_bzno1']").val()+$('#cnstCntrTableRow'+trId).find("[name='input_bzno2']").val()+$('#cnstCntrTableRow'+trId).find("[name='input_bzno3']").val()
                    	 ,cntrAmt :  $('#cnstCntrTableRow'+trId).find("[name='input_cntr_amt']").val()
                    	 ,cmplAmt:  $('#cnstCntrTableRow'+trId).find("[name='input_cmpl_amt']").val()
                    	 ,bal:  $('#cnstCntrTableRow'+trId).find("[name='input_bal']").val()
                    	 ,cntr_date: $('#cnstCntrTableRow'+trId).find("[name='input_cntr_date']").val()
                    	 ,stcs_date: $('#cnstCntrTableRow'+trId).find("[name='input_stcs_date']").val()
                    	 ,cmplc_date: $('#cnstCntrTableRow'+trId).find("[name='input_cmplc_date']").val()
                    	 ,endYn: $('#cnstCntrTableRow'+trId).find("[name='input_end_yn'] option:selected").val()
                    	 ,note : $('#cnstCntrTableRow'+trId).find("[name='input_note']").val()
                    	 ,bfSbmtDocYn :  $('#cnstCntrTableRow'+trId).find("[name='input_bf_sbmt_doc_yn'] option:selected").val()
                    	 ,bfCnstStatCd: $('#cnstCntrTableRow'+trId).find("[name='input_bf_cnst_stat_cd']").val()
                    }).length > 0){
                    	 var temp1 = {};
                    	 temp1['cnstY'] = that.cnstY;
                    	 temp1['cnstQ'] = that.cnstQ;
                    	 temp1['seq'] = seqId[0];
                    	 temp1['seqGb'] =seqId[1];
                    	 temp1['cnstStatCd'] = cnstStatCd;
                    	 temp1['cntrGb'] = $('#cnstCntrTableRow'+trId).find("[name='input_cntr_gb'] option:selected").val();
                    	 temp1['cls'] = $('#cnstCntrTableRow'+trId).find("[name='input_cls'] option:selected").val();
                    	 temp1['lcns'] = $('#cnstCntrTableRow'+trId).find("[name='prdItemCd']").attr('prdCd');
                    	 temp1['sido'] = $('#cnstCntrTableRow'+trId).find("[name='input_sido'] option:selected").val();
                    	 temp1['si'] = $('#cnstCntrTableRow'+trId).find("[name='input_si'] option:selected").val();
                    	 temp1['orgnCntr'] = $('#cnstCntrTableRow'+trId).find("[name='input_orgn_cntr']").val();
                    	 temp1['scntr'] = $('#cnstCntrTableRow'+trId).find("[name='input_scntr']").val();
                    	 temp1['ordprNm'] = $('#cnstCntrTableRow'+trId).find("[name='input_ordpr_nm']").val();
                    	 temp1['pmcntrOrgNm'] = $('#cnstCntrTableRow'+trId).find("[name='input_pmcntr_org_nm']").val();
                    	 temp1['pmcntrOrgBzno'] = $('#cnstCntrTableRow'+trId).find("[name='input_bzno1']").val()+$('#cnstCntrTableRow'+trId).find("[name='input_bzno2']").val()+$('#cnstCntrTableRow'+trId).find("[name='input_bzno3']").val();
                    	 temp1['cntrAmt'] = $('#cnstCntrTableRow'+trId).find("[name='input_cntr_amt']").val().replace(/,/g,"");
                    	 temp1['cmplAmt']= $('#cnstCntrTableRow'+trId).find("[name='input_cmpl_amt']").val().replace(/,/g,"");
                    	 temp1['bal'] = $('#cnstCntrTableRow'+trId).find("[name='input_bal']").val().replace(/,/g,"");
                    	 temp1['cntrDate']= $('#cnstCntrTableRow'+trId).find("[name='input_cntr_date']").val().replace(/-/gi,'');
                    	 temp1['stcsDate']= $('#cnstCntrTableRow'+trId).find("[name='input_stcs_date']").val().replace(/-/gi,'');
                    	 temp1['cmplcDate']= $('#cnstCntrTableRow'+trId).find("[name='input_cmplc_date']").val().replace(/-/gi,'');
                    	 temp1['endYn']= $('#cnstCntrTableRow'+trId).find("[name='input_end_yn'] option:selected").val();
                    	 temp1['note'] = $('#cnstCntrTableRow'+trId).find("[name='input_note']").val();
                    	 temp1['bfSbmtDocYn'] = $('#cnstCntrTableRow'+trId).find("[name='input_bf_sbmt_doc_yn'] option:selected").val();
                    	 temp1['bfCnstStatCd'] = $('#cnstCntrTableRow'+trId).find("[name='input_bf_cnst_stat_cd']").val();
                    	 temp1['saveYn']= cnstStatCd == '20' ? 'Y' : $('#cnstCntrTableRow'+trId).find("[name='save_yn']").val();

                    	 setCnstCntrList.push(temp1);
                     }
                }
                var param = {};
                param['cnstCntrList'] = setCnstCntrList;
                return param;
            },
            //저장
            saveCnstCntr : function(e){
                var that = this;

                if(that.submitCheck()==false){
            		return false;
            	}
                if(that.moveValid()){
                	var submitGb = $(e.target).data("action"); // 10:저장, 20:최종제출
	                var paramData = that.makeData(submitGb);
	                var requestParam = commonUtil.getBxmReqData('', '',paramData);

	                commonUtil.requestBxmAjax(requestParam, {
	                    beforeSend: function(){
	                        $(".loading").show();
	                    },
	                    success:  function(response) {
	                        $(".loading").hide();
	                        var returnCode  = response.resultCd;

	                        if(returnCode == "SUCCESS"){
	                        	$('[id^=cnstCntrTableRow]').css("background-color","#fff");

	                        	for(var i=0; i < that.$el.find('#cnstCntrTable tbody tr').length; i++ ){
	                            	var trId = $('#cnstCntrTable-list-id tr:eq('+i+')' ).attr('id');
	                            	trId = trId.substr(16,trId.length-16);
	                            	var seqId = trId.split('_');
	                            	//상태값 input_bf_cnst_stat_cd 갱신
	                            	if(submitGb == '10'){
	                            		if($('#cnstCntrTableRow'+trId).find("[name='input_bf_cnst_stat_cd']").val()==''){
	                            			$('#cnstCntrTableRow'+trId).find("[name='input_bf_cnst_stat_cd']").val('10');
	                            			$('#cnstCntrTableRow'+trId).find("[name='cnstStatNm']").text('작성중');
	                            		}
	                            	}else if(submitGb == '20'){
	                            		if($('#cnstCntrTableRow'+trId).find("[name='input_bf_cnst_stat_cd']").val()==''||$('#cnstCntrTableRow'+trId).find("[name='input_bf_cnst_stat_cd']").val()=='10'){
	                            			$('#cnstCntrTableRow'+trId).find("[name='input_bf_cnst_stat_cd']").val('20');
	                            			$('#cnstCntrTableRow'+trId).find("[name='cnstStatNm']").text('제출완료');
	                            			that.submitFlag = false;
	                            		}
	                            	}
                            		if($('#cnstCntrTableRow'+trId).find("[name='input_end_yn']").val()=='Y' && $('#cnstCntrTableRow'+trId).find("[name='input_bf_cnst_stat_cd']").val()=='20'){
                            			 $('#cnstCntrTableRow'+trId).attr('hidden', true);
                             			 $("#cnstCntrTableRow"+trId).find("[name='input_check']:checked").prop("checked", false);
                             		}
	                        	 }
	                        	if(submitGb == '20') {
		                        	 $('#cnstCntrTable-list-id input').prop("disabled", true);
		                        	 $('#cnstCntrTable-list-id select').prop("disabled", true);
		                        	 $('[name=input_end_yn]').prop("disabled", false);
		                        	 $('[name=input_check]').prop("disabled", false);
		                        	 $('[name=pop]').attr("disabled", true);
	                        	}
	                        	commonUtil.alertSucc(submitGb == '10' ? '실태표 저장이 완료되었습니다.' : '실태표 제출이 완료되었습니다.');
	                        }
	                        else{
	                            commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");
	                            return false;
	                        }
	                    },
	                    error : function (e) {
	                        $(".loading").hide();
	                        commonUtil.alertError("에러입니다. 잠시후 다시시도해주세요.");
	                    }
	                }, true);
                }
            },
            //제출 confirm 메세지
            submitSub: function(e){
            	var that = this;

            	if(that.submitCheck()==false){
            		return false;
            	}
            	var code = {code:'S', that:that, e:e}
            	commonUtil.confirm("입력하신 정보들이 제출 됩니다. 제출 후에는 수정할 수 없습니다.</br>최종제출하시겠습니까?", that.moveConfirm, code)
            },
            //면허코드 팝업
            pop : function(e){
                var that = this;

                $("#itemCdPop").show();
                var mp = $("#itemCdPop .detail-view-container");

                $("#itemCdPop [name=selectedItemCd]").attr('rowid',$(e.target).closest('tr').attr('id'));
                $(mp).css({
                    "top": (($(window).height()-$(mp).outerHeight())/2+$(mp).scrollTop())+"px",
                    "left": (($(window).width()-$(mp).outerWidth())/2+$(window).scrollLeft())+"px"
                });
                that.selectItemList();
            },
            clickItemCd:function(e){
                var that = this;
                e.preventDefault();
                var $itemCd = $(e.target);
                var $itemCdLi = $itemCd.closest("li");
                var prdCd = $itemCd.attr("prdCd");
                var prdNm = $itemCd.attr("prdNm");

                $("[name=itemCd]").removeClass("active");
                $itemCd.addClass("active");

                if($itemCdLi.hasClass("on")){
                    $itemCdLi.removeClass("on");
                    $itemCdLi.children("ul").hide();
                }else{
                    $itemCdLi.addClass("on");
                    if($itemCdLi.children("ul").length != 0){
                        $itemCdLi.children("ul").show();
                    }
                }
            },
            selectItemListEnter : function(){
                var that = this;
                var searchString = $("[name=prdNm]").val();

                that.selectItemList(searchString);
            },
            closePop:function(e){
                var that = this;
                $(".modal-popup").hide();
            },
            selectItemList : function(prdNm){
                var that = this;
                var param = {};

                if(commonUtil.isEmpty(prdNm)) prdNm = '';
                if($("[name=prdNm]").val().length >= 2){
                    param['search'] = $("[name=prdNm]").val();
                }
                commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', '', param), {
                    beforeSend: function(){
                    },
                    success: function(response) {
                        var itemCdList = response.cnBzTypList;
                        if(itemCdList){
                            var codeListTmp = commonUtil.getTemplate(tpl,'codeListTmp');
                                that.$el.find("#codeList").html('');
                                for(var i=0; i<itemCdList.length; i++){
                            		var tableText = "";
                            		tableText += '<ul id=ulCnt'+itemCdList[i].cd+'></ul>';
                                    $("#codeList").append(tableText);
                                    $("#ulCnt"+itemCdList[i].cd).append(Handlebars.compile(codeListTmp)({item:itemCdList[i]}));
                                }
                        }else{
                        	that.$el.find("#codeList").html('');
                        }
                    },
                    complete:function(){
                        $("#codeList").show();
                    }
                },false);
            },
            selectedItemCd : function(){
                var that = this;
                var prdCd = $("[name=itemCd].active").attr("prdCd");
                var prdNm = $("[name=itemCd].active").attr("prdNm");
                var multipleSelect = $("#input_select").val();
                var multipleSelectCode = $("#input_select_code").val();

                if(commonUtil.isEmpty(prdCd)){
                    commonUtil.alert("면허를 선택해주세요.");
                    return;
                }
                var rowid = $("#itemCdPop [name=selectedItemCd]").attr('rowid');
                var splitRowid = rowid.substr(16);

                $("#"+rowid+" [name=prdItemCd]").val(prdNm);
                $("#"+rowid+" [name=prdItemCd]").attr('prdCd', prdCd);
                $('#input_select').val('');
           	 	$('#input_select_code').val('');
           	 	$("#selectedBoxUl").empty();
           	 	$('[name=prdNm]').val('');
                that.closePop();
            },
            // 엑셀버튼 이벤트
            onClickBtnExcel : function() {
                var that = this;
                var formParam = {
        			bzno : $.cookie('userBzno'),
        			cnstY : that.cnstY,
        			cnstQ : that.cnstQ
                };
                var param = commonUtil.getBxmReqData(
            		'', '', formParam
                );

                commonUtil.requestBxmAjax(param, {
                	success:  function(response) {
                		if(response.errCode == 'NODATA') {
                            commonUtil.alert("입력된 내용이 없습니다. 입력내용 저장 후 다운로드해주세요.");
                		}else {
    	                    var url = commonConfig.downloadUrl;
                			//var url = 'http://localhost:8080/serviceEndpoint/fileEndpoint/download';
    	                    var filePath = response.filePath;
    	                    var pos = filePath.indexOf('temp');
    	                    filePath = filePath.substring(pos-1);

    	                    var data = {saveName : response.saveFileName, filePath : filePath}
    	                    commonUtil.downloadFile(url,data);
                		}
                	}
                }, true);
            },
        });
        return RI_2142_VIEW;
    });//end define
