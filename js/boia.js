var Boia = Boia || {};

//Object.prototype.toString.call([]).slice(8,-1)
//B.Lang.type  判断类型
(function(B) {

    var L = {},
    
    TYPES = {
        'undefined'        : 'undefined',
        'number'           : 'number',
        'boolean'          : 'boolean',
        'string'           : 'string',
        '[object Function]': 'function',
        '[object RegExp]'  : 'regexp',
        '[object Array]'   : 'array',
        '[object Date]'    : 'date',
        '[object Error]'   : 'error'
    },

    SUBREGEX = /\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g,

    WHITESPACE = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF",
    WHITESPACE_CLASS = "[\x09-\x0D\x20\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+",
    TRIM_LEFT_REGEX  = new RegExp("^" + WHITESPACE_CLASS),
    TRIM_RIGHT_REGEX = new RegExp(WHITESPACE_CLASS + "$"),
    TRIMREGEX        = new RegExp(TRIM_LEFT_REGEX.source + "|" + TRIM_RIGHT_REGEX.source, "g");

    L.isBoolean = function(o) {
        return typeof o === 'boolean';
    };

    L.isDate = function(o) {
        return L.type(o) === 'date' && o.toString() !== 'Invalid Date' && !isNaN(o);
    };

    L.isArray = Array.isArray || function(o) {
        return L.type(o) === 'array';
    };

    L.isFunction = function(o) {
        return L.type(o) === 'function';
    };

    L.isNull = function(o) {
        return o === null;
    };

    L.isNumber = function(o) {
        return typeof o === 'number' && isFinite(o);
    };

    L.isObject = function(o, failfn) {
        var t = typeof o;
        return (o && (t === 'object' ||
            (!failfn && (t === 'function' || L.isFunction(o))))) || false;
    };

    L.isRegExp = function(value) {
        return L.type(value) === 'regexp';
    };

    L.isString = function(o) {
        return typeof o === 'string';
    };

    L.isUndefined = function(o) {
        return typeof o === 'undefined';
    };

    L.now = Date.now || function () {
        return new Date().getTime();
    };

    L.sub = function(s, o) {
        return s.replace ? s.replace(SUBREGEX, function (match, key) {
            return L.isUndefined(o[key]) ? match : o[key];
        }) : s;
    };


    L.trim = String.prototype.trim && !WHITESPACE.trim() ? function(s) {
            return s && s.trim ? s.trim() : s;
        } : function (s) {
            try {
                return s.replace(TRIMREGEX, '');
            } catch (e) {
                return s;
            }
    };

    L.type = function(o) {
        return TYPES[typeof o] || TYPES[Object.prototype.toString.call(o)] || (o ? 'object' : 'null');
        // return Object.prototype.toString.call(o).match(/\[object (.*?)\]/)[1].toLowerCase();
    };

    B.Lang = L;

})(Boia);

// =Global method
(function(B) {
    'use strict';

    var hasOwn   = Object.prototype.hasOwnProperty,
        OP = Object.prototype,
        isObject = B.Lang.isObject;

    B.each = function(arr,fn,context){

        if(Array.prototype.forEach){
            arr.forEach(fn,context)
        }
    };

    B.bind = function (fn,context, args){
        return fn.bind(context,args);
    };

    B.one = function (selector) {

        var node = null,
            d = document;

        node = d.querySelector(selector);

        return node;
    };

    B.all = function (selector) {

        var nodeList = null,
            d = document;

        nodeList = d.querySelectorAll(selector);

        return nodeList;
    };

    B.on = function (type, fn, selector) {

        B.one(selector) && B.one(selector).addEventListener(type, fn);
    };

    B.extend = function(r, s, px, sx) {
        if (!s || !r) {
            throw new Errow('请输入基类和父类');
        }
        
        //兼容版本
        /*Object.create = Object.create || function (o) {

            function F() {}
            F.prototype = o;
            return new F();

        };*/

        var sp = s.prototype, rp = Object.create(sp);
        r.prototype = rp;
        
        // 因为原型被覆盖.所以原型的prototype指向了F 要修正回来
        // 具体constructor的原理可参考http://www.cnblogs.com/objectorl/archive/2009/09/02/1632715.html
        rp.constructor = r;

        // 将子类的自定义属性superclass指向父类的原型  这样就方便引用到原型实例
        // r.superclass.constructor.call(this, options) 就可以实现属性冒充.继承父类的构造属性
        r.superclass = sp;
     
        // 如果父类不是Object但constructor却指向了Object, 表示父类的原型也被覆盖了 所以要保证正确
        // 这样r.superclass.constructor才能正确指向父类
        if (s != Object && sp.constructor == OP.constructor) {
            sp.constructor = s;
        }
     
        // add prototype overrides
        if (px) {
            B.mix(rp, px, true);
        }
     
        // add object overrides
        if (sx) {
            B.mix(r, sx, true);
        }
     
        return r;
    };

    B.mix = function(receiver, supplier, overwrite, whitelist, mode, merge) {
        var alwaysOverwrite, exists, from, i, key, len, to;
     
        if (!receiver || !supplier) {
            return receiver || B;
        }
     
        if (mode) {
            if (mode === 2) {
                B.mix(receiver.prototype, supplier.prototype, overwrite,
                        whitelist, 0, merge);
            }
     
            from = mode === 1 || mode === 3 ? supplier.prototype : supplier;
            to   = mode === 1 || mode === 4 ? receiver.prototype : receiver;
     
            if (!from || !to) {
                return receiver;
            }
        } else {
            from = supplier;
            to   = receiver;
        }
     
        alwaysOverwrite = overwrite && !merge;
     
        if (whitelist) {
            for (i = 0, len = whitelist.length; i < len; ++i) {
                key = whitelist[i];

                if (!hasOwn.call(from, key)) {
                    continue;
                }
     
                exists = alwaysOverwrite ? false : key in to;
     
                if (merge && exists && isObject(to[key], true)
                        && isObject(from[key], true)) {

                    B.mix(to[key], from[key], overwrite, null, 0, merge);
                } else if (overwrite || !exists) {

                    to[key] = from[key];
                }
            }
        } else {
            for (key in from) {

                if (!hasOwn.call(from, key)) {
                    continue;
                }
     
                exists = alwaysOverwrite ? false : key in to;
     
                if (merge && exists && isObject(to[key], true)
                        && isObject(from[key], true)) {
                    B.mix(to[key], from[key], overwrite, null, 0, merge);
                } else if (overwrite || !exists) {
                    to[key] = from[key];
                }
            }
            /*if (B.Object._hasEnumBug) {
                B.mix(to, from, overwrite, Y.Object._forceEnum, mode, merge);
            }*/
        }
     
        return receiver;
    };

    /**
     * [getViewport 获得视口宽高]
     * @return {[Object]} [包含高宽的对象]
     */
    B.getViewport = function () {

        var width, height;
        
        if (d.compatMode === 'BackCompat'){
            width = d.body.clientWidth;
            height = d.body.clientHeight;
        }else {
            width = d.documentElement.clientWidth;
            height = d.documentElement.clientHeight;
        }

        return {
            width: width,
            height: height
        }
    }; 

    B.parseHashUrl = function (){
        var hash = location.hash.slice(1),
            arr = hash.split('&'),obj = {};

        arr.forEach(function (item,i){
            var str = item.split('=');
            obj[str[0]] = str[1];
        });

        return obj;
    };

})(Boia);

