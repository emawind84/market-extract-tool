(function(){
    
    window.extractData || (window.extractData = {});
    window.extractData['coupang'] = function(doc){
        console.log('extracting coupang data...');
        var result = [];
        $('.product-list', doc).find('> ul > li').each(function( index, value ){
            var title = $(this).find('.title em').text();
            var link = $(this).find('a.detail-link').attr('href');
            var price = $(this).find('.price-detail .original span').text().replace('~','').replace('원','');
            var price2 = $(this).find('.price-detail .price em').text().replace('~','').replace('원','');
            var freedelivery = $(this).find('.delivery-free').text();
            var more = $(this).find('.sale-persent').text();
            
            result.push({
                title: title,
                link: link,
                price: price,
                price2: price2,
                freedelivery: freedelivery,
                seller: null,
                rank: index + 1,
                more: more
            });
        });

        return result;
        
    }

})();