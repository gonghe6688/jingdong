let arr = [
    { img: '//img12.360buyimg.com/babel/s960x370_jfs/t1/100895/7/7102/129856/5df8a7baEc379bcf6/b138f999cfa093cb.jpg!cc_960x370 ', },
    { img: '//img11.360buyimg.com/babel/s960x370_jfs/t1/92106/26/6972/186542/5df9e266Ec7b944ae/c41e3d258a0934d6.jpg!cc_960x370',},
    { img: '//img20.360buyimg.com/babel/s960x370_jfs/t1/110249/37/220/141662/5df36032E77ef4470/52f3fa9318ced729.jpg!cc_960x370',},
    { img: '//img10.360buyimg.com/babel/s960x370_jfs/t1/45786/25/16591/90362/5df7438dEf8e896e6/f778987fe740c921.jpg!cc_960x370',},
    { img: '//img13.360buyimg.com/babel/s960x370_jfs/t1/92734/5/7212/116196/5df97d04Ed1f90faa/012b9c9915ad8a37.jpg!cc_960x370',},
    { img: '//img30.360buyimg.com/babel/s960x370_jfs/t1/86808/17/3321/183989/5ddf9eb1E5f2980e7/5e91b4acba8d60e8.jpg!cc_960x370',},
    { img: '//img14.360buyimg.com/babel/s960x370_jfs/t1/98476/35/6845/121337/5df75283Ea01f533a/69b88fd6d12ba5f1.jpg!cc_960x370',},
]
let box = document.getElementById('box');
let div = document.createElement('div');
div.style.height = '500px';
div.style.width = '1150px';
div.style.border = '1px solid #000';
div.style.margin = 'auto';
box.appendChild(div);

let div_a$kuan = document.createElement('div');
div_a$kuan.style.width = '213px';
div_a$kuan.style.height = '500px';
div_a$kuan.style.float = 'left';
div_a$kuan.className = 'zuokuang';
console.log(div_a$kuan)
div_a$kuan.style.backgroundColor = 'rgb(156,191,226)';
div.appendChild(div_a$kuan);

let div_a = document.createElement('div');
div_a.setAttribute("id","kuang");
div.appendChild(div_a)

let div_b$kuan = document.createElement('ul');
div_b$kuan.style.width = '930px';
div_b$kuan.style.height = '370px'
div_b$kuan.className = 'imgBox';
div_a.appendChild(div_b$kuan);

arr.forEach(function (item) {
    for (let key in item) {
       let li = document.createElement('li');
       let img = document.createElement("img");
       img.setAttribute("src",item[key])
       li.appendChild(img)
        div_b$kuan.appendChild(li);
    }
})

let div_c$kuang = document.createElement('ol');
div_c$kuang.className = 'pointBox';
div_a.appendChild(div_c$kuang);

// for(let i = 0; i <= 7; i++ ) {
//     let _li = document.createElement('li');
//     _li.className = 'likuang-a';
//     // console.log(_li);
//     div_c$kuang.appendChild(_li);
// }
let div_d$kuang = document.createElement('div')
div_d$kuang.className = 'leftRightBox';
div_a.appendChild(div_d$kuang);

let a_yidong = document.createElement('a')
a_yidong.style.float = 'left';
div_d$kuang.appendChild(a_yidong);

let a_yidong_a = document.createElement('a')
a_yidong_a.style.float = 'right';
div_d$kuang.appendChild(a_yidong_a);
/*轮播图*/ 
class Banner {
    constructor (id) {
        this.ele = document.querySelector(id);
        this.imgBox = this.ele.querySelector('.imgBox');
        this.pointBox = this.ele.querySelector('.pointBox');
        this.leftRightBox = this.ele.querySelector('.leftRightBox');
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
        let pointNum = this.imgBox.children.length;
        //生成li放在框里
        let frg = document.createDocumentFragment();
        for (let i = 0; i < pointNum; i++) {
            let li = document.createElement('li');
            if (i === 0) li.className = 'active';
            li.setAttribute('point_index', i);
            frg.appendChild(li);
        }
        this.pointBox.appendChild(frg)
        
    }
    changeOne () {
        //切换一张
        for (let i = 0; i < this.imgBox.children.length; i++) {
            this.imgBox.children[i].className = '';
            this.pointBox.children[i].className = '';
        }
        //判断一下 index 
        if (this.index >= this.imgBox.children.length) {
            this.index = 0;
        }
        //判断一下
        if (this.index < 0) {
            this.index = this.imgBox.children.length - 1;
        }
        this.imgBox.children[this.index].className = 'active';
        this.pointBox.children[this.index].className = 'active';
    }
    //自动轮播
    autoPlay () {
        //做一个定时器
        this.timerId = setInterval(() => {
            //调整 index
            this.index++;
            //调用 changeOne
            this.changeOne();
        }, 5000)
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
        this.leftRightBox.addEventListener('click' , e => {
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
        this.pointBox.addEventListener('click', e => {
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
        for (let i = 0; i < this.imgBox.children.length; i++) {
            this.imgBox.children[i].addEventListener('transitionend', () => {
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
/**/
    let arry = [
        {
            s: '//img11.360buyimg.com/aotucms/s24x24_jfs/t1/16080/19/6331/3785/5c4ea9a3E197b3fc2/3f3fc37f9685907d.png!cc_24x24',
            k: '电视',
            t: '平板电视 家庭影音'
        },
        {
            s: '//img10.360buyimg.com/aotucms/s24x24_jfs/t1/15594/29/6263/3690/5c4ea9c8E8669fea3/91ace366070df776.png!cc_24x24',
            k: '冰箱洗衣机',
            t: '对开门冰箱 洗烘一体机'
        },
        {
            s: '//img13.360buyimg.com/aotucms/s24x24_jfs/t1/16660/28/6456/8324/5c4ea9d5Ebe13a133/6e5bf178290d2f6a.png!cc_24x24',
            k: '空调',
            t: '壁挂式空调 立柜式空调'
        },
        {
            s: '//img30.360buyimg.com/aotucms/s24x24_jfs/t1/21127/3/6376/5739/5c4ea9e2E5baf167a/0e9b240ab58d8fc5.png!cc_24x24',
            k: '厨卫电器',
            t: '烟灶 热水器'
        },
        {
            s: '//img11.360buyimg.com/aotucms/s24x24_jfs/t1/29682/39/6316/5964/5c4ea9f0E1f92a5a3/9cc73b5bf6679a18.png!cc_24x24',
            k: '厨房小店',
            t: '电饭煲 电烤箱'
        },
        {
            s: '//img11.360buyimg.com/aotucms/s24x24_jfs/t1/25838/5/6276/9596/5c4eaa00E74363856/3a489f31daf5f7e4.png!cc_24x24',
            k: '生活电器',
            t: '吸尘器 净化甲醛'
        },
        {
            s: '//img13.360buyimg.com/aotucms/s24x24_jfs/t1/20702/13/6357/8033/5c4eaa0cE994a5876/65667cefbd58b4d5.png!cc_24x24',
            k: '个护健康',
            t: '电剃须刀 电吹风'
        }
    ]
    // let zuokuang = document.querySelector('.zuokuang');
    let zuoUL = document.createElement('ul');
    zuoUL.className = 'zuoul';
    div_a$kuan.appendChild(zuoUL);
    arry.forEach(function (itme) {
        let str=`
            <li>
            <img src="${itme.s}">
            <p>${itme.k}</p>
            <p class="fp">${itme.t}</p>
            </li>
        `
        zuoUL.innerHTML+=str
})