// =EventTarget
(function(B) {
    var EventTarget;

    EventTarget = B.EventTarget = function(){
        this.handlers={};  //函数处理器数组 
    };

    B.EventTarget.prototype = {
        constructor: EventTarget,

        /**
         * [addHandler 添加一个事件处理器]
         * @param {[type]} type    [description]
         * @param {[type]} handler [description]
         */
        addHandler: function(type,handler){
            if(typeof this.handlers[type] == "undefined"){ 
                this.handlers[type] = []; 
            } 
            this.handlers[type].push(handler); 
        }, 
        
        /**
         * [fire 触发事件]
         * @param  {[Object]} event [事件对象]
         * @return {[type]}       [description]
         */
        fire: function(event){

            if(!event.target){ 
                event.target = this; 
            } 
            if(this.handlers[event.type] instanceof Array){ 
                var handlers=this.handlers[event.type]; 
                for(var i = 0,len = handlers.length;i < len;i++){ 
                    handlers[i](event); 
                } 
            } 
        }, 

        /**
         * [removeHandler 删除指定的事件]
         * @param  {[string | array]} type    [事件类型]
         * @param  {[string]} handler [description]
         * @return {[type]}         [description]
         */
        removeHandler: function(type,handler){
            if(this.handlers[type] instanceof Array){ 
                var handlers = this.handlers[type]; 

                for(var i = 0,len = handlers.length;i < len;i++){ 
                    if(handlers[i] === handler){ 
                        break; 
                    } 
                } 

                //删除指定的handler处理器 
                handlers.splice(i,1);
            }
        }
    };

})(Boia);

