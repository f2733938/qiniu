layui.use(['layer', 'sanmiTools'], function () {
    var $ = layui.jquery
        , tools = layui.sanmiTools
        , uploadFiles = [],
        uploadSuccessFiles = [];
    var params = tools.getRequestParams();
    var type = params.type === undefined ? 0 : params.type;
    var size = params.size === undefined ? '10000kb' : params.size + "kb";
    var number = params.number === undefined ? 1 : params.number;
    var exts = params.exts ? decodeURI(params.exts) : 'jpg|png|gif|bmp|jpeg|apk|mp4';
    var mimeType = params.mimeType === "APK" ? ["application/vnd.android.package-archive"] : null;

    /*});

    $(function () {*/
    var uploader = Qiniu.uploader({
        disable_statistics_report: false,
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'container',
        drop_element: 'container',
        max_file_size: size,
        flash_swf_url: '/resource/js/sdk/js/Moxie.swf',
        dragdrop: true,
        chunk_size: '10mb',
        region: "qiniu.region.z1",
        multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
        uptoken_url: "/upload/uptoken",
        domain: "http://yutang.resource.fangxinyuesao.com/",
        get_new_uptoken: false,
        auto_start: true,
        log_level: 5,
        putExtra: {
            mimeType:mimeType
        },
        init: {
            'BeforeChunkUpload': function (up, file) {
                // console.log("before chunk upload:", file.name);
            },
            'FilesAdded': function (up, files) {
                $('table').show();
                plupload.each(files, function (file) {
                    // 文件上传个数限制
                    if (up.total.uploaded < +number && files.length <= (+number - up.total.uploaded)) {
                        // 我文件后缀
                        var fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length).toLocaleLowerCase();
                        // 文件格式限制
                        if (exts.indexOf(fileSuffix) > -1) {
                            var progress = new FileProgress(file, 'fsUploadProgress');
                            progress.setStatus("等待...");
                            progress.bindUploadCancel(up);
                        } else {
                            // 取消上传
                            up.removeFile(file);
                            layer.alert("文件格式不支持");
                            return;
                        }
                    } else {
                        // 取消上传
                        up.removeFile(file);
                        layer.alert("超出最大上传个数:" + number);
                        return;
                    }
                });
            },
            'BeforeUpload': function (up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption(
                    'chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function (up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption(
                    'chunk_size'));
                progress.setProgress(file.percent + "%", file.speed,
                    chunk_size);
            },
            'UploadComplete': function (uploader, files) {
                // console.log("全部完成:");
            },
            'FileUploaded': function (up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                // console.log("response:", info.response);
                // 添加样式
                progress.setComplete(up, info.response);
                // 保存
                uploadSuccessFiles.push(up.getOption('domain')+($.parseJSON(info.response).key));
            },
            'Error': function (up, err, errTip) {
                $('table').show();
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            },
            unique_names: false,
            save_key: false,
            'Key': function (up, file) {
                // 上传文件重命名
                return tools.getUUID()
            }
        }
    });

    $("#confirm").click(function () {
        // console.log(tools.getRequestParams()+"------------"+uploadSuccessFiles);
        //关闭loading
        layer.closeAll('loading');
        //提示文件上传成功
        layer.msg("文件上传成功");
        //回调上传成功方法
        parent.uploadCallBack(tools.getRequestParams(), uploadSuccessFiles);
        //获取layer弹出层的index
        var index = parent.layer.getFrameIndex(window.name);
        //关闭弹出的上传文件层
        parent.layer.close(index);

    })
    //uploader.init();
    uploader.bind('BeforeUpload', function () {
        // console.log("hello man, i am going to upload a file");
    });
    uploader.bind('FileUploaded', function () {
        // console.log('hello man,a file is uploaded');
    });
    $('#container').on(
        'dragenter',
        function (e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function (e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragleave', function (e) {
        e.preventDefault();
        $('#container').removeClass('draging');
        e.stopPropagation();
    }).on('dragover', function (e) {
        e.preventDefault();
        $('#container').addClass('draging');
        e.stopPropagation();
    });


    $('#show_code').on('click', function () {
        $('#myModal-code').modal();
        $('pre code').each(function (i, e) {
            hljs.highlightBlock(e);
        });
    });


    $('body').on('click', 'table button.btn', function () {
        $(this).parents('tr').next().toggle();
    });


    var getRotate = function (url) {
        if (!url) {
            return 0;
        }
        var arr = url.split('/');
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === 'rotate') {
                return parseInt(arr[i + 1], 10);
            }
        }
        return 0;
    };

    $('#myModal-img .modal-body-footer').find('a').on('click', function () {
        var img = $('#myModal-img').find('.modal-body img');
        var key = img.data('key');
        var oldUrl = img.attr('src');
        var originHeight = parseInt(img.data('h'), 10);
        var fopArr = [];
        var rotate = getRotate(oldUrl);
        if (!$(this).hasClass('no-disable-click')) {
            $(this).addClass('disabled').siblings().removeClass('disabled');
            if ($(this).data('imagemogr') !== 'no-rotate') {
                fopArr.push({
                    'fop': 'imageMogr2',
                    'auto-orient': true,
                    'strip': true,
                    'rotate': rotate,
                    'format': 'png'
                });
            }
        } else {
            $(this).siblings().removeClass('disabled');
            var imageMogr = $(this).data('imagemogr');
            if (imageMogr === 'left') {
                rotate = rotate - 90 < 0 ? rotate + 270 : rotate - 90;
            } else if (imageMogr === 'right') {
                rotate = rotate + 90 > 360 ? rotate - 270 : rotate + 90;
            }
            fopArr.push({
                'fop': 'imageMogr2',
                'auto-orient': true,
                'strip': true,
                'rotate': rotate,
                'format': 'png'
            });
        }

        $('#myModal-img .modal-body-footer').find('a.disabled').each(
            function () {

                var watermark = $(this).data('watermark');
                var imageView = $(this).data('imageview');
                var imageMogr = $(this).data('imagemogr');

                if (watermark) {
                    fopArr.push({
                        fop: 'watermark',
                        mode: 1,
                        image: 'http://www.b1.qiniudn.com/images/logo-2.png',
                        dissolve: 100,
                        gravity: watermark,
                        dx: 100,
                        dy: 100
                    });
                }

                if (imageView) {
                    var height;
                    switch (imageView) {
                        case 'large':
                            height = originHeight;
                            break;
                        case 'middle':
                            height = originHeight * 0.5;
                            break;
                        case 'small':
                            height = originHeight * 0.1;
                            break;
                        default:
                            height = originHeight;
                            break;
                    }
                    fopArr.push({
                        fop: 'imageView2',
                        mode: 3,
                        h: parseInt(height, 10),
                        q: 100,
                        format: 'png'
                    });
                }

                if (imageMogr === 'no-rotate') {
                    fopArr.push({
                        'fop': 'imageMogr2',
                        'auto-orient': true,
                        'strip': true,
                        'rotate': 0,
                        'format': 'png'
                    });
                }
            });

        var newUrl = Qiniu.pipeline(fopArr, key);

        var newImg = new Image();
        img.attr('src', 'images/loading.gif');
        newImg.onload = function () {
            img.attr('src', newUrl);
            img.parent('a').attr('href', newUrl);
        };
        newImg.src = newUrl;
        return false;
    });
});
