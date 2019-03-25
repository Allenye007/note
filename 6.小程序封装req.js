// req模块:

// 对请求进行封装
let token = ''; // node用
let uid = ''; // java用

const host = require('../config.js').host;
const jHost = require('../config.js').host;
// 返回数据格式
/*
  {
    error_code: 0,
    error_msg: 'ok',
    data: 1
  }
*/

const req = (options) => {
  return new Promise((resolve, reject) => {
    let reqToken = '';
    if (options.token) {
      const reqIn = () => {
        reqToken = token;
        if (reqToken) {
          wx.request({
            method: options.method,
            url: options.host + options.path,
            data: options.params,
            header: {
              'x-access-token': reqToken
            },
            dataType: 'json',
            success: (res) => {
              if (res.statusCode == 200) {
                if (res.data.error_code) {
                  reject(res.data);
                } else {
                  resolve(res.data.data);
                }
              } else {
                reject(res.data);
              }
            },
            fail: (res) => {
              reject(res);
            }
          })
        } else {
          setTimeout(() => {
            reqIn();
          }, 50)
        }
      };
      reqIn();
    } else {
      wx.request({
        method: options.method,
        url: options.host + options.path,
        data: options.params,
        header: {
          'x-access-token': reqToken
        },
        dataType: 'json',
        success: (res) => {
          if (res.statusCode == 200) {
            if (res.data.error_code) {
              reject(res.data);
            } else {
              resolve(res.data.data);
            }
          } else {
            reject(res.data);
          }
        },
        fail: (res) => {
          reject(res);
        }
      })
    }
  });
};

module.exports = (options, signin, code) => {
  if (signin) {
    // 登录接口
    options = {
      host: jHost,
      path: '/v1/user/login/wxa',
      token: false,
      params: {
        code: code,
        app_type: 'wxa',
      },
      method: 'POST',
    }
    return req(options)
      .then((result) => {
        // 返回数据
        token = result.token;
        uid = result.memberid;
        return Promise.resolve(result);
      })
      .catch(err => {
        // 遇到错误
        return Promise.reject(err)
      });
  } else {
    // 其他接口
    return req(options);
  }
};







// 其他模块

const req = require('../request.js');
const host = require('../../config.js').javaHost;
const nodeHost = require('../../config.js').host;

module.exports = {
  // 获得充值模板列表
  tplList: () => {
    let options = {
      host: nodeHost,
      path: '/v1/charge/tpl/list',
      token: true,
      method: 'POST',
    }
    return req(options);
  }
}









// index模块

// login接口req，请求体封装
const req = require('./request.js');

// 具体接口实现
const user = require('./user/user.js');
const page = require('./page/page.js');

module.exports = {
  // 登录
  signIn: (code) => {
    return req('', 1, code);
  },
  // 用户相关接口
  user,
  page,
}
