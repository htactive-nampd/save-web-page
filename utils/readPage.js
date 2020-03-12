const request = require("request-promise")
const cheerio = require("cheerio")

/* Nhận một url và trả về các link từng page của nó.  
 *  @param {String} url
 *  @param {Int} n | số page cần lấy 
 * 
 *  @return {Array} page url
 */
async function getPage(url, n) {

    let html = await request(url) 

    return parseHTML(url, html)
}

/* Phân tích html DOM sử dụng cheerio
 * @param {String} url
 * @param {String} html | html từ url
 * 
 * @return {Array} page url
 */
async function parseHTML (url, html) {

    const $ = cheerio.load(html)

    /* bỏ dấu / ở cuối url đi */
    if (url.lastIndexOf("/") === url.length-1)
        url = url.slice(0, url.length-1)  

    /* đối với mỗi website sẽ có cách DOM khác nhau */
    switch (url) { 
        
        case "https://viblo.asia":
            
            block = $(".post-title--inline .link") 

            /* $(selector) sẽ trả về array các element của page, sử 
            * dụng for-loop để tách href từ html tag và lưu nó vào lại urlArray.
            */
            urlArray = []
            for (i=0; i < block.length; ++i) 
                urlArray.push( "https://viblo.asia" + block[i].attribs.href)

            return urlArray

        case "https://itviec.com":
            
            block = $("a.top-company") 

            urlArray = []
            for (i=0; i < block.length; ++i) 
                urlArray.push( "https://itviec.com" + block[i].attribs.href)

            return urlArray

    }
}

/* export function */
module.exports = getPage