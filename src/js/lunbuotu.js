class Banner {
    constructor (id) {
        this.ele = document.querySelector(id);
        this.ulkuang = this.ele.querySelector('.ulkuang');
        this.olkuang = this.ele.querySelector('.olkuang');
        this.divkuang = this.ele.querySelector('.divkuang');
        console.log(this.ulkuang);
        //准备一个变量
        this.index = 0;
        //准备一个定时器返回值
        this.timerId = 0;
        //准备一个开关
        this.flag = true;
        //准备一个启动器
        this.init();
    }
    init () {
        this.setPoint();
        this.autoPlay();
        this.overOut();
        this.leftRight();
        this.pointChange();
        this.moveEnd();
        this.clientTab();
    }
    setPoint () {
        //获取 ul 里面的子元素
        let pointNum = this.ulkuang.children.length;
        //生成li放在框里
        let frg = document.createDocumentFragment();
        for (let i = 0; i < pointNum; i++) {
            let li = document.createElement('li');
            if (i === 0) li.className = 'active';
            li.setAttribute('point_index', i);
            frg.appendChild(li);
        }
        
    }
    changeOne () {
        //切换一张
        for (let i = 0; i < this.ulkuang.children.length; i++) {
            this.ulkuang.children[i].className = '';
            this.olkuang.children[i].className = '';
        }
        //判断一下 index 
        if (this.index >= this.ulkuang.children.length) {
            this.index = 0;
        }
        //判断一下
        if (this.index < 0) {
            this.index = this.ulkuang.children.length - 1;
        }
        this.ulkuang.children[this.index].className = 'active';
        this.olkuang.children[this.index].className = 'active';
    }
    //自动轮播
    autoPlay () {
        //做一个定时器
        this.timerId = setInterval(() => {
            //调整 index
            this.index++;
            //调用 changeOne
            this.changeOne();
        }, 2000)
    }
    //移入移出
    overOut () {
        //移入移出的还是 this.ele 
        this.ele.addEventListener('mouseover', () => clearInterval(this.timerId));
        this.ele.addEventListener('mouseout', () => this.autoPlay());
    }
    //左右切换
    leftRight () {
        //添加点击事件 事件委托
        this.divkuang.addEventListener('click' , e => {
            //处理事件兼容和处理事件目标兼容
            e = e || window.event;
            let target = e.target || e.srcElement;
            if (!this.flag) return;
            this.flag = false;
            //判断点击的是左还是右
            if (target.className === 'left') {
                this.index--;
                this.changeOne()
            }
            if (target.className === 'right') {
                this.index++;
                this.changeOne()
            }
        })
    }
    //焦点切换
    pointChange () {
        //绑定点击事件   事件委托
        this.ulkuang.addEventListener('click', e => {
            e = e || window.event;
            let target = e.target || e.srcElement;
            //判断点击的是 li 
            if (target.nodeName === 'LI') {
                if(!this.flag) return;
                this.flag = false;
                //获取索引
                let point_index = target.getAttribute('point_index') - 0;
                //设置 this.index 
                this.index = point_index;
                this.changeOne()
            }
        })
    }
    //运动结束触发开关
    moveEnd () {
        //给每一个 ULKUANG 下面的 li 添加 transitionend 事件
        for (let i = 0; i < this.ulkuang.children.length; i++) {
            this.ulkuang.children[i].addEventListener('transitionend', () => {
                //把开关打开
                this.flag = true;
            })
        }
    }
    // 浏览器tab页切换
    clientTab () {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                clearInterval(this.timerId);
            }
            if (document.visibilityState === 'visible') {
                this.autoPlay()
            }
        })
    }

}