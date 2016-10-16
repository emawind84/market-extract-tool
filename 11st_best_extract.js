(function(){
    "use strict";

    var market_code = '11st';
    
    window.extractData || (window.extractData = {});
    window.extractData[market_code] = function(doc, result){
        console.log('extracting 11st data...');
        //var result = [];
        $('#bestPrdList > ul > li', doc).not('.ranking_more').each(function(){
            var rank = $(this).find('.flg_ranking').text();
            var title = $(this).find('.pup_title a').text();
            var link = $(this).find('.pup_title a').attr('href');
            var price = $(this).find('.pub_price').text().replace('~','').replace('원','');
            var freedelivery = $(this).find('.ico_deliver1 b').text();
            var seller = $(this).find('.seller_id > a').text();
            var image = $(this).find('.pub_photo img').attr('src');
            
            $(this).find('.pub_salep').find('.plus_option').remove()
            var price2 = $(this).find('.pub_salep').text().replace('~','').replace('원','');
            
            result.push({
                rank: rank,
                title: title,
                link: link,
                price: price,
                price2: price2,
                freedelivery: freedelivery,
                seller: seller,
                market: market_code,
                image: image
            });
        });

        return result;
    }
    
})();