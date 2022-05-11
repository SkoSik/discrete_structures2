// let matrix = [
//     [0,5,9,100],
//     [100,0,2,8],
//     [100,100,0,7],
//     [4,100,100,0]
// ]
let n = 4;
$(document).ready(function () {
    $('#btn').on('click', function (){
        let matr = [];

        $(".t1 tr").each(function() {
            let row = [];
            let tds = $(this).find('td');
            let inps = tds.find('input');
            for(let i = 0; i < inps.length; i++)
                row.push(parseInt(inps[i].value,10));
            matr.push(row);
        });
        console.log(matr);
        let ans = floyd(matr);
        let ind = 0;
        $(".t2 tr").each(function() {
            let tds = $(this).find('td');
            let inps = tds.find('input');
            for(let i = 0; i < ans[ind].length; i++){
                inps[i].value = ans[ind][i];
            }
            ind++;
        });
        matr = [];
    });
    $('#verts').on('click', function(){
        n = $('#nVerts').val();

        $('.t1').empty();
        for(let i = 0; i < n; i++){
            $('.t1').append('<tr>');
            for(let j = 0; j < n; j++)
                $('.t1 tr:last').append('<td><input value="0"></td>');
        }
        $('.t2').empty();
        for(let i = 0; i < n; i++){
            $('.t2').append('<tr>');
            for(let j = 0; j < n; j++)
                $('.t2 tr:last').append('<td><input value="0" readonly></td>');
        }
    });
});
function floyd(matr){
    for(let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++)
                if (matr[i][k] + matr[k][j] < matr[i][j]) {
                    matr[i][j] = matr[i][k] + matr[k][j];
                }
    }
    console.log(matr);
    return matr;
}
