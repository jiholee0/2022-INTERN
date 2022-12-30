package nice.em.rm01.online.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.apache.cxf.io.CachedOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nicednb.util.db.Password;
import com.nicednb.util.func.encFunc;

import bxm.common.annotaion.BxmCategory;
import bxm.common.util.StringUtils;
import bxm.container.annotation.BxmService;
import bxm.container.annotation.BxmServiceOperation;
import bxm.dft.app.DefaultApplicationException;
import bxm.dft.context.DefaultApplicationContext;
import bxm.dft.context.DefaultSystemHeader;
import bxm.nice.common.util.SkipException;
import bxm.nice.service.session.SessionUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import nice.ea.ea01.online.bean.Constants;
import nice.ea.ea01.online.bean.MailProperties;
import nice.ec.ec04.online.bean.BEC04NbsRptInfo;
import nice.ec.ec04.online.dbio.dto.DEC04NbsRptInfoInDto;
import nice.em.rm01.online.bean.BRM02ApRegCcrInfo;
import nice.em.rm01.online.bean.BRM04NRMRankChng;
import nice.em.rm01.online.dbio.dto.DRM02ApPubQstnrOutDto;
import nice.em.rm01.online.dbio.dto.DRM02ApRegCcrInfoInDto;
import nice.em.rm01.online.dbio.dto.DRM02ApRegCcrInfoOutDto;
import nice.em.rm01.online.service.dto.SRM01ApPubQstnrInDto;
import nice.em.rm01.online.service.dto.SRM01ApPubQstnrOutDto;
import nice.em.rm01.online.service.dto.SRM02ApNrmInfoOutDto;
import nice.em.rm01.online.service.dto.SRM02ApRegCcrInfoInDto;
import nice.em.rm01.online.service.dto.SRM02ApRegCcrInfoOutDto;
import nice.em.rm01.online.service.dto.SRM02ApRegCcrInfoOutDtoSubList;
import nice.em.rm01.online.service.dto.SRM02ApRegCcrInfoOutDtoSubMemInfo;
import nice.em.rm01.online.service.dto.SRM02G2bReexamDocInDto;
import nice.em.rm01.online.service.dto.SRM02G2bReexamDocOutDto;
import nice.em.rm01.online.service.dto.SRM040402InDto;
import nice.em.rm01.online.service.dto.SRM040402OutDto;
import nice.ym.ym04.online.bean.AesUtil;
import nice.yu.yu01.online.bean.BNdbUtil;
import nice.yu.yu01.online.bean.BStringUtil;
import nice.yu.yu01.online.service.dto.SYU010104InDto;

/**
 * <b>BXM Service class</b>
 * <p>
 * <b>Revision history</b><br>
 *
 * <pre>
 * 20171024 : New creation
 * </pre>
 *
 * @since 20171024
 * @version 1.0.0
 * @author W
 */

@BxmService("SRM0201")
@BxmCategory(logicalName = "평가관리-평가결가조회", description = "조회")
public class SRM0201 {
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	private BRM02ApRegCcrInfo bean;
	private BNdbUtil mailBean;
	private BEC04NbsRptInfo bEC04NbsRptInfo;
	private BRM04NRMRankChng bRM04NRMRankChng;

	public final static String BOXKEY;

	@BxmServiceOperation("getApPubQstnr")
	@BxmCategory(logicalName = "설문조사-조회", description = "공공")
	public SRM01ApPubQstnrOutDto getApPubQstnr(SRM01ApPubQstnrInDto input) throws DefaultApplicationException {
		/**
		 * @BXMType GetBean
		 */
		if (bean == null) {
			bean = DefaultApplicationContext.getBean(BRM02ApRegCcrInfo.class);
		}

		SRM01ApPubQstnrOutDto output = new SRM01ApPubQstnrOutDto();
		DRM02ApPubQstnrOutDto apPubQstnr = bean.getOneApPubQstnr(input);
		output.setApPubQstnr(apPubQstnr);

		return output;
	}

	@BxmServiceOperation("createApPubQstnr")
	@BxmCategory(logicalName = "설문조사-등록 및 수정", description = "공공")
	public SRM01ApPubQstnrOutDto createApPubQstnr(SRM01ApPubQstnrInDto input) throws DefaultApplicationException {
		/**
		 * @BXMType GetBean
		 */
		if (bean == null) {
			bean = DefaultApplicationContext.getBean(BRM02ApRegCcrInfo.class);
		}

		input.setFstRegId(SessionUtil.getSession().getAttribute("nice_user_id").toString());
		input.setModiId(SessionUtil.getSession().getAttribute("nice_user_id").toString());
		bean.createApPubQstnr(input);

		return null;
	}
}
