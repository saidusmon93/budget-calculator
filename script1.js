$(document).ready(function () {
    var balance = $("#balance");
    var kirim;
    var chiqim;
    var xisob = [];
    var balanskir;
    var balanschiq;
    var bal;

    const addText = () => {

        var tableAdd = xisob.map((item, i) => `
        <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${item.izoh}</td>
                        <td>${item.summa}</td>
                        <td>${item.sana}  ${item.hour}</td>
                    </tr>
        `).join('')
        $('#text').html(tableAdd)
    }

    if ($('#summa').val() < balance) {
        $('#btn').click(() => {
            var sana = new Date();
            var yil = sana.toLocaleDateString();
            var hour = sana.toLocaleTimeString();
            var izoh = $('#izoh').val();
            var summa = $('#summa').val();
            var variant = $('#inputGroupSelect04').val();
            var qiymat = summa * variant;
            if (izoh == "" || summa == "") {
                alert('Malumot kirgizing')
            } else {
                xisob.push({
                    izoh: izoh,
                    summa: Number(qiymat),
                    sana: yil,
                    hour: hour
                });
                $('#izoh').val('');
                $('#summa').val('');
            };
            bal = xisob.reduce((total, index) => {
                return total + index.summa
            }, 0)
            balance.text('Balans: ' + bal)
            console.log(xisob)
            addText();
        });
    }


    $('#kirim').click(() => {
        kirim = xisob.filter(kirim => {
            return kirim.summa > 0;
        });

        var tableAddKirim = kirim.map((item, i) => `
        <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${item.izoh}</td>
                        <td>${item.summa}</td>
                        <td>${item.sana} ${item.hour}</td>
                    </tr>
        `).join('');
        $('#text').html(tableAddKirim);
        balanskir = kirim.reduce((total, index) => {
            return total + index.summa
        }, 0);
        $('#balanskir').text(balanskir)
        console.log(balanskir);
    })
    $('#chiqim').click(() => {
        chiqim = xisob.filter(chiqim => {
            return chiqim.summa < 0;
        });
        var tableAddKirim = chiqim.map((item, i) => `
        <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${item.izoh}</td>
                        <td>${item.summa}</td>
                        <td>${item.sana} ${item.hour}</td>
                    </tr>
        `).join('');
        $('#text').html(tableAddKirim);
        balanschiq = chiqim.reduce((total, index) => {
            return total + index.summa
        }, 0);
        $('#balanschiq').text(balanschiq)
    });
    $('#search').change(() => {
        var poisk = $('#search').val();
        var searchNote = xisob.filter(index => {
            return index.izoh == poisk || index.sana == poisk;
        })
        var tableAddKirim = searchNote.map((item, i) => `
        <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${item.izoh}</td>
                        <td>${item.summa}</td>
                        <td>${item.sana} ${item.hour}</td>
                    </tr>
        `).join('');
        $('#text').html(tableAddKirim);
        $('#search').val('');
    })

})