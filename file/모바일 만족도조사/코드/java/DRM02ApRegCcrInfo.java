/**
 * DBIO 에디터에서 생성된 파일입니다. 인터페이스 파일을 직접 수정하지 마십시오.
 * @Generated Fri Sep 02 16:39:22 KST 2022
 */
package nice.em.rm01.online.dbio;

		import bxm.common.annotaion.BxmCategory;
		import bxm.container.annotation.BxmDataAccess;
		import org.apache.ibatis.annotations.Param;


@SuppressWarnings({ "all" })
@BxmDataAccess(mapper = "nice/em/rm01/online/dbio/DRM02ApRegCcrInfo.dbio", datasource = "MainDS")
@BxmCategory(logicalName = "평가관리-평가결과조회", description = "평가결과조회")
public interface DRM02ApRegCcrInfo
{
	/**
	 * 평가관리-설문조사 등록 및 수정
	 * @TestValues 	apNo=;	apSvcGbcd=;	dtlSeq=;	qstnrYmd=;	qustn1Yn=;	qustn1Cnts=;	qustn2Yn=;	qustn2Cnts=;	qustn3Yn=;	qustn3Cnts=;	modiId=;	modiDt=;	fstRegId=;	fstRegDt=;	rsptNm=;	rsptTel=;	rspnsStatCd=;	qstr1=;	qstr2=;	qstr3=;	qstr4=;	qstr5=;	qstr6=;	qstr7=;	qstr8=;	qstr9=;	qstr10=;	qstr11=;	optQstr1No=;	optQstr1=;	optQstr2=;	giftAyn=;	connGb=;
	 */
	@BxmCategory(logicalName = "평가관리-설문조사 등록 및 수정", description = "평가관리-설문조사 등록 및 수정")
	int insertApPubQstnr(nice.em.rm01.online.service.dto.SRM01ApPubQstnrInDto sRM01ApPubQstnrInDto);

}