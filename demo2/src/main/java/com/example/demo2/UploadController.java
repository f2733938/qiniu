package com.example.demo2;

import com.alibaba.fastjson.JSONObject;
import com.qiniu.api.auth.AuthException;
import com.qiniu.api.auth.digest.Mac;
import com.qiniu.api.config.Config;
import com.qiniu.api.rs.PutPolicy;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * 提供上传文件控制器
 * 该控制器会被spring扫描到
 * 项目使用无需处理任何操作
 *
 * @author yuqiyu
 * ===============================
 * Created with Eclipse.
 * User：于起宇
 * Date：2017/10/12
 * Time：15:41
 * 简书：http://www.jianshu.com/u/092df3f77bca
 * ================================
 */
@Controller
@RequestMapping(value = "/upload")
public class UploadController {

    /**
     * 上传业务逻辑注入
     */

    /**
     * logback对象
     */
    protected Logger logger = LoggerFactory.getLogger(this.getClass());
        @RequestMapping(value = "/index")
        public String hello(Model model) {
            model.addAttribute("name", "Dear");
            return "add";
        }


    /**
     * 七牛上传的凭证
     * @return
     */
    @RequestMapping(value = "/uptoken", method = RequestMethod.GET)
    public ResponseEntity<Object> makeToken() {
        //todo
        // 需要修改AK、SK、bucketName
        Config.ACCESS_KEY = "A--VZ_E6y7I5YHn5_yaDX1z-nhLZjx-Rr-303ZTn";
        Config.SECRET_KEY = "5zOvVLUb-F7u7BxKrYsNCgypLZvt9KWXKbDlseuj";
        Mac mac = new Mac(Config.ACCESS_KEY, Config.SECRET_KEY);
        String bucketName = "resource";
        PutPolicy putPolicy = new PutPolicy(bucketName);
        try {
            String uptoken = putPolicy.token(mac);
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("uptoken",uptoken);
            return new ResponseEntity(jsonObject, HttpStatus.OK);
        } catch (AuthException e) {
            e.printStackTrace();
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        } catch (JSONException e) {
            e.printStackTrace();
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * 上传文件
     *
     * @param file     上传文件内容
     * @param mimeType 文件内容类型
     * @return
     * @throws Exception
     */
/*    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ApiResult upload(@RequestParam(value = "file") MultipartFile file, String mimeType)
            throws Exception {
        logger.info("上传文件文件内容类型：{}", mimeType);
        // 上传图片
        UploadBackEntity uploadBackEntity = uploadService.inputStream(file.getInputStream())
                .mimeType(getMimeType(mimeType))
                .upload();
        return ApiResultGenerator
                .success()
                .msg("UPLOAD_SUCCESS")
                .info(uploadBackEntity.getUploadUrl())
                .build();
    }*/

    /**
     * 获取文件内容类型
     *
     * @param mimeType
     * @return
     * @see MimeTypeEnum
     */
/*    private String getMimeType(String mimeType) {
        try {
            return MimeTypeEnum.valueOf(mimeType).getValue();
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("未检查到文件内容类型.");
            return null;
        }
    }*/
}
