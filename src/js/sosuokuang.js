let inp = document.getElementById('sosuo');
let kuang = document.getElementById('sosuokuang')
inp.addEventListener('input' , function () {
    //创建一个script
    let script = document.createElement('script');
    //向京东发请求
    script.src = 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=' + this.value + '&req=2&csor=2&pwd=a&cb=fn&_=1576656680970';
    //丢到页面里
    document.body.appendChild(script);
    //从页面里面删除
    document.body.removeChild(script);
    
})
function fn(res) {
    if (res.g) {
        let str = '';
        res.g.forEach(item => {
            str += `<li>${ item.q }</li>`;
        })
        kuang.innerHTML = str;
        kuang.style.display = 'block';

    } else {
        kuang.style.display = 'none';
    }
}