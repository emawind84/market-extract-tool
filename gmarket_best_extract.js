(function(){
    
    var market_code = 'gmarket';

    window.extractData || (window.extractData = {});
    window.extractData[market_code] = function(doc, result){
        console.log('extracting gmarket data...');
        //var result = [];
        $('.best-list', doc).not('.type2').find('ul > li').each(function(index, value){
            console.log('####11111');
            var title = $(this).find('.itemname').text();
            var link = $(this).find('.itemname').attr('href');
            var price = $(this).find('.o-price span span').text().replace('~','').replace('원','');
            var price2 = $(this).find('.s-price strong span span').text().replace('~','').replace('원','');
            var freedelivery = $(this).find('.icon img').attr('alt');
            var image = $(this).find('.thumb img').attr('data-original');
            
            var seller = $(this).html()
            seller = seller.replace(/(<!--div)/, '<div').replace(/(\/div-->)/, '\/div>');
            seller = $('<div>' + seller + '</div>').find('.goods-view a');
            seller.find('.view').remove();
            seller = seller.html().trim();
            
            result.push({
                rank: index + 1,
                title: title,
                link: link,
                price: price,
                price2: price2,
                freedelivery: freedelivery,
                seller: seller,
                market: market_code,
                image: image
            });

            console.log(result);
        });

        return result;
        
    }

})();