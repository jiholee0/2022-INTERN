define(
[
    'common/config',
    'common/util',
    'common/utils/nicednb-jquery-input',
    'text!views/sd/sd-0710sk-tpl.html',
    "common/component/nicetable/nicetable"
],
function(
    commonConfig,
    commonUtil,
    inputUtil,
    tpl,
    NiceTable
) { 
    
    var pageId = '';
    var totalItemList = [];
    var wkp = '';
    var SD_0710_VIEW = Backbone.View.extend({

        tagName : 'section',
        events : {
            "click [name=chrgReg]" :"chrgReg",
            "keyup .dateinput" : "dateFormat",
            "keyup .moneyinput" : "NumberFormat",
            "keyup .moneyinput15" : "NumberFormat",
            "keyup .moneyinputM" : "NumberFormatM",
            "keyup .numberonly" : "OnlyNumberFormat",
            "keyup .hasDatepicker" : "inputDateFormat",            
            "change [name=emailDomain]": "chanageEmailDomain", // 메일 도메인 변경
            
            "click button[name=step1Next]" : "moveStep1isValid",
            "click button[name=step1Save]" : "insertCmpInfo",
            
            "blur [name=bzno2]" : "bznoGubun",

            "click #btn-post-pop-open" : "popOpenPost",
            'keydown .postSrchText' : 'enterSrchPost',
            "click [name=btnSrchPost]" : "srchPost",
            "click [name=setBtnPost]": "setBtnPost",
            'click .nice-paging1' : 'listGo1',
        
            "click .moveStep1" : "moveStep1",
            "click .moveStep2" : "moveStep2",
            "click .moveStep3" : "moveStep3",
            "click .moveStep4" : "moveStep4",
            
            "click #poptest": "poptest", // 산업코드
            "click [name=itemCd]": "clickItemCd", // 산업코드
            'enter-component [name=srchNm]': 'selectItemListNm',
            'keyup [name=srchNm]': 'selectItemListNm',
            "click [name=selectedItemCd]": "selectedItemCd",
            "click [name=closeItemCd]" : "closePop",
            "change [name=corpChgYn]": "checkCorp", // 법인전환
            "change [name=eymd]": "chgEymd" // 사업시작일
            
        }, 
        parent : null,

        initialize : function(model, parent){
            var that = this;

            pageId = model.pageId;

            that.parent = parent;

            that.$el.html(Handlebars.compile( tpl ));
            that.$el.find('.dateinput').mask("9999-99-99");
            that.$el.find('.moneyinput').mask("9,999,999,999",{reverse:true});
            that.$el.find('.moneyinput15').mask("99,999,999,999,999",{reverse:true});
            
            that.mnWrkCode = commonUtil.getEsgrptComCode('MN_WRK_CD');
            that.wkpGbCode = commonUtil.getEsgrptComCode('WKP_GBCD');
        },

        render : function(){
            var that = this;
            console.log("----- render() START -----");
            // 공통코드 조회.
            that.selectCode();
            if(that.parent.getStep1("openStep") =="true"){
                that.getData();
            }else{ //신규작성 시 기본 회원정보
                that.memInfo();
            }
            console.log("----- render() END -----");
            return that;
        }, 
        afterRender : function(){
            var that = this;
            // 산업분류코드
            that.selectItemList('1','','','');
            totalItemList = that.selectItemListTotal();
            that.$el.find(".datepicker").datepicker(commonConfig.datepicker);
            $("[name=corpSymd]").closest("div").children("button").hide();
            $('[name=corpSymd]').removeClass("inp-date");
            $("[name=corpSymd]").closest("div").removeClass("wrapper");
            $('[name=corpSymd]').prop("disabled", true);
            $('[name=corpSymd]').css("width", "100%");
            that.bznoGubun();
            
            $('[name=wkpGbcd_1] option[value="01"]').remove();
            $('[name=wkpGbcd_2] option[value="01"]').remove();
            
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
        memInfo : function(){
            //회원정보 가져오기
            var that =this;
            userId = '';        
            console.log("----- memInfo() START -----");
            requestParam = commonUtil.getBxmReqData( 
                '', '',
                {   
                    bzno : userId      
                }
            );  

            commonUtil.requestBxmAjax(requestParam, { 
                beforeSend: function(){
                    $(".loading").show();
                },            
                success:  function(response) {
                    var memList = response;
                    
                    $('[name=cmpHnm]').val(memList.cmpNm);
                    $('[name=bzno1]').val(memList.bzno.substr(0,3));
                    $('[name=bzno2]').val(memList.bzno.substr(3,2));
                    $('[name=bzno3]').val(memList.bzno.substr(5,5));
                    $('[name=wkpZpcd_0]').val(memList.chrgZpcd);
                    $('[name=wkpAddr_0]').val(memList.chrgAddr);
                    $('[name=wkpDtlAddr_0]').val(memList.chrgDtlAddr);
                    $('[name=mgrHnm]').val(memList.mgrNm);
                    $('[name=cmpFormCd]').val(memList.typ);
                    $('[name=cmpScaleCd]').val(memList.scl);
                    
                    var corpNo = memList.corpNo;
                    var bznoGubun = memList.bzno.substr(3,1);
                    $(".loading").hide();
                
                    if(bznoGubun != '8'){
                    	that.$el.find('[name=corpRegNo1]').attr("disabled", true);
                        that.$el.find('[name=corpRegNo2]').attr("disabled", true);
                        that.$el.find('.capHidden').hide();
                        $("[name=corpSymd]").closest("div").children("button").hide();
                        $('[name=corpSymd]').removeClass("inp-date");
                        $("[name=corpSymd]").closest("div").removeClass("wrapper");
                        $('[name=corpSymd]').prop("disabled", true);
                        $('[name=corpSymd]').css("width", "100%");
                    }else{
                    	if(corpNo != null && String(corpNo).trim() != ""){
	                    	$('[name=corpRegNo1]').val(corpNo.substr(0,6));
	                        $('[name=corpRegNo2]').val(corpNo.substr(6,7));
                    	}
                    }
                },error : function(){
                    $(".loading").hide();
                    commonUtil.alert("에러입니다. 잠시후 다시시도해주세요.");       
                    return false;                             
                }
            });    
            console.log("----- memInfo() END -----");
        },
        bznoGubun : function(){
            var that = this;
          
            console.log("----- bznoGubun() START -----");
            if(that.$el.find('[name=bzno2]').val() != ""){
	            var bznoGubun = that.$el.find('[name=bzno2]').val().substr(0,1);
	            if(bznoGubun != '8'){
	                that.checkCorp("N");
	            }
            }
            console.log("----- bznoGubun() END -----");
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
            //기업규모코드
            that.$el.find("[name='cmpScaleCd']").html(commonUtil.getSelectOption(
                commonUtil.getComCode('CMP_SCALE_CD')['CMP_SCALE_CD'],'sCd','sNm', '선택'));
            //기업형태코드
            that.$el.find("[name='cmpFormCd']").html(commonUtil.getSelectOption(
                commonUtil.getComCode('CMP_GBCD')['CMP_GBCD'],'sCd','sNm', '선택'));
            //이메일
            that.$el.find("[name='emailDomain']").html(commonUtil.getSelectOption(
                commonUtil.getComGlCode('C004')['C004'],'dtlCd','dtlNm', '기타'));
            
            //주요수행업무코드
            var mnWrkCd = commonUtil.getEsgrptComCode('MN_WRK_CD')['MN_WRK_CD'];            
            that.$el.find("[name='mnWrk1']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            that.$el.find("[name='mnWrk2']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            that.$el.find("[name='mnWrk3']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            that.$el.find("[name='mnWrk1_1']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            that.$el.find("[name='mnWrk2_1']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            that.$el.find("[name='mnWrk3_1']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            that.$el.find("[name='mnWrk1_2']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            that.$el.find("[name='mnWrk2_2']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            that.$el.find("[name='mnWrk3_2']").html(commonUtil.getSelectOption(mnWrkCd,'sCd','sNm', '선택'));
            
            //사업장 구분코드
            var wkpGbcd = commonUtil.getEsgrptComCode('WKP_GBCD')['WKP_GBCD'];
            that.$el.find("[name='wkpGbcd_1']").html(commonUtil.getSelectOption(wkpGbcd,'sCd','sNm', '선택'));
            that.$el.find("[name='wkpGbcd_2']").html(commonUtil.getSelectOption(wkpGbcd,'sCd','sNm', '선택'));
        },
        //신규
        insertCmpInfo : function(move){

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
                        commonUtil.alertSucc('기업개요에 작성하신 내용이 저장됐습니다.');  
                        
                        commonUtil.redirectRoutePage("MENUSD0700SK/STEP1");
                    }
                    
                },
                error : function (e) {
                    $(".loading").hide();
                    commonUtil.alertError("에러입니다. 잠시후 다시시도해주세요.");
                }
            }, true);

            console.log("----- 임시저장() END -----");
        },
        //데이터 가져오기 
        getData : function(){
            var that = this;
            console.log("----- getData() START -----");
            var esgrpt = that.parent.getStep1("esgrpt");            
            var flag = commonUtil.getParameterByName("flag"); 
            /*복사하여 신규작성 클릭 시 담당자정보는 가져오지 않기로 함. 
             * R : 복사하여신규작성
             * U : 수정 
             * null : 페이지 이동시 flag 사라짐
            */
            if(flag == null || flag != "R"){
                if(esgrpt){                    
                    that.$el.find('[name=chrgNm]').val(esgrpt.chrgNm);
                    that.$el.find('[name=chrgDepNm]').val(esgrpt.chrgDepNm);
    
                    if(esgrpt.chrgTel){
                        if(esgrpt.chrgTel.split('-').length ==3){
                            that.$el.find('[name=chrgTel1]').val(esgrpt.chrgTel.split('-')[0]);
                            that.$el.find('[name=chrgTel2]').val(esgrpt.chrgTel.split('-')[1]);
                            that.$el.find('[name=chrgTel3]').val(esgrpt.chrgTel.split('-')[2]);
                        }else if(esgrpt.chrgTel.split('-').length ==2){
                            that.$el.find('[name=chrgTel1]').val(esgrpt.chrgTel.split('-')[0]);
                            that.$el.find('[name=chrgTel2]').val(esgrpt.chrgTel.split('-')[1]);
                        }else{
                            that.$el.find('[name=chrgTel1]').val(''); //AS DATA 중 '03188881234' 의 경우가 있음 
                        }
                    }
    
                    if(esgrpt.chrgFax){
                        if(esgrpt.chrgFax.split('-').length ==3){
                            that.$el.find('[name=chrgFax1]').val(esgrpt.chrgFax.split('-')[0]);
                            that.$el.find('[name=chrgFax2]').val(esgrpt.chrgFax.split('-')[1]);
                            that.$el.find('[name=chrgFax3]').val(esgrpt.chrgFax.split('-')[2]);
                        }else if(esgrpt.chrgFax.split('-').length ==2){
                            that.$el.find('[name=chrgFax1]').val(esgrpt.chrgFax.split('-')[0]);
                            that.$el.find('[name=chrgFax2]').val(esgrpt.chrgFax.split('-')[1]);
                        }else{
                            that.$el.find('[name=chrgFax1]').val('');
                        }
                    }
    
                    if(esgrpt.chrgHp){
                        if(esgrpt.chrgHp.split('-').length ==3){
                            that.$el.find('[name=chrgHp1]').val(esgrpt.chrgHp.split('-')[0]);
                            that.$el.find('[name=chrgHp2]').val(esgrpt.chrgHp.split('-')[1]);
                            that.$el.find('[name=chrgHp3]').val(esgrpt.chrgHp.split('-')[2]);
                        }else if(esgrpt.chrgHp.split('-').length ==2){
                            that.$el.find('[name=chrgHp1]').val(esgrpt.chrgHp.split('-')[0]);
                            that.$el.find('[name=chrgHp2]').val(esgrpt.chrgHp.split('-')[1]);
                        }else{
                            that.$el.find('[name=chrgHp1]').val('');
                        }
                    }
    
                    if(esgrpt.chrgEmail){
                        that.$el.find('[name=chrgEmail1]').val(esgrpt.chrgEmail.split('@')[0]);
                        that.$el.find('[name=chrgEmail2]').val(esgrpt.chrgEmail.split('@')[1]);
                    }
                }
            }
            
            //기업체 개요
            var esgrptCmpOtl = that.parent.getStep1("esgrptCmpOtl");

            if(esgrptCmpOtl){                
                if(esgrptCmpOtl.corpRegNo){
                	esgrptCmpOtl.corpRegNo1 = esgrptCmpOtl.corpRegNo.substr(0,6);
                	esgrptCmpOtl.corpRegNo2 = esgrptCmpOtl.corpRegNo.substr(6,7);
                }
                esgrptCmpOtl.eymd = commonUtil.changeStringToDateString(esgrptCmpOtl.eymd);
                
                //법인시작일자, 법인변경유무 
                esgrptCmpOtl.corpSymd = commonUtil.changeStringToDateString(esgrptCmpOtl.corpSymd);
                if(esgrptCmpOtl.corpChgYn == 'Y'){
                	esgrptCmpOtl.checkYn = "checked";
                }else{
                	esgrptCmpOtl.checkYn = "";
                }
                
                var bznoGubun = $.cookie('userBzno').substr(3,1);
                if(bznoGubun == '8'){
                	if(esgrptCmpOtl.corpSymd == '' || esgrptCmpOtl.corpSymd == null){
                		esgrptCmpOtl["corpSymd"] = esgrptCmpOtl.eymd;
                	}
                }
                
                var esgrptCmpOtlSbmtTmp = commonUtil.getTemplate(tpl,'esgrptCmpOtl-sbmt-tmp');
                
                if(esgrptCmpOtlSbmtTmp){
                    that.$el.find('#esgrptCmpOtl-list-id').html(Handlebars.compile(esgrptCmpOtlSbmtTmp)({
                        esgrptCmpOtl:esgrptCmpOtl
                    }));
                    
                }
                that.selectCode();
                that.$el.find("[name='cmpScaleCd']").val(esgrptCmpOtl.cmpScaleCd);
                that.$el.find("[name='cmpFormCd']").val(esgrptCmpOtl.cmpFormCd);
                that.$el.find("[name='bzno2']").blur();
            }
            that.$el.find('[name=bzno1]').val( $.cookie('userBzno').substr(0,3));   // esgrptCmpOtl.bzno.substr(0,3);
            that.$el.find('[name=bzno2]').val( $.cookie('userBzno').substr(3,2));   //esgrptCmpOtl.bzno.substr(3,2);
            that.$el.find('[name=bzno3]').val( $.cookie('userBzno').substr(5,5));   //esgrptCmpOtl.bzno.substr(5,5);
                        
        	//소재지
            var esgrptWkpInfo = that.parent.getStep1("esgrptWkpInfo");

            if(esgrptWkpInfo.length > 0){              
                for(var i=0; i<esgrptWkpInfo.length; i++) {
                	var esgrptWkpInfoTmp = commonUtil.getTemplate(tpl,'esgrptWkpInfo-sbmt-tmp'+i);
                	if(esgrptWkpInfo[i]){ 
                        if(esgrptWkpInfo[i].wkpTel){
                            if(esgrptWkpInfo[i].wkpTel.split('-').length ==3){
                                esgrptWkpInfo[i].wkpTel1 = esgrptWkpInfo[i].wkpTel.split('-')[0];
                                esgrptWkpInfo[i].wkpTel2 = esgrptWkpInfo[i].wkpTel.split('-')[1];
                                esgrptWkpInfo[i].wkpTel3 = esgrptWkpInfo[i].wkpTel.split('-')[2];
                            }else if(esgrptWkpInfo[i].wkpTel.split('-').length ==2){
                                esgrptWkpInfo[i].wkpTel1 = esgrptWkpInfo[i].wkpTel.split('-')[0];
                                esgrptWkpInfo[i].wkpTel2 = esgrptWkpInfo[i].wkpTel.split('-')[1];
                            }else{
                                esgrptWkpInfo[i].wkpTel1 = '';
                            }
                        }
            
                        if(esgrptWkpInfo[i].wkpFax){
                            if(esgrptWkpInfo[i].wkpFax.split('-').length ==3){
                                esgrptWkpInfo[i].wkpFax1 = esgrptWkpInfo[i].wkpFax.split('-')[0];
                                esgrptWkpInfo[i].wkpFax2 = esgrptWkpInfo[i].wkpFax.split('-')[1];
                                esgrptWkpInfo[i].wkpFax3 = esgrptWkpInfo[i].wkpFax.split('-')[2];
                            }else if(esgrptWkpInfo[i].wkpFax.split('-').length ==2){
                                esgrptWkpInfo[i].wkpFax1 = esgrptWkpInfo[i].wkpFax.split('-')[0];
                                esgrptWkpInfo[i].wkpFax2 = esgrptWkpInfo[i].wkpFax.split('-')[1];
                            }else{
                                esgrptWkpInfo[i].wkpFax1 = '';
                            }
                        }
                		that.$el.find('#esgrptWkpInfo'+i+'-list-id').html(Handlebars.compile(esgrptWkpInfoTmp)({
                        	esgrptWkpInfo:esgrptWkpInfo[i], mnWrkCd:that.mnWrkCode, wkpGbcd:that.wkpGbCode 
                        }));  
                	}
                }
            }
         
            that.$el.find('.dateinput').mask("9999-99-99");
            that.$el.find('.moneyinput').mask("9,999,999,999",{reverse:true});
            that.$el.find('.moneyinput15').mask("99,999,999,999,999",{reverse:true});

            console.log("----- getData() END -----");
        },
        makeData : function(){
            var that = this;

            console.log("----- makeData() start -----");
            var esgrptTemp = {};
            //담당자정보
            esgrptTemp['chrgNm']     = that.$el.find('[name=chrgNm]').val();
            esgrptTemp['chrgDepNm']  = that.$el.find('[name=chrgDepNm]').val();
            esgrptTemp['chrgTel']    = that.$el.find('[name=chrgTel1]').val() + '-' + that.$el.find('[name=chrgTel2]').val() +'-'+ that.$el.find('[name=chrgTel3]').val();
            esgrptTemp['chrgFax']    = that.$el.find('[name=chrgFax1]').val() +'-'+ that.$el.find('[name=chrgFax2]').val() +'-'+ that.$el.find('[name=chrgFax3]').val();
            esgrptTemp['chrgHp']     = that.$el.find('[name=chrgHp1]').val() + '-'+ that.$el.find('[name=chrgHp2]').val() +'-' + that.$el.find('[name=chrgHp3]').val();
            esgrptTemp['chrgEmail']  = that.$el.find('[name=chrgEmail1]').val() + '@'+ that.$el.find('[name=chrgEmail2]').val();
            
            if(that.parent.getStep1("esgrptFlag") != 'U'){
                esgrptTemp['wrtStatCd'] = "10";//작성상태코드
            }

            //기업개요
            var esgrptCmpOtlTemp = {};
            esgrptCmpOtlTemp['step']        = "1"; //탭구분
            esgrptCmpOtlTemp['bzno']        = that.$el.find('[name=bzno1]').val() + that.$el.find('[name=bzno2]').val() + that.$el.find('[name=bzno3]').val(); 
            esgrptCmpOtlTemp['corpRegNo']   = that.$el.find('[name=corpRegNo1]').val() + that.$el.find('[name=corpRegNo2]').val(); 
            esgrptCmpOtlTemp['cmpHnm']      = that.$el.find('[name=cmpHnm]').val();
            esgrptCmpOtlTemp['cmpEnm']      = that.$el.find('[name=cmpEnm]').val();  
            esgrptCmpOtlTemp['eymd']        = commonUtil.changeDateStringToString(that.$el.find('[name=eymd]').val()); 
            esgrptCmpOtlTemp['homepgUrl']   = that.$el.find('[name=homepgUrl]').val(); 
            esgrptCmpOtlTemp['mainIndNm']   = that.$el.find('[name=mainIndNm]').val(); 
            esgrptCmpOtlTemp['ksic']        = that.$el.find('[name=ksic]').val(); 
            esgrptCmpOtlTemp['ksicNm']      = that.$el.find('[name=ksicNm]').val(); 
            esgrptCmpOtlTemp['cmpFormCd']   = that.$el.find('[name=cmpFormCd]').val(); 
            esgrptCmpOtlTemp['cmpScaleCd']  = that.$el.find('[name=cmpScaleCd]').val();
            esgrptCmpOtlTemp['corpSymd']    = commonUtil.changeDateStringToString(that.$el.find('[name=corpSymd]').val());
            if($("[name=corpChgYn]").is(":checked"))
            	esgrptCmpOtlTemp['corpChgYn']          = "Y";
            else
            	esgrptCmpOtlTemp['corpChgYn']          = "N";
            
            //소재지
            var setWkpInfoList = [];
            var wkpInfoTemp1 = {};
            wkpInfoTemp1['wkpGbcd']     = '01';
            wkpInfoTemp1['wkpZpcd']     = that.$el.find('[name=wkpZpcd_0]').val(); 
            wkpInfoTemp1['wkpAddr']     = that.$el.find('[name=wkpAddr_0]').val(); 
            wkpInfoTemp1['wkpDtlAddr']  = that.$el.find('[name=wkpDtlAddr_0]').val(); 
            wkpInfoTemp1['wkpTel']      = that.$el.find('[name=wkpTel1]').val()  + '-' +  that.$el.find('[name=wkpTel2]').val()  + '-' +  that.$el.find('[name=wkpTel3]').val(); 
            wkpInfoTemp1['wkpFax']      = that.$el.find('[name=wkpFax1]').val()  + '-' +  that.$el.find('[name=wkpFax2]').val()  + '-' +  that.$el.find('[name=wkpFax3]').val();
            wkpInfoTemp1['mnWrk1']	    = that.$el.find('[name=mnWrk1]').val();
            wkpInfoTemp1['mnWrk2']	    = that.$el.find('[name=mnWrk2]').val();
            wkpInfoTemp1['mnWrk3']	    = that.$el.find('[name=mnWrk3]').val();
            setWkpInfoList.push(wkpInfoTemp1);
            if(!commonUtil.isEmpty(that.$el.find('[name=wkpGbcd_1]').val())){
                var wkpInfoTemp2 = {};
                wkpInfoTemp2['wkpGbcd']     = that.$el.find('[name=wkpGbcd_1]').val();
                wkpInfoTemp2['wkpZpcd']     = that.$el.find('[name=wkpZpcd_1]').val(); 
                wkpInfoTemp2['wkpAddr']     = that.$el.find('[name=wkpAddr_1]').val(); 
                wkpInfoTemp2['wkpDtlAddr']  = that.$el.find('[name=wkpDtlAddr_1]').val(); 
                wkpInfoTemp2['wkpTel']      = that.$el.find('[name=wkpTel1_1]').val()  + '-' +  that.$el.find('[name=wkpTel2_1]').val()  + '-' +  that.$el.find('[name=wkpTel3_1]').val(); 
                wkpInfoTemp2['wkpFax']      = that.$el.find('[name=wkpFax1_1]').val()  + '-' +  that.$el.find('[name=wkpFax2_1]').val()  + '-' +  that.$el.find('[name=wkpFax3_1]').val();
                wkpInfoTemp2['mnWrk1']	    = that.$el.find('[name=mnWrk1_1]').val();
                wkpInfoTemp2['mnWrk2']	    = that.$el.find('[name=mnWrk2_1]').val();
                wkpInfoTemp2['mnWrk3']	    = that.$el.find('[name=mnWrk3_1]').val();
                setWkpInfoList.push(wkpInfoTemp2);
            }
            if(!commonUtil.isEmpty(that.$el.find('[name=wkpGbcd_2]').val())){
                var wkpInfoTemp3 = {};
                wkpInfoTemp3['wkpGbcd']     = that.$el.find('[name=wkpGbcd_2]').val();
                wkpInfoTemp3['wkpZpcd']     = that.$el.find('[name=wkpZpcd_2]').val(); 
                wkpInfoTemp3['wkpAddr']     = that.$el.find('[name=wkpAddr_2]').val(); 
                wkpInfoTemp3['wkpDtlAddr']  = that.$el.find('[name=wkpDtlAddr_2]').val(); 
                wkpInfoTemp3['wkpTel']      = that.$el.find('[name=wkpTel1_2]').val()  + '-' +  that.$el.find('[name=wkpTel2_2]').val()  + '-' +  that.$el.find('[name=wkpTel3_2]').val(); 
                wkpInfoTemp3['wkpFax']      = that.$el.find('[name=wkpFax1_2]').val()  + '-' +  that.$el.find('[name=wkpFax2_2]').val()  + '-' +  that.$el.find('[name=wkpFax3_2]').val();
                wkpInfoTemp3['mnWrk1']	    = that.$el.find('[name=mnWrk1_2]').val();
                wkpInfoTemp3['mnWrk2']	    = that.$el.find('[name=mnWrk2_2]').val();
                wkpInfoTemp3['mnWrk3']	    = that.$el.find('[name=mnWrk3_2]').val();    
                setWkpInfoList.push(wkpInfoTemp3);        	
            }

           
            var param = {};
            param['rptCmpGb']		= 'SKI';
            param['step']       	= '1';
            param['esgrpt']     	= esgrptTemp;
            param['esgrptCmpOtl']   = esgrptCmpOtlTemp;
            param['esgrptWkpInfo']  = setWkpInfoList;
            
            that.parent.setStep1(param);
            that.parent.setStep1({openStep : "true"});

            console.log("----- makeData() END -----");
            return param;
        },
        //신청담당자정보
        chrgReg : function(){

            var that = this;
            console.log("----- chrgReg() START -----");
            if($('[name=chrgReg]').prop("checked")){
    
                // call service.    
                commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', ''), {
                    beforeSend: function(){
                    },
                    success: function(response) {

                        //인터뷰담당자
                        var chrgReg = response.chrgReg;

                        if(chrgReg !=  null || chrgReg != undefined){

                            $('[name=chrgNm]').val(chrgReg.chrgNm);
                            $('[name=chrgDepNm]').val(chrgReg.chrgDepNm);

                            if(chrgReg.chrgTel != undefined){

                                if(chrgReg.chrgTel.split('-').length ==3){
                                    $('[name=chrgTel1]').val(chrgReg.chrgTel.split('-')[0]);
                                    $('[name=chrgTel2]').val(chrgReg.chrgTel.split('-')[1]);
                                    $('[name=chrgTel3]').val(chrgReg.chrgTel.split('-')[2]);
                                }else if(chrgReg.chrgTel.split('-').length ==2){
                                    $('[name=chrgTel1]').val(chrgReg.chrgTel.split('-')[0]);
                                    $('[name=chrgTel2]').val(chrgReg.chrgTel.split('-')[1]);
                                }else{
                                    $('[name=chrgTel1]').val('');
                                }
                            }
        
                            if(chrgReg.chrgFax  != undefined){
                                if(chrgReg.chrgFax.split('-').length ==3){
                                    $('[name=chrgFax1]').val(chrgReg.chrgFax.split('-')[0]);
                                    $('[name=chrgFax2]').val(chrgReg.chrgFax.split('-')[1]);
                                    $('[name=chrgFax3]').val(chrgReg.chrgFax.split('-')[2]);
                                }else if(chrgReg.chrgFax.split('-').length ==2){
                                    $('[name=chrgFax1]').val(chrgReg.chrgFax.split('-')[0]);
                                    $('[name=chrgFax2]').val(chrgReg.chrgFax.split('-')[1]);
                                }else{
                                    $('[name=chrgFax1]').val('');
                                }
                            }

                            if(chrgReg.chrgHp  != undefined){
                                if(chrgReg.chrgHp.split('-').length ==3){
                                    $('[name=chrgHp1]').val(chrgReg.chrgHp.split('-')[0]);
                                    $('[name=chrgHp2]').val(chrgReg.chrgHp.split('-')[1]);
                                    $('[name=chrgHp3]').val(chrgReg.chrgHp.split('-')[2]);
                                }else if(chrgReg.chrgHp.split('-').length ==2){
                                    $('[name=chrgHp1]').val(chrgReg.chrgHp.split('-')[0]);
                                    $('[name=chrgHp2]').val(chrgReg.chrgHp.split('-')[1]);
                                }else{
                                    $('[name=chrgHp1]').val('');
                                }
                            }

                            if(chrgReg.chrgEmail  != undefined){
                                $('[name=chrgEmail1]').val(chrgReg.chrgEmail.split('@')[0]);
                                $('[name=chrgEmail2]').val(chrgReg.chrgEmail.split('@')[1]);
                                
                            }

                        }else{
                            commonUtil.alert('담당자가 없습니다.'); 
                        }

    
                    }
                });
            }else{

                $('[name=chrgNm]').val("");
                $('[name=chrgDepNm]').val("");
                $('[name=chrgTel1]').val("");
                $('[name=chrgTel2]').val("");
                $('[name=chrgTel3]').val("");
                $('[name=chrgFax1]').val("");
                $('[name=chrgFax2]').val("");
                $('[name=chrgFax3]').val("");
                $('[name=chrgHp1]').val("");
                $('[name=chrgHp2]').val("");
                $('[name=chrgHp3]').val("");
                $('[name=chrgEmail1]').val("");
                $('[name=chrgEmail2]').val("");
                
            }
            that.$el.find("[name='emailDomain']").html(commonUtil.getSelectOption(

                console.log("----- chrgReg() END -----");
        },
        // 이메일 도메인 선택
        chanageEmailDomain : function(e){

            var that = this;
            var $target = $(e.target);
            var chrgGbcd = $target.attr("chrgGbcd");

            that.$el.find("[name=chrgEmail2]").val($target.val());
        },
        sumNumberFormat : function(sumAmt){
            //합계금액 콤마 
            var v =  sumAmt.toString().replace(/\D/gi,'');
            
            var x = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return x
        }, 
        closePop:function(e){
            var that = this;
            $(".modal-popup").hide();
           // e.preventDefault();
        },
        selectItemListTotal : function(){
            var that = this;
            
            // set param.
            var param = {};
            var itemCdList = [];
            commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', '', param), {
                beforeSend: function(){
                },
                success: function(response) {
                    itemCdList = response.indCd;                    
                }
            },false);

            return itemCdList;
        },
        //산업코드
        poptest:function(e){
            var that = this;
            $("#itemCdPop").show();

            var mp = $("#itemCdPop .detail-view-container");
            
            $(mp).css({
                "top": (($(window).height()-$(mp).outerHeight())/2+$(mp).scrollTop())+"px",
                "left": (($(window).width()-$(mp).outerWidth())/2+$(window).scrollLeft())+"px"
            });

            that.selectItemList(' ');
        },
        //산업코드
        selectItemList : function(parentCd, rootId){
            var that = this;
            // that.totalIte/mList;
            
            var codeListTmp = commonUtil.getTemplate(tpl,'codeListTmp');
            
            var liCnt = $('ul[parentCd="'+parentCd+'"] li').length;
    
            if(liCnt > 0){
                // $('ul[parentCd="'+parentCd+'"] li').hide();
                return;
            }
            if(parentCd == ' '){
                that.$el.find("#codeList").html('');
                that.$el.find("#codeList").html('<ul class="dep01" parentCd=" " lv="1"></ul>');
            }
            else {
                that.$el.find("#codeList li[itemCd="+parentCd+"]").append('<ul class="dep02" style="display: block;" parentCd="'+parentCd+'" lv="1"></ul>');
            }            

            var selectList = [];
            selectList = commonUtil.getJsonToProArray(totalItemList,"parent",parentCd);
            
            var $ulTarget = that.$el.find("#codeList [parentCd='"+parentCd+"']");

            var retItCd = [];
            $.each(selectList, function(idx){
                if(commonUtil.isNotEmpty(rootId) && rootId.length > 0 && $.inArray(this.id, rootId) == -1){
                    return;
                }
                $ulTarget.append(Handlebars.compile(codeListTmp)({item:this}));  
                retItCd.push(this.id);
            });
            return retItCd;
        },
        selectItemListNm : function(parentCd){
            var that = this;
            // that.totalIte/mList;
            
            var codeListTmp = commonUtil.getTemplate(tpl,'codeListTmp');

            that.$el.find("#codeList").html("");

            
            var srchText = $("[name=srchNm]").val();

            if(that.$el.find("[name=srchNm]").val().length < 2){
                that.$el.find("#codeList").html("");
                that.selectItemList(' ');
                return;
            }
            
            var selectList = [];
            selectList = that.selectItemListNameTotal();

            that.$el.find("#codeList").html('');
            
            var $listTmp = that.$el.find("#codeList");
            for(i=0; i < selectList.length; i++){
                var item = {};
                item = selectList[i];
                var parentCd = item.parent;

                if($listTmp.find("ul[parentCd='"+parentCd+"']").length == 0){
                    if(parentCd == ' '){
                        $listTmp.append('<ul class="dep01" parentCd=" " lv="1"></ul>');
                    } else {
                        $listTmp.find("li[itemCd="+parentCd+"]").append('<ul class="dep02" style="display: block;" parentCd="'+parentCd+'" lv="1"></ul>');
                    }
                }
                var ulTarget = $listTmp.find("ul[parentCd='"+parentCd+"']");

                var htmltmp = '<li itemCd="'+item.id+'" class="on"><a href="#" name="itemCd" itemCd="'+item.id+'" parentCd="'+parentCd+'" itemNm="'+item.text+'" itemNm2="'+item.nm+'">'+item.text+'</a></li>';

                ulTarget.append(htmltmp);
            }

        },
        selectItemListNameTotal : function(){
            var that = this;
            
            // set param.
            var param = {};
            var itemCdList = [];
            param['prdNm']=$("[name=srchNm]").val();
            commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', '', param), {
                beforeSend: function(){
                },
                success: function(response) {
                    itemCdList = response.indCd;                    
                }
            },false);

            return itemCdList;
        },
        //산업코드
        clickItemCd:function(e){
            var that = this;
            e.preventDefault();
            var $itemCd = $(e.target);
            var $itemCdLi = $itemCd.closest("li");

            
            var parentCd = $itemCd.attr("parentCd");
            var itemCd = $itemCd.attr("itemCd");
            var $listTmp = that.$el.find("#codeList");
            $listTmp.find(".active").removeClass("active");
            $itemCd.addClass("active");

            if($itemCdLi.hasClass("on")){
                $itemCdLi.removeClass("on");
                $('ul[parentCd="'+itemCd+'"] li').hide();
                // $itemCdLi.find("ul [parentCd='"+itemCd+"']").css("display","none");
            }
            else{
                $itemCdLi.addClass("on");
                $('ul[parentCd="'+itemCd+'"] li').show();
                that.selectItemList($itemCd.attr("itemCd"))
            }

        }
        ,
        selectedItemCd : function(){
            var that = this;
            // prdNm
            
            var $listTmp = that.$el.find("#codeList");

            var prdCd = $listTmp.find("[name=itemCd].active").attr("itemCd");
            var prdNm = $listTmp.find("[name=itemCd].active").attr("itemNm2");

            if(prdCd.substr(1,5) =="00000"){
                commonUtil.alert("산업분류 하위코드를 선택해주세요.");
                return;
            }
            if(commonUtil.isEmpty(prdCd)){
                commonUtil.alert("산업분류 코드를 선택해주세요.");
                return;
            }
            $("[name=ksic]").val(prdCd.substr(1,5));
            $("[name=ksicNm]").val(prdNm);
            that.closePop();
        },        
        popOpenPost : function(e){
        	wkp = e.target.value;
        	$("[name=postSrchText]").val("");
    		$("#postList").html("");
    		$('.footer').html("");
    		$( "#post-wrap" ).show();
        },
        // 주소검색.
        srchPost : function(e){
            var that = this;
            var param = {};
            if(that.$el.find("[name=postSrchText]").val().trim() =="" 
                || that.$el.find("[name=postSrchText]").val().length < 2){
                commonUtil.alert("도로명, 건물명 또는 지번을 입력해주세요.");
                return;
            }
            param['sSrhVal'] = that.$el.find("[name=postSrchText]").val();

            param['iCurrentPage'] = 1 ;
            param['iCountPerPage'] = 10 ;

            // call service.    
            commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', '', param), {
                beforeSend: function(){
                },
                success: function(response) {
                    if(response.totalCount==0){
                        response.subOmm=null;
                    }
                    // 담당자 목록.
                    that.$el.find('#postList').empty();
                    that.$el.find('#postList').html(
                        Handlebars.compile(commonUtil.getTemplate(tpl,'postListTmp'))(
                            {postList:response.subOmm}));

                    var viewClassName = ".result-table1";                        
                    var pageClickClassName ="nice-paging1";
                    var totalCnt = response.totalCount;
                   
                    that.doQuery("1",totalCnt,viewClassName,pageClickClassName);        
                }

                
            });
        },
        setBtnPost : function(e){
            var that = this;         
            var $args = {};
            $args = $(e.target).closest("tr").find("[name=zip]").data();
            that.$el.find('#wkpZpcd_'+wkp).val($args.zipCd);
            that.$el.find('#wkpAddr_'+wkp).val($args.kor);
            that.$el.find("#post-wrap").hide();
        },
        doQuery: function(pageNum,totalCnts,view,pageClickClass) {
            var that = this;
    
            var pageNum = pageNum || 1;
    
            var niceTable = new NiceTable({
                startIndex : pageNum,
                totalCnt:totalCnts,
                view : view,
                pageClickClass : pageClickClass
            });
           
            niceTable.run();
        },
        enterSrchPost :function(){
            var that = this;            
            that.$el.find('.postSrchText').keypress(function(e){
                if(e.which==13){
                    that.srchPost();
                }
            });
        }, 
        /******************************************************************************************************* */
        moveStep1 : function(e){
            
            e.preventDefault(); 
            var that = this;
            that.insertCmpInfo(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP1";
           
        },
        moveStep2 : function(e){
            var that = this;
            e.preventDefault(); 
            that.insertCmpInfo(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP2";
        },
        moveStep1isValid : function(){
            var that = this;
            var rtn = false;

            if($('[name=chrgNm]').val().length < 1){
                commonUtil.confirm("인터뷰담당자의 담당자를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm,  that);
            }else if($('[name=chrgTel1]').val().length < 1){
                commonUtil.confirm("인터뷰담당자의 전화번호를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=chrgTel2]').val().length < 1){
                commonUtil.confirm("인터뷰담당자의 전화번호를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=chrgTel3]').val().length < 1){
                commonUtil.confirm("인터뷰담당자의 전화번호를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=chrgHp1]').val().length < 1){
                commonUtil.confirm("인터뷰담당자의 휴대전화를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=chrgHp2]').val().length < 1){
                commonUtil.confirm("인터뷰담당자의 휴대전화를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=chrgHp3]').val().length < 1){
                commonUtil.confirm("인터뷰담당자의 휴대전화를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }
            
            else if($('[name=cmpHnm]').val().length < 1){
                commonUtil.confirm("기업체 개요의 기업명(국문)을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=cmpEnm]').val().length < 1){
                commonUtil.confirm("기업체 개요의 기업명(영문)을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=mainIndNm]').val().length < 1){
                commonUtil.confirm("기업체 개요의 주요산업을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=ksic]').val().length < 1){
                commonUtil.confirm("기업체 개요의 산업코드을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=cmpFormCd]').val().length < 1){
                commonUtil.confirm("기업체 개요의 기업형태을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=cmpScaleCd]').val().length < 1){
                commonUtil.confirm("기업체 개요의 기업규모 을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm,that);
            }
            
            else if($('[name=wkpAddr_0]').val().length < 1){
                commonUtil.confirm("소재지의 사업장(본사) 주소를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=wkpDtlAddr_0]').val().length < 1){
                commonUtil.confirm("소재지의 사업장(본사) 상세주소을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=wkpTel1]').val().length < 1){
                commonUtil.confirm("소재지의 사업장(본사) 전화번호을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=wkpTel2]').val().length < 1){
                commonUtil.confirm("소재지의 사업장(본사) 전화번호을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=wkpTel3]').val().length < 1){
                commonUtil.confirm("소재지의 사업장(본사) 전화번호을 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else if($('[name=mnWrk1]').val().length < 1){
                commonUtil.confirm("소재지의 사업장(본사) 주요수행업무를 입력하지 않았습니다.</br> 이동하시겠습니까?", that.moveStepConfirm, that);
            }else{
                rtn = true;
            }

            that.makeData();
            if(rtn){
                that.insertCmpInfo(true); //탭별로 클릭 시 임시저장
                location.href = "#MENUSD0700SK/STEP2";
            }
            
        },
        moveStepConfirm : function(a, that){ 
            if(!a){
                return false;
            }

            that.insertCmpInfo(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP2";
        },
        moveStep3 : function(e){           
            e.preventDefault(); 
            var that = this;
            that.insertCmpInfo(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP3";
        },
        moveStep4 : function(e){
            e.preventDefault(); 
            var that = this;
            that.insertCmpInfo(true); //탭별로 클릭 시 임시저장
            location.href = "#MENUSD0700SK/STEP4";
        },
        checkCorp :  function (messYn){
        	var that = this;
        	that.chrgCorp();
        	if(messYn != 'N'){
        		if($("[name=corpChgYn]").is(":checked"))
        			alert("개인기업 설립일을 사업시작일자에 기재하고, 법인전환일을 법인시작일자에 기재하세요");
            }
        },
        chrgCorp : function(){
        	var that = this
        	if($("[name=corpChgYn]").is(":checked")){
       		 that.$el.find('[name=corpRegNo1]').attr("disabled", false);
                that.$el.find('[name=corpRegNo2]').attr("disabled", false);
                that.$el.find('.capHidden').show();
                $("[name=corpSymd]").closest("div").addClass("wrapper");
                $('[name=corpSymd]').addClass("inp-date");
                $('[name=corpSymd]').prop("disabled", false);
                $("[name=corpSymd]").closest("div").children("button").show();
               
           }else{
        	   var bznoGubun = that.$el.find('[name=bzno2]').val().substr(0,1);
        	   if(bznoGubun != '8'){
	            	that.$el.find('[name=corpRegNo1]').attr("disabled", true);
	               that.$el.find('[name=corpRegNo2]').attr("disabled", true);
	               that.$el.find('.capHidden').hide();
	               $('[name=corpSymd]').val("");
	            }else{
	        	   $("[name=corpSymd]").closest("div").children("button").hide();
	               $('[name=corpSymd]').removeClass("inp-date");
	               $("[name=corpSymd]").closest("div").removeClass("wrapper");
	               $('[name=corpSymd]').prop("disabled", true);
	               $('[name=corpSymd]').css("width", "100%");
	               
	            }
	            
           }
        },
        chgEymd : function(e){
        	var that = this;
        	var bznoGubun = that.$el.find('[name=bzno2]').val().substr(0,1);
     	   	if(bznoGubun == '8'){
        		$('[name=corpSymd]').val($('[name=eymd]').val());
        	}
        }
        

    });
    
    return SD_0710_VIEW;
});//end define
