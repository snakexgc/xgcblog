export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. 获取静态资源
    let response = await env.ASSETS.fetch(request);

    // 2. 自定义 404 处理 (优化体验)
    // 如果资源不存在，尝试返回自定义的 404.html
    if (response.status === 404) {
      const notFoundUrl = new URL('/404.html', request.url);
      const notFoundResponse = await env.ASSETS.fetch(notFoundUrl);
      if (notFoundResponse.ok) {
        // 使用 404 内容，但保持 404 状态码
        return new Response(notFoundResponse.body, {
          status: 404,
          headers: notFoundResponse.headers
        });
      }
    }

    // 3. 性能优化：设置浏览器缓存 (Cache-Control)
    // 必须重新创建 Response 对象才能修改 Header
    response = new Response(response.body, response);

    // 静态资源 (图片, CSS, JS, 字体) -> 强缓存 1 年
    // 这些文件通常文件名带哈希或不常变动，可以长时间缓存
    if (/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i.test(url.pathname)) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } 
    // HTML 页面 -> 短缓存 (例如 10 分钟) 或 协商缓存
    // 确保用户能及时看到新发布的文章
    else {
      response.headers.set('Cache-Control', 'public, max-age=600, must-revalidate');
    }

    return response;
  },
};