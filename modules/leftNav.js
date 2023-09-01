export function initializeLeftNav() {
    const leftNav = document.getElementById("leftNav")
    var title = document.createElement("div")
    title.className =  "fileTitle"
    title.innerText = "Files"
    leftNav.appendChild(title)
    if (window && window.process && window.process.type) {

    } else {
        for (var i = 0; i < 5; i++){
            var div = document.createElement("div")
            div.className =  "fileName"
            div.innerText = "File " + i +".js"
            leftNav.appendChild(div)
        }
    }
}