// 本地相册选择图片
wx.chooseImage({
  success: res => {
    //console.log(res.tempFilePAths[0]);

    //读取本地文件内容
    wx.getFileSystemManager().readFile({
      //要读取的文件的路径
      filePath:res.tempFilePaths[0],
      encoding:'base64',//字符编码
      success:res => {
        console.log(res);
        console.log('data:image/jpg;base64,'+res.data);
      }

    })
  }
})