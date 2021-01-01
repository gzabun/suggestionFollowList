function listele(data) {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'data.json',
        success: function(result) {

            let socialMedia = result[data]
            let hesap = socialMedia.takip
            let content = ''
            let htmlContent = ''

            function getSortOrder(param) {
                return function(x, y) {
                    if (x[param] > y[param]) {
                        return 1
                    } else if (x[param] < y[param]) {
                        return -1
                    }
                    return 0
                }
            }

            hesap.sort(getSortOrder("name"));

            hesap.forEach(item => {
                content += `<div class="col-12 list-item d-flex">
                            <a class="col-3" href="${item.url}" target="_blank">${item.name}</a>
                            <span class="col-9">${item.description}</span> 
                        </div>`
            })

            htmlContent = `   
            <div class="fl col-12 list-header-wrap">
                <span class="list-header">${socialMedia.name}</span>
                <input type="text" id="search-item" placeholder="Aramak İstediğiniz Kelimeyi Giriniz...">

            </div>
                        
            <div class="fl col-12 list-content-wrap">
            <div class="col-12 d-flex">
                <span class="col-3">Hesap </span>
                <span class="col-9">Açıklama</span>
            </div>
            <div class="col-12 list-item-content">${content}</div>`

            $('.list-content-wrapper').html(`${htmlContent}`)

        }
    })

}

$(document).ready(function() {


    $('.social-item').click(function(e) {
        var data = $(this).attr('data-name');

        listele(data)
    })

    $('.list-content-wrapper').on('keyup', '#search-item', function() {
        var value = $(this).val().toLowerCase();
        $(".list-item *").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    })

});