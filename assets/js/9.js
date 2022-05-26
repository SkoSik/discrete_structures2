$(document).ready(function () {
    $('#floyd').on('click', function () {
        let matr = [];
        let n = G.verts.length - 1;

        $('.t2').empty();
        for (let i = 0; i < n; i++) {
            $('.t2').append('<tr>');
            for (let j = 0; j < n; j++)
                $('.t2 tr:last').append('<td>0</td>');
        }

        for (let i = 1; i <= n; i++) {
            matr[i] = [];
            for (let j = 0; j <= n; j++) {
                matr[i].push(Number.MAX_VALUE);
            }
        }

        for (let i = 1; i <= n; i++) {
            for (const el of G.verts[i].edges) {
                matr[el[0]][i] = el[1];
                matr[el[0]][i] = el[1];
            }
        }

        for (let k = 1; k <= n; k++) {
            for (let i = 1; i <= n; i++) {
                for (let j = 1; j <= n; j++) {
                    if (matr[i][k] + matr[k][j] < matr[i][j]) {
                        matr[i][j] = matr[i][k] + matr[k][j];
                    }
                }
            }
        }

        let ind = 1;
        $(".t2 tr").each(function () {
            let tds = $(this).find('td');
            for (let i = 0; i < n; i++) {
                if(matr[ind][i + 1]<1000000 && ind!=i+1)
                    $(tds[i]).text(matr[ind][i + 1]);
            }
            ind++;
        });
    });
});
