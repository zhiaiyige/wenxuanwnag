"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function cookie(key, value, options) {
  // 如果不传递options参数的话，options为undefined, 如果说undefined进行取出运算会导致报错发生; 
  // 给options设置默认值; 
  if (!options) {
    // undefined , null , 0 , false
    options = {};
  } // 因为 expires过期事件是需要日期对象的所以需要提前判断,是不是需要创建这个日期对象; 


  if (options.expires) {
    var d = new Date(); // 校准日期; 

    d.setHours(d.getHours() - 8); // 设置日期;  我们以天为单位进行cookie有效时长设置; 

    d.setDate(d.getDate() + options.expires);
  } // 根据 key , value , options 去拼接一个字符串 ;


  var str = [key, "=", value, // options里面的参数有三个， 如果这个参数存在我们就拼接，如果不存在我们就忽略; 
  options.path ? ";path=" + options.path : "", options.domain ? ";domain=" + options.domain : "", options.expires ? ";expires=" + d : ""].join("");
  document.cookie = str;
}

function removeCookie(name, path) {
  var options = {
    expires: -1
  }; // 如果有path就把path加入到options对象之中; 
  // 反之则什么都不做; 

  path ? options.path = path : "";
  cookie(name, null, options);
}

function getCookie(name) {
  var cookie_array = document.cookie.split("; ");

  for (var i = 0; i < cookie_array.length; i++) {
    var item_array = cookie_array[i].split("=");

    if (item_array[0] === name) {
      return item_array[1];
    }
  }

  return "";
}

function xhr(options) {
  // 创建一个promise对象; 
  return new Promise(function (resolve) {
    var default_options = {
      type: "GET",
      data: {},
      callback: function callback() {}
    };

    for (var attr in options) {
      default_options[attr] = options[attr];
    }

    options = default_options;
    var data_string = "";

    for (var attr in options.data) {
      data_string += "&" + attr + "=" + options.data[attr];
    }

    if (options.type === "GET" && !/\?/.test(options.url)) {
      data_string = data_string.replace("&", "?");
    }

    if (options.type === "GET") {
      options.url += data_string;
    }

    if (options.type === "POST") {
      data_string = data_string.slice(1);
    }

    var xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url);

    if (options.type === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    xhr.send(options.type === "GET" ? null : data_string);

    xhr.onload = function () {
      if (/^2\d{2}$/.test(xhr.status)) {
        options.callback(xhr.responseText); // 找到异步代码执行resolve()改变promise状态; 

        resolve(xhr.responseText);
      }
    };
  });
}

function jsonp(options) {
  return new Promise(function (resolve) {
    // 创建script;
    var script = document.createElement("script");

    script.onload = function () {
      this.parentNode.removeChild(this);
    }; // 把变量声明提前， 并且拼接进data之中方便使用; 


    var cb_name = "bk" + Date.now() + "_" + Math.random().toString().slice(2);
    options.data[options.jsonp] = cb_name;
    var data_string = "";

    for (var attr in options.data) {
      data_string += "&" + attr + "=" + options.data[attr];
    }

    if (/\?/.test(options.url)) {
      options.url += data_string;
    } else {
      options.url += data_string.replace(/^&/, "?");
    } // 给url上添加对应的函数名; 


    script.src = options.url;
    document.body.appendChild(script); // - 创建一个绝对不会重复的全局函数;
    // 全局函数的调用; 

    window[cb_name] = function (res) {
      resolve(res);
      typeof options.callback === "function" ? options.callback(res) : ""; // 清除掉这个函数; 

      window[cb_name] = null;
    };
  });
}

var Model = function () {
  var instance = null;
  return function () {
    if (instance === null) {
      instance = this;
      this.init();
      this.bindEvent();
    } else {
      return instance;
    }
  };
}();

Model.prototype.init = function () {
  this.mask = document.createElement("div");
  this.mask.style.cssText = "width:100%;height:100%;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.3);display:none";
  document.body.appendChild(this.mask);
};

Model.prototype.bindEvent = function () {
  var _this = this;

  this.mask.onclick = function () {
    _this.hide();
  };
};

Model.prototype.show = function (html) {
  // html结构是用来自己变成的弹出的结构; 
  if (!html) return false;
  this.mask.innerHTML = html;
  this.mask.style.display = "block";
};

Model.prototype.hide = function () {
  this.mask.style.display = "none";
};

function Compose() {
  // task : 任务|指令;  =>  函数; 
  // 这就是村函数的数组; 
  this.task_list = [];
} // 向列表之中添加方法; 


Compose.prototype.add = function (fn) {
  this.task_list.push(fn);
}; // 执行列表之中的方法; 


Compose.prototype.fire = function () {
  this.task_list.forEach(function (fn) {
    fn();
  });
};

var Observer = /*#__PURE__*/function () {
  function Observer() {
    _classCallCheck(this, Observer);

    // 需要一个容器 
    // 装粉丝 (观察者);
    // 数组解决不了批量分类的问题; 
    // { 类别 : [粉丝1,粉丝2,粉丝3] , 类别2 : [粉丝2，粉丝3] }
    this.fans_list = {};
  } // 订阅功能; 


  _createClass(Observer, [{
    key: "on",
    value: function on(callback) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
      // 向fans_list之中添加数据分成两种情况; 
      // - 这个类别不存在 : 建立数组之后在进行数据放入; 
      // - 这个类别存在 : 直接进行放入; 
      if (!this.fans_list[type]) this.fans_list[type] = []; // * 经过了上面一行代码， 我操作的this.fans_list[type]一定是数组; 

      this.fans_list[type].push(callback);
    } // 触发功能; 

  }, {
    key: "emit",
    value: function emit() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
      if (!(this.fans_list[type] instanceof Array)) return false;
      this.fans_list[type].forEach(function (callback) {
        callback(msg);
      });
    } // 移除功能 

  }, {
    key: "off",
    value: function off(callback) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
      if (!(this.fans_list[type] instanceof Array)) return false;
      this.fans_list[type].splice(this.fans_list[type].indexOf(callback), 1);
    }
  }]);

  return Observer;
}();