const fs = require("fs")
const request = require("request-promise")

/* Nhận url và trả về domain gốc 
 * @param {String} url 
 * 
 * @return {String} hostname
 */
function extractHostname(url) {
    let hostname;
    
    hostname = (url.indexOf("//") > -1) ? url.split('/')[2] : hostname = url.split('/')[0]
    hostname = hostname.split(':')[0]
    hostname = hostname.split('?')[0]

    return hostname;
}


async function saveHTMLPages(urlArray, callback) {

    let date = new Date()

    console.log("\x1b[32m","creating directory ... /resources"+extractHostname(urlArray[0]), "\x1b[0m")

    /* kiếm tra thư mục ngày, nếu không có sẽ tạo thư mục mới */
    let dirPath = `./resources/${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

    /* kiếm tra thư mục site */
        dirPath += `/${extractHostname(urlArray[0])}`
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

    /* sử dụng đệ quy để tải lần lượt các file vào thư mục */
    let pageNum = 0;

    (function download(pageNum) {

        request(urlArray[pageNum])
        .pipe(fs.createWriteStream(dirPath + "/page" + (pageNum+1) + ".html"))
        
        .on("close", function() {

            console.log("\x1b[33m","save file ","\x1b[0m","page"+ (pageNum+1) +".html")

            if (pageNum < urlArray.length-1) 
                download(pageNum+1)
            else 
                callback()
            
        })

    })(pageNum)

}

/* export module */
module.exports = saveHTMLPages