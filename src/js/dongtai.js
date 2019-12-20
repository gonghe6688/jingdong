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
div.style.margin = 'auto';
box.appendChild(div);

let div_a$kuan = document.createElement('div');
div_a$kuan.style.width = '213px';
div_a$kuan.style.height = '500px';
div_a$kuan.style.float = 'left';
div_a$kuan.className = 'zuokuang';
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
            t: '平板电视',
            j: '家庭影音'
        },
        {
            s: '//img10.360buyimg.com/aotucms/s24x24_jfs/t1/15594/29/6263/3690/5c4ea9c8E8669fea3/91ace366070df776.png!cc_24x24',
            k: '冰箱洗衣机',
            t: '对开门冰箱 ',
            j: '洗烘一体机'
        },
        {
            s: '//img13.360buyimg.com/aotucms/s24x24_jfs/t1/16660/28/6456/8324/5c4ea9d5Ebe13a133/6e5bf178290d2f6a.png!cc_24x24',
            k: '空调',
            t: '壁挂式空调 ',
            j: '立柜式空调'
        },
        {
            s: '//img30.360buyimg.com/aotucms/s24x24_jfs/t1/21127/3/6376/5739/5c4ea9e2E5baf167a/0e9b240ab58d8fc5.png!cc_24x24',
            k: '厨卫电器',
            t: '烟灶 ',
            j: '热水器'
        },
        {
            s: '//img11.360buyimg.com/aotucms/s24x24_jfs/t1/29682/39/6316/5964/5c4ea9f0E1f92a5a3/9cc73b5bf6679a18.png!cc_24x24',
            k: '厨房小店',
            t: '电饭煲',
            j: '电烤箱'
        },
        {
            s: '//img11.360buyimg.com/aotucms/s24x24_jfs/t1/25838/5/6276/9596/5c4eaa00E74363856/3a489f31daf5f7e4.png!cc_24x24',
            k: '生活电器',
            t: '吸尘器 ',
            j: '净化甲醛'
        },
        {
            s: '//img13.360buyimg.com/aotucms/s24x24_jfs/t1/20702/13/6357/8033/5c4eaa0cE994a5876/65667cefbd58b4d5.png!cc_24x24',
            k: '个护健康',
            t: '电剃须刀',
            j: '电吹风'
        }
    ]
    // let zuokuang = document.querySelector('.zuokuang');
    let zuoUL = document.createElement('ul');
    zuoUL.className = 'zuoul';
    div_a$kuan.appendChild(zuoUL);
    arry.forEach(function (itme) {
        let str =`
            <li>
            <img src="${itme.s}">
            <a>${itme.k}</a>
            <div class="lilimiande">
            <a href="#">${ itme.t }</a>
            <a href="#">${ itme.j }</a>
            </div>
            </li>
        `
        zuoUL.innerHTML+=str
})
let xiakuang = document.createElement('div');
xiakuang.className = 'xiakuang';
div.appendChild(xiakuang);

let xiakuangul = document.createElement('ul');
xiakuangul.className = 'xiakuangul';
xiakuang.appendChild(xiakuangul);
let arrt = [
    {
        g: '//img10.360buyimg.com/babel/s232x120_jfs/t1/32793/6/1535/10571/5c4ea678Ef1547d3a/2f3a69fa34b4e809.jpg!cc_232x120',
    },
    {
        g: '//img11.360buyimg.com/babel/s232x120_jfs/t1/62681/12/12412/64840/5d9ec628E4a01352d/eea279ea7c33f6e3.jpg!cc_232x120',
    },
    {
        g: '//img12.360buyimg.com/babel/s232x120_jfs/t1/20576/35/4000/7544/5c4ea77cEb47338ad/796c285322c72f86.jpg!cc_232x120',
    },
    {
        g: '//img13.360buyimg.com/babel/s232x120_jfs/t1/56582/1/5831/7187/5d380747E8fbff75a/070d8e0c813d337c.jpg!cc_232x120',
    }
]
arrt.forEach(function (jjb) {
    let str =`
    <li class="xiali" > <img src="${ jjb.g }"> </li>
    `
    xiakuangul.innerHTML += str
})