// =node
(function(B) {
    'use strict';

    var d = document;
    var isNumber = B.Lang.isNumber;

    Element.prototype.one = function(selector) {

        var node = null;

        node = this.querySelector(selector);

        return node;
    };

    Element.prototype.all = function(selector) {

        var nodeList = null;

        nodeList = this.querySelectorAll(selector);

        return nodeList;
    };

    Element.prototype.hasClass = function(cName) {

        return !!this.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    };

    Element.prototype.addClass = function(cName) {

        if (!this.hasClass(cName)) {
            this.className += " " + cName;
        };

        return this;
    };

    Element.prototype.removeClass = function(cName) {

        if (this.hasClass(cName)) {

            this.className = this.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
        };

        return this;
    };

    Element.prototype.toggleClass = function(cName){

        if(this.hasClass(cName)) {
            this.removeClass(cName)
        }else {
            this.addClass(cName);
        }

        return this;
    };

    Element.prototype.replaceClass = function(oldName,newName) {

        this.removeClass(oldName);
        this.addClass(newName);

        return this;
    };

    Element.prototype.on = function(type, fn, context) {
        var context = context || this;

        this.addEventListener(type, fn, context);

        return this;
    };

    /*1. clientHeight和clientWidth用于描述元素内尺寸，
        是指 元素内容+内边距 大小，
        不包括边框（IE下实际包括）、外边距、滚动条部分
    2. offsetHeight和offsetWidth用于描述元素外尺寸，
        是指 元素内容+内边距+边框，不包括外边距和滚动条部分
    3. clientTop和clientLeft返回内边距的边缘和边框的外边缘之间的水平和垂直距离，
        也就是左，上边框宽度
    4. offsetTop和offsetLeft表示该元素的左上角（边框外边缘）
        与已定位的父容器（offsetParent对象）左上角的距离
    5. offsetParent对象是指元素最近的定位（relative,absolute）祖先元素，
        递归上溯，如果没有祖先元素是定位的话，会返回null*/
    Element.prototype.eleWidth = function() {

        var width = 0;

        width = this.offsetWidth;

        return width;
    };      

    Element.prototype.eleHeight = function() {

        var height = 0;

        height = this.offsetHeight;

        return height;
    };         

    /**
     * [getX 获得元素x坐标]
     * @return {[number]} [x坐标]
     */
    Element.prototype.getX = function() {

        var actualLeft = this.offsetLeft,
            current = this.offsetParent;

        while(current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    };    


    /**
     * [getY 获得元素y坐标]
     * @return {[number]} [y坐标]
     */
    Element.prototype.getY = function() {

        var actualTop = this.offsetTop,
            current = this.offsetParent;

        while(current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    };          

    Element.prototype.getXY = function() {

        var x,y;

        x = this.getX();

        y = this.getY();

        return {x: x,y: y};
    };  

    /**
     * [css description]
     * @param  {[string]} styleName [description]
     * @param  {[string]} val       [description]
     * @return {[type]}           [description]
     */
    Element.prototype.css = function(styleName, val) {
        if(isNumber(val)) val = val.toString();

        if(val) {
            this.style[styleName] = val;
        }else {
            return getComputedStyle(this)[styleName];
        }

        return this;

    };     

    Element.prototype.hide = function() {

        this.addClass('hide');

        return this;
        
    };  

    Element.prototype.show = function() {

        this.removeClass('hide');

        return this;
        
    };      

    Element.prototype.text = function(content) {

        if(content) {
            this.innerText = content;
        }else {
            return this.textContent;
        }

        return this;
        
    };   

    Element.prototype.html = function(content) {

        if(content || (content == '')) {
            this.innerHTML = content;
        }else {
            return this.innerHTML;
        }

        return this;
        
    };          

    Element.prototype.append = function(content) {

        var div = document.createElement('div').cloneNode(), nodes = null,
            fragment = document.createDocumentFragment();

        div.innerHTML = content;

        nodes = div.childNodes;
        for(var i = 0,length = nodes.length;i < length;i++){
            fragment.appendChild(nodes[i].cloneNode(true));
        }

        this.appendChild(fragment);

        nodes = null;
        fragment = null;       

        return this; 
    };     

     Element.prototype.prepend = function(content) {

        var divTemp = document.createElement('div'), nodes = null
            , fragment = document.createDocumentFragment();

        divTemp.innerHTML = content;
        nodes = divTemp.childNodes;
        for (var i=0, length=nodes.length; i<length; i+=1) {
           fragment.appendChild(nodes[i].cloneNode(true));
        }
        // 插入到容器的前面 - 差异所在
        this.insertBefore(fragment, this.firstChild);
        // 内存回收？
        nodes = null;
        fragment = null;  
    };

    /**
     * @method  addRow 增加一行，修改innerHTML不能添加表格行
     * @param {[String]} content html字符串
     */
    Element.prototype.addRow = function(content) {

        var f = content.indexOf('>'), l = content.lastIndexOf('</'),
            tag = content.substr(l+2, content.length-l-3), e, s;

        if (tag == 'tr') e = this.insertRow(-1);
        else {
            e = document.createElement(tag);
            this.appendChild(e, this);
            e.innerHTML = content.substr(f+1, l-f-1);
        }
        
        s = content.substr(1, f-1).split(' ');
        for (var i=0; i<s.length; i++) {
            var ss = s[i].split('=');
            if (ss.length==1) continue;
            e.setAttribute(ss[0], strip(ss[1]));
        }
        
        var ti = content.substr(f+1, l-f-1);
        if (content.substr(l+2, content.length-l-3) == 'tr') {
            var tf;
            while( (tf = ti.indexOf("<td>")) != -1) {
                ti = ti.substr(tf+4, ti.length-tf-4);
                var te = e.insertCell(-1);
                tl = ti.indexOf("</td>");
                te.innerHTML = ti.substr(0, tl);
                ti = ti.substr(tl, ti.length-tl);
            }
        } 
        
        return e;
    
        function strip(ss) {
            if (ss[0]=='\''|| ss[0] == "\"") 
                return ss.substr(1, ss.length-2);
        }
    };      

})(Boia);

// =NodeList
(function(B) {
    'use strict';

    /**
     * [removeClass 给nodelist删除类名]
     * @param  {[string]} cName [类名]
     * @return {[NodeList]}      
     */
    NodeList.prototype.removeClass = function(cName) {

        Array.prototype.forEach.call(this, function(element) {
            element.removeClass(cName);
        });

        return this;
    };

    /**
     * @method  addClass 给nodelist加类
     * @param {[string]} cName [类名]
     * @return  {[NodeList]}
     */
    NodeList.prototype.addClass = function(cName) {

        Array.prototype.forEach.call(this, function(element) {
            element.addClass(cName);
        });

        return this;
    };

    /**
     * @method  on 处理nodelist的事件
     * @param  {[string]}   type 事件类型
     * @param  {Function} fn   事件处理函数
     * @return  {[NodeList]}
     */
    NodeList.prototype.on = function(type, fn, context) {
        var context = context || this;

        Array.prototype.forEach.call(this, function(element) {
            element.on(type, fn, context);
        });

        return this;
    };

    /**
     * @method getCheckValue 获得checkbox选中的值
     * @return {[String]} 返回逗号隔开的字符串
     */
    NodeList.prototype.getCheckValue = function() {
        var arr = [];

        Array.prototype.forEach.call(this, function(list) {
            if(list.checked){
                arr.push(list.value);
            }
        });

        return arr.toString();
    };    

})(Boia);

// =Anim
(function(B){

    var _timer,_running = null;

    B.Anim = function(config){

        this.node = B.one(config.node) || null;
        this.to = config.to || {};
        this.from = config.from || {};
        this.easing = config.easing || B.Anim.DEFAULT_EASING;
        this.running = false;
        this.paused = false;
        this.reverse = config.reverse || false;
        this.duration = config.duration || 2;
        this.startTime = 0;
    };    

    if(B.Tween) {
        B.Anim.DEFAULT_EASING = B.Tween.Linear
    }

    B.Anim._intervalTime = 20;

    B.Anim.RE_DEFAULT_UNIT = /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;

    B.Anim._startTimer = function() {
        if (!_timer) {
            _timer = setInterval(B.Anim._runFrame, B.Anim._intervalTime);
            // _timer = webkitRequestAnimationFrame();
        }
    };

    B.Anim._stopTimer = function() {
        clearInterval(_timer);
        _timer = 0;
    };

    B.Anim._runFrame = function(){
        var done = false;

        if(_running._runFrame){
            done = false;
            _running._runFrame();
        }

        if(done) {
            B.Anim._stopTimer();
        }
    };

    B.Anim.prototype = {

        run: function(){

            if(this.paused) {
                this._resume();
            }else if(!this.running){
                this._start();
            }

            return this;
        },

        _start: function(){
            _running = this;

            if(!this.paused) {
                this._initAnimAttr();
            }
            
            B.Anim._startTimer();
        },

        _resume: function(){
            _running = this;
            B.Anim._startTimer();
        },

        _paused: function(){
            this.paused = true;
            _running = null;

            B.Anim._stopTimer();
        },

        _runFrame: function(){

            
            this.startTime++;

            B.each(this._runtimeAttr.initStatus, function(item,index){

                midVal = this.easing(this.startTime, item.iVal, item.cVal, this._runtimeAttr.duration);

                if(this.startTime <= this._runtimeAttr.duration) {
                    this._setStyle(item.name,midVal);
                }else {
                    _running = null;
                    this._paused();
                }
            
            },this);
        },

        _setStyle: function(name,val){
            val += '';

            if(B.Anim.RE_DEFAULT_UNIT.test(name)) {
                val += 'px';
            }
            
            this.node.css(name,val);
        },

        /**
         * @method  _initAnimAttr 初始化动画属性
         * @return {[type]} [description]
         */
        _initAnimAttr: function(){
            var  attr = {}, 
                reverse = this.reverse, 
                from = this.from || {},
                to = this.to || {},initStatus = [],
                duration = this.duration,
                node = this.node;

            for(p in to) {
                var obj = {};
                obj.name = p;

                if(p in from) {
                    obj.iVal = from[p];
                    this._setStyle(p, obj.iVal);

                }else {
                    obj.iVal = parseFloat(node.css(p));
                }
                
                obj.eVal = parseFloat(to[p]);
                obj.cVal = obj.eVal-obj.iVal;
                initStatus.push(obj);
            }

            attr.initStatus = initStatus;
            attr.duration = duration;

            this._runtimeAttr = attr;
        }
    };

})(Boia);

// =Widget
(function(B) {
    'use strict';

    B.Widget = function(config) {

        this.width = config.width || 0;
        this.height = config.height || 0;

        var boundingBoxCls = config.boundingBox || '.widget';

        this.boundingBox = this.boundingBox || B.one(boundingBoxCls);

        this.visible = config.visible || true;

        this.strings = config.strings || 'widget';

        this.initializer(config);
    };

    B.Widget.NAME = "widget";

    B.Widget.prototype = {
        initializer: function(config){
            this.bindUI();
        },
        render: function(){
        },
        bindUI: function(){

        },
        size: function(){
            return {
                width: this.boundingBox.eleWidth(),
                height: this.boundingBox.eleHeight()
            }
        }
    };

})(Boia);

(function(B){

    var TestWidget = function(config){
        config = config || {};

        //调用父类的构造函数
        TestWidget.superclass.constructor.call(this, config);
    };

    B.extend(TestWidget, B.Widget, {
        say: function(){
            console.log('say');
        }
    });

    B.TestWidget = TestWidget;

})(Boia);

// =Tabview
(function(B) {
    'use strict';

    var DOT = '.',
        NAV_TABS = '.nav-tabs',
        CONTENT_ITEM = '.content-item',
        UL = 'nav-tabs',
        TAB_HIDDEN = 'tab-hidden',
        ACTIVE = 'active';

    B.TabView = function(config) {

        this.activeTab = null;
        this.boundingBox = config.boundingBox || '';
        this.contentItem = B.all(CONTENT_ITEM);
        this.tabs = B.one(DOT + UL).all('li');

        this.initializer();

    };

    B.TabView.prototype = {

        initializer: function() {
            this.bindUI();
        },

        render: function() {

            return this;
        },

        bindUI: function() {
            var boundingBox = B.one(this.boundingBox);

            boundingBox.all(NAV_TABS).on('click', this._tabClick.bind(this));
        },

        /**
         * [_tabClick ]
         * @param  {[Object]} 	         event
         * @return {[undefined]}       处理点击tab
         */
        _tabClick: function(event) {
            var target = event.target,
                href, element;

            event.preventDefault();

            element = this._clickList(target);
            href = element.href.split('#')[1];

            this._changeStyle(href);
        },

        /**
         * [_clickList ]
         * @param  {[node]} 		target
         * @return {[node]}        返回点击的元素
         */
        _clickList: function(target) {
            var tagName = target.tagName,
                element, list = target;

            if (tagName === 'A') {
                element = target;
                list = target.parentNode;
            } else {
                element = target.one('a');
            }

            this.activeTab = list;

            return element;
        },

        /**
         * [_changeStyle description]
         * @param  {[string]} 	href
         * @return {[TabView]}      点击tab改变style
         */
        _changeStyle: function(href) {
            var instance = this;

            Array.prototype.forEach.call(this.contentItem, function(item) {

                if (href === item.id) {
                    if (item.hasClass(TAB_HIDDEN)) {
                        instance.tabs.removeClass(ACTIVE);
                        instance.activeTab.addClass(ACTIVE);
                        instance.contentItem.addClass(TAB_HIDDEN);
                        item.removeClass(TAB_HIDDEN);
                    }
                }
            });

            return this;
        }
    };

})(Boia);

// =Tooltip
(function(B) {
    'use strict';

    var DOT = '.',
        TOOLTIP = 'tooltip',
        TOOLTIP_HIDDEN = 'tooltip-hidden',
        TOOLTIP_INNER = 'tooltip-inner';

    B.Tooltip = function(config){

        this.trigger = config.trigger || '';
        this.position = config.position || 'bottom';
        this.tipText = config.tipText || '这是一个工具条';

        this._id = 'tooltip_'+Math.round(Math.random()*100000);

        this.template = '<div id="'+this._id+'" class="tooltip '+this.position+'"><div class="tooltip-inner">'+this.tipText+'</div><div class="tooltip-arrow"></div></div>';
        
        this.initializer();
    };

    B.Tooltip.prototype = {
        initializer: function(){

            this.initComponent();
            this.bindUI();
        },

        initComponent: function(){
            B.one('.componentBox').prepend(this.template);

            this.boundingBox = B.one('#'+this._id);

            this.triggerNode = B.one(this.trigger);
            this.contentBox = this.boundingBox.one(DOT + TOOLTIP_INNER);

            // this.contentBox.text(this.tipText);

        },

        render: function(){
            this.renderUI();

            this._setCoord();
            return this;
        },
        renderUI: function(){
        },
        bindUI: function(){

            B.on('click', B.bind(this.hide,this), 'body' );
        },
        _setCoord: function(){
            var x = this.triggerNode.getX(),
                y = this.triggerNode.getY(),
                width = this.triggerNode.eleWidth(),
                height = this.triggerNode.eleHeight();

            this.boundingBox.css('left',x+'px');
            this.boundingBox.css('top',y+height+'px');
        },

        hide: function(){
            var boundingBox = this.boundingBox;
            boundingBox.addClass(TOOLTIP_HIDDEN);
            boundingBox.css('opacity', '0');
            boundingBox.css('zIndex', '0');
        },

        show: function(){
            var boundingBox = this.boundingBox;

            this.contentBox.text(this.tipText);

            boundingBox.removeClass(TOOLTIP_HIDDEN);
            boundingBox.css('opacity', '1');
            boundingBox.css('zIndex', '1234');
        }
    };

})(Boia);

// =Combobox
(function(B) {
    'use strict';

    var DOT = '.',
        COMBOBOX = 'combobox',
        COMBOBOX_INNER = 'combobox-inner',
        COMBOBOX_DROP = 'combobox-drop',
        COMBOBOX_LIST = 'combobox-result';

    var liTemplate = '<li class="combobox-result"></li>';    

    B.Combobox = function(config) {

        var boundingBoxCls = config.boundingBox || '.combobox';

        this._id = 'combobox_'+Math.round(Math.random()*100000);

        this.boundingBox = B.one(boundingBoxCls);
        this.boundingBox.id = this._id;
        this.currentIndex = 1;
       
        this.initializer(config);
    };

    B.Combobox.prototype = {
        initializer: function(config){

            this.initComponent(config);
            this.bindUI();
        },

        initComponent: function(config) {

            this.triggerNode = this.boundingBox.one('.combobox-arrow-box');
            this.inputNode = this.boundingBox.one('.combobox-input');
            this.contentBox = this.boundingBox.one(DOT + COMBOBOX_INNER);
            this.dropBox = this.boundingBox.one(DOT + COMBOBOX_DROP);
            this.onListClick = config.onListClick || function(event){};
            this.isShowDrop = false;
        },

        render: function() {
            this.renderUI();

            return this;
        },

        renderUI: function() {
        },

        bindUI: function() {
            var instance = this;

            instance.triggerNode.on('click', instance.toggle.bind(instance));
            instance.dropBox.on('click', instance.select.bind(instance));

            B.one('body').on('click', instance._documentClick.bind(instance));
        },
        toggle: function(event) {
            var instance = this;

            event.stopPropagation();

            if(!instance.isShowDrop) {
                instance.showDrop();
            }else {
                instance.hideDrop();        
            }
        },
        hideDrop: function() {
            var instance = this,
                triggerNode = instance.triggerNode;

            instance.isShowDrop = false;
            triggerNode.replaceClass('bottom','top');   
            instance.dropBox.addClass('hide'); 
        },
        showDrop: function() {
            var instance = this,
                triggerNode = instance.triggerNode;
            
            instance.isShowDrop = true;
            triggerNode.replaceClass('top','bottom');
            instance.dropBox.removeClass('hide');
        },

        value: function(val){
            if(val || val === '') {
                this.inputNode.value = val;
            }
        },

        getChildren: function(){
            var instance = this,
                children = [];

            [].forEach.call(instance.dropBox.childNodes,function(item){
                if(item.nodeType == 1) {
                    children.push(item);
                }
            });

            return children;
        },

        eachChidren: function(fn){
            var instance = this;
            var children = instance.getChildren();
     
            [].forEach.call(children,function(){
                fn.apply(instance, arguments)
            });
        },
        item: function(index){
            // this.currentIndex = index;
            return B.one(DOT+COMBOBOX_LIST+':nth-child('+index+')');
        },

        getCurrentItem: function(){
            return this.item(this.currentIndex);
        },
        /**
         * @method select  下拉选择
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        select: function(event) {
            var target = event.target,
                instance = this;

            event.stopPropagation();

            instance.eachChidren(function(item, index){
                if(item === target) {
                    instance.currentIndex = index+1;
                }
            });

            instance.boundingBox.one('.combobox-input').value = target.text();
            instance.toggle(event);    
            instance.onListClick(target); 
        },
        _documentClick: function(event) {
            var instance = this,
                target = event.target;

            if(!target.hasClass('combobox-result') && !target.hasClass('combobox-arrow-box') && !target.hasClass('combobox-arrow')){
                instance.hideDrop();
            }
        },
        deleteLine: function(index,current){
            var text = '';

            if(this.item(index)) {
                this.dropBox.removeChild(this.item(index));
                this.currentIndex = 1;
            }
            
            if(this.item(current)) {
                text = this.item(current).text();
            }

            this.value(text);
        }
    };
        
})(Boia);

// =Menu
(function(B) {
    'use strict';

    var DOT = '.',
        MENU = 'menu';

    var Menu = function(config){

        Menu.superclass.constructor.call(this, config);

        this._id = 'menu_'+Math.round(Math.random()*100000);

        this.boundingBox.id = this._id; 
    };

    B.extend(Menu, B.Widget, {
        initializer: function(config){
            this.onMenu = config.onMenu || function(event){};
            this.onListClick = config.onListClick || function(listNode){};
            this.onAreaClick = config.onAreaClick || function(){};
            this.initComponent(config);

            Menu.superclass.initializer.call(this,config);
        },

        initComponent: function(config){
            this.areaNode = B.one(config.areaNode) || B.one('body');
        },

        render: function(){
            this.renderUI();

            return this;
        },

        renderUI: function(){
        },

        bindUI: function(){
            var instance = this;

            /*instance.areaNode.on('contextmenu', function(event){
                event.preventDefault();
                instance._onMenu(event);
                instance.onMenu(event);
            });*/

            instance.areaNode.on('click', instance.onAreaClick.bind(instance));

            // instance.boundingBox.on('click', instance._contentBoxClick.bind(instance));
            instance.boundingBox.all('.menu-item').on('click', instance._itemClick.bind(instance));

            B.one('body').on('click', function(){
                instance.hide();
            });

        },
        _onMenu: function(event){
            this.show();
            this.setPos(event.pageX,event.pageY);
        },
        setPos: function(left,top){
            this.boundingBox.css('left',left + 'px');
            this.boundingBox.css('top',top + 'px');
        },

        show: function(){
            this.boundingBox.removeClass('hide');
        },

        hide: function(){
            this.boundingBox.addClass('hide');
        },

        _itemClick: function(event){
            var instance = this;
            var target = event.currentTarget;

            event.stopPropagation();

            instance.onListClick(target);
        },
        _contentBoxClick: function(event){
            var instance = this;
            var target = event.target;

            event.stopPropagation();

            if(target.parentNode.hasClass('menu-item') || target.hasClass('menu-item')){
                instance.onListClick(target.parentNode || target);
            }
            
        }
    });

    B.Menu = Menu;
        
})(Boia);

