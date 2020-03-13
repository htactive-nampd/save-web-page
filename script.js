let utils = require("./utils")

/* Số page cần lấy, lưu ý phải nhỏ hơn số page có trên trang chủ của web*/
const npage = 4

/* import links from json file */
const fs = require("fs")
const links = JSON.parse(fs.readFileSync("./links.json"));


console.log("\x1b[32m","fetching data ... ", "\x1b[0m")

/* sử dụng đệ quy để đọc lần lượt các page trong link  */
let n = 0;

(async function read(n){

    let urlArr = await utils.readPage(links[n], npage)

    /* lưu trữ page vào folder */
    utils.saveFile(urlArr, () => {
        if (n < links.length-1) 
            read(n+1)
        else 
            console.log("done.")    
    })

})(n)
