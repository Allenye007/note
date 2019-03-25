// 设置路由前置守卫
router.beforeEach((to, from, next) => {
  // 发送请求前设置加载条
  // NProgress.start();
  // 判断path  如果是登录就不验证token
  if (to.name === 'Login') {
    next();// next  是向下执行
  } else {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 如果没有携带token 返回登录页面
      router.push({ name: 'Login' });
      // 提示信息
      Message.warning('请登录');
      return;
    }
    // 继续向下执行
    next();
  }
});
// 后置守卫   没有next()
router.afterEach((to, from) => {
  // 相应前执行完加载条
  // NProgress.done();
});
export default router;




// 路由守护，进行登录判断
router.beforeEach((to, from, next) => {
  var userInfo = sessionStorage.getItem('user');//获取浏览器缓存的用户信息
  if (userInfo) {
    // 如果浏览器缓存了用户信息直接进入默认首页
    next();
  } else {
    if (to.path === '/login') {
      //如果是登录页面路径，就直接next()
      next();
    } else {
      //不然就跳转到登录；
      next('/login');
    }
  }
});