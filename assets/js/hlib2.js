class Graph {
    verts;
    weighted;

    constructor(weighted = false) {
        this.verts = [];
        this.weighted = weighted;
    }

    add(a, b, weight = 0) {
        if (!this.verts[a]) this.verts[a] = genPoint(a);
        if (!this.verts[b]) this.verts[b] = genPoint(b);
        if (!$('line[value="' + a + '-' + b + '"]').length && !$('line[value="' + b + '-' + a + '"]').length) {
            this.verts[a].addEdge(b, weight);
        }
    }

    addV(a, color) {
        if (!this.verts[a]) this.verts[a] = genPoint(a);
        this.verts[a].color = color;
    }

    isWeighted() {
        return this.weighted;
    }

    setWeighted(a) {
        this.weighted = a;
    }

    clear() {
        $('.point,line,text').remove();
        G.verts = [];
    }

    tempRemove(a, b) {
        if (a > b) [a, b] = [b, a];
        let t = $('line[value="' + a + '-' + b + '"]');
        if (this.weighted) t.next().hide();
        t.hide();
    }

    remove(a, b) {
        if (a > b) [a, b] = [b, a];
        this.verts[a].edges.splice(b);
        G.verts[b].edges.splice(a);
        let t = $('line[value="' + a + '-' + b + '"]');
        if (this.weighted) t.next().remove();
        t.remove();
    }

}

class Point {
    id;
    x;
    y;
    elem;
    edges = [];
    color = 0;

    constructor(id, x, y, weight = 0) {
        this.id = id;
        this.x = x;
        this.y = y;

        $('#graph').append($('<div class="point" value="' + id + '" style="left: ' + (x - 15) + 'px; top: ' + (y - 15) + 'px;"><a>' + id + '</a></div>'));
        this.elem = $('.point[value="' + id + '"]');
        this.elem.draggable({
            containment: "#graph",
            drag: function (event) {
                let i = $(this);
                G.verts[i.text()].drag(i.offset().left, i.offset().top);
            }
        });
    }

    addEdge(a, weight = 0) {
        let mn = this.id, mx = a;
        let mncoord = [(this.elem.offset().left + 15), (this.elem.offset().top + 15)];
        let mxcoord = [(G.verts[a].elem.offset().left + 15), (G.verts[a].elem.offset().top + 15)];

        if (this.id > a) {
            [mn, mx] = [mx, mn];
            [mncoord, mxcoord] = [mxcoord, mncoord];
        }

        let ws = "";
        if (weight) ws = '</line><text x="' + (mncoord[0] + mxcoord[0] + 20) / 2 + '" y="' + (mncoord[1] + mxcoord[1] + 20) / 2 + '">' + weight + '</text>';
        document.getElementById('lines').insertAdjacentHTML('beforeend',
            '<line value="' + mn + '-' + mx +
            '" x1="' + mncoord[0] + '" y1="' + mncoord[1] +
            '" x2="' + mxcoord[0] + '" y2="' + mxcoord[1] + '">' + ws);

        this.edges.push([a, weight]);
        G.verts[a].edges.push([this.id, weight]);
    }

    drag(nx, ny) {
        let self = this;
        this.x = nx + 15;
        this.y = ny + 15;
        this.edges.forEach(function (el) {
            let t;
            if (self.id > el[0]) {
                t = $('line[value="' + el[0] + '-' + self.id + '"]');
                t.attr({x2: self.x, y2: self.y});
            } else {
                t = $('line[value="' + self.id + '-' + el[0] + '"]');
                t.attr({x1: self.x, y1: self.y});
            }
            if (G.isWeighted()) t.next().attr({
                x: (self.x + G.verts[el[0]].x + 20) / 2,
                y: (self.y + G.verts[el[0]].y + 30) / 2
            });
        });
    }

    indexOf(a) {
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[0] == a) return i;
        }
        return -1;
    }

    remove(a) {
        let temp = [];
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i][0] != a) {
                temp.push(this.edges[i]);
            }
        }
        this.edges = temp;
    }
}

function isCross(x, y, id) {
    try {
        G.verts.forEach(function (a) {
            if (a.id !== id && pow2(x - a.x) + pow2(y - a.y) < pow2(90)) throw{};
        });
    } catch (e) {
        return true;
    }
    return false;
}

function genPoint(a) {
    while (true) {
        let x = Math.random() * (width * 0.7) + width * 0.05;
        let y = Math.random() * (height * 0.9) + height * 0.05;
        if (!isCross(x, y, a)) {
            return new Point(a, x, y);
        }
    }
}

function randGraph(mn, mx = mn) {
    G.clear();
    G.setWeighted($("#widthVerts").is(':checked'));

    let v = Math.floor(Math.random() * (mx + 1 - mn)) + mn;

    for (let i = 1; i <= v; i++) {
        G.addV(i);
    }

    let rand = 0.6;
    for (let i = 1; i <= v + 1; i++) {
        for (let j = i + 1; j < v + 1; j++) {
            let tmp = Math.random();
            if (tmp > rand) {
                let weight = G.isWeighted() ? Math.round(Math.random() * 19) + 1 : 0;
                G.add(i, j, weight);
                rand = 0.9;
            } else rand -= 0.1;
        }
    }
}

function pow2(a) {
    return Math.pow(a, 2);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function genGraph(type, a, t) {

    let s = Array.from(a);
    let na = [];
    let tmp = "";

    for (let i = 0; i < s.length; i++) {
        if (s[i] >= '0' && s[i] <= '9') {
            tmp += s[i];
        } else {
            if (tmp.length > 0) {
                na.push(parseInt(tmp));
                tmp = "";
            }
        }
    }
    if (tmp !== undefined) na.push(parseInt(tmp));

    switch (type) {
        case '1':
            G.clear();
            G.setWeighted($("#widthVerts").is(':checked'));

            for (let i = 1; i <= t; i++) {
                for (let j = i + 1; j <= t + 1; j++) {
                    let tmp = na[i - 1 + (j - 1) * t];
                    if (tmp) {
                        if (G.isWeighted()) G.add(i, j, tmp);
                        else G.add(i, j);
                    }
                }
            }
            break;
        case '2':
            G.clear();
            G.setWeighted($("#widthVerts").is(':checked'));

            let width = na.length / t;
            for (let i = 1; i <= width; i++) {
                let k;
                for (let j = 1; j <= t; j++) {
                    let tmp = na[i - 1 + (j - 1) * width];
                    if (tmp) {
                        if (k) {
                            G.add(k, j);
                        } else {
                            k = j;
                        }
                    }
                }
            }
            break;
        case '3':
            G.clear();
            G.setWeighted($("#widthVerts").is(':checked'));

            for (let i = 0; i < na.length; i += (G.isWeighted() ? 3 : 2)) {
                if (G.isWeighted()) G.add(na[i], na[i + 1], na[i + 2]);
                else G.add(na[i], na[i + 1]);
            }
            break;
        default:
            return na;
    }
}

let width = window.innerWidth;
let height = window.innerHeight;

let G = new Graph();
let used = [];
$(document).ready(function () {
    Object.defineProperty(Object.prototype, 'showf', {
        value: function () {
            $(this).css('display', 'flex');
            return $(this);
        },
        enumerable: false
    });

    $(document).on("click", "#genGraph", function () {
        let val = parseInt($('#gnumber').val());
        if (val) randGraph(val);
        else randGraph(2, 20);
    });

    $(document).on("click", "#inputGraph", function () {
        genGraph($("#type-input").val(), $("#input").val(), $("#verts").val());
    });

    $(document).on("change", "#type-input", function () {
        let v = $(this).val();
        if (v === '3') $('#verts').prop('disabled', true);
        else $('#verts').prop('disabled', false);
    });

    $(document).on("change", "#level-input, #version-level", function () {
        used = [];
        $(".task .game , .task .norm").hide();
        let l = $("#level-input").val();
        let g = $("#version-level").is(':checked') ? "game" : "norm";
        $('.task[value="' + l + '"] .' + g).showf();
    });
});
