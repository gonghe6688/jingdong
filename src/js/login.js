let _al = document.querySelectorAll('ul > li');
let _ak = document.querySelectorAll('ol > li')
//我要给每一个p绑定一个点击事件
for (let i = 0; i < _al.length; i++) {
    _al[i].setAttribute('index', i);
    _al[i].onclick = function () {
        for (let j = 0; j < _al.length; j++) {
            _al[j].className = '';
        }
        for ( let k = 0; k < _ak.length; k++) {
            _ak[k].className = '';
        }
        this.className = 'binda';
        let index = this.getAttribute('index') - 0;
        _ak[index].className = 'binda';
    }
}
