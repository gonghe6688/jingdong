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
div_a$kuan.style.backgroundColor = 'rgb(156,191,226)';
div.appendChild(div_a$kuan);
let div_b$kuan = document.createElement('ul');
div_b$kuan.style.width = '930px';
div_b$kuan.style.height = '370px'
div_b$kuan.style.backgroundColor = 'aqua';
div_b$kuan.style.float = 'left';
div_b$kuan.style.margin = '7px 0px 0px 7px';
div_b$kuan.className = 'ulkuang';
div.appendChild(div_b$kuan); 
let _ul = document.querySelector('.ulkuang');
arr.forEach(function (item) {
    for (let key in item) {
       let li = document.createElement('li');
       let img=document.createElement("img");
       li.className = 'likuang';
       img.setAttribute("src",item[key])
       li.appendChild(img)
        _ul.appendChild(li);
    }
})
let div_c$kuang = document.createElement('ol');
div_c$kuang.className = 'olkuang';
div_b$kuan.appendChild(div_c$kuang);
for(let i = 0; i <= 7; i++ ) {
    let _li = document.createElement('li');
    _li.className = 'likuang-a';
    console.log(_li);
    div_c$kuang.appendChild(_li);
}
let a_yidong = document.createElement('a')
a_yidong.className = 'zuoyi';
div_b$kuan.appendChild(a_yidong);
let a_yidong_a = document.createElement('a')
a_yidong_a.className = 'yuyi';
div_b$kuan.appendChild(a_yidong_a);