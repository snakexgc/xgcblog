export default {
  async fetch(request, env) {
    // 默认返回静态资源
    return env.ASSETS.fetch(request);
  },
};