const fs = require('fs');
const https = require('https'); // 如果图片URL是HTTPS，否则使用http模块
const path = require('path');

// 图片URL和本地保存路径
const imageUrl = 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77e0c57214c341bdb22730b58a0ff357~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2672&h=1471&s=603309&e=png&a=1&b=f9f8f8';
const localFilePath = path.join(__dirname, 'blog', 'image.png');



// 创建文件流
const fileStream = fs.createWriteStream(localFilePath);

// 使用https模块下载图片
https.get(imageUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download image, status code: ${response.statusCode}`);
    return;
  }

  response.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Image downloaded successfully.');
  });

  response.on('error', (err) => {
    console.error('Error during download:', err);
    fs.unlink(localFilePath, () => {}); // 删除部分下载的文件
  });
});

fileStream.on('error', (err) => {
  console.error('Error writing to file:', err);
  fs.unlink(localFilePath, () => {}); // 删除部分下载的文件
});