function success(data) {
  return {
    code: 200,
    msg: "success",
    data,
  };
}

function fail(msg,code=500) {
  return {
    code,
    msg: msg || "请求失败",
  };
}

// 返回上传成功的信息
function uploadSuccess(file) {
  return {
    success: true,
    message: "文件上传成功",
    file: {
      name: file.name,
      size: file.size,
      type: file.type,
      path: filePath,
    },
  };
}

module.exports = {
  success,
  fail,
  uploadSuccess,
};
