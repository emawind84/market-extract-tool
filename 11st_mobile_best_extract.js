(function(){
    "use strict";

    var market_code = '11st_mobile';
    
    window.extractData || (window.extractData = {});
    window.extractData[market_code] = function(doc, result, $http, querydata){
        console.log('extracting 11st data...');
        //var result = [];
        $http({
            url: '/bestmarket/11mobile',
            data: {
                querystring: querydata.extra
            },
            method: 'POST',
            dataType: 'json'
        }).then(function(response){
            console.log(response.data);
            var data = response.data.data;

            for( var i = 0; i < data.length; i++ ) {
                if( data[i].hasOwnProperty('commonProduct') ) {
                    var prod = data[i].commonProduct;

                    var rank = prod.RANK;
                    var title = prod.prdNm;
                    var link = prod.linkUrl;
                    var price = prod.finalDscPrc;
                    var price2 = ""
                    var freedelivery = (prod.benefitList.length) ? prod.benefitList[0].rate : '';
                    var seller = '';
                    var image = prod.prdImgUrl;
                    
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

                }
            }

            console.log(result);

        });
        
    }
    
})();