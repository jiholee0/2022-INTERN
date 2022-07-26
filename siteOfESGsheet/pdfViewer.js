define(
[
    'common/config',
    'common/util',
    'text!views/sd/sd-0760sk-tpl.html'
],
function(
    commonConfig,
    commonUtil,
    tpl
) { 
    
    var pageId = '';
    var esgrptAnsr = [];

    var RS_0760_VIEW = Backbone.View.extend({
        
        tagName : 'section',
        events : {
            "click button[name=evlAp]" : "evlAp",
            "click button[name=docInfo]" : "docInfo",
            "click button[name=evlMng]" : "evlMng",
            "click .downloadPdfFromHTML" : "downloadPdfFromHTML",
            "click .printHtml" : "printHtml"

        }, 
        initialize : function(){
            var that = this;           
            that.$el.html(Handlebars.compile(tpl));
        },

        render : function(){
            var that = this;            
            that.initSession();           
            return that;
        },
        initSession : function(){
            var that = this;            
            var esgrptNo = commonUtil.getParameterByName("esgrpt");
            var requestParam = commonUtil.getBxmReqData( 
                '', '',
                {   
                    keyType : 'esgrptNo',
                    value : esgrptNo
                }
            );  
            that.setSession(requestParam);  

            //U : 수정 , R:복사하여 신규작성, C:신규작성
            var requestParamFlag = commonUtil.getBxmReqData( 
                '', '',
                {   
                    keyType : 'esgrptFlag',
                    value : 'R'
                }
            );
            that.setSession(requestParamFlag);
            that.selectEsgrpt();         
        }, 
        afterRender : function(){
            var that = this;
            that.openForm();
            return that;
        },
        selectEsgrpt : function(){
            var that = this;            
          
            // call service.    
            commonUtil.requestBxmAjax(commonUtil.getBxmReqData('', ''), {
                beforeSend: function(){
                },
                success: function(response) {
                    var esgrpt   = response.esgrpt;
                    
                    var esgrptCmpOtl = response.esgrptCmpOtl;
                    var esgrptWkpInfo = response.esgrptWkpInfo;
                    esgrptAnsr  = response.esgrptAnsr; 
                    
                    var esgrptDealStat = response.esgrptDealStat;
                    var esgrptYStat = response.esgrptYStat;
                    var esgrptCrtiStat = response.esgrptCrtiStat;
                     
                    var esgrptEmplStat = response.esgrptEmplStat;
                      
                    var tplfn = Handlebars.compile(commonUtil.getTemplate(tpl, "test"));
                    var dhtml = tplfn({esgrpt : esgrpt
                                    , esgrptCmpOtl : esgrptCmpOtl
                                    , esgrptWkpInfo : esgrptWkpInfo
                                    , esgrptAnsr : esgrptAnsr                             
                                    , esgrptYStat : esgrptYStat
                                    , esgrptCrtiStat : esgrptCrtiStat
                                    , esgrptEmplStat : esgrptEmplStat 

                                });
                    that.$el.find('#start').append(dhtml);
                   
                    // 답변
                    if(esgrptAnsr) {
                    	for(var i=0; i<esgrptAnsr.length; i++) {
                        	var qstCd = esgrptAnsr[i].qstCd.toLowerCase();

                    		if(qstCd =='env009' && esgrptAnsr[i].asrCd == '01') {
                    			that.$el.find("[name='"+qstCd+"']:input[value='"+esgrptAnsr[i].asrCd+"']").attr("disabled", false);
                        		that.$el.find("[name='"+qstCd+"']:input[value='"+esgrptAnsr[i].asrCd+"']").attr("checked", true);
                    			that.$el.find("[name='"+qstCd+"']").val(esgrptAnsr[i].asrCont);
                    		}else {
                    			that.$el.find("[name='"+qstCd+"']:input[value='"+esgrptAnsr[i].asrCd+"']").attr("disabled", false);
                        		that.$el.find("[name='"+qstCd+"']:input[value='"+esgrptAnsr[i].asrCd+"']").attr("checked", true);

                				if( qstCd == 'soc008_1_1' || qstCd == 'soc008_1_2' || qstCd == 'soc018_1_1' || qstCd == 'soc018_1_2' ||
                						qstCd == 'gov006_1_1' || qstCd == 'gov006_1_2' || qstCd == 'gov012_1_1' || qstCd == 'gov012_1_2') {
                					var text;
                					if(qstCd.split('_')[2]=='1'){
                						text = ['','연간수시','연 1회','분기 1회','반기 1회','월 1회'];
                					}else if(qstCd.split('_')[2]=='2'){
                						text = ['','협력사 및 전직원','정직원','일부직원'];
                					}
                					var number = parseInt(esgrptAnsr[i].asrCd);
                    				that.$el.find("[name='"+qstCd+"']").val(text[number]);
                				}else if(qstCd == 'gov010'){
                					var number = parseInt(esgrptAnsr[i].asrCd);
                					var text = ['','협력사 및 전직원','정직원','일부직원'];
                    				that.$el.find("[name='gov010_1']").val(text[number]);
                				}else if(qstCd == 'gov014') {
                					that.$el.find("[name='14_exTaxYear']").val(esgrptAnsr[i].asrCont);
                				}
                    		}
                    	}
                    }            
                    // 년도별현황
                    if(esgrptYStat.length > 0) {
                        for(var i=0; i<esgrptYStat.length; i++) {
                        	
                        		var qstCd = esgrptYStat[i].qstCd.toLowerCase();
                        		if(qstCd == 'soc022'){
                        			that.$el.find("[name='22_thrYAgo']").val(esgrptYStat[i].thrYAgo);    
                                    that.$el.find("[name='22_twoYAgo']").val(esgrptYStat[i].twoYAgo);
                                    that.$el.find("[name='22_oneYAgo']").val(esgrptYStat[i].oneYAgo);
                        		}
                        		
                        		var value = that.$el.find("[name='"+qstCd.split('_')[0]+"']:checked").val();
                        		var tail = "";
                            	var num = qstCd.replace('env0','').split('_')[0]; // 문항 번호
                            	if(qstCd.replace('env0','').includes('_')){
                            		tail = '_'+ qstCd.replace('env0','').split('_')[1];
                            	}
                            	if(qstCd == 'env010_3'){
                            		that.$el.find("[name='"+num+"_thrYAgo"+value+tail+"']").val(esgrptYStat[i].thrYAgo == 'Y'? '그렇다' : '그렇지 않다');    
                                    that.$el.find("[name='"+num+"_twoYAgo"+value+tail+"']").val(esgrptYStat[i].twoYAgo == 'Y'? '그렇다' : '그렇지 않다');
                                    that.$el.find("[name='"+num+"_oneYAgo"+value+tail+"']").val(esgrptYStat[i].oneYAgo == 'Y'? '그렇다' : '그렇지 않다');
                        		}else{
                        		that.$el.find("[name='"+num+"_thrYAgo"+value+tail+"']").val(esgrptYStat[i].thrYAgo);    
                                that.$el.find("[name='"+num+"_twoYAgo"+value+tail+"']").val(esgrptYStat[i].twoYAgo);
                                that.$el.find("[name='"+num+"_oneYAgo"+value+tail+"']").val(esgrptYStat[i].oneYAgo);
                        		}
                        	
                        }
                    }
                }
            },false);

            that.$el.find('.moneyinput').mask("999,999,999,999",{reverse:true});
            that.$el.find('.dateinput').mask("9999-99-99");
            that.$el.find('.bznoinput').mask("999-99-99999");
            that.$el.find('.corpinput').mask("999999-9999999");

			// 20180516 추가.
            that.$el.find('.pointNumber').mask("999999999.999",{reverse:false});
            $('[name=bizCnts]').css('height',$('[name=bizCnts]').prop('scrollHeight'));
        },
        setSession : function(requestParam){
            
            commonUtil.requestBxmAjax(requestParam, {
                
            success:  function(response) {  
                
                if(response.returnCode == '100'){
                    var sKey= response.sValue;
                                    
                }else{
                    commonUtil.alert("에러가 발생했습니다. 잠시후 다시시도해주세요.");     
                    return;
                }                           
                },error : function(e){
                    commonUtil.alert("에러가 발생했습니다. 잠시후 다시시도해주세요.");       
                    return false;                             
                }
            },false);
        },
        downloadPdfFromHTML : function(e){
            var that = this;

            that.$el.find('.pdfbtn').hide();
            $(".loading").show();

            e.preventDefault();
            html2canvas(that.$el.find('#start'), {
                background :'#FFFFFF',	//흰 배경을 사용
                onrendered: function(canvas) {
                    var imgData = canvas.toDataURL('image/jpeg');  

                    var imgWidth = 210;
                    var pageHeight = imgWidth * 1.414;
                    var imgHeight = canvas.height * imgWidth / canvas.width;
                    var heightLeft = imgHeight;

                    var doc = new jsPDF('p','mm');
                    var position = 0;

                    doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    while(heightLeft >= 20){
                        position = heightLeft - imgHeight;
                        doc.addPage();
                        doc.addImage(imgData,'jpeg', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }
                	doc.save('ESGRPT.pdf');
                	$(".loading").hide();
                }
            });
            
            //$(".loading").hide();
            that.$el.find('.pdfbtn').show();
        },
        printHtml : function(e){
            var that = this;
            that.$el.find('.pdfbtn').hide();
            var makeHtml = that.$el.find('#start').html();
            
            window.print();
            that.$el.find('.pdfbtn').show();
        },
        openForm : function(){
            var that = this;
        	if(esgrptAnsr) {
            	for(var i=0; i<esgrptAnsr.length; i++) {
            		$('#'+esgrptAnsr[i].qstCd.toLowerCase()+'_form_'+esgrptAnsr[i].asrCd).css("display", "");
            	}        		
        	}
        }
      
    });
    
    return RS_0760_VIEW;
});//end define
