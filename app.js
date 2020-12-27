function getir(child) {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'data.json',
        success: function(result) {



            var socialMedia = result[child]


            var sa = ''
            socialMedia.takip.forEach(element => {
                sa += `<div class="col-12 list-item d-flex">
                            <a class="col-3" href="${element.url}" target="_blank">${element.name}</a>
                            <span class="col-9">${element.description}</span> 
                        </div>`
            });




            var htmlBody = `   
        <div class="fl col-12 list-header-wrap">
            <span class="list-header">${socialMedia.name}</span>
            <input type="text" id="search-item" placeholder="Aramak İstediğiniz Kelimeyi Giriniz...">

        </div>
                    
        <div class="fl col-12 list-content-wrap">
        <div class="col-12 d-flex"><span class="col-3">Hesap</span><span class="col-9">Açıklama</span></div>
        <div class="col-12 list-item-content">${sa}</div>

        
        `

            $('.list-content-wrapper').html(`${htmlBody}`)

        }
    })



}

$(document).ready(function() {


    $('.social-item').click(function(e) {

        var child = $(this).attr('data-name');

        getir(child)


    })

    $('.list-content-wrapper').on('keyup', '#search-item', function() {
        var value = $(this).val().toLowerCase();
        $(".list-item *").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    })






});