/* =MenuButton */
(function(B) {
    'use strict';

    var DOT = '.',
        MENU_BUTTON = 'menu-button',
        MENU_DROP = 'dropdown-toggle';

    B.MenuButton = function(config){

        var boundingBoxCls = config.boundingBox || '.menu-button';

        this._id = 'menu-button_'+Math.round(Math.random()*100000);

        this.boundingBox = B.one(boundingBoxCls);
        this.boundingBox.id = this._id;
       
        this.initializer(config);
    };

    B.MenuButton.prototype = {
        initializer: function(config){

            this.initComponent(config);
            this.bindUI();
        },

        initComponent: function(config){

            this.triggerNode = this.boundingBox.one(DOT+MENU_DROP);
            this.toggle = config.toggle || function(){};
        },

        render: function(){
            this.renderUI();

            return this;
        },

        renderUI: function(){
        },

        bindUI: function(){
            var instance = this;

            instance.triggerNode.on('click', function(event){
                event.stopPropagation();
                instance._toggle(event);
            });

            B.one('body').on('click', function(){
                instance.hideMenu();
            });

        },
        _toggle: function(){
            if(this.boundingBox.hasClass('open')){
                this.hideMenu();
            }else {
                this.showMenu();
            }
        },
        showMenu: function(){
            this.boundingBox.addClass('open');
        },

        hideMenu: function(){
            this.boundingBox.removeClass('open');
        }
    };
        
})(Boia);

/* =TreeView */
(function(B) {
    'use strict';

    var DOT = '.',
        TREE_HITAREA = 'tree-hitarea',
        TREE_VIEW_CONTENT = 'tree-view-content',
        TREE_NODE = 'tree-node',
        TREE_NODE_CONTENT = 'tree-node-content',
        TREE_CONTAINER = 'tree-container',
        TREE_LABEL = 'tree-label';

    var liNodeTpl = '<li class='+TREE_NODE+'>'+
                    '<div class="{cls} '+TREE_NODE_CONTENT+'">{iconNode}'+
                    '<span class='+TREE_LABEL+'>{label}</span></div>'+
                    '<ul class='+TREE_CONTAINER+'></ul>'+'</li>';

    var TreeView = function(config){
        var boundingBoxCls = config.boundingBox || '.treeview';

        this._id = 'treeview_'+Math.round(Math.random()*100000);

        this.boundingBox = B.one(boundingBoxCls);
        this.boundingBox.id = this._id;

        TreeView.superclass.constructor.call(this, config);
    };

    B.extend(TreeView, B.Widget, {
        initializer: function(config){

            this.children = config.children || [];
            this.initComponent(config);
            this.onListDoubleClick = config.onListDoubleClick || function(event){};

            TreeView.superclass.initializer.call(this,config);
        },

        initComponent: function(config){
            this.boundingBox.append('<ul class='+TREE_VIEW_CONTENT+'></ul>');
            
            this.contentBox = this.boundingBox.one(DOT + TREE_VIEW_CONTENT);
        },

        render: function(){
            // 每次render前把内容清空
            this.empty();
            this.renderUI();

            return this;
        },

        renderUI: function(){
            var instance = this;

            instance._generateTree(instance.children);
        },

        bindUI: function(){
            var instance = this;

            this.contentBox.on('click', instance._contentBoxClick.bind(instance));
            this.contentBox.on('dblclick', instance._contentBoxDoubleClick.bind(instance));
        },
        _contentBoxClick: function(event){
            var instance = this;
            var target = event.target;

            if(target.hasClass('tree-node-root')){
                instance.toggle(target);
            }
            if(target.parentNode.hasClass('tree-node-root')){
                instance.toggle(target.parentNode);
            }
        },
        _contentBoxDoubleClick: function(){
            var instance = this;
            var target = event.target;

            if(target.hasClass('tree-node-sub') || target.parentNode.hasClass('tree-node-sub') ){
                if(target.hasClass('tree-node-sub')){
                    this.onListDoubleClick(target);
                }else {
                    this.onListDoubleClick(target.parentNode);
                }
                
            }
        },
        toggle: function(node){
            var instance = this;
            var next = node.nextSibling;

            if(next.hasClass('hide')){
                instance.show(next);
            }else {
                instance.hide(next);
            }
        },
        show: function(node){
            node.removeClass('hide');
        },
        hide: function(node){
            node.addClass('hide');
        },
        _generateTree: function(children,parentNode){
            var instance = this;

            children.forEach(function(child, item){

                var node = instance._insertNode(child,parentNode);

                if(child.item){
                    instance._generateTree(child.item,node);
                }
            });
        },

        _insertNode: function(item, parentNode){
            var instance = this;
            var cls = 'tree-node-sub';
            /*var iconNode = B.Lang.sub('<img class="tree-icon" src="../images/small/{imgIndex}-1.bmp" alt="" />', {
                imgIndex: item.imgIndex
            });*/

            var iconNode = B.Lang.sub('<img class="tree-icon" src="../images/small/100-1.png" alt="" />', {
                imgIndex: item.imgIndex
            });

            if(!parentNode){
                parentNode = instance.contentBox;
                cls = 'tree-node-root';
                iconNode = '';
            }

            parentNode.append(B.Lang.sub(liNodeTpl, {
                label: item.label,
                cls: cls,
                iconNode: iconNode
            }));

            for(var i in item) {
                var val = item[i];

                if(!B.Lang.isArray(val)){
                    parentNode.lastElementChild.one('.tree-node-content').setAttribute(i,val);
                }
            }

            return parentNode.lastElementChild.one(DOT+TREE_CONTAINER);
        },

        empty: function(){
            this.contentBox.html('');
        }
    });

    B.TreeView = TreeView;

})(Boia);

/* =DataTable*/
(function(B){
    'use strict';

    var DOT = '',
        DATATABLE_DATA = 'datatable-data',
        TH_ROW = 'th-row';

    var temp_th = '<th class="th-col">{label}</th>',
        temp_tr = '<tr class="td-row">111</tr>',
        temp_td = '<td class="td-{cls}">{label}</td>';

    var DataTable = function(config){

        DataTable.superclass.constructor.call(this, config);

        this._id = 'datatable_'+Math.round(Math.random()*100000);

        this.boundingBox.id = this._id; 
    };    

    B.extend(DataTable, B.Widget, {
        initializer: function(config){
            var instance = this;

            instance.resultFields = config.resultFields || [];
            instance.columnset = config.columnset || [];
            instance.recordset = config.recordset || [];
            instance.contentBox = instance.boundingBox.one('tbody');
            instance.headerBox = instance.boundingBox.one('.th-row');
            instance.onColumnClick = config.onColumnClick || function(event){};
            instance.onColumnDblClick = config.onColumnDblClick || function(event){};
            instance.previousSelectNode = null;
            this.items = [];

            DataTable.superclass.initializer.call(this,config);
        },

        bindUI: function(){
            var instance = this;

            instance.contentBox.on('click', instance._contentBoxClick.bind(instance));
            instance.contentBox.on('dblclick', instance._contentBoxDblClick.bind(instance));
        },

        render: function(){
            var instance = this;

            instance._renderHead();
            instance._renderBody();

            return this;
        },

        deleteRow: function(){
            var instance = this;

            if(instance.previousSelectNode){
                instance.previousSelectNode.parentNode.removeChild(instance.previousSelectNode);
                instance.previousSelectNode = null;
            }
        },

        deleteAllRow: function(){
            var instance = this;

            instance.contentBox.innerHTML = '';
            instance.previousSelectNode = null;
        },

        _renderHead: function(){
            var instance = this;
            var columnset = instance.columnset;

            columnset.forEach(function(item, index){
                instance.items.push(item.key);
                instance.headerBox.addRow(B.Lang.sub(temp_th, {
                    label: item.label
                }));
            });
        },
        _renderBody: function(){
            var instance = this;
            var recordset = instance.recordset;   
            var columnset = instance.columnset;
            var arr = this.items;
            var fields = this.resultFields;

            recordset.forEach(function(item, index){
                var trNode = instance.contentBox.addRow(temp_tr);
                
                for(var i = 0;i < arr.length;i++) {
                    var tdNode = trNode.addRow(B.Lang.sub(temp_td, {
                        cls: arr[i],
                        label: item[arr[i]]
                    }));

                    tdNode.addClass('td-col');
                }
                fields.forEach(function(field){
                    if(item[field]){
                        trNode.dataset[field] = item[field];
                    }
                    
                });

            });       
        },

        _contentBoxClick: function(event){
            var target = event.target;
            var instance = this;

            if(target.hasClass('td-col')) {
                instance._rowClick(target);
            }
        },

        _contentBoxDblClick: function(){
            var target = event.target;
            var instance = this;

            if(target.hasClass('td-col')) {
                instance.onColumnDblClick(target.parentNode);
            }
            
        },
        _rowClick: function(node){
            var instance = this;

            if(instance.previousSelectNode) {
                instance.previousSelectNode.removeClass('table-selected');
            }

            node.parentNode.addClass('table-selected');

            instance.previousSelectNode = node.parentNode;
            instance.onColumnClick();
        }
    }); 

    B.DataTable = DataTable;   

})(Boia);

