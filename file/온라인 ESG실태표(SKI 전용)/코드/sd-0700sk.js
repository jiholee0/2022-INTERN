define(
    [
        'common/config',
        'common/util',
        'text!views/sd/sd-0700sk-tpl.html'
     ],
    function(
        commonConfig,
        commonUtil,
        tpl
    ) {

        var Step1Model = Backbone.Model.extend({
            url :"#",
            initialize: function(){

            },

            validate: function(attrs,options) {
                var noValName = '';
                step1Model.set('isValidate',false);

                if(attrs.esgrpt.chrgNm == null || attrs.esgrpt.chrgNm.length < 1){
                    commonUtil.alert("인터뷰담당자의 담당자를 입력해주세요");
                    return false;
                }else if(attrs.esgrpt.chrgTel == null || attrs.esgrpt.chrgTel.split('-')[0].length < 1 || attrs.esgrpt.chrgTel.split('-')[0].length > 4){
                    commonUtil.alert("인터뷰담당자의 전화번호를 올바르게 입력해주세요 ");
                    return false;
                }else if(attrs.esgrpt.chrgTel == null || attrs.esgrpt.chrgTel.split('-')[1].length < 1 || attrs.esgrpt.chrgTel.split('-')[1].length > 4){
                    commonUtil.alert("인터뷰담당자의 전화번호를 올바르게 입력해주세요");
                    return false;
                }else if(attrs.esgrpt.chrgHp == null || attrs.esgrpt.chrgHp.split('-')[0].length < 1 || attrs.esgrpt.chrgHp.split('-')[0].length > 4){
                    commonUtil.alert("인터뷰담당자의 휴대전화를 올바르게 입력해주세요");
                    return false;
                }else if(attrs.esgrpt.chrgHp == null || attrs.esgrpt.chrgHp.split('-')[1].length < 1 || attrs.esgrpt.chrgHp.split('-')[1].length > 4){
                    commonUtil.alert("인터뷰담당자의 휴대전화를 올바르게 입력해주세요");
                    return false;
                }else if(attrs.esgrpt.chrgHp == null || attrs.esgrpt.chrgHp.split('-')[2].length < 1 || attrs.esgrpt.chrgHp.split('-')[2].length > 4){
                    commonUtil.alert("인터뷰담당자의 휴대전화를 올바르게 입력해주세요");
                    return false;
                }else if(attrs.esgrptCmpOtl.bzno == null || attrs.esgrptCmpOtl.bzno.length < 10){
                    commonUtil.alert("사업자번호를 입력해주세요");
                    noValName = 'bzno';
                    return false;
                }else if(attrs.esgrptCmpOtl.cmpHnm == null ||  attrs.esgrptCmpOtl.cmpHnm.length < 1){
                    commonUtil.alert("기업명(국문)을 입력해주세요.");
                    noValName = 'cmpHnm';
                    step1Model.set('noValName',noValName);
                    return false;
                }else if(attrs.esgrptCmpOtl.cmpEnm == null || attrs.esgrptCmpOtl.cmpEnm.length < 1){
                    commonUtil.alert("기업명(영문)을 입력해주세요.");
                    noValName = 'cmpEnm';
                    step1Model.set('noValName',noValName);
                    return false;
                }else if(attrs.esgrptCmpOtl.mainIndNm == null || attrs.esgrptCmpOtl.mainIndNm.length < 1){
                    commonUtil.alert("주요산업을 입력해주세요.");
                    noValName = 'mainIndNm';
                    step1Model.set('noValName',noValName);
                    return false;
                }else if(attrs.esgrptCmpOtl.ksic == null || attrs.esgrptCmpOtl.ksic.length < 1){
                    commonUtil.alert("산업코드를 입력해주세요.");
                    noValName = 'ksic';
                    step1Model.set('noValName',noValName);
                    return false;
                }else if(attrs.esgrptCmpOtl.cmpFormCd == null || attrs.esgrptCmpOtl.cmpFormCd.length < 1){
                    commonUtil.alert("기업형태를 입력해주세요.");
                    noValName = 'cmpFormCd';
                    step1Model.set('noValName',noValName);
                    return false;
                }else if(attrs.esgrptCmpOtl.cmpScaleCd == null || attrs.esgrptCmpOtl.cmpScaleCd.length < 1){
                    commonUtil.alert("기업규모를 입력해주세요.");
                    noValName = 'cmpScaleCd';
                    step1Model.set('noValName',noValName);
                    return false;
                }else {
                    var returnVal = true;
                	if(attrs.esgrptWkpInfo.length > 0){
                		if(attrs.esgrptWkpInfo[0].wkpZpcd == null || attrs.esgrptWkpInfo[0].wkpZpcd.length <1 ) {
                            commonUtil.alert("사업장(본사) 주소 우편번호를 입력해주세요");
                            returnVal = false;
                		}else if(attrs.esgrptWkpInfo[0].wkpDtlAddr == null || attrs.esgrptWkpInfo[0].wkpDtlAddr.length <1 ) {
                            commonUtil.alert("사업장(본사) 주소 상세주소를 입력해주세요");
                            returnVal = false;
                		}else if(attrs.esgrptWkpInfo[0].wkpTel == null || attrs.esgrptWkpInfo[0].wkpTel.split('-')[0].length < 1 || attrs.esgrptWkpInfo[0].wkpTel.split('-')[0].length > 4){
                            commonUtil.alert("사업장(본사) 전화번호를 올바르게 입력해주세요");
                            returnVal = false;
                		}else if(attrs.esgrptWkpInfo[0].mnWrk1 == null || attrs.esgrptWkpInfo[0].mnWrk1.length <1 ) {
                            commonUtil.alert("사업장(본사) 주요수행업무를 입력해주세요");
                            returnVal = false;
                		}
                        if(!returnVal) {
                            return false;
                        }
                    }else {
                        step1Model.set('isValidate',true);
                    }
                }
                return true;
            }
        });

        var step1Model = new Step1Model({
            esgrpt : []
            ,esgrptCmpOtl : {}
            ,esgrptWkpInfo : []
            ,flag : ""
            ,openStep : ""
            ,isValidate : true
            ,noValName : ""
        });

        var Step2Model = Backbone.Model.extend({
            url :"#",
            initialize: function(){

            },

            validate: function(attrs,options) {
                var returnVal = true;
                var yStat = attrs.esgrptYStat;
            	$.each(attrs.esgrptAnsr, function(key2, value2){
            		// 3개년
            		if('ENV013,ENV015,ENV016,ENV018,ENV025,ENV027,ENV010,ENV016,ENV022'.indexOf(value2.qstCd) > -1) {
            			var checkYn = 'N';
                    	var num = value2.qstCd.substring(4,6);
                    	var cnt = 0;
            			if(value2.asrCd == '01' || (value2.asrCd == '02' && ('ENV013,ENV016,ENV027'.indexOf(value2.qstCd) > -1))) {
                            if(yStat.length > 0){
                				$.each(yStat, function(key, value){
                					if(value.qstCd.split('_')[0] == value2.qstCd) {
                						if(value.thrYAgo.length > 0 && value.twoYAgo.length > 0 && value.oneYAgo.length > 0){
                							cnt++;
                    						checkYn = 'Y';
                						}
                					}
                				});
                				 // ENV010(01), ENV016(01), ENV027(01)은 yStat이 3개 / ENV022(01)은 yStat이 2개
                				if((((num == '10' || num == '16' || num == '27') && value2.asrCd == '01') && cnt != 3) ||
                					(num == '22' &&  cnt != 2)){
                					checkYn = 'N';
        						}
                            }
            				if(checkYn == 'N'){
            					commonUtil.alert("환경(Environmental) "+num+"번 문항을 입력해주세요.");
            					returnVal = false;
            				}
                            if (!returnVal) {
                                return false;
                            }
            			}
            		}else if('ENV009'.indexOf(value2.qstCd) > -1){
            			if(value2.asrCd == '01' && value2.asrCont == ""){
            				commonUtil.alert("환경(Environmental) 9번 문항을 입력해주세요.");
                            returnVal = false;
            			}
            			if (!returnVal) {
                            return false;
                        }
            		}
            		if (!returnVal) {
                        return false;
                    }
                });
                // 인증현황
                var crtiStat = attrs.esgrptCrtiStat;
                console.log(crtiStat);
                if(crtiStat.length > 0){
                    $.each(crtiStat, function(key, value){
                    	var num = value.qstCd.substring(4,6);
                        if(!value.crtiKindCd || !value.crtiNm || !value.crtiStatCd ||
                           (value.crtiStatCd == '01' && (!value.crtiValiEymd || !value.crtiNo))) {
                        	commonUtil.alert("환경(Environmental) "+num+"번 문항을 입력해주세요.");
                            returnVal = false;
                        }
                        if (!returnVal) {
                            return false;
                        }
                    });
                    if (!returnVal) {
                        return false;
                    }
                }
                return true;
            }
        });

        var step2Model = new Step2Model({
            esgrptAnsr : []
            ,esgrptAnsrAll : []
        	,esgrptYStatAll : []
			,esgrptCrtiStatAll : []
    		,esgrptYStat : []
			,esgrptCrtiStat : []
            ,flag        : ""
            ,openStep    : ""
            ,isValidate : true
            ,noValName : ""
           	,stkhstatNone : false
        });

        var Step3Model = Backbone.Model.extend({
            url :"#",
            initialize: function(){

            },

            validate: function(attrs,options) {
                var returnVal = true;
                // 실시 주기, 실시 대상
                $.each(attrs.esgrptAnsr, function(key, value){
                	if('SOC008,SOC018'.indexOf(value.qstCd)>-1){
                		var num = value.qstCd.substring(4,6);
                		if(value.asrCd == '01'){
                			$.each(attrs.esgrptAnsr, function(key2, value2){
                				if((value2.qstCd == 'SOC0'+num+'_1_1' || value2.qstCd == 'SOC0'+num+'_1_2') && value2.asrCd==""){
                        			commonUtil.alert("사회(Social) "+num+"번 문항을 입력해주세요.");
                        			returnVal = false;
                				}
                			});
                		}
                		if (!returnVal) {
                            return false;
                        }
                	}
                	if (!returnVal) {
                        return false;
                    }
                });
                // 3개년
                var yStat = attrs.esgrptYStat;
                if(yStat.length > 0){
                    $.each(yStat, function(key, value){
                    	var num = value.qstCd.substring(4,6);
                    	if(num == '22' && (value.thrYAgo=="" || value.twoYAgo=="" || value.oneYAgo=="")) {
                    		commonUtil.alert("사회(Social) "+num+"번 문항을 입력해주세요.");
                            returnVal = false;
                    	}
                        if (!returnVal) {
                            return false;
                        }
                    });
                }
                // 인증현황
                var crtiStat = attrs.esgrptCrtiStat;
                if(crtiStat.length > 0){
                    $.each(crtiStat, function(key, value){
                    	var num = value.qstCd.substring(4,6);
                        if(!value.crtiKindCd || !value.crtiNm || !value.crtiStatCd ||
                           (value.crtiStatCd == '01' && (!value.crtiValiEymd || !value.crtiNo))) {
                        	commonUtil.alert("사회(Social) "+num+"번 문항을 입력해주세요.");
                            returnVal = false;
                        }
                        if (!returnVal) {
                            return false;
                        }
                    });
                    if (!returnVal) {
                        return false;
                    }
                }
                // 종업원현황
                var emplStat = attrs.esgrptEmplStat;
                if(emplStat.length > 0){
                    $.each(emplStat, function(key, value){
                    	var num = value.qstCd.substring(4,6);
                    	if(num == '11' && (value.emplMCnt.length < 1|| value.emplWCnt.length < 1)) {
                    		commonUtil.alert("사회(Social) "+num+"번 문항을 입력해주세요.");
                            returnVal = false;
                    	}else if(num == '12' && ( value.emplDisabldCnt.length < 1 || value.exptDisabldCnt.length < 1) ) {
                        	commonUtil.alert("사회(Social) "+num+"번 문항을 입력해주세요.");
                            returnVal = false;
                        }
                        if (!returnVal) {
                            return false;
                        }
                    });
                }
                if (!returnVal) {
                    return false;
                }
                return true;
            }

        });

        var step3Model = new Step3Model({
            esgrptAnsr : []
			,esgrptCrtiStat : []
			,esgrptEmplStat : []
        	,esgrptYStat : []
            ,flag       : ""
            ,openStep   :""
            ,isValidate : true
            ,noValName : ""
        });

        var Step4Model = Backbone.Model.extend({
            url: "#",
            initialize : function(model){
            },
            validate: function(attrs,options) {
                var returnVal = true;
            	// 실시 주기, 실시 대상
                $.each(attrs.esgrptAnsr, function(key, value){
                	if('GOV006,GOV010,GOV012'.indexOf(value.qstCd)>-1){
                		var num = value.qstCd.substring(4,6);
                		if(value.asrCd == '01' && num == '10' && value.asrCont==""){
                			commonUtil.alert("지배구조(Governance) "+num+"번 문항을 입력해주세요.");
                            returnVal = false;
                		}else if(value.asrCd == '01' && (num=='06'||num=='12')){
                			$.each(attrs.esgrptAnsr, function(key2, value2){
                				if((value2.qstCd == 'GOV0'+num+'_1_1' || value2.qstCd == 'GOV0'+num+'_1_2') && value2.asrCd==""){
                        			commonUtil.alert("지배구조(Governance) "+num+"번 문항을 입력해주세요.");
                        			returnVal = false;
                				}
                				if (!returnVal) {
                                    return false;
                                }
                			});
                		}
                		if (!returnVal) {
                            return false;
                        }
                	}
                });
                if (!returnVal) {
                    return false;
                }
                return true;
            }
        });

        var step4Model = new Step4Model({
            esgrpt : []
            ,esgrptAnsr : []
            ,wrtStatCd : ""
            ,isCnst : ""
            ,flag       : ""
            ,openStep   : ""
            ,isValidate : true
        });

        return Backbone.View.extend({
            tagName: 'section',
            templates: {
                'tpl': tpl
            },
            events : {
                 "click .sd0700sk_save ": "sd0700sk_save",
                 "click .sd0700sk_submit ": "sd0700sk_submit",
                 "click .listPaper ": "listPaper"
            },
            pageId: null,
            subId: null,
            param: {},
            activePageMap: [],
            initialize: function(pageInitConfig) {
                var that = this;

                this.$el.addClass('app-deploy-workspace').html(Handlebars.compile( tpl ));
                this.$subNavs = this.$el.find('.app-deploy-nav');
                this.$subWorkspace = this.$el.find('.app-deploy-main');
                this.pageId = pageInitConfig.pageId;
                this.flag = pageInitConfig.flag;
                that.saveYn = "N";
                if(this.flag){
                    that.setStep1({openStep : ""});
                }
            },

            render: function() {
                var that = this;

                that.loginCheck();
                if(!that.getStep1("openStep")){
                    that.esgrptInit();
                }

                return this;
            },
            listPaper : function(e){
                //목록버튼 클릭 시 that.saveYn '저장'이 일어났는지 안일어났는지 판단 후
                var that = this;
                e.preventDefault();
                if(that.saveYn == "Y"){
                    location.href = "#MENUSD0600SK";
                }else{
                    commonUtil.confirm('확인버튼 클릭 시 현재까지 작성한 모든 내용이 임시저장 후 목록 으로 이동합니다.<br/> 이동하시겠습니까?', that.go_listPager, that);
                }

            },
            go_listPager : function(a, value){
                //sd-0600sk 으로 이동 전 sd0700sk_save_temp() 데이터를 모두 저장 후 이동
                var that = this;
                if(!a){
                    return false;
                }
                value.sd0700sk_save_temp();
            },
            sd0700sk_submit : function(){
                var that = this;

                var wrtStatCd = that.getStep4("wrtStatCd");

                if(wrtStatCd != "20"){
                    commonUtil.alert('저장 완료 후 제출 가능합니다.');
                    return false;
                }

                var param = {};

                param['esgrpt'] = {wrtStatCd : '90'};

            },
            sd0700sk_save : function(e){
                var that = this;
                e.preventDefault();
                that.saveYn = "Y";
                var page = this.activePageMap[that.subId];
                var dataTest = page.makeData();

                var param = {};
                param['rptCmpGb'] = 'SKI';

                param['esgrpt']      	= that.getStep1("esgrpt");
                param['esgrptCmpOtl']   = that.getStep1("esgrptCmpOtl");
                param['esgrptWkpInfo']  = that.getStep1("esgrptWkpInfo");

                param['esgrptAnsr']	 	  = that.getStep2("esgrptAnsr");
                param['esgrptYStat']      = that.getStep2("esgrptYStat");
                param['esgrptCrtiStat']   = that.getStep2("esgrptCrtiStat");
                param['wrtStatCd']    =  "20"; //작성상태코드 : 20 작성완료
                param['esgrptAnsr']    	   = param['esgrptAnsr'].concat(that.getStep3("esgrptAnsr"));
                param['esgrptCrtiStat']    = param['esgrptCrtiStat'].concat(that.getStep3("esgrptCrtiStat"));
                param['esgrptEmplStat']    = that.getStep3("esgrptEmplStat");
                param['esgrptYStat']       = param['esgrptYStat'].concat(that.getStep3("esgrptYStat"));

                param['esgrptAnsr']       = param['esgrptAnsr'].concat(that.getStep4("esgrptAnsr"));

                param['step']        = "6"; //탭구분
                 // check validation.

                if(that.isValid("STEP1")){
                    commonUtil.redirectRoutePage("#MENUSD0700SK/STEP1");
                    return false;
                }
                if(that.isValid("STEP2")){
                    commonUtil.redirectRoutePage("#MENUSD0700SK/STEP2");
                    return false;
                }
                if(that.isValid("STEP3")){
                    commonUtil.redirectRoutePage("#MENUSD0700SK/STEP3");
                    return false;
                }
                if(that.isValid("STEP4")){
                    commonUtil.redirectRoutePage("#MENUSD0700SK/STEP4");
                    return false;
                }

                commonUtil.requestBxmAjax(requestParam, {
                    beforeSend: function(){
                        $(".loading").show();
                    },
                    success:  function(response) {
                        $(".loading").hide();

                        if(returnCode == "400"){
                            commonUtil.alert("죄송합니다. 저장버튼을 다시 클릭 해주시기 바랍니다. arrCode:"+returnCode);
                            return false;
                        }
                        if(returnCode == "410"){
                            commonUtil.alert("현재 로그인 한 사업자번호와 작성중인 실태표의 사업자번호가 불일치하여 저장할 수 없습니다. <br/> 신청사이트  로그인 ID와 실태표에 입력 된 사업자번호를 확인하여 주시기 바랍니다.");
                            return false;
                        }

                    	commonUtil.alertSucc('작성완료 되었습니다.');

                        that.setStep4({wrtStatCd: "20"});
                    },
                    error : function (e) {
                        $(".loading").hide();
                        commonUtil.alertError("에러입니다. 잠시후 다시시도해주세요.");
                    }
                }, true);

            },
            sd0700sk_save_temp : function(gubun){
                //임시저장 벨리데이션 체크는 안하고 바로저장
                var that = this;
                var returnType = true;
                //화면 처음 로딩이 아니라면 '임시저장'버튼 클릭 안했어도 현재 탭 페이지의 내용을 저장
                if(gubun != "init"){
                    var page = this.activePageMap[that.subId];
                    var dataTest = page.makeData();
                }
                var param = {};

                param['rptCmpGb'] = 'SKI';

                param['esgrpt']      	= that.getStep1("esgrpt");
                param['esgrptCmpOtl']   = that.getStep1("esgrptCmpOtl");
                param['esgrptWkpInfo']  = that.getStep1("esgrptWkpInfo");

                param['esgrptAnsr']	 	  = that.getStep2("esgrptAnsr");
                param['esgrptYStat']      = that.getStep2("esgrptYStat");
                param['esgrptCrtiStat']   = that.getStep2("esgrptCrtiStat");

                if(that.getStep4("wrtStatCd") == "20"){
                    param['wrtStatCd']    =  "20";
                }else{
                    param['wrtStatCd']    =  "10";//작성상태코드 : 10 제출대기
                }

                param['esgrptAnsr']    	   = param['esgrptAnsr'].concat(that.getStep3("esgrptAnsr"));
                param['esgrptCrtiStat']    = param['esgrptCrtiStat'].concat(that.getStep3("esgrptCrtiStat"));
                param['esgrptEmplStat']    = that.getStep3("esgrptEmplStat");
                param['esgrptYStat']       = param['esgrptYStat'].concat(that.getStep3("esgrptYStat"));

                param['esgrptAnsr']       = param['esgrptAnsr'].concat(that.getStep4("esgrptAnsr"));

                param['step']        = "6"; //탭구분

                commonUtil.requestBxmAjax(requestParam, {
                    beforeSend: function(){
                        $(".loading").show();
                    },
                    success:  function(response) {
                        $(".loading").hide();

                        if(returnCode == "400"){
                            commonUtil.alert("죄송합니다. 버튼을 다시 클릭 해주시기 바랍니다. arrCode:"+returnCode);
                            returnType = false;
                            return false;
                        }else if(returnCode == "410"){
                            commonUtil.alert("현재 로그인 한 사업자번호와 작성중인 실태표의 사업자번호가 불일치하여 저장할 수 없습니다. <br/> 신청사이트  로그인 ID와 실태표에 입력 된 사업자번호를 확인하여 주시기 바랍니다.");
                            returnType = false;
                            return false;
                        }else{
                            if(gubun != "init"){
                                setTimeout(function(){
                                    location.href = "#MENUSD0600SK";
                                },1500);
                            }
                        }
                    },
                    error : function (e) {
                        $(".loading").hide();
                        commonUtil.alertError("에러입니다. 잠시후 다시시도해주세요.");
                        location.href = '#MENUSD0600SK';
                    }
                }, true);
                return returnType;
            },
            loginCheck : function(){
                var that =this;
                requestParam = commonUtil.getBxmReqData(
                    {
                        keyType : keyTemp
                    }
                );
                commonUtil.requestBxmAjax(requestParam, {

                    success:  function(response) {

                        if(keyValue =='N'){
                            $.removeCookie('userBzno');
                            $.removeCookie('userName');
                            commonUtil.alert("로그인 후 이용해주시기 바랍니다.");
                            location.href = '#MENUSD0200';
                        }

                    },error : function(e){
                        commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");
                        return false;
                    }
                },false);
            },
            esgrptInit : function(){
                var that = this;

                commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', ''), {
                    beforeSend: function(){
                        $(".loading").show();
                    },
                    success: function(response) {
                        $(".loading").hide();
                        var bznoGubun = bzno.substr(3,1);

                        that.setStep1({esgrptFlag : esgrptFlag});
                        if(esgrptFlag != "C"){
                            // STEP별 답변
                            var esgrptAnsrAll = that.getStep2("esgrptAnsrAll");
                            var esgrptAnsr_step2 = [];
                            var esgrptAnsr_step3 = [];
                            var esgrptAnsr_step4 = [];
                            for(var i=0; i<esgrptAnsrAll.length; i++) {
                            	if(esgrptAnsrAll[i].qstCd.indexOf('ENV') > -1) {
                            		esgrptAnsr_step2.push(esgrptAnsrAll[i]);
                            	}else if(esgrptAnsrAll[i].qstCd.indexOf('SOC') > -1) {
                            		esgrptAnsr_step3.push(esgrptAnsrAll[i]);
                            	}else if(esgrptAnsrAll[i].qstCd.indexOf('GOV') > -1) {
                            		esgrptAnsr_step4.push(esgrptAnsrAll[i]);
                            	}
                            }
                            that.setStep2({"esgrptAnsr":esgrptAnsr_step2});
                            that.setStep3({"esgrptAnsr":esgrptAnsr_step3});
                            that.setStep4({"esgrptAnsr":esgrptAnsr_step4});

                            that.setStep1({openStep : "true"});
                            that.setStep4({openStep : "true"});

                            that.setStep2({"esgrptCrtiStatAll":response.esgrptCrtiStat});

                            // STEP별 인증현황
                            var esgrptCrtiStatAll = that.getStep2("esgrptCrtiStatAll");
                            var esgrptCrtiStat_step2 = [];
                            var esgrptCrtiStat_step3 = [];
                            for(var i=0; i<esgrptCrtiStatAll.length; i++) {
                            	if(esgrptCrtiStatAll[i].qstCd.indexOf('ENV') > -1) {
                            		esgrptCrtiStat_step2.push(esgrptCrtiStatAll[i]);
                            	}else if(esgrptCrtiStatAll[i].qstCd.indexOf('SOC') > -1) {
                            		esgrptCrtiStat_step3.push(esgrptCrtiStatAll[i]);
                            	}
                            }
                            that.setStep2({"esgrptCrtiStat":esgrptCrtiStat_step2});
                            that.setStep3({"esgrptCrtiStat":esgrptCrtiStat_step3});

                            that.setStep2({"esgrptYStatAll":response.esgrptYStat});

                         // STEP별 3개년
                            var esgrptYStatAll = that.getStep2("esgrptYStatAll");
                            var esgrptYStat_step2 = [];
                            var esgrptYStat_step3 = [];
                            for(var i=0; i<esgrptYStatAll.length; i++) {
                            	if(esgrptYStatAll[i].qstCd.indexOf('ENV') > -1) {
                            		esgrptYStat_step2.push(esgrptYStatAll[i]);
                            	}else if(esgrptYStatAll[i].qstCd.indexOf('SOC') > -1) {
                            		esgrptYStat_step3.push(esgrptYStatAll[i]);
                            	}
                            }
                            that.setStep2({"esgrptYStat":esgrptYStat_step2});
                            that.setStep3({"esgrptYStat":esgrptYStat_step3});
                            that.setStep2({openStep : "true"});

                            that.setStep3({"esgrptEmplStat":response.esgrptEmplStat});
                            that.setStep3({openStep : "true"});

                            if(esgrptFlag == "R"){
                                that.setStep4({"wrtStatCd"  :"10"});
                                that.sd0700sk_save_temp("init");
                            }
                        }else{
                            that.setStep1({openStep : "false"});
                            that.setStep2({openStep : "false"});
                            that.setStep3({openStep : "false"});
                            that.setStep4({openStep : "false"});
                        }
                    },
                    error : function(e){
                        $(".loading").hide();
                        commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");
                        return false;
                    }
                },false);
            },
            changeSubPage: function (subId, renderInfo) {
                this.subId = commonConfig.pageInfo[this.pageId].currentSubId = subId;

                this.createPage(subId, renderInfo);

                var tmpSubId = this.subId;
            },

            createPage: function(subId, renderInfo) {

                console.log("---------------4.createPage");

                var that = this,
                    pagePath = commonConfig.pageInfo[that.pageId].subPages[subId].src;

                //추가
                if(this.findPage(subId).length){
                    console.log("---------------4-1.createPage if");
                    this.removeItem(subId);
                }

                require([pagePath], function(pageConstructor) {
                    var $pageEl, pageObj ;
                    console.log('--------------4-2.pageConstructor >>'+pageConstructor);
                    //추가
                    that.param = renderInfo;


                    pageObj = that.activePageMap[subId] = new pageConstructor({subId: subId}, that);
                    $pageEl = pageObj.render().$el;
                    $pageEl.attr({'data-page': subId});
                    that.$subWorkspace.html($pageEl);



                    that.activatePage(subId, renderInfo);
                });
            },

            activatePage: function(subId, renderInfo) {

                console.log('---------------5.activatePage');

                this.findActivePage().removeClass('on');
                this.$subNavs.find('.on').removeClass('on');
                this.findPage(subId).addClass('on');
                this.$subNavs.find('.' + subId).addClass('on');

                $(window).resize();

                var pageObj = this.activePageMap[subId];

                if(pageObj) {
                    pageObj.afterRender && pageObj.afterRender(renderInfo);
                }
            },

            findActivePage: function() {
                console.log('------------6.findActivePage');

                return this.$subWorkspace.find('.on[data-page]');
            },

            findPage: function(subId) {
                console.log('-----------------3.findPage subId>>'+subId);
                return this.$subWorkspace.find('[data-page='+ subId +']');
            }
            ,
            removeItem: function(subId) {
                console.log('-----------------removeItem'+subId)
                this.findPage(subId).remove();
            },

            setStep1 : function(data){
                returnYn = true;
                step1Model.set(data)
                return returnYn;
            },
            getStep1 : function(elName){

                if(elName == '') return step1Model;
                else return step1Model.get(elName);
            },
            setStep2 : function(data){
                returnYn = true;
                step2Model.set(data)
                return returnYn;
            },
            getStep2 : function(elName){
                if(elName == '') return step2Model;
                else return step2Model.get(elName);
            },
            setStep3 : function(data){
                returnYn = true;
                step3Model.set(data)
                return returnYn;
            },
            getStep3 : function(elName){
                if(elName == '') return step3Model;
                else return step3Model.get(elName);
            },
            setStep4 : function(data){
                returnYn = true;
                step4Model.set(data)
                return returnYn;
            },
            getStep4 : function(elName){
                if(elName == '') return step4Model;
                else return step4Model.get(elName);
            },
            isValid : function(step){
                if(step == 'STEP1') return step1Model.isValid();
                else if(step == 'STEP2') return step2Model.isValid();
                else if(step == 'STEP3') return step3Model.isValid();
                else if(step == 'STEP4') return step4Model.isValid();
            }
        });
    }
);