let biaoti = document.createElement('div');
biaoti.className = 'biaoti';
box.appendChild(biaoti);

let xuanxiangka = document.createElement('div')
xuanxiangka.className = 'xuanxiangka';
box.appendChild(xuanxiangka);

let xuanxiangkaul = document.createElement('ul');
xuanxiangkaul.className = 'xuanxiangkaul';
xuanxiangka.appendChild(xuanxiangkaul);

let arrq = [
    {h: '平板电视',},
    {h: '冰箱洗衣机',},
    {h: '空调',},
    {h: '厨卫大电',},
    {h: '厨房小电',},
    {h: '生活电器',},
    {h: '个护健康',},
    {h: '店铺热销',}
]
arrq.forEach(function (xuan) {
    let str = `
    <li class="xuanli">${xuan.h}</li>
    `
    xuanxiangkaul.innerHTML += str;
})

let xuanxiangkaol = document.createElement('ol');
xuanxiangkaol.className = 'xuanxiangkaol';
xuanxiangka.appendChild(xuanxiangkaol);

for (i = 0; i <= 7; i++) {
    let olli = document.createElement('li');
    xuanxiangkaol.appendChild(olli);
}

let arru = [
    {
        f:'//img10.360buyimg.com/babel/s180x180_jfs/t1/69748/3/10090/290807/5d79fabdEc39c0dd9/90baa603ea3af96d.jpg',
        p:'长虹55D5P 55英寸超薄远场语 <br> 音智慧屏 AIoT物联 人工智能4..',
        n:'',
        x:'2199.00',
        
    },
    {
        f:'//img11.360buyimg.com/babel/s180x180_jfs/t1/101680/18/4895/302181/5dea1424E37e3ba0b/b0f51145e633a983.jpg',
        p:'海信（Hisense）HZ55E3D- <br> PRO 55英寸 AI声控 MEMC防..',
        n:'￥',
        x:'2399.00',
    },
    {
        f:'//img12.360buyimg.com/babel/s180x180_jfs/t1/65275/15/6909/134021/5d5253b1E679dcac0/23b90c17af9151b7.jpg',
        p:'创维 酷开(coocaa) 40K5C 40英 <br> 寸 全高清 智能WiFi 25核  丰富..',
        n:'￥',
        x:'899.00',
    },
    {
        f:'//img13.360buyimg.com/babel/s180x180_jfs/t1/88664/30/557/233682/5daff4e0E9e92f0cb/2005201f1cb55955.jpg',
        p:'海尔（Haier）LU55J51 55英寸 <br> 4K超高清 人工智能 8K解码 语..',
        n:'￥',
        x:'2099.00',
    },
]
let _olli = document.querySelector('.xuanxiangkaol > li:nth-child(1)');
arru.forEach(function (DDJ) {
    let str = `
    <ul class="fl">
    <li class="fl">
    <img src="${DDJ.f}">
    <p>${DDJ.p}</p>
    <p class="lip"><span>${DDJ.n}${DDJ.x}</span></p>
    </li>
    </ul>
    `
    _olli.innerHTML += str
})

let arrj = [
    {
        f:'//img10.360buyimg.com/babel/s180x180_jfs/t1/88921/8/7495/216120/5dfad508E1ffecba3/dbfdb02e44560f58.jpg',
        p:'惠而浦（whirlpool）9公斤大容量变频波轮洗衣机桶自洁9大',
        n:'￥',
        x:'1599.00',
        
    },
    {
        f:'//img11.360buyimg.com/babel/s180x180_jfs/t1/89619/21/7307/113473/5dfb3331Ec1ea038a/2a53f9efed6e5167.jpg',
        p:'海信 (Hisense) 239升一级能效双变频三门电冰箱 绿色净化舱抗',
        n:'￥',
        x:'1999.00',
    },
    {
        f:'//img12.360buyimg.com/babel/s180x180_jfs/t1/100509/36/7313/79995/5dfa109dE09671ae3/184fdc1b0739c005.jpg',
        p:'海尔（Haier)波轮洗衣机全自动 直驱变频电机 节能静音 免清洗科技 8公斤 EMB80BF169',
        n:'￥',
        x:'2299.00',
    },
    {
        f:'//img13.360buyimg.com/babel/s180x180_jfs/t1/103480/25/7125/91144/5dfa1736E18b08bc3/10c2f215bd3a8ae3.jpg',
        p:'海尔（Haier）10公斤超大容量变频滚筒洗衣机全自动 直驱变频平稳安',
        n:'￥',
        x:'3999.00',
    },
    {
        f:'//img14.360buyimg.com/babel/s180x180_jfs/t1/97804/39/6482/153288/5df335dcEe8560be0/b6d934f5b3ea1c37.jpg',
        p:'【京东智能冰箱】云米 (VIOMI) 450L对开门冰箱 21FACE 静音长久保鲜 APP',
        n:'￥',
        x:'3499.00',
    },
]
let _ollier_a = document.querySelector('.xuanxiangkaol > li:nth-child(2)');
arrj.forEach(function (hhj) {
    let str = `
    <ul class="fl">
    <li class="fl">
    <img src="${hhj.f}">
    <p>${hhj.p}</p>
    <p class="lip"><span>${hhj.n}${hhj.x}</span></p>
    </li>
    </ul>
    `
    _ollier_a.innerHTML += str
})

let arrk = [
    {
        f:'//img10.360buyimg.com/babel/s180x180_jfs/t1/97094/25/6432/107954/5df33973Ef325a15a/96ee28d4222c6161.jpg',
        p:'TCL 1.5匹 一级能效 变频冷暖 60秒速热 智能 智多宝 壁挂式空调 挂机(',
        n:'￥',
        x:'1989.00',
        
    },
    {
        f:'//img11.360buyimg.com/babel/s180x180_jfs/t1/92918/18/6000/84028/5df04ff8E993fe520/4a85d261732d4a14.jpg',
        p:'格力（GREE）3匹 云锦 一级能效 变频冷暖  静音 立柜式 客厅圆柱空调',
        n:'￥',
        x:'7499.00',
    },
    {
        f:'//img12.360buyimg.com/babel/s180x180_jfs/t1/91876/18/6163/125811/5df1f8afE13fd0d06/9e49de57c0550a82.jpg',
        p:'奥克斯 (AUX) 3匹 一级能效 变频冷暖 智能 空调立式 倾城立柜式空调柜机',
        n:'￥',
        x:'5499.00',
    },
    {
        f:'//img13.360buyimg.com/babel/s180x180_jfs/t1/99002/4/7341/80424/5dfacd2dEa1948e41/4fd8dfbb86d12bfa.jpg',
        p:'海尔 （Haier）1.5匹变频壁挂式空调挂机 一级能效 自清洁',
        n:'￥',
        x:'1999.00',
    },
    {
        f:'//img14.360buyimg.com/babel/s180x180_jfs/t1/103741/15/6080/117854/5df1f80eEd51ce24f/8be650f603310213.jpg',
        p:'奥克斯 (AUX) 1.5匹 京灿 一级能效 全直流变频冷暖 60秒速热',
        n:'￥',
        x:'1999.00',
    },
]
let _ollisan_a = document.querySelector('.xuanxiangkaol > li:nth-child(3)');
arrk.forEach(function (hjj) {
    let str = `
    <ul class="fl">
    <li class="fl">
    <img src="${hjj.f}">
    <p>${hjj.p}</p>
    <p class="lip"><span>${hjj.n}${hjj.x}</span></p>
    </li>
    </ul>
    `
    _ollisan_a.innerHTML += str
})

let arrl = [
    {
        f:'//img10.360buyimg.com/babel/s180x180_jfs/t1/103961/35/6417/186539/5df35f55Ee6fd149d/f111d311508a195a.jpg',
        p:'能率（NORITZ）燃气热水器 16升智能恒温 ）',
        n:'￥',
        x:'3398.00',
        
    },
    {
        f:'//img11.360buyimg.com/babel/s180x180_jfs/t1/109463/13/224/88607/5df362b2E7eab8dcf/01b11a57196110ab.jpg"',
        p:'能率（NORITZ）燃气热水器 16升智能恒温 水量伺服器）',
        n:'￥',
        x:'2299.00',
    },
    {
        f:'//img12.360buyimg.com/babel/s180x180_jfs/t1/93130/1/6377/86996/5df348a9E4704b871/3f55c68ff1a79fb1.jpg',
        p:'万和（Vanward）20立方大吸力 侧吸式挥手感应自清洗 ',
        n:'￥',
        x:'1898.00',
    },
    {
        f:'//img13.360buyimg.com/babel/s180x180_jfs/t1/106577/8/6471/208972/5df360feEc549346e/a17106f4a4712819.jpg',
        p:'林内（Rinnai）13升 零温差感恒温 防冻 燃气热水器 RU',
        n:'￥',
        x:'2699.00',
    },
    {
        f:'//img14.360buyimg.com/babel/s180x180_jfs/t1/109109/10/230/87317/5df35e33Ea9b4eb98/c86286d61f271729.jpg',
        p:'史密斯（A.O.SMITH）60升电热水器 晶彩设计 小京鱼A',
        n:'￥',
        x:'2598.00',
    },
]
let _ollisi = document.querySelector('.xuanxiangkaol > li:nth-child(4)');
arrl.forEach(function (hll) {
    let str = `
    <ul class="fl">
    <li class="fl">
    <img src="${hll.f}">
    <p>${hll.p}</p>
    <p class="lip"><span>${hll.n}${hll.x}</span></p>
    </li>
    </ul>
    `
    _ollisi.innerHTML += str
})

let arrm = [
    {
        f:'//img10.360buyimg.com/babel/s180x180_jfs/t1/88892/2/6968/179387/5df7223bEf7a6c79b/9a06fa058100287a.jpg',
        p:'生活元素（LIFE ELEMENT）插电式电热饭盒 保温饭',
        n:'￥',
        x:'199.00',
        
    },
    {
        f:'//img11.360buyimg.com/babel/s180x180_jfs/t1/72634/35/2184/124543/5d086ee1E762dec77/9e0f9e12160364dd.jpg"',
        p:'半球（Peskoe）电蒸锅多功能电热锅 34CM电炒锅',
        n:'￥',
        x:'298.00',
    },
    {
        f:'//img12.360buyimg.com/babel/s180x180_jfs/t1/93376/26/5817/196271/5df08df1E3332213e/a7cbe1404d6079e9.jpg',
        p:'天际(TONZE)电炖锅隔水炖 煮粥煲汤1锅3胆DDZ-16BW 1.6L',
        n:'￥',
        x:'129.00',
    },
    {
        f:'//img13.360buyimg.com/babel/s180x180_jfs/t1/91302/40/6962/159753/5df89e75E5b5d8483/b5e61cc2330b7cb6.jpg',
        p:'志高（CHIGO）绞肉机家用电动2L不锈钢多功能碎肉打肉切碎搅拌料',
        n:'￥',
        x:'79.00',
    },
    {
        f:'//img14.360buyimg.com/babel/s180x180_jfs/t1/100230/33/6150/500549/5df19fe9E1ed3a1a8/f28cc0c3d824fc7b.jpg',
        p:'北鼎（Buydeem）即热式饮水机电水壶热水壶烧水壶电热',
        n:'￥',
        x:'789.00',
    },
]
let _olliwu = document.querySelector('.xuanxiangkaol > li:nth-child(5)');
arrm.forEach(function (hlm) {
    let str = `
    <ul class="fl">
    <li class="fl">
    <img src="${hlm.f}">
    <p>${hlm.p}</p>
    <p class="lip"><span>${hlm.n}${hlm.x}</span></p>
    </li>
    </ul>
    `
    _olliwu.innerHTML += str
})

let arrn = [
    {
        f:'//img10.360buyimg.com/babel/s180x180_jfs/t1/99953/19/3443/122111/5de09879E4ed8219e/6aec33aa46df82ff.jpg',
        p:'美大 （MEIDA）集成灶 集成一体灶 燃气灶  消毒柜 抽油烟机  ',
        n:'￥',
        x:'9889.00',
        
    },
    {
        f:'//img11.360buyimg.com/babel/s180x180_jfs/t1/93156/38/7543/116099/5dfc4283E21734757/71892dd1b79ec5cb.jpg',
        p:'康宝（Canbo）消毒柜 家用立式消毒碗柜 厨房碗柜保洁柜 家用',
        n:'￥',
        x:'799.00',
    },
    {
        f:'//img12.360buyimg.com/babel/s180x180_jfs/t1/86530/37/6388/128036/5df33a87E1f87a828/7760a7465343b5c8.jpg',
        p:'奥克斯（AUX）1.5匹定频快速冷暖 智能电辅热 自动水洗 静音',
        n:'￥',
        x:'1498.00',
    },
    {
        f:'//img13.360buyimg.com/babel/s180x180_jfs/t1/103031/26/7394/192754/5dfb484bE91a79b34/d27f80cf2d048749.jpg',
        p:'美的（Midea） 家用/商用中央空调 风管机一拖一 变频家用TR',
        n:'￥',
        x:'6980.00',
    },
    {
        f:'//img14.360buyimg.com/babel/s180x180_jfs/t1/90390/3/6902/231116/5df85059Ebf949c8a/9901089ec841309c.jpg',
        p:'方太侧吸式2抽吸油烟机燃气灶具煤气灶近吸式烟灶套装家用',
        n:'￥',
        x:'4899.00',
    },
]
let _olliliu = document.querySelector('.xuanxiangkaol > li:nth-child(6)');
arrn.forEach(function (hln) {
    let str = `
    <ul class="fl">
    <li class="fl">
    <img src="${hln.f}">
    <p>${hln.p}</p>
    <p class="lip"><span>${hln.n}${hln.x}</span></p>
    </li>
    </ul>
    `
    _olliliu.innerHTML += str
})

let arrv = [
    {
        f:'//img10.360buyimg.com/babel/s180x180_jfs/t1/98505/30/7310/162232/5dfb1912E9c288d37/5c2478bade6e7286.jpg',
        p:'松下（Panasonic）冲牙器 洗牙器 水牙线 非电动牙',
        n:'￥',
        x:'399.00',
        
    },
    {
        f:'//img11.360buyimg.com/babel/s180x180_jfs/t1/94479/1/7256/185653/5df9f61aE8885b42f/47ddde1012dd59de.jpg',
        p:'usmile 电动牙刷 成人声波震动情侣电动牙刷 Y1少女粉',
        n:'￥',
        x:'298.00',
    },
    {
        f:'//img12.360buyimg.com/babel/s180x180_jfs/t1/107914/13/1243/209246/5dfb5198E66af5f2a/30e8296aac2538a8.jpg',
        p:'斐珞尔（FOREO）洁面仪 洗脸仪 美容仪 去黑头 硅',
        n:'￥',
        x:'959.00',
    },
    {
        f:'//img13.360buyimg.com/babel/s180x180_jfs/t1/86170/29/7609/218449/5dfb4a8aE58e05c99/a2e427d91bf17f56.jpg',
        p:'洁碧（Waterpik）冲牙器/水牙线/洗牙器/洁牙机 非电',
        n:'￥',
        x:'1099.00',
    },
    {
        f:'//img14.360buyimg.com/babel/s180x180_jfs/t1/68089/5/654/157710/5cedfce5Ee15a99c9/72423ce3020c6552.jpg',
        p:'欧乐B电动牙刷 3D声波震动（含刷头*2+旅行盒） P4000机皇款',
        n:'￥',
        x:'419.00',
    },
]
let _olliqi = document.querySelector('.xuanxiangkaol > li:nth-child(7)');
arrv.forEach(function (hlv) {
    let str = `
    <ul class="fl">
    <li class="fl">
    <img src="${hlv.f}">
    <p>${hlv.p}</p>
    <p class="lip"><span>${hlv.n}${hlv.x}</span></p>
    </li>
    </ul>
    `
    _olliqi.innerHTML += str
})

let arrg = [
    {
        f:'//img10.360buyimg.com/babel/s180x180_jfs/t1/96193/13/7248/147346/5df9dd99Ef9cdaac5/d4ae44fe68900184.jpg',
        p:'松下（Panasonic）冲牙器 洗牙器 水牙线 非电动牙刷  全身水洗 便携式设计 EW-ADJ4-A405',
        n:'￥',
        x:'399.00',
        
    },
    {
        f:'//img11.360buyimg.com/babel/s180x180_jfs/t1/91562/31/7123/112109/5df984ddE76107e39/cfddfbfe7edb106a.jpg',
        p:'usmile 电动牙刷 成人声波震动情侣电动牙刷 Y1少女粉',
        n:'￥',
        x:'298.00',
    },
    {
        f:'//img12.360buyimg.com/babel/s180x180_jfs/t1/94507/4/7462/398879/5dfb974aE547c490f/934ac231a1b8aff4.jpg',
        p:'斐珞尔（FOREO）洁面仪 洗脸仪 美容仪 去黑头 硅胶电动 露娜迷你2代 LUNA mini2 粉红色',
        n:'￥',
        x:'959.00',
    },
    {
        f:'//img13.360buyimg.com/babel/s180x180_jfs/t1/86170/29/7609/218449/5dfb4a8aE58e05c99/a2e427d91bf17f56.jpg',
        p:'洁碧（Waterpik）冲牙器/水牙线/洗牙器/洁牙机 非电动牙刷 家用台式水瓶座系列 WP-660EC',
        n:'￥',
        x:'1099.00',
    },
    {
        f:'//img14.360buyimg.com/babel/s180x180_jfs/t1/68089/5/654/157710/5cedfce5Ee15a99c9/72423ce3020c6552.jpg',
        p:'欧乐B电动牙刷 3D声波震动（含刷头*2+旅行盒） P4000机皇款',
        n:'￥',
        x:'419.00',
    },
]
let _olliba = document.querySelector('.xuanxiangkaol > li:nth-child(8)');
arrg.forEach(function (hlg) {
    let str = `
    <ul class="fl">
    <li class="fl">
    <img src="${hlg.f}">
    <p>${hlg.p}</p>
    <p class="lip"><span>${hlg.n}${hlg.x}</span></p>
    </li>
    </ul>
    `
    _olliba.innerHTML += str
})

let _ulliabc = document.querySelectorAll('.xuanxiangkaul > li');
let _olliabc = document.querySelectorAll('.xuanxiangkaol > li');

let xuangulli = document.getElementById('liabc');
let xuangolli = document.getElementById('oiliabc');
for (let i = 0; i < _ulliabc.length; i++ ) {
    _ulliabc[i].setAttribute('index', i);
    _ulliabc[i].onclick = function () {
        console.log(123);

        for (let j  = 0; j < _ulliabc.length; j++) {
            _ulliabc[j].className = '';
            _olliabc[j].className = '';
        }

        this.className = 'active';
        let index_a = this.getAttribute('index') - 0;
        _olliabc[index_a].className = 'active';
    } 
}


