
// 设置请求头
export const handleRequestHeader = (config) => {
  config['xxx'] = 'xxx';
  return config;
}

// 设置token
export const handleAuth = (config) => {
  config.headers['token'] = localStorage.getItem('token') || '';
  return config;
}

// 网络错误处理
export const handleNetworkError = (errStatus) => {
  let errorMessage = '网络错误';
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errorMessage = '请求语法错误';
        break;
      case 401:
        errorMessage = '未授权，请登录';
        break;
      case 403:
        errorMessage = '拒绝访问';
        break;
      case 404:
        errorMessage = '请求地址出错';
        break;
      case 405:
        errorMessage = '请求方法未允许';
        break;
      case 408:
        errorMessage = '请求超时';
        break;
      case 500:
        errorMessage = '服务器内部错误';
        break;
      case 501:
        errorMessage = '服务未实现';
        break;
      case 502:
        errorMessage = '网关错误';
        break;
      case 503:
        errorMessage = '服务不可用';
        break;
      case 504:
        errorMessage = '网关超时';
        break;
      case 505:
        errorMessage = 'HTTP版本不受支持';
        break;
      default:
        break;
    }
  }
  return errorMessage;
}

// 权限错误处理
export const handleAuthError = (errno) => {
  const authErrMap = {
    '10001': '登录过期，请重新登录',
    '10002': '您太久没登录，请重新登录',
    '10003': '登录失败，请检查用户名或密码',
  }
  if (authErrMap.hasOwnProperty(errno)) {
    return authErrMap[errno];
  }
  return true;
}

// 普通错误处理
export const handleGeneralError = (errno, errmsg) => {
  if (errno !== '0') {
		meessage.error(err.errmsg)
		return false
	}
	return true
}