/* =Modal*/
(function(B){
    'use strict';

    var DOT = '.';
    var headerNodeTemp = '<div class="b-window-header"><span class="window-title">'+
                '{title}</span><div class="b-tool"><img role="presentation" class="b-tool-img b-tool-close"></div></div>';
    var footerTemp = '<div class="b-window-footer"><div class="b-window-footer-toolbar"></div></div>';
    var bodyTemp = '<div class="b-window-body"><p>{content}</p></div>';

    var Modal = function(config){

        Modal.superclass.constructor.call(this, config);

        /*this._id = 'window_'+Math.round(Math.random()*100000);

        this.boundingBox.id = this._id; */
    };    

    B.extend(Modal, B.Widget, {
        initializer: function(config){
            Modal.superclass.initializer.call(this,config);

            this.isModal = this.isModal || config.isModal || false;
            this.title = config.title || '标题';
            this.buttons = config.buttons || [];
            this.bodyContent = config.bodyContent || '';
            this.draging = false;
        },

        bindUI: function(){
            var instance = this;

            this.boundingBox.on('click', this.delegateEvent.bind(this));
            this.boundingBox.on('mouseup', this.endDrag.bind(this));
            this.boundingBox.on('mousedown', this.beginDrag.bind(this));
            this.boundingBox.on('mouseout', this.moveOut.bind(this));

            B.one('body').on('mousemove', this.moveDrag.bind(this))
        },

        render: function(){

            this.renderUI();

            return this;
        },

        renderUI: function(){
            this.renderWindow();
            this.renderHeader();
            this.renderBody();
            this.renderFooter();

            if(this.isModal) {
                this.renderMask();
            }

            this.x = parseInt(this.boundingBox.css('left'));
            this.y = parseInt(this.boundingBox.css('top'));
        },

        renderWindow: function(){
            this.scrollWidth = document.body.scrollWidth;
            this.scrollHeight = document.body.scrollHeight;

            this.boundingBox.css('width', this.width+'px')
                                    .css('height', this.height+'px')
                                    .css('left', this.scrollWidth/2+'px')
                                    .css('top', this.scrollHeight/2+'px');
        },

        renderHeader: function(){
            this.boundingBox.append(B.Lang.sub(headerNodeTemp, {
                title: this.title
            }));
            this.boundingBox.one('.b-window-header').css('width', this.width+'px')
                                                                        .css('left', '-5px')
                                                                        .css('top', '-5px');
        },

        renderBody: function(){
            this.boundingBox.append(B.Lang.sub(bodyTemp, {
                content: this.bodyContent
            }));

            this.boundingBox.one('.b-window-body').css('width', this.width-10+'px')
                                                                    .css('top', '31px')
                                                                    .css('left', '0px');

        },

        renderFooter: function(){

            if(this.buttons.length !== 0) {
                this.boundingBox.append(footerTemp);

                this.footerToolbarNode = this.boundingBox.one('.b-window-footer-toolbar');

                B.each(this.buttons, function(item, index){
                    this.footerToolbarNode.append('<button class="b-btn btn">'+item.label+'</button>');

                    this.footerToolbarNode.one('button:last-child').on('click', item.on.bind(this));
                },this);

                this.boundingBox.one('.b-window-footer').css('width', this.width-10+'px')
                                                                        .css('bottom', 0)
                                                                        .css('left', 0);
            }
        },

        renderMask: function(){
            var maskNode = '<div class="b-mask"></div>';

            if(!B.one('.b-mask')) {
                B.one('body').append(maskNode);
                B.one('.b-mask').css('width', this.scrollWidth+'px')
                        .css('height', this.scrollHeight+'px')
                        .css('zIndex', 1000)
                        .css('left', 0)
                        .css('top', 0);
            }else {
                this.showMask();
            }                       
        },

        delegateEvent: function(event){
            var target = event.target;

            if(target.hasClass('b-tool-close')) {
                this.close();
            }
        },

        beginDrag: function(event){
            var target = event.target;

            if(target.hasClass('b-window-header') || target.parentNode.hasClass('b-window-header')){
                this.draging = true;

                this.offsetX = event.pageX - this.x;
                this.offsetY = event.pageY - this.y;
            }
        },

        moveDrag: function(event){
            var target = event.target;
            var pageX, pageY, x,y;

            if(this.draging) {
                pageX = event.pageX;
                pageY = event.pageY;

                this.x = pageX-this.offsetX;
                this.y = pageY-this.offsetY;

                this.setPos(this.x, this.y);
            }
        },

        moveOut: function(){
            // this.draging = false;
        },

        endDrag: function(event){
            if(this.draging) {
                this.draging = false;
            }
        },

        setPos: function(x, y){
            this.boundingBox.css('left', x+'px')
                                    .css('top', y+'px');            
        },

        close: function(){

            this.boundingBox.parentNode.removeChild(this.boundingBox);
            this.hideMask();
        },

        showMask: function(){
            B.one('.b-mask').show();
        },

        hideMask: function(){
            B.one('.b-mask').hide();
        }   
    }); 

    B.Modal = Modal;   

})(Boia);

