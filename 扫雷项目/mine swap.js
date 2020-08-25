// 作业15
//分步提示

const log = console.log.bind(console)
const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        //
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        //
        return []
    } else {
        return elements
    }
}




//根据W, H, N，生成地图
const bindEvents = function (w, h, n) {
// 生成数据地图
    // 1.函数mapSquare，生成地图，横纵长度为w，h
    const mapSquare = function (w, h) {
        let square = []
        for (let j = 0; j < h; j++) {
            let line = []
            for (let i = 0; i < w; i++) {
                line.push(0)
            }
            square.push(line)
        }
        return square
    }
    // 2.函数mapMine，生成地雷，输入数组地图ijarray,在地图中添加地雷，地雷数为设定值n
    const mapMine = function (ijarray, n) {
        for (let i = 0; i < n; i++) {
            let x = Math.floor(ijarray[0].length * Math.random())
            let y = Math.floor(ijarray.length * Math.random())
            ijarray[y][x] = 9
        }
        return ijarray
    }
    // 定义addCheck函数，在地图范围内，输入地雷坐标，对周围8个格子加1
    const addCheck = function (ijarray, y, x, w, h) {
        if (x >= 0 && y >= 0 && x < w && y < h) {
            ijarray[y][x] += 1
        }
    }
    // 3.调用addCheck函数，遍历地图，在地图上生成提示
    const mapRadar = function (ijarray) {
        let square = ijarray.slice(0)
        let h = square.length
        let w = square[0].length
        for (let j = 0; j < h; j++) {
            let line = square[j]
            for (let i = 0; i < w; i++) {
                if (square[j][i] >= 9) {
                    addCheck(square, j - 1, i - 1, w, h)
                    addCheck(square, j + 1, i - 1, w, h)
                    addCheck(square, j + 1, i + 1, w, h)
                    addCheck(square, j - 1, i + 1, w, h)
                    addCheck(square, j - 1, i, w, h)
                    addCheck(square, j, i - 1, w, h)
                    addCheck(square, j, i + 1, w, h)
                    addCheck(square, j + 1, i, w, h)
                }
            }
        }
        return square
    }
    // 4.检查地图雷区，将雷区大于9的数据返回为9
    const mineCheck = function (ijarray) {
        let square = ijarray.slice(0)
        let h = square.length
        let w = square[0].length
        for (let j = 0; j < h; j++) {
            let line = square[j]
            for (let i = 0; i < w; i++) {
                if (square[j][i] >= 9){
                    square[j][i] = 9
                }
            }
        }
        return square
    }


// 生成html地图，边长为m，n
    const bindmap = function (square) {
        let m = square[0].length

        let n = square.length

        let b = e('#map')
        b.innerHTML += `<br>`
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                let c0 = `
<button id="id-${j}-${i}" class="cell" data-x=${j} data-y=${i}></button>
`

                b.innerHTML += c0
            }
            b.innerHTML += `<br>`
        }

    }
// 添加事件
    const  bindLose = function (square) {
        for (let j = 0; j < square.length; j++) {
            for (let i = 0; i < square[0].length; i++) {
                if (square[j][i] === 9) {
                    let a = '#id-' + i +'-' + j
                    e(a).innerHTML = '<img src="images/boom9.png"/>'
                    e(a).classList.add('boom')

                }
            }
        }
        alert("你输了")
    }
    const bindEventsListenerRight = function () {
        let map = e('#map')
        map.addEventListener('contextmenu', function(event) {
            let target = event.target
            event.preventDefault()
            if (target.innerHTML === '') {
                target.innerHTML = '🚩'
            } else if (target.innerHTML === '🚩') {
                target.innerHTML = ''
            }
        })
    }
    // const bindMouseBox = function() {
    //     let map = e('#map')
    //
    //     map.addEventListener('mouseover', function(event) {
    //         // log('鼠标移入')
    //         let target = event.target
    //         let i = Number(target.dataset.x)
    //         let j = Number(target.dataset.y)
    //         let s = '#id-' + i +'-' + j
    //         e(s).classList.add('done')
    //     })
    //     map.addEventListener('mouseout', function(event) {
    //         // log('鼠标移出')
    //         let target = event.target
    //         let i = Number(target.dataset.x)
    //         let j = Number(target.dataset.y)
    //         let s = '#id-' + i +'-' + j
    //         e(s).classList.remove('done')
    //     })
    // }
    const bindEventsListener = function(square) {
        let map = e('#map')
        map.addEventListener('click', function(event) {
            let target = event.target
            let i = Number(target.dataset.x)
            let j = Number(target.dataset.y)
            let s = '#id-' + i +'-' + j

            if (square[j][i] === 9) {
                e(s).innerHTML = `💣`
                e(s).classList.add('boom1')
                bindLose(square)

            } else if (square[j][i] === 0) {
                e(s).innerHTML = ' '
                e(s).classList.add('done')
                binditerate(square, j, i)
            } else {
                e(s).innerHTML = square[j][i]
                e(s).classList.add('radar')
            }
        }
        )
    }
// 辅助函数，减少重复
    const binditerate = function (square, j, i) {


        let h = square.length
        let w = square[0].length
        vjkl1(square, j - 1, i - 1, w, h)
        vjkl1(square, j - 1, i, w, h)
        vjkl1(square, j - 1, i + 1, w, h)
        vjkl1(square, j, i - 1, w, h)
        vjkl1(square, j, i + 1, w, h)
        vjkl1(square, j + 1, i - 1, w, h)
        vjkl1(square, j + 1, i, w, h)
        vjkl1(square, j + 1, i + 1, w, h)

    }
    const vjkl1 = function (square, y, x, w, h) {
        if (x >= 0 && y >= 0 && x < w && y < h) {
            let s = '#id-' + x +'-' + y
            if (!e(s).innerHTML){
                e(s).innerHTML = square[y][x]
                if (square[y][x] === 0) {
                    e(s).innerHTML = ' '
                    e(s).classList.add('done')
                    return binditerate(square, y, x)
                } else if (square[y][x] < 9) {
                    e(s).classList.add('radar')
                }
            }
        }
    }

    let bindempty = mapSquare(w, h).slice(0)
    let bindminemap = mapMine(bindempty, n).slice(0)
    let bindalert = mapRadar(bindminemap).slice(0)
    let bindcheck = mineCheck(bindalert).slice(0)
    bindmap(bindcheck)
    bindEventsListener(bindcheck)
    bindEventsListenerRight()
    // bindMouseBox()
}

// 自定义地图
const bindMapCustom  = function () {
    let mapCreat = e('#id-map-creat')
    mapCreat.addEventListener('click', function () {
        let b = e('#map')
        b.innerHTML = ''
        b.innerHTML = `<br>`
        let input_w = e('#id-input-w').value
        let input_h = e('#id-input-h').value
        let input_n = e('#id-input-cellNumber').value

        bindEvents(input_w, input_h, input_n)
    })

}
const mapdefault = function () {
    let w = 10
    let h = 10
    let n = 15

    bindEvents(w, h, n)
}

const __main = function () {
    mapdefault()
    bindMapCustom()
}
__main()
