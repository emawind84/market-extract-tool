(function(){
    var market_code = 'coupang';

    window.extractData || (window.extractData = {});
    window.extractData[market_code] = function(doc, result){
        console.log('extracting coupang data...');
        //var result = [];
        $('.best100-sub-content__item', doc).each(function( index, value ){
            var title = $(this).find('.name').text();
            var link = 'http://www.coupang.com' + $(this).find('a.best100-sub-content__item-link').attr('href');
            var price = $(this).find('.price-value').eq(0).text().replace('~','').replace('원','');
            var price2 = $(this).find('.price-value').eq(1).text().replace('~','').replace('원','');
            var freedelivery = $(this).find('.delivery-info').text();
            var more = $(this).find('.sale-persent').text();
            var image = $(this).find('.image img').attr('src');

            result.push({
                title: title,
                link: link,
                price: price,
                price2: price2,
                freedelivery: freedelivery,
                seller: null,
                rank: index + 1,
                more: more,
                market: market_code,
                image: image
            });
        });

        return result;
        
    }

})();