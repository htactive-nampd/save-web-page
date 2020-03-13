const request = require("request-promise")
const cheerio = require("cheerio")

/* Nhận một url và trả về các link từng page của nó.  
 *  @param {String} url
 *  @param {Int} n | số page cần lấy 
 * 
 *  @return {Array} page url
 */
async function getPage(url, npage) {

    let html = await request(url) 
    return parseHTML(url, html, npage)
}

/* Phân tích html DOM sử dụng cheerio
 * @param {String} url
 * @param {String} html | html từ url
 * 
 * @return {Array} page url
 */
async function parseHTML (url, html, npage) {

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
            limit = (npage <= block.length -1) ? npage : block.length

            for (i=0; i < limit; ++i) 
                urlArray.push( "https://viblo.asia" + block[i].attribs.href)

            return urlArray

        case "https://itviec.com":
            
            block = $("a.top-company") 

            urlArray = []
            limit = (npage <= block.length -1) ? npage : block.length

            for (i=0; i < npage; ++i) 
                urlArray.push( "https://itviec.com" + block[i].attribs.href)

            return urlArray

        case "https://techtalk.vn":
        
            block = $(".td_uid_12_5e6b03769a168_rand .td-module-thumb") 

            urlArray = []
            limit = (npage <= block.length -1) ? npage : block.length

            for (i=0; i < npage; ++i) 
                urlArray.push(block[i].children[0].attribs.href)

            return urlArray
                
    }
}

/* export function */
module.exports = getPage