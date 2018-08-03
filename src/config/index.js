const Main = {
  target: process.env.NODE_ENV !== 'production' ? 'http://100.5.60.54' : 'http://toupiao.cpsdc.com.cn', //鐩®鏍囩綉绔 http://toupiao.cpsdc.com.cn
  constant: {
    cookie: 'VUE_ELEMENT'
  },
  route: {
    login: '/'
  }
};

export default Main;
