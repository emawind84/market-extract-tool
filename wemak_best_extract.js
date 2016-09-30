(function(){

    var market_code = 'wemak';
    
    window.extractData || (window.extractData = {});
    window.extractData[market_code] = function(doc){
        console.log('extracting wemak data...');
        var result = [];
        $('.section_list', doc).find('> ul > li').each(function( index, value ){
            var title = $(this).find('.tit_desc').text();
            var link = $(this).find('a[loc_info]').attr('href');
            var price = $(this).find('.prime').text().replace('~','').replace('원','');
            var price2 = $(this).find('.sale').text().replace('~','').replace('원','');
            var freedelivery = $(this).find('.option_l span').text();
            var more = $(this).find('.box_desc .standardinfo').text();
            console.log(result);
            result.push({
                title: title,
                link: link,
                price: price,
                price2: price2,
                freedelivery: freedelivery,
                seller: null,
                rank: index + 1,
                more: more,
                market: market_code
            });
        });

        return result;
        
    }

})();