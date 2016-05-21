(function(){
    
    window.extractData || (window.extractData = {});
    window.extractData['auction'] = function(doc){
        console.log('extracting auction data...');
        var result = [];
        $('#itembest_T', doc).find('> ul > li').each(function( index, value ){
            var rank = $(this).find('.rank').text();
            var title = $(this).find('.info em a').text();
            var link = $(this).find('.info em a').attr('href');
            var price = $(this).find('.info .c_price span span').text().replace('~','').replace('원','');
            var price2 = $(this).find('.info .d_price span span').text().replace('~','').replace('원','');
            var freedelivery = $(this).find('.info img[alt=무료배송]').attr('alt');
            
            result.push({
                title: title,
                link: link,
                price: price,
                price2: price2,
                freedelivery: freedelivery,
                seller: null,
                rank: rank
            });
        });

        return result;
        
    }

})();