(function(){
    
    window.extractData || (window.extractData = {});
    window.extractData['gmarket'] = function(doc){
        console.log('extracting gmarket data...');
        var result = [];
        $('.best-list', doc).not('.type2').find('ul > li').each(function(){
            var title = $(this).find('.itemname').text();
            var link = $(this).find('.itemname').attr('href');
            var price = $(this).find('.o-price span span').text();
            var price2 = $(this).find('.s-price strong span span').text();
            var freedelivery = $(this).find('.icon img').attr('alt');
            
            var seller = $(this).html()
            seller = seller.replace(/(<!--div)/, '<div').replace(/(\/div-->)/, '\/div>');
            seller = $('<div>' + seller + '</div>').find('.goods-view a');
            seller.find('.view').remove();
            seller = seller.html().trim();
            
            result.push({
                title: title,
                link: link,
                price: price,
                price2: price2,
                freedelivery: freedelivery,
                seller: seller
            });
        });

        return result;
        
    }

})();