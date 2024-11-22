const fs = require('fs');
const https = require('https'); // 如果图片URL是HTTPS，否则使用http模块
const path = require('path');

// 图片URL和本地保存路径
const imageUrlList =
  ['https://img.kancloud.cn/0b/36/0b365eaa878501ec91e0b0be3f6d1238_440x842.png',
    'https://img.kancloud.cn/fb/3b/fb3b196cc98e89b0869a4c7259da6c76_1080x585.png',
    'https://img.kancloud.cn/c0/09/c009e16150be055e9e537ec5eb67557a_720x1352.png',
    'https://img.kancloud.cn/8d/01/8d016e321478fcee1c1fa91765012efa_456x967.png',
    'https://img.kancloud.cn/0d/57/0d5785a6ada078eb446cf0fb9ce44b1e_440x918.png']




imageUrlList.forEach(imageUrl => {
  // 使用https模块下载图片

  const localFilePath = path.join(__dirname, 'blog',
    (new Date().getTime() + '.png')
  );
  
  
  
  // 创建文件流
  const fileStream = fs.createWriteStream(localFilePath);

  
  https.get(imageUrl, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download image, status code: ${response.statusCode}`);
      return;
    }

    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
    })
  })
})


// // 使用https模块下载图片
// https.get(imageUrl, (response) => {
//   if (response.statusCode !== 200) {
//     console.error(`Failed to download image, status code: ${response.statusCode}`);
//     return;
//   }

//   response.pipe(fileStream);

//   fileStream.on('finish', () => {
//     fileStream.close();
//     console.log('Image downloaded successfully.');
//   });

//   response.on('error', (err) => {
//     console.error('Error during download:', err);
//     fs.unlink(localFilePath, () => { }); // 删除部分下载的文件
//   });
// });

// fileStream.on('error', (err) => {
//   console.error('Error writing to file:', err);
//   fs.unlink(localFilePath, () => { }); // 删除部分下载的文件
// });