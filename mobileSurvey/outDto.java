 /* Bxm Object Message Mapping(OMM) */
   
import bxm.omm.root.IOmmObject;
import com.fasterxml.jackson.annotation.JsonProperty;
import bxm.omm.predict.FieldInfo;
import javax.xml.bind.annotation.XmlType;
import bxm.omm.annotation.BxmOmm_Field;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlRootElement;
import bxm.omm.predict.Predictable;
import java.util.Hashtable;
import javax.xml.bind.annotation.XmlElement;

/**
 * @Description 평가관리-설문조사
 */
@XmlType(propOrder={"apNo", "apSvcGbcd", "dtlSeq", "qstnrYmd", "qustn1Yn", "qustn1Cnts", "qustn2Yn", "qustn2Cnts", "qustn3Yn", "qustn3Cnts", "modiId", "modiDt", "fstRegId", "fstRegDt", "rsptNm", "rsptTel", "rspnsStatCd", "qstr1", "qstr2", "qstr3", "qstr4", "qstr5", "qstr6", "qstr7", "qstr8", "qstr9", "qstr10", "qstr11", "optQstr1", "optQstr2", "giftAyn", "connGb"}, name="DRM02ApPubQstnrOutDto")
@XmlRootElement(name="DRM02ApPubQstnrOutDto")
@SuppressWarnings("all")
public class DRM02ApPubQstnrOutDto  implements IOmmObject, Predictable, FieldInfo  {

	private static final long serialVersionUID = -256087553L;

	@XmlTransient
	public static final String OMM_DESCRIPTION = "평가관리-설문조사";

	/*******************************************************************************************************************************
	* Property set << apNo >> [[ */
	
	@XmlTransient
	private boolean isSet_apNo = false;
	
	protected boolean isSet_apNo()
	{
		return this.isSet_apNo;
	}
	
	protected void setIsSet_apNo(boolean value)
	{
		this.isSet_apNo = value;
	}
	
	/**
	 * java.math.BigDecimal - String value setter
	 * @Description 신청번호
	 */
	public void setApNo(java.lang.String value) {
		isSet_apNo = true;
		this.apNo = new java.math.BigDecimal(value);
	}
	/**
	 * java.math.BigDecimal - Double value setter
	 * @Description 신청번호
	 */
	public void setApNo(double value) {
		isSet_apNo = true;
		this.apNo = java.math.BigDecimal.valueOf(value);
	}
	/**
	 * java.math.BigDecimal - Long value setter
	 * @Description 신청번호
	 */
	public void setApNo(long value) {
		isSet_apNo = true;
		this.apNo = java.math.BigDecimal.valueOf(value);
	}
	
	@BxmOmm_Field(referenceType="reference", description="신청번호", formatType="", format="", align="right", length=10, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.math.BigDecimal apNo  = new java.math.BigDecimal("0.0");
	
	/**
	 * @Description 신청번호
	 */
	public java.math.BigDecimal getApNo(){
		return apNo;
	}
	
	/**
	 * @Description 신청번호
	 */
	@JsonProperty("apNo")
	public void setApNo( java.math.BigDecimal apNo ) {
		isSet_apNo = true;
		this.apNo = apNo;
	}
	
	/** Property set << apNo >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << apSvcGbcd >> [[ */
	
	@XmlTransient
	private boolean isSet_apSvcGbcd = false;
	
	protected boolean isSet_apSvcGbcd()
	{
		return this.isSet_apSvcGbcd;
	}
	
	protected void setIsSet_apSvcGbcd(boolean value)
	{
		this.isSet_apSvcGbcd = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="신청서비스구분코드", formatType="", format="", align="left", length=4, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String apSvcGbcd  = null;
	
	/**
	 * @Description 신청서비스구분코드
	 */
	public java.lang.String getApSvcGbcd(){
		return apSvcGbcd;
	}
	
	/**
	 * @Description 신청서비스구분코드
	 */
	@JsonProperty("apSvcGbcd")
	public void setApSvcGbcd( java.lang.String apSvcGbcd ) {
		isSet_apSvcGbcd = true;
		this.apSvcGbcd = apSvcGbcd;
	}
	
	/** Property set << apSvcGbcd >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << dtlSeq >> [[ */
	
	@XmlTransient
	private boolean isSet_dtlSeq = false;
	
	protected boolean isSet_dtlSeq()
	{
		return this.isSet_dtlSeq;
	}
	
	protected void setIsSet_dtlSeq(boolean value)
	{
		this.isSet_dtlSeq = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="상세순번", formatType="", format="", align="left", length=5, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String dtlSeq  = null;
	
	/**
	 * @Description 상세순번
	 */
	public java.lang.String getDtlSeq(){
		return dtlSeq;
	}
	
	/**
	 * @Description 상세순번
	 */
	@JsonProperty("dtlSeq")
	public void setDtlSeq( java.lang.String dtlSeq ) {
		isSet_dtlSeq = true;
		this.dtlSeq = dtlSeq;
	}
	
	/** Property set << dtlSeq >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstnrYmd >> [[ */
	
	@XmlTransient
	private boolean isSet_qstnrYmd = false;
	
	protected boolean isSet_qstnrYmd()
	{
		return this.isSet_qstnrYmd;
	}
	
	protected void setIsSet_qstnrYmd(boolean value)
	{
		this.isSet_qstnrYmd = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="설문일자", formatType="", format="", align="left", length=8, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstnrYmd  = null;
	
	/**
	 * @Description 설문일자
	 */
	public java.lang.String getQstnrYmd(){
		return qstnrYmd;
	}
	
	/**
	 * @Description 설문일자
	 */
	@JsonProperty("qstnrYmd")
	public void setQstnrYmd( java.lang.String qstnrYmd ) {
		isSet_qstnrYmd = true;
		this.qstnrYmd = qstnrYmd;
	}
	
	/** Property set << qstnrYmd >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qustn1Yn >> [[ */
	
	@XmlTransient
	private boolean isSet_qustn1Yn = false;
	
	protected boolean isSet_qustn1Yn()
	{
		return this.isSet_qustn1Yn;
	}
	
	protected void setIsSet_qustn1Yn(boolean value)
	{
		this.isSet_qustn1Yn = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문1여부", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qustn1Yn  = null;
	
	/**
	 * @Description 질문1여부
	 */
	public java.lang.String getQustn1Yn(){
		return qustn1Yn;
	}
	
	/**
	 * @Description 질문1여부
	 */
	@JsonProperty("qustn1Yn")
	public void setQustn1Yn( java.lang.String qustn1Yn ) {
		isSet_qustn1Yn = true;
		this.qustn1Yn = qustn1Yn;
	}
	
	/** Property set << qustn1Yn >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qustn1Cnts >> [[ */
	
	@XmlTransient
	private boolean isSet_qustn1Cnts = false;
	
	protected boolean isSet_qustn1Cnts()
	{
		return this.isSet_qustn1Cnts;
	}
	
	protected void setIsSet_qustn1Cnts(boolean value)
	{
		this.isSet_qustn1Cnts = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문1내용", formatType="", format="", align="left", length=500, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qustn1Cnts  = null;
	
	/**
	 * @Description 질문1내용
	 */
	public java.lang.String getQustn1Cnts(){
		return qustn1Cnts;
	}
	
	/**
	 * @Description 질문1내용
	 */
	@JsonProperty("qustn1Cnts")
	public void setQustn1Cnts( java.lang.String qustn1Cnts ) {
		isSet_qustn1Cnts = true;
		this.qustn1Cnts = qustn1Cnts;
	}
	
	/** Property set << qustn1Cnts >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qustn2Yn >> [[ */
	
	@XmlTransient
	private boolean isSet_qustn2Yn = false;
	
	protected boolean isSet_qustn2Yn()
	{
		return this.isSet_qustn2Yn;
	}
	
	protected void setIsSet_qustn2Yn(boolean value)
	{
		this.isSet_qustn2Yn = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문2여부", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qustn2Yn  = null;
	
	/**
	 * @Description 질문2여부
	 */
	public java.lang.String getQustn2Yn(){
		return qustn2Yn;
	}
	
	/**
	 * @Description 질문2여부
	 */
	@JsonProperty("qustn2Yn")
	public void setQustn2Yn( java.lang.String qustn2Yn ) {
		isSet_qustn2Yn = true;
		this.qustn2Yn = qustn2Yn;
	}
	
	/** Property set << qustn2Yn >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qustn2Cnts >> [[ */
	
	@XmlTransient
	private boolean isSet_qustn2Cnts = false;
	
	protected boolean isSet_qustn2Cnts()
	{
		return this.isSet_qustn2Cnts;
	}
	
	protected void setIsSet_qustn2Cnts(boolean value)
	{
		this.isSet_qustn2Cnts = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문2내용", formatType="", format="", align="left", length=500, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qustn2Cnts  = null;
	
	/**
	 * @Description 질문2내용
	 */
	public java.lang.String getQustn2Cnts(){
		return qustn2Cnts;
	}
	
	/**
	 * @Description 질문2내용
	 */
	@JsonProperty("qustn2Cnts")
	public void setQustn2Cnts( java.lang.String qustn2Cnts ) {
		isSet_qustn2Cnts = true;
		this.qustn2Cnts = qustn2Cnts;
	}
	
	/** Property set << qustn2Cnts >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qustn3Yn >> [[ */
	
	@XmlTransient
	private boolean isSet_qustn3Yn = false;
	
	protected boolean isSet_qustn3Yn()
	{
		return this.isSet_qustn3Yn;
	}
	
	protected void setIsSet_qustn3Yn(boolean value)
	{
		this.isSet_qustn3Yn = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문3여부", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qustn3Yn  = null;
	
	/**
	 * @Description 질문3여부
	 */
	public java.lang.String getQustn3Yn(){
		return qustn3Yn;
	}
	
	/**
	 * @Description 질문3여부
	 */
	@JsonProperty("qustn3Yn")
	public void setQustn3Yn( java.lang.String qustn3Yn ) {
		isSet_qustn3Yn = true;
		this.qustn3Yn = qustn3Yn;
	}
	
	/** Property set << qustn3Yn >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qustn3Cnts >> [[ */
	
	@XmlTransient
	private boolean isSet_qustn3Cnts = false;
	
	protected boolean isSet_qustn3Cnts()
	{
		return this.isSet_qustn3Cnts;
	}
	
	protected void setIsSet_qustn3Cnts(boolean value)
	{
		this.isSet_qustn3Cnts = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문3내용", formatType="", format="", align="left", length=500, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qustn3Cnts  = null;
	
	/**
	 * @Description 질문3내용
	 */
	public java.lang.String getQustn3Cnts(){
		return qustn3Cnts;
	}
	
	/**
	 * @Description 질문3내용
	 */
	@JsonProperty("qustn3Cnts")
	public void setQustn3Cnts( java.lang.String qustn3Cnts ) {
		isSet_qustn3Cnts = true;
		this.qustn3Cnts = qustn3Cnts;
	}
	
	/** Property set << qustn3Cnts >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << modiId >> [[ */
	
	@XmlTransient
	private boolean isSet_modiId = false;
	
	protected boolean isSet_modiId()
	{
		return this.isSet_modiId;
	}
	
	protected void setIsSet_modiId(boolean value)
	{
		this.isSet_modiId = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="수정자ID", formatType="", format="", align="left", length=16, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String modiId  = null;
	
	/**
	 * @Description 수정자ID
	 */
	public java.lang.String getModiId(){
		return modiId;
	}
	
	/**
	 * @Description 수정자ID
	 */
	@JsonProperty("modiId")
	public void setModiId( java.lang.String modiId ) {
		isSet_modiId = true;
		this.modiId = modiId;
	}
	
	/** Property set << modiId >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << modiDt >> [[ */
	
	@XmlTransient
	private boolean isSet_modiDt = false;
	
	protected boolean isSet_modiDt()
	{
		return this.isSet_modiDt;
	}
	
	protected void setIsSet_modiDt(boolean value)
	{
		this.isSet_modiDt = value;
	}
	
	public void setModiDt(java.lang.String dateString)
	{
		isSet_modiDt = true;
		if ( modiDt == null ){
			modiDt = new bxm.omm.format.wrapper.DateFormattedWrapper("yyyyMMdd HH:mm:ss", dateString);
		}
		else modiDt.setFormattedText(dateString);
	
	}
	
	
	
	@XmlElement(name="modiDt")
	@BxmOmm_Field(referenceType="reference", description="수정일시", formatType="date", format="yyyyMMdd HH:mm:ss", align="left", length=7, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private bxm.omm.format.wrapper.DateFormattedWrapper modiDt  = null;
	@XmlTransient
	/**
	 * @Description 수정일시
	 */
	public java.util.Date getModiDt(){
		if ( modiDt == null ) return null;
		else return modiDt.getDate();
	}
	
	/**
	 * @Description 수정일시
	 */
	@JsonProperty("modiDt")
	public void setModiDt(java.util.Date date) {
		isSet_modiDt = true;
		if ( date == null ){
			modiDt = null;
		}
		else{
			if ( modiDt == null ){
				modiDt = new bxm.omm.format.wrapper.DateFormattedWrapper("yyyyMMdd HH:mm:ss", date);
			}
			else modiDt.setDate(date);
		}
	}
	
	/** Property set << modiDt >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << fstRegId >> [[ */
	
	@XmlTransient
	private boolean isSet_fstRegId = false;
	
	protected boolean isSet_fstRegId()
	{
		return this.isSet_fstRegId;
	}
	
	protected void setIsSet_fstRegId(boolean value)
	{
		this.isSet_fstRegId = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="최초등록자ID", formatType="", format="", align="left", length=16, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String fstRegId  = null;
	
	/**
	 * @Description 최초등록자ID
	 */
	public java.lang.String getFstRegId(){
		return fstRegId;
	}
	
	/**
	 * @Description 최초등록자ID
	 */
	@JsonProperty("fstRegId")
	public void setFstRegId( java.lang.String fstRegId ) {
		isSet_fstRegId = true;
		this.fstRegId = fstRegId;
	}
	
	/** Property set << fstRegId >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << fstRegDt >> [[ */
	
	@XmlTransient
	private boolean isSet_fstRegDt = false;
	
	protected boolean isSet_fstRegDt()
	{
		return this.isSet_fstRegDt;
	}
	
	protected void setIsSet_fstRegDt(boolean value)
	{
		this.isSet_fstRegDt = value;
	}
	
	public void setFstRegDt(java.lang.String dateString)
	{
		isSet_fstRegDt = true;
		if ( fstRegDt == null ){
			fstRegDt = new bxm.omm.format.wrapper.DateFormattedWrapper("yyyyMMdd HH:mm:ss", dateString);
		}
		else fstRegDt.setFormattedText(dateString);
	
	}
	
	
	
	@XmlElement(name="fstRegDt")
	@BxmOmm_Field(referenceType="reference", description="최초등록일시", formatType="date", format="yyyyMMdd HH:mm:ss", align="left", length=7, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private bxm.omm.format.wrapper.DateFormattedWrapper fstRegDt  = null;
	@XmlTransient
	/**
	 * @Description 최초등록일시
	 */
	public java.util.Date getFstRegDt(){
		if ( fstRegDt == null ) return null;
		else return fstRegDt.getDate();
	}
	
	/**
	 * @Description 최초등록일시
	 */
	@JsonProperty("fstRegDt")
	public void setFstRegDt(java.util.Date date) {
		isSet_fstRegDt = true;
		if ( date == null ){
			fstRegDt = null;
		}
		else{
			if ( fstRegDt == null ){
				fstRegDt = new bxm.omm.format.wrapper.DateFormattedWrapper("yyyyMMdd HH:mm:ss", date);
			}
			else fstRegDt.setDate(date);
		}
	}
	
	/** Property set << fstRegDt >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << rsptNm >> [[ */
	
	@XmlTransient
	private boolean isSet_rsptNm = false;
	
	protected boolean isSet_rsptNm()
	{
		return this.isSet_rsptNm;
	}
	
	protected void setIsSet_rsptNm(boolean value)
	{
		this.isSet_rsptNm = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="응답자명", formatType="", format="", align="left", length=50, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String rsptNm  = null;
	
	/**
	 * @Description 응답자명
	 */
	public java.lang.String getRsptNm(){
		return rsptNm;
	}
	
	/**
	 * @Description 응답자명
	 */
	@JsonProperty("rsptNm")
	public void setRsptNm( java.lang.String rsptNm ) {
		isSet_rsptNm = true;
		this.rsptNm = rsptNm;
	}
	
	/** Property set << rsptNm >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << rsptTel >> [[ */
	
	@XmlTransient
	private boolean isSet_rsptTel = false;
	
	protected boolean isSet_rsptTel()
	{
		return this.isSet_rsptTel;
	}
	
	protected void setIsSet_rsptTel(boolean value)
	{
		this.isSet_rsptTel = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="응답자전화번호", formatType="", format="", align="left", length=16, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String rsptTel  = null;
	
	/**
	 * @Description 응답자전화번호
	 */
	public java.lang.String getRsptTel(){
		return rsptTel;
	}
	
	/**
	 * @Description 응답자전화번호
	 */
	@JsonProperty("rsptTel")
	public void setRsptTel( java.lang.String rsptTel ) {
		isSet_rsptTel = true;
		this.rsptTel = rsptTel;
	}
	
	/** Property set << rsptTel >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << rspnsStatCd >> [[ */
	
	@XmlTransient
	private boolean isSet_rspnsStatCd = false;
	
	protected boolean isSet_rspnsStatCd()
	{
		return this.isSet_rspnsStatCd;
	}
	
	protected void setIsSet_rspnsStatCd(boolean value)
	{
		this.isSet_rspnsStatCd = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="응답상태코드", formatType="", format="", align="left", length=20, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String rspnsStatCd  = null;
	
	/**
	 * @Description 응답상태코드
	 */
	public java.lang.String getRspnsStatCd(){
		return rspnsStatCd;
	}
	
	/**
	 * @Description 응답상태코드
	 */
	@JsonProperty("rspnsStatCd")
	public void setRspnsStatCd( java.lang.String rspnsStatCd ) {
		isSet_rspnsStatCd = true;
		this.rspnsStatCd = rspnsStatCd;
	}
	
	/** Property set << rspnsStatCd >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr1 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr1 = false;
	
	protected boolean isSet_qstr1()
	{
		return this.isSet_qstr1;
	}
	
	protected void setIsSet_qstr1(boolean value)
	{
		this.isSet_qstr1 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문1", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr1  = null;
	
	/**
	 * @Description 질문1
	 */
	public java.lang.String getQstr1(){
		return qstr1;
	}
	
	/**
	 * @Description 질문1
	 */
	@JsonProperty("qstr1")
	public void setQstr1( java.lang.String qstr1 ) {
		isSet_qstr1 = true;
		this.qstr1 = qstr1;
	}
	
	/** Property set << qstr1 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr2 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr2 = false;
	
	protected boolean isSet_qstr2()
	{
		return this.isSet_qstr2;
	}
	
	protected void setIsSet_qstr2(boolean value)
	{
		this.isSet_qstr2 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문2", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr2  = null;
	
	/**
	 * @Description 질문2
	 */
	public java.lang.String getQstr2(){
		return qstr2;
	}
	
	/**
	 * @Description 질문2
	 */
	@JsonProperty("qstr2")
	public void setQstr2( java.lang.String qstr2 ) {
		isSet_qstr2 = true;
		this.qstr2 = qstr2;
	}
	
	/** Property set << qstr2 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr3 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr3 = false;
	
	protected boolean isSet_qstr3()
	{
		return this.isSet_qstr3;
	}
	
	protected void setIsSet_qstr3(boolean value)
	{
		this.isSet_qstr3 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문3", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr3  = null;
	
	/**
	 * @Description 질문3
	 */
	public java.lang.String getQstr3(){
		return qstr3;
	}
	
	/**
	 * @Description 질문3
	 */
	@JsonProperty("qstr3")
	public void setQstr3( java.lang.String qstr3 ) {
		isSet_qstr3 = true;
		this.qstr3 = qstr3;
	}
	
	/** Property set << qstr3 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr4 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr4 = false;
	
	protected boolean isSet_qstr4()
	{
		return this.isSet_qstr4;
	}
	
	protected void setIsSet_qstr4(boolean value)
	{
		this.isSet_qstr4 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문4", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr4  = null;
	
	/**
	 * @Description 질문4
	 */
	public java.lang.String getQstr4(){
		return qstr4;
	}
	
	/**
	 * @Description 질문4
	 */
	@JsonProperty("qstr4")
	public void setQstr4( java.lang.String qstr4 ) {
		isSet_qstr4 = true;
		this.qstr4 = qstr4;
	}
	
	/** Property set << qstr4 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr5 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr5 = false;
	
	protected boolean isSet_qstr5()
	{
		return this.isSet_qstr5;
	}
	
	protected void setIsSet_qstr5(boolean value)
	{
		this.isSet_qstr5 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문5", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr5  = null;
	
	/**
	 * @Description 질문5
	 */
	public java.lang.String getQstr5(){
		return qstr5;
	}
	
	/**
	 * @Description 질문5
	 */
	@JsonProperty("qstr5")
	public void setQstr5( java.lang.String qstr5 ) {
		isSet_qstr5 = true;
		this.qstr5 = qstr5;
	}
	
	/** Property set << qstr5 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr6 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr6 = false;
	
	protected boolean isSet_qstr6()
	{
		return this.isSet_qstr6;
	}
	
	protected void setIsSet_qstr6(boolean value)
	{
		this.isSet_qstr6 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문6", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr6  = null;
	
	/**
	 * @Description 질문6
	 */
	public java.lang.String getQstr6(){
		return qstr6;
	}
	
	/**
	 * @Description 질문6
	 */
	@JsonProperty("qstr6")
	public void setQstr6( java.lang.String qstr6 ) {
		isSet_qstr6 = true;
		this.qstr6 = qstr6;
	}
	
	/** Property set << qstr6 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr7 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr7 = false;
	
	protected boolean isSet_qstr7()
	{
		return this.isSet_qstr7;
	}
	
	protected void setIsSet_qstr7(boolean value)
	{
		this.isSet_qstr7 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문7", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr7  = null;
	
	/**
	 * @Description 질문7
	 */
	public java.lang.String getQstr7(){
		return qstr7;
	}
	
	/**
	 * @Description 질문7
	 */
	@JsonProperty("qstr7")
	public void setQstr7( java.lang.String qstr7 ) {
		isSet_qstr7 = true;
		this.qstr7 = qstr7;
	}
	
	/** Property set << qstr7 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr8 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr8 = false;
	
	protected boolean isSet_qstr8()
	{
		return this.isSet_qstr8;
	}
	
	protected void setIsSet_qstr8(boolean value)
	{
		this.isSet_qstr8 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문8", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr8  = null;
	
	/**
	 * @Description 질문8
	 */
	public java.lang.String getQstr8(){
		return qstr8;
	}
	
	/**
	 * @Description 질문8
	 */
	@JsonProperty("qstr8")
	public void setQstr8( java.lang.String qstr8 ) {
		isSet_qstr8 = true;
		this.qstr8 = qstr8;
	}
	
	/** Property set << qstr8 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr9 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr9 = false;
	
	protected boolean isSet_qstr9()
	{
		return this.isSet_qstr9;
	}
	
	protected void setIsSet_qstr9(boolean value)
	{
		this.isSet_qstr9 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문9", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr9  = null;
	
	/**
	 * @Description 질문9
	 */
	public java.lang.String getQstr9(){
		return qstr9;
	}
	
	/**
	 * @Description 질문9
	 */
	@JsonProperty("qstr9")
	public void setQstr9( java.lang.String qstr9 ) {
		isSet_qstr9 = true;
		this.qstr9 = qstr9;
	}
	
	/** Property set << qstr9 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr10 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr10 = false;
	
	protected boolean isSet_qstr10()
	{
		return this.isSet_qstr10;
	}
	
	protected void setIsSet_qstr10(boolean value)
	{
		this.isSet_qstr10 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문10", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr10  = null;
	
	/**
	 * @Description 질문10
	 */
	public java.lang.String getQstr10(){
		return qstr10;
	}
	
	/**
	 * @Description 질문10
	 */
	@JsonProperty("qstr10")
	public void setQstr10( java.lang.String qstr10 ) {
		isSet_qstr10 = true;
		this.qstr10 = qstr10;
	}
	
	/** Property set << qstr10 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << qstr11 >> [[ */
	
	@XmlTransient
	private boolean isSet_qstr11 = false;
	
	protected boolean isSet_qstr11()
	{
		return this.isSet_qstr11;
	}
	
	protected void setIsSet_qstr11(boolean value)
	{
		this.isSet_qstr11 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="질문11", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String qstr11  = null;
	
	/**
	 * @Description 질문11
	 */
	public java.lang.String getQstr11(){
		return qstr11;
	}
	
	/**
	 * @Description 질문11
	 */
	@JsonProperty("qstr11")
	public void setQstr11( java.lang.String qstr11 ) {
		isSet_qstr11 = true;
		this.qstr11 = qstr11;
	}
	
	/** Property set << qstr11 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << optQstr1 >> [[ */
	
	@XmlTransient
	private boolean isSet_optQstr1 = false;
	
	protected boolean isSet_optQstr1()
	{
		return this.isSet_optQstr1;
	}
	
	protected void setIsSet_optQstr1(boolean value)
	{
		this.isSet_optQstr1 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="선택문항1", formatType="", format="", align="left", length=500, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String optQstr1  = null;
	
	/**
	 * @Description 선택문항1
	 */
	public java.lang.String getOptQstr1(){
		return optQstr1;
	}
	
	/**
	 * @Description 선택문항1
	 */
	@JsonProperty("optQstr1")
	public void setOptQstr1( java.lang.String optQstr1 ) {
		isSet_optQstr1 = true;
		this.optQstr1 = optQstr1;
	}
	
	/** Property set << optQstr1 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << optQstr2 >> [[ */
	
	@XmlTransient
	private boolean isSet_optQstr2 = false;
	
	protected boolean isSet_optQstr2()
	{
		return this.isSet_optQstr2;
	}
	
	protected void setIsSet_optQstr2(boolean value)
	{
		this.isSet_optQstr2 = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="선택문항2", formatType="", format="", align="left", length=500, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String optQstr2  = null;
	
	/**
	 * @Description 선택문항2
	 */
	public java.lang.String getOptQstr2(){
		return optQstr2;
	}
	
	/**
	 * @Description 선택문항2
	 */
	@JsonProperty("optQstr2")
	public void setOptQstr2( java.lang.String optQstr2 ) {
		isSet_optQstr2 = true;
		this.optQstr2 = optQstr2;
	}
	
	/** Property set << optQstr2 >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << giftAyn >> [[ */
	
	@XmlTransient
	private boolean isSet_giftAyn = false;
	
	protected boolean isSet_giftAyn()
	{
		return this.isSet_giftAyn;
	}
	
	protected void setIsSet_giftAyn(boolean value)
	{
		this.isSet_giftAyn = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="사은품약관동의", formatType="", format="", align="left", length=1, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String giftAyn  = null;
	
	/**
	 * @Description 사은품약관동의
	 */
	public java.lang.String getGiftAyn(){
		return giftAyn;
	}
	
	/**
	 * @Description 사은품약관동의
	 */
	@JsonProperty("giftAyn")
	public void setGiftAyn( java.lang.String giftAyn ) {
		isSet_giftAyn = true;
		this.giftAyn = giftAyn;
	}
	
	/** Property set << giftAyn >> ]]
	*******************************************************************************************************************************/
	/*******************************************************************************************************************************
	* Property set << connGb >> [[ */
	
	@XmlTransient
	private boolean isSet_connGb = false;
	
	protected boolean isSet_connGb()
	{
		return this.isSet_connGb;
	}
	
	protected void setIsSet_connGb(boolean value)
	{
		this.isSet_connGb = value;
	}
	
	
	@BxmOmm_Field(referenceType="reference", description="접속구분", formatType="", format="", align="left", length=2, decimal=0, arrayReference="", fill="", comment="", validationRule="")
	private java.lang.String connGb  = null;
	
	/**
	 * @Description 접속구분
	 */
	public java.lang.String getConnGb(){
		return connGb;
	}
	
	/**
	 * @Description 접속구분
	 */
	@JsonProperty("connGb")
	public void setConnGb( java.lang.String connGb ) {
		isSet_connGb = true;
		this.connGb = connGb;
	}
	
	/** Property set << connGb >> ]]
	*******************************************************************************************************************************/

	@Override
	public DRM02ApPubQstnrOutDto clone(){
		try{
			DRM02ApPubQstnrOutDto object= (DRM02ApPubQstnrOutDto)super.clone();
			if ( this.apNo== null ) object.apNo = null;
			else{
				object.apNo = new java.math.BigDecimal(apNo.toString());
			}
			if ( this.apSvcGbcd== null ) object.apSvcGbcd = null;
			else{
				object.apSvcGbcd = this.apSvcGbcd;
			}
			if ( this.dtlSeq== null ) object.dtlSeq = null;
			else{
				object.dtlSeq = this.dtlSeq;
			}
			if ( this.qstnrYmd== null ) object.qstnrYmd = null;
			else{
				object.qstnrYmd = this.qstnrYmd;
			}
			if ( this.qustn1Yn== null ) object.qustn1Yn = null;
			else{
				object.qustn1Yn = this.qustn1Yn;
			}
			if ( this.qustn1Cnts== null ) object.qustn1Cnts = null;
			else{
				object.qustn1Cnts = this.qustn1Cnts;
			}
			if ( this.qustn2Yn== null ) object.qustn2Yn = null;
			else{
				object.qustn2Yn = this.qustn2Yn;
			}
			if ( this.qustn2Cnts== null ) object.qustn2Cnts = null;
			else{
				object.qustn2Cnts = this.qustn2Cnts;
			}
			if ( this.qustn3Yn== null ) object.qustn3Yn = null;
			else{
				object.qustn3Yn = this.qustn3Yn;
			}
			if ( this.qustn3Cnts== null ) object.qustn3Cnts = null;
			else{
				object.qustn3Cnts = this.qustn3Cnts;
			}
			if ( this.modiId== null ) object.modiId = null;
			else{
				object.modiId = this.modiId;
			}
			if ( this.modiDt== null ) object.modiDt = null;
			else{
				object.modiDt = (bxm.omm.format.wrapper.DateFormattedWrapper)this.modiDt.clone();
			}
			if ( this.fstRegId== null ) object.fstRegId = null;
			else{
				object.fstRegId = this.fstRegId;
			}
			if ( this.fstRegDt== null ) object.fstRegDt = null;
			else{
				object.fstRegDt = (bxm.omm.format.wrapper.DateFormattedWrapper)this.fstRegDt.clone();
			}
			if ( this.rsptNm== null ) object.rsptNm = null;
			else{
				object.rsptNm = this.rsptNm;
			}
			if ( this.rsptTel== null ) object.rsptTel = null;
			else{
				object.rsptTel = this.rsptTel;
			}
			if ( this.rspnsStatCd== null ) object.rspnsStatCd = null;
			else{
				object.rspnsStatCd = this.rspnsStatCd;
			}
			if ( this.qstr1== null ) object.qstr1 = null;
			else{
				object.qstr1 = this.qstr1;
			}
			if ( this.qstr2== null ) object.qstr2 = null;
			else{
				object.qstr2 = this.qstr2;
			}
			if ( this.qstr3== null ) object.qstr3 = null;
			else{
				object.qstr3 = this.qstr3;
			}
			if ( this.qstr4== null ) object.qstr4 = null;
			else{
				object.qstr4 = this.qstr4;
			}
			if ( this.qstr5== null ) object.qstr5 = null;
			else{
				object.qstr5 = this.qstr5;
			}
			if ( this.qstr6== null ) object.qstr6 = null;
			else{
				object.qstr6 = this.qstr6;
			}
			if ( this.qstr7== null ) object.qstr7 = null;
			else{
				object.qstr7 = this.qstr7;
			}
			if ( this.qstr8== null ) object.qstr8 = null;
			else{
				object.qstr8 = this.qstr8;
			}
			if ( this.qstr9== null ) object.qstr9 = null;
			else{
				object.qstr9 = this.qstr9;
			}
			if ( this.qstr10== null ) object.qstr10 = null;
			else{
				object.qstr10 = this.qstr10;
			}
			if ( this.qstr11== null ) object.qstr11 = null;
			else{
				object.qstr11 = this.qstr11;
			}
			if ( this.optQstr1== null ) object.optQstr1 = null;
			else{
				object.optQstr1 = this.optQstr1;
			}
			if ( this.optQstr2== null ) object.optQstr2 = null;
			else{
				object.optQstr2 = this.optQstr2;
			}
			if ( this.giftAyn== null ) object.giftAyn = null;
			else{
				object.giftAyn = this.giftAyn;
			}
			if ( this.connGb== null ) object.connGb = null;
			else{
				object.connGb = this.connGb;
			}
			
			return object;
		} 
		catch(Exception e){
			throw new bxm.omm.exception.CloneFailedException(e);
		}
	}

	
	@Override
	public int hashCode(){
		final int prime=31;
		int result = 1;
		result = prime * result + ((apNo==null)?0:apNo.hashCode());
		result = prime * result + ((apSvcGbcd==null)?0:apSvcGbcd.hashCode());
		result = prime * result + ((dtlSeq==null)?0:dtlSeq.hashCode());
		result = prime * result + ((qstnrYmd==null)?0:qstnrYmd.hashCode());
		result = prime * result + ((qustn1Yn==null)?0:qustn1Yn.hashCode());
		result = prime * result + ((qustn1Cnts==null)?0:qustn1Cnts.hashCode());
		result = prime * result + ((qustn2Yn==null)?0:qustn2Yn.hashCode());
		result = prime * result + ((qustn2Cnts==null)?0:qustn2Cnts.hashCode());
		result = prime * result + ((qustn3Yn==null)?0:qustn3Yn.hashCode());
		result = prime * result + ((qustn3Cnts==null)?0:qustn3Cnts.hashCode());
		result = prime * result + ((modiId==null)?0:modiId.hashCode());
		result = prime * result + ((modiDt==null)?0:modiDt.hashCode());
		result = prime * result + ((fstRegId==null)?0:fstRegId.hashCode());
		result = prime * result + ((fstRegDt==null)?0:fstRegDt.hashCode());
		result = prime * result + ((rsptNm==null)?0:rsptNm.hashCode());
		result = prime * result + ((rsptTel==null)?0:rsptTel.hashCode());
		result = prime * result + ((rspnsStatCd==null)?0:rspnsStatCd.hashCode());
		result = prime * result + ((qstr1==null)?0:qstr1.hashCode());
		result = prime * result + ((qstr2==null)?0:qstr2.hashCode());
		result = prime * result + ((qstr3==null)?0:qstr3.hashCode());
		result = prime * result + ((qstr4==null)?0:qstr4.hashCode());
		result = prime * result + ((qstr5==null)?0:qstr5.hashCode());
		result = prime * result + ((qstr6==null)?0:qstr6.hashCode());
		result = prime * result + ((qstr7==null)?0:qstr7.hashCode());
		result = prime * result + ((qstr8==null)?0:qstr8.hashCode());
		result = prime * result + ((qstr9==null)?0:qstr9.hashCode());
		result = prime * result + ((qstr10==null)?0:qstr10.hashCode());
		result = prime * result + ((qstr11==null)?0:qstr11.hashCode());
		result = prime * result + ((optQstr1==null)?0:optQstr1.hashCode());
		result = prime * result + ((optQstr2==null)?0:optQstr2.hashCode());
		result = prime * result + ((giftAyn==null)?0:giftAyn.hashCode());
		result = prime * result + ((connGb==null)?0:connGb.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if ( this == obj ) return true;
		if ( obj == null ) return false;
		if ( getClass() != obj.getClass() ) return false;
		final nice.em.rm01.online.dbio.dto.DRM02ApPubQstnrOutDto other = (nice.em.rm01.online.dbio.dto.DRM02ApPubQstnrOutDto)obj;
		if ( apNo == null ){
			if ( other.apNo != null ) return false;
		}
		else if ( !apNo.equals(other.apNo) )
			return false;
		if ( apSvcGbcd == null ){
			if ( other.apSvcGbcd != null ) return false;
		}
		else if ( !apSvcGbcd.equals(other.apSvcGbcd) )
			return false;
		if ( dtlSeq == null ){
			if ( other.dtlSeq != null ) return false;
		}
		else if ( !dtlSeq.equals(other.dtlSeq) )
			return false;
		if ( qstnrYmd == null ){
			if ( other.qstnrYmd != null ) return false;
		}
		else if ( !qstnrYmd.equals(other.qstnrYmd) )
			return false;
		if ( qustn1Yn == null ){
			if ( other.qustn1Yn != null ) return false;
		}
		else if ( !qustn1Yn.equals(other.qustn1Yn) )
			return false;
		if ( qustn1Cnts == null ){
			if ( other.qustn1Cnts != null ) return false;
		}
		else if ( !qustn1Cnts.equals(other.qustn1Cnts) )
			return false;
		if ( qustn2Yn == null ){
			if ( other.qustn2Yn != null ) return false;
		}
		else if ( !qustn2Yn.equals(other.qustn2Yn) )
			return false;
		if ( qustn2Cnts == null ){
			if ( other.qustn2Cnts != null ) return false;
		}
		else if ( !qustn2Cnts.equals(other.qustn2Cnts) )
			return false;
		if ( qustn3Yn == null ){
			if ( other.qustn3Yn != null ) return false;
		}
		else if ( !qustn3Yn.equals(other.qustn3Yn) )
			return false;
		if ( qustn3Cnts == null ){
			if ( other.qustn3Cnts != null ) return false;
		}
		else if ( !qustn3Cnts.equals(other.qustn3Cnts) )
			return false;
		if ( modiId == null ){
			if ( other.modiId != null ) return false;
		}
		else if ( !modiId.equals(other.modiId) )
			return false;
		if ( modiDt == null){
			if ( other.modiDt != null ) return false;
		}
		else if ( !modiDt.equals(other.modiDt) )
			return false;
		if ( fstRegId == null ){
			if ( other.fstRegId != null ) return false;
		}
		else if ( !fstRegId.equals(other.fstRegId) )
			return false;
		if ( fstRegDt == null){
			if ( other.fstRegDt != null ) return false;
		}
		else if ( !fstRegDt.equals(other.fstRegDt) )
			return false;
		if ( rsptNm == null ){
			if ( other.rsptNm != null ) return false;
		}
		else if ( !rsptNm.equals(other.rsptNm) )
			return false;
		if ( rsptTel == null ){
			if ( other.rsptTel != null ) return false;
		}
		else if ( !rsptTel.equals(other.rsptTel) )
			return false;
		if ( rspnsStatCd == null ){
			if ( other.rspnsStatCd != null ) return false;
		}
		else if ( !rspnsStatCd.equals(other.rspnsStatCd) )
			return false;
		if ( qstr1 == null ){
			if ( other.qstr1 != null ) return false;
		}
		else if ( !qstr1.equals(other.qstr1) )
			return false;
		if ( qstr2 == null ){
			if ( other.qstr2 != null ) return false;
		}
		else if ( !qstr2.equals(other.qstr2) )
			return false;
		if ( qstr3 == null ){
			if ( other.qstr3 != null ) return false;
		}
		else if ( !qstr3.equals(other.qstr3) )
			return false;
		if ( qstr4 == null ){
			if ( other.qstr4 != null ) return false;
		}
		else if ( !qstr4.equals(other.qstr4) )
			return false;
		if ( qstr5 == null ){
			if ( other.qstr5 != null ) return false;
		}
		else if ( !qstr5.equals(other.qstr5) )
			return false;
		if ( qstr6 == null ){
			if ( other.qstr6 != null ) return false;
		}
		else if ( !qstr6.equals(other.qstr6) )
			return false;
		if ( qstr7 == null ){
			if ( other.qstr7 != null ) return false;
		}
		else if ( !qstr7.equals(other.qstr7) )
			return false;
		if ( qstr8 == null ){
			if ( other.qstr8 != null ) return false;
		}
		else if ( !qstr8.equals(other.qstr8) )
			return false;
		if ( qstr9 == null ){
			if ( other.qstr9 != null ) return false;
		}
		else if ( !qstr9.equals(other.qstr9) )
			return false;
		if ( qstr10 == null ){
			if ( other.qstr10 != null ) return false;
		}
		else if ( !qstr10.equals(other.qstr10) )
			return false;
		if ( qstr11 == null ){
			if ( other.qstr11 != null ) return false;
		}
		else if ( !qstr11.equals(other.qstr11) )
			return false;
		if ( optQstr1 == null ){
			if ( other.optQstr1 != null ) return false;
		}
		else if ( !optQstr1.equals(other.optQstr1) )
			return false;
		if ( optQstr2 == null ){
			if ( other.optQstr2 != null ) return false;
		}
		else if ( !optQstr2.equals(other.optQstr2) )
			return false;
		if ( giftAyn == null ){
			if ( other.giftAyn != null ) return false;
		}
		else if ( !giftAyn.equals(other.giftAyn) )
			return false;
		if ( connGb == null ){
			if ( other.connGb != null ) return false;
		}
		else if ( !connGb.equals(other.connGb) )
			return false;
		return true;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
	
		sb.append( "\n[nice.em.rm01.online.dbio.dto.DRM02ApPubQstnrOutDto:\n");
		sb.append("\tapNo: ");
		sb.append(apNo==null?"null":getApNo());
		sb.append("\n");
		sb.append("\tapSvcGbcd: ");
		sb.append(apSvcGbcd==null?"null":getApSvcGbcd());
		sb.append("\n");
		sb.append("\tdtlSeq: ");
		sb.append(dtlSeq==null?"null":getDtlSeq());
		sb.append("\n");
		sb.append("\tqstnrYmd: ");
		sb.append(qstnrYmd==null?"null":getQstnrYmd());
		sb.append("\n");
		sb.append("\tqustn1Yn: ");
		sb.append(qustn1Yn==null?"null":getQustn1Yn());
		sb.append("\n");
		sb.append("\tqustn1Cnts: ");
		sb.append(qustn1Cnts==null?"null":getQustn1Cnts());
		sb.append("\n");
		sb.append("\tqustn2Yn: ");
		sb.append(qustn2Yn==null?"null":getQustn2Yn());
		sb.append("\n");
		sb.append("\tqustn2Cnts: ");
		sb.append(qustn2Cnts==null?"null":getQustn2Cnts());
		sb.append("\n");
		sb.append("\tqustn3Yn: ");
		sb.append(qustn3Yn==null?"null":getQustn3Yn());
		sb.append("\n");
		sb.append("\tqustn3Cnts: ");
		sb.append(qustn3Cnts==null?"null":getQustn3Cnts());
		sb.append("\n");
		sb.append("\tmodiId: ");
		sb.append(modiId==null?"null":getModiId());
		sb.append("\n");
		sb.append("\tmodiDt: ");
		sb.append(modiDt==null?"null":getModiDt());
		sb.append("\n");
		sb.append("\tfstRegId: ");
		sb.append(fstRegId==null?"null":getFstRegId());
		sb.append("\n");
		sb.append("\tfstRegDt: ");
		sb.append(fstRegDt==null?"null":getFstRegDt());
		sb.append("\n");
		sb.append("\trsptNm: ");
		sb.append(rsptNm==null?"null":getRsptNm());
		sb.append("\n");
		sb.append("\trsptTel: ");
		sb.append(rsptTel==null?"null":getRsptTel());
		sb.append("\n");
		sb.append("\trspnsStatCd: ");
		sb.append(rspnsStatCd==null?"null":getRspnsStatCd());
		sb.append("\n");
		sb.append("\tqstr1: ");
		sb.append(qstr1==null?"null":getQstr1());
		sb.append("\n");
		sb.append("\tqstr2: ");
		sb.append(qstr2==null?"null":getQstr2());
		sb.append("\n");
		sb.append("\tqstr3: ");
		sb.append(qstr3==null?"null":getQstr3());
		sb.append("\n");
		sb.append("\tqstr4: ");
		sb.append(qstr4==null?"null":getQstr4());
		sb.append("\n");
		sb.append("\tqstr5: ");
		sb.append(qstr5==null?"null":getQstr5());
		sb.append("\n");
		sb.append("\tqstr6: ");
		sb.append(qstr6==null?"null":getQstr6());
		sb.append("\n");
		sb.append("\tqstr7: ");
		sb.append(qstr7==null?"null":getQstr7());
		sb.append("\n");
		sb.append("\tqstr8: ");
		sb.append(qstr8==null?"null":getQstr8());
		sb.append("\n");
		sb.append("\tqstr9: ");
		sb.append(qstr9==null?"null":getQstr9());
		sb.append("\n");
		sb.append("\tqstr10: ");
		sb.append(qstr10==null?"null":getQstr10());
		sb.append("\n");
		sb.append("\tqstr11: ");
		sb.append(qstr11==null?"null":getQstr11());
		sb.append("\n");
		sb.append("\toptQstr1: ");
		sb.append(optQstr1==null?"null":getOptQstr1());
		sb.append("\n");
		sb.append("\toptQstr2: ");
		sb.append(optQstr2==null?"null":getOptQstr2());
		sb.append("\n");
		sb.append("\tgiftAyn: ");
		sb.append(giftAyn==null?"null":getGiftAyn());
		sb.append("\n");
		sb.append("\tconnGb: ");
		sb.append(connGb==null?"null":getConnGb());
		sb.append("\n");
		sb.append("]\n");
	
		return sb.toString();
	}

	/**
	 * Only for Fixed-Length Data
	 */
	@Override
	public long predictMessageLength(){
		long messageLen= 0;
	
		messageLen+= 10; /* apNo */
		messageLen+= 4; /* apSvcGbcd */
		messageLen+= 5; /* dtlSeq */
		messageLen+= 8; /* qstnrYmd */
		messageLen+= 1; /* qustn1Yn */
		messageLen+= 500; /* qustn1Cnts */
		messageLen+= 1; /* qustn2Yn */
		messageLen+= 500; /* qustn2Cnts */
		messageLen+= 1; /* qustn3Yn */
		messageLen+= 500; /* qustn3Cnts */
		messageLen+= 16; /* modiId */
		messageLen+= 7; /* modiDt */
		messageLen+= 16; /* fstRegId */
		messageLen+= 7; /* fstRegDt */
		messageLen+= 50; /* rsptNm */
		messageLen+= 16; /* rsptTel */
		messageLen+= 20; /* rspnsStatCd */
		messageLen+= 1; /* qstr1 */
		messageLen+= 1; /* qstr2 */
		messageLen+= 1; /* qstr3 */
		messageLen+= 1; /* qstr4 */
		messageLen+= 1; /* qstr5 */
		messageLen+= 1; /* qstr6 */
		messageLen+= 1; /* qstr7 */
		messageLen+= 1; /* qstr8 */
		messageLen+= 1; /* qstr9 */
		messageLen+= 1; /* qstr10 */
		messageLen+= 1; /* qstr11 */
		messageLen+= 500; /* optQstr1 */
		messageLen+= 500; /* optQstr2 */
		messageLen+= 1; /* giftAyn */
		messageLen+= 2; /* connGb */
	
		return messageLen;
	}
	

	@Override
	@JsonIgnore
	public java.util.List<String> getFieldNames(){
		java.util.List<String> fieldNames= new java.util.ArrayList<String>();
	
		fieldNames.add("apNo");
	
		fieldNames.add("apSvcGbcd");
	
		fieldNames.add("dtlSeq");
	
		fieldNames.add("qstnrYmd");
	
		fieldNames.add("qustn1Yn");
	
		fieldNames.add("qustn1Cnts");
	
		fieldNames.add("qustn2Yn");
	
		fieldNames.add("qustn2Cnts");
	
		fieldNames.add("qustn3Yn");
	
		fieldNames.add("qustn3Cnts");
	
		fieldNames.add("modiId");
	
		fieldNames.add("modiDt");
	
		fieldNames.add("fstRegId");
	
		fieldNames.add("fstRegDt");
	
		fieldNames.add("rsptNm");
	
		fieldNames.add("rsptTel");
	
		fieldNames.add("rspnsStatCd");
	
		fieldNames.add("qstr1");
	
		fieldNames.add("qstr2");
	
		fieldNames.add("qstr3");
	
		fieldNames.add("qstr4");
	
		fieldNames.add("qstr5");
	
		fieldNames.add("qstr6");
	
		fieldNames.add("qstr7");
	
		fieldNames.add("qstr8");
	
		fieldNames.add("qstr9");
	
		fieldNames.add("qstr10");
	
		fieldNames.add("qstr11");
	
		fieldNames.add("optQstr1");
	
		fieldNames.add("optQstr2");
	
		fieldNames.add("giftAyn");
	
		fieldNames.add("connGb");
	
	
		return fieldNames;
	}

	@Override
	@JsonIgnore
	public java.util.Map<String, Object> getFieldValues(){
		java.util.Map<String, Object> fieldValueMap= new java.util.HashMap<String, Object>();
	
		fieldValueMap.put("apNo", get("apNo"));
	
		fieldValueMap.put("apSvcGbcd", get("apSvcGbcd"));
	
		fieldValueMap.put("dtlSeq", get("dtlSeq"));
	
		fieldValueMap.put("qstnrYmd", get("qstnrYmd"));
	
		fieldValueMap.put("qustn1Yn", get("qustn1Yn"));
	
		fieldValueMap.put("qustn1Cnts", get("qustn1Cnts"));
	
		fieldValueMap.put("qustn2Yn", get("qustn2Yn"));
	
		fieldValueMap.put("qustn2Cnts", get("qustn2Cnts"));
	
		fieldValueMap.put("qustn3Yn", get("qustn3Yn"));
	
		fieldValueMap.put("qustn3Cnts", get("qustn3Cnts"));
	
		fieldValueMap.put("modiId", get("modiId"));
	
		fieldValueMap.put("modiDt", get("modiDt"));
	
		fieldValueMap.put("fstRegId", get("fstRegId"));
	
		fieldValueMap.put("fstRegDt", get("fstRegDt"));
	
		fieldValueMap.put("rsptNm", get("rsptNm"));
	
		fieldValueMap.put("rsptTel", get("rsptTel"));
	
		fieldValueMap.put("rspnsStatCd", get("rspnsStatCd"));
	
		fieldValueMap.put("qstr1", get("qstr1"));
	
		fieldValueMap.put("qstr2", get("qstr2"));
	
		fieldValueMap.put("qstr3", get("qstr3"));
	
		fieldValueMap.put("qstr4", get("qstr4"));
	
		fieldValueMap.put("qstr5", get("qstr5"));
	
		fieldValueMap.put("qstr6", get("qstr6"));
	
		fieldValueMap.put("qstr7", get("qstr7"));
	
		fieldValueMap.put("qstr8", get("qstr8"));
	
		fieldValueMap.put("qstr9", get("qstr9"));
	
		fieldValueMap.put("qstr10", get("qstr10"));
	
		fieldValueMap.put("qstr11", get("qstr11"));
	
		fieldValueMap.put("optQstr1", get("optQstr1"));
	
		fieldValueMap.put("optQstr2", get("optQstr2"));
	
		fieldValueMap.put("giftAyn", get("giftAyn"));
	
		fieldValueMap.put("connGb", get("connGb"));
	
	
		return fieldValueMap;
	}

	@XmlTransient
	@JsonIgnore
	private Hashtable<String, Object> htDynamicVariable = new Hashtable<String, Object>();
	
	public Object get(String key) throws IllegalArgumentException{
		switch( key.hashCode() ){
		case 2999888 : /* apNo */
			return getApNo();
		case -1777886771 : /* apSvcGbcd */
			return getApSvcGbcd();
		case -1321623325 : /* dtlSeq */
			return getDtlSeq();
		case 1778834458 : /* qstnrYmd */
			return getQstnrYmd();
		case -764371715 : /* qustn1Yn */
			return getQustn1Yn();
		case -122462190 : /* qustn1Cnts */
			return getQustn1Cnts();
		case -764370754 : /* qustn2Yn */
			return getQustn2Yn();
		case -121538669 : /* qustn2Cnts */
			return getQustn2Cnts();
		case -764369793 : /* qustn3Yn */
			return getQustn3Yn();
		case -120615148 : /* qustn3Cnts */
			return getQustn3Cnts();
		case -1068796638 : /* modiId */
			return getModiId();
		case -1068796777 : /* modiDt */
			return getModiDt();
		case -238443576 : /* fstRegId */
			return getFstRegId();
		case -238443715 : /* fstRegDt */
			return getFstRegDt();
		case -921588572 : /* rsptNm */
			return getRsptNm();
		case 1495530966 : /* rsptTel */
			return getRsptTel();
		case -484010167 : /* rspnsStatCd */
			return getRspnsStatCd();
		case 107898897 : /* qstr1 */
			return getQstr1();
		case 107898898 : /* qstr2 */
			return getQstr2();
		case 107898899 : /* qstr3 */
			return getQstr3();
		case 107898900 : /* qstr4 */
			return getQstr4();
		case 107898901 : /* qstr5 */
			return getQstr5();
		case 107898902 : /* qstr6 */
			return getQstr6();
		case 107898903 : /* qstr7 */
			return getQstr7();
		case 107898904 : /* qstr8 */
			return getQstr8();
		case 107898905 : /* qstr9 */
			return getQstr9();
		case -950101441 : /* qstr10 */
			return getQstr10();
		case -950101440 : /* qstr11 */
			return getQstr11();
		case -101056226 : /* optQstr1 */
			return getOptQstr1();
		case -101056225 : /* optQstr2 */
			return getOptQstr2();
		case 27380710 : /* giftAyn */
			return getGiftAyn();
		case -1354785497 : /* connGb */
			return getConnGb();
		default :
			if ( htDynamicVariable.containsKey(key) ) return htDynamicVariable.get(key);
			else throw new IllegalArgumentException("Not found element : " + key);
		}
	}
	
	@SuppressWarnings("unchecked")
	public void set(String key, Object value){
		switch( key.hashCode() ){
		case 2999888 : /* apNo */
			setApNo((java.math.BigDecimal) value);
			return;
		case -1777886771 : /* apSvcGbcd */
			setApSvcGbcd((java.lang.String) value);
			return;
		case -1321623325 : /* dtlSeq */
			setDtlSeq((java.lang.String) value);
			return;
		case 1778834458 : /* qstnrYmd */
			setQstnrYmd((java.lang.String) value);
			return;
		case -764371715 : /* qustn1Yn */
			setQustn1Yn((java.lang.String) value);
			return;
		case -122462190 : /* qustn1Cnts */
			setQustn1Cnts((java.lang.String) value);
			return;
		case -764370754 : /* qustn2Yn */
			setQustn2Yn((java.lang.String) value);
			return;
		case -121538669 : /* qustn2Cnts */
			setQustn2Cnts((java.lang.String) value);
			return;
		case -764369793 : /* qustn3Yn */
			setQustn3Yn((java.lang.String) value);
			return;
		case -120615148 : /* qustn3Cnts */
			setQustn3Cnts((java.lang.String) value);
			return;
		case -1068796638 : /* modiId */
			setModiId((java.lang.String) value);
			return;
		case -1068796777 : /* modiDt */
			setModiDt((java.util.Date) value);
			return;
		case -238443576 : /* fstRegId */
			setFstRegId((java.lang.String) value);
			return;
		case -238443715 : /* fstRegDt */
			setFstRegDt((java.util.Date) value);
			return;
		case -921588572 : /* rsptNm */
			setRsptNm((java.lang.String) value);
			return;
		case 1495530966 : /* rsptTel */
			setRsptTel((java.lang.String) value);
			return;
		case -484010167 : /* rspnsStatCd */
			setRspnsStatCd((java.lang.String) value);
			return;
		case 107898897 : /* qstr1 */
			setQstr1((java.lang.String) value);
			return;
		case 107898898 : /* qstr2 */
			setQstr2((java.lang.String) value);
			return;
		case 107898899 : /* qstr3 */
			setQstr3((java.lang.String) value);
			return;
		case 107898900 : /* qstr4 */
			setQstr4((java.lang.String) value);
			return;
		case 107898901 : /* qstr5 */
			setQstr5((java.lang.String) value);
			return;
		case 107898902 : /* qstr6 */
			setQstr6((java.lang.String) value);
			return;
		case 107898903 : /* qstr7 */
			setQstr7((java.lang.String) value);
			return;
		case 107898904 : /* qstr8 */
			setQstr8((java.lang.String) value);
			return;
		case 107898905 : /* qstr9 */
			setQstr9((java.lang.String) value);
			return;
		case -950101441 : /* qstr10 */
			setQstr10((java.lang.String) value);
			return;
		case -950101440 : /* qstr11 */
			setQstr11((java.lang.String) value);
			return;
		case -101056226 : /* optQstr1 */
			setOptQstr1((java.lang.String) value);
			return;
		case -101056225 : /* optQstr2 */
			setOptQstr2((java.lang.String) value);
			return;
		case 27380710 : /* giftAyn */
			setGiftAyn((java.lang.String) value);
			return;
		case -1354785497 : /* connGb */
			setConnGb((java.lang.String) value);
			return;
		default : htDynamicVariable.put(key, value);
		}
	}
}
