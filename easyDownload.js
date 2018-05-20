// ******
//       author: ztz 2018-5-20
// ******


// 网易云音乐 core.js 中的 Ajax 请求
// 以下代码经过混淆
// ******* Netease *******
var c5h = NEJ.P,
    en6h = c5h("nej.g"),
    v5A = c5h("nej.j"),
    k5p = c5h("nej.u"),
    Uf9W = c5h("nm.x.ek"),
    l5q = c5h("nm.x");

window.GEnc = true;
var bwA8s = function (cBy3x) {
    var m5r = [];
    k5p.bd5i(cBy3x, function (cBx3x) {
        m5r.push(Uf9W.emj[cBx3x])
    });
    return m5r.join("")
};
var cBw3x = v5A.bl5q;
v5A.bl5q = function (Y5d, e5j) {
    var j5o = {},
        e5j = NEJ.X({}, e5j),
        lJ9A = Y5d.indexOf("?");
    if (window.GEnc && /(^|\.com)\/api/.test(Y5d) && !(e5j.headers && e5j.headers[en6h.ym3x] == en6h.HK5P) && !e5j.noEnc) {
        if (lJ9A != -1) {
            j5o = k5p.hu8m(Y5d.substring(lJ9A + 1));
            Y5d = Y5d.substring(0, lJ9A)
        }
        if (e5j.query) {
            j5o = NEJ.X(j5o, k5p.fB7u(e5j.query) ? k5p.hu8m(e5j.query) : e5j.query)
        }
        if (e5j.data) {
            j5o = NEJ.X(j5o, k5p.fB7u(e5j.data) ? k5p.hu8m(e5j.data) : e5j.data)
        }
        j5o["csrf_token"] = v5A.gC7v("__csrf");
        Y5d = Y5d.replace("api", "weapi");
        e5j.method = "post";
        delete e5j.query;
        var bBj9a = window.asrsea(JSON.stringify(j5o), bwA8s(["流泪", "强"]), bwA8s(Uf9W.md), bwA8s(["爱心", "女孩", "惊恐", "大笑"]));
        e5j.data = k5p.cC6w({
            params: bBj9a.encText,
            encSecKey: bBj9a.encSecKey
        })
    }
    cBw3x(Y5d, e5j)
};
// ******* Netease *******


var audio = new Audio();

var downloadCurrent = (event) => {
    var track = window.player.getPlaying().track
    // 歌曲 id
    var id = track.id
    // 音质
    var DEFAULT_BR = 320e3;
    // 歌手名
    var singer = track.artists.map(e => e.name).join('/');
    // 歌曲名
    var song = track.name;

    var name = `${singer} - ${song}.mp3`;

    event.target.setAttribute('data-clipboard-text', name);
    var self = this;
    v5A.bl5q("/api/song/enhance/player/url", {
        type: "json",
        query: {
            ids: JSON.stringify([id]),
            br: DEFAULT_BR
        },
        onload: (data) => {
            // url
            let mp3Url = data.data[0].url;
            window.player.pause();
            audio.src = mp3Url;
            audio.controls = true;
            audio.setAttribute('class', 'ztz-down');
            audio.removeAttribute('preload');
            document.body.appendChild(audio);
        },
        onerror: function () { alert('请重试!') }
    })
}

var _main = () => {
    // clipboard 
    // 点击加载，自动复制歌曲信息
    let s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/clipboard@2.0.1/dist/clipboard.min.js';
    document.body.appendChild(s);
    s.onload = s.onreadystatechange = function () {
        new ClipboardJS('.ztz-btn');
        // 添加 css
        var css = `
        <style>
        .ztz-easyd {position:relative; top:70%; font-size:15px; left:40px; color:black;}
        .ztz-down {position:relative; top:75%; width:200px; left:-30px;}
         </style>`
        var html = `<a class="ztz-easyd ztz-btn"  
            data-clipboard-text="1234" 
            hidefocus="true"
            onclick="downloadCurrent(event)">加载</a>`

        document.head.insertAdjacentHTML('beforeEnd', css)
        document.body.insertAdjacentHTML('beforeEnd', html);
    }
}

_main();
