(function(){
    "use strict";
    
    window.extractData || (window.extractData = {});
    window.extractData['11st_mobile'] = function(doc){
        console.log('extracting 11st data...');
        var result = [];
        $('.thumbnail_list > ul > li', doc).not('.ranking_more').each(function(){
            var rank = $(this).find('.flg_ranking').text();
            var title = $(this).find('.pup_title a').text();
            var link = $(this).find('.pup_title a').attr('href');
            var price = $(this).find('.pub_price').text().replace('~','').replace('원','');
            var freedelivery = $(this).find('.ico_deliver1 b').text();
            var seller = $(this).find('.seller_id > a').text();
            
            $(this).find('.pub_salep').find('.plus_option').remove()
            var price2 = $(this).find('.pub_salep').text().replace('~','').replace('원','');
            
            result.push({
                rank: rank,
                title: title,
                link: link,
                price: price,
                price2: price2,
                freedelivery: freedelivery,
                seller: seller
                //,dom: this
            });
        });

        return result;
    }
    
})();