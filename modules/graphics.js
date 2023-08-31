

export function drawLinestoSub(div, svg){
    console.assert(typeof(div) != "undefined")
    const nodes = div.subtasks
    console.log(div)
    const point1 = rightMidpoint(nodes[0].subtasks[0])
    const n = Array.from(nodes[1].subtasks)
    n.forEach(item =>  {
        if (item.className == "task"){
            let point2 = leftMidpoint(item)
            drawLine(svg, point1[0], point1[1], point2[0], point2[1])
        }
    })
}

// These two functions will revieve an element and return the right or left midpoints of the content
export function rightMidpoint(div){
    const rect = div.getBoundingClientRect();
    const x = rect.right
    const y = (rect.bottom - rect.top) / 2 + rect.top
    return [x, y]
}
export function leftMidpoint(div){
    const rect = div.getBoundingClientRect();
    const x = rect.left
    const y = (rect.bottom - rect.top) / 2 + rect.top
    return [x, y]
}

// This funtion will draw an SVG line on the provided SVG element from x1, y1 to x2, y2
export function drawLine(svg, x1, y1, x2, y2){
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const middle = [ x1 + (x2 - x1) / 2 , y1 + (y2 - y1) / 2]
    line.setAttribute('d', 'M ' + x1 + ', ' +  y1 + ' Q ' + middle[0] + ', ' + y1 + ' ' + middle[0] + ', ' + middle[1] + ' Q ' + middle[0] + ', ' + y2 + ' ' +  x2  + ', ' + y2)
    svg.appendChild(line)
}

export function drawLinesFromObjects(lines){
    // Remove old lines
    var svg = document.getElementsByClassName("lineMaker")[0]
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild)
    }
    // Generate new liones for each line in the line object adjusted for the scroll height of the screen
    for (var line in lines){
        const right = rightMidpoint(lines[line].lineStarter)
        const left = leftMidpoint(lines[line].lineEnder)
        drawLine(document.getElementsByTagName('svg')[0], right[0] + window.scrollX, right[1] + window.scrollY, left[0] + window.scrollX, left[1] + window.scrollY)
    }
}

export function setSpacing(div){
    
}

// This funtion will recieve a parent element and a class identifier 
// It will return the y value midpoint of every child element that matches the class ID as an arrray
export function findMidpoints(div, c){
    const nodeList = div.subtasks
    const rect1 = div.getBoundingClientRect()
    let midPoints = []
    let height = rect1.top
    for(let i = 0; i < nodeList.length; i++){
        let rect2 = nodeList[i].getBoundingClientRect()
        let elementMid = ((rect2.bottom - rect2.top) / 2) + rect2.top
        let elementHeight = (elementMid - height) * 2
        if (nodeList[i].className === c) {
            midPoints.push(elementMid)
        }
        height += elementHeight
        // console.log("height ", height)
    }
    return midPoints
}