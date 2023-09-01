import { drawLinestoSub, rightMidpoint, leftMidpoint, findMidpoints, drawLine, setSpacing } from './modules/graphics.js';
import { interpretTask } from './modules/tasks.js';

class task {
    constructor(taskName, dateCreated, dateToComplete, description) {
        this.taskName = taskName;
        this.dateCreated = dateCreated;
        this.dateToComplete = dateToComplete;
        this.description = description;
        this.subtasks = [];
        this.numsubtasks = 0;
        this.hassubtasks = false;
    }
    addChild(child){
        this.subtasks.push(child)
        if (!this.hassubtasks){ this.hassubtasks = true;}
        this.numsubtasks += 1;
    }
}

const task1 = new task('task1', '07/06/2022', '08/06/2022', 'lipsum ')
const task1_1 = new task('task1_1', '07/06/2022', '08/06/2022', 'lipsum ')
const task1_2 = new task('task1_2', '07/06/2022', '08/06/2022', 'lipsum ')
const task1_2_1 = new task('task1_2_1', '07/06/2022', '08/06/2022', 'lipsum ')
const task1_2_2 = new task('task1_2_2', '07/06/2022', '08/06/2022', 'lipsum ')
const task1_2_3 = new task('task1_2_3', '07/06/2022', '08/06/2022', 'lipsum ')
const task1_3 = new task('task1_3', '07/06/2022', '08/06/2022', 'lipsum ')
const task2 = new task('task2', '07/06/2022', '08/06/2022', 'lipsum ')


task1_2.addChild(task1_2_1)
task1_2.addChild(task1_2_2)
task1_2.addChild(task1_2_3)
task1.addChild(task1_1)
task1.addChild(task1_2)
task1.addChild(task1_3)
task2.addChild(task1_2)

document.body.append(interpretTask([task1, task2], 1))

// Draw a line between tasks if task containers exist
var taskContainers = document.getElementsByClassName("taskContainer")
for (var i = 0; i < taskContainers.length; i++) {
    drawLinestoSub(taskContainers[i], document.getElementsByTagName('svg')[0])
}

// Resize SVG to correct Height
document.addEventListener('scroll', function(e) {
    // Draw a line between tasks
    while (document.getElementsByTagName('svg')[0].firstChild) { document.getElementsByTagName('svg')[0].removeChild(document.getElementsByTagName('svg')[0].firstChild) }
    drawLinestoSub(document.containers[0], svg)
    // drawLinestoSub(document.containers[1], svg)
})