/* =MessageBox*/
(function(B){
    'use strict';

    var DOT = '.';

    var MessageBox = function(config){
        
        this._id = 'messagebox_'+Math.round(Math.random()*100000);

        B.one('body').append('<div class="b-window b-window-default" id="'+this._id+'"></div>');

        this.boundingBox = B.one('#'+this._id);

        MessageBox.superclass.constructor.call(this, config);
    };    

    B.extend(MessageBox, B.Modal, {
        initializer: function(config){
            var instance = this;

            this.isModal = true;

            MessageBox.superclass.initializer.call(this,config);
        },

        render: function(){
            MessageBox.superclass.render.call(this);

            return this;
        },

        getInputVal: function() {
            return this.boundingBox.one('input').value;
        }
    });

    // 弹出警告框
    MessageBox.alert = function(config){
        config = config || {};
        config.isModal = true;
        config.title = config.title || '错误';
        config.bodyContent = config.bodyContent || '错误';
        config.width = 276;
        config.height = 132;
        config.buttons = [{
            label: '确认',
            on: function(){
                this.close();
            }
        }];
        new this(config).render();
    }; 

    // 弹出提示框
    MessageBox.confirm = function(){

    };

    // 弹出输入框
    MessageBox.prompt = function(config){
        config = config || {};
        config.isModal = true;
        config.title = config.title || '提示';
        config.bodyContent = config.bodyContent || '请输入<input class="prompt-input" />';
        config.width = 276;
        config.height = 132;
        config.buttons = config.buttons || [{
            label: '确认',
            on: function(){
                this.close();
            }
        }, {
            label: '取消',
            on: function(){
                this.close();
            }
        }];
        new this(config).render();
    };

    B.MessageBox = MessageBox;   

})(Boia);