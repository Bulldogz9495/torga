import { drawLinesFromObjects, drawLinestoSub, rightMidpoint, leftMidpoint, findMidpoints, drawLine, setSpacing } from './modules/graphics.js';
import { initializeTasks } from './modules/tasks.js';
import { initializeLeftNav } from './modules/leftNav.js';
import * as utils from './modules/utils.js';

var tasks = {}
var lines = {}
var currentSaveTask = {}

initializeLeftNav()
tasks = initializeTasks()
initializeModal()
renderEverything()



// ###### Event Listeners
// Create new high level task
var button = document.getElementById("new_top_task")
button.addEventListener("click", function() {
    currentSaveTask = tasks
    document.getElementById("createTaskModal").style.display = "block"
    renderEverything()
})

// Create event listener that saves data from modalDataSaved event to current save task object
document.addEventListener("modalDataSaved", function(event) {
    var savedData = event.detail;
    const date = new Date();
    currentSaveTask.subtasks[Object.keys(currentSaveTask.subtasks).length + 1] = {
        'title': savedData.title,
        'dateCreated': `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
        'dateToComplete': savedData.date_due,
        'content': savedData.content,
        subtasks: {},
    }
    currentSaveTask = {}
    renderEverything()
})

// #### Functions
// Remove all task objects and replace them with the new objects based directly on the high level tasks object. Also draw lines and resize the svg element to fit
function renderEverything(){
    var longTaskContainers = document.querySelectorAll(".longTaskContainer");
    longTaskContainers.forEach(function(container) {
        container.remove();
    });
    renderTaskObject(tasks, document.getElementById("mainContent"), lines)
    drawLinesFromObjects(lines)
    resizeSVGElement(document.getElementsByTagName('svg')[0])
}

// Resize the SVG element so that it can create lines for all existing tasks
function resizeSVGElement(svg){
    svg.setAttribute('width', document.body.scrollWidth);
    svg.setAttribute('height', document.body.scrollHeight);
}

// Creates and returns a task div based on a task object
export function createTask(task, permission){
    function createInputElement(className, content){
        var d = document.createElement("input")
        d.type = "text";
        d.value = content;
        d.classList.add(className)
        return d
    }
    const div = document.createElement('div')
    div.classList.add('task')
    if (permission){
        const taskButtons = document.createElement('div')
        taskButtons.className = 'taskButtons'
        const b = document.createElement("button")
        b.className = "createButton"
        b.innerHTML = '<i class="fa-solid fa-square-plus"></i>'
        b.addEventListener('click', function() {
            document.getElementById("createTaskModal").style.display = "block"
            currentSaveTask = task
        })
        taskButtons.appendChild(b)
        const c = document.createElement('button')
        c.className = 'cancelButton'
        c.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        c.addEventListener('click', function () {
            if (Object.keys(task.subtasks).length > 0) {
                const deleteConfirmationMessage = `There are ${Object.keys(task.subtasks).length} subtasks that will be deleted along with this task. Are you sure you want to delete all of the subtasks?`
                var confirmDelete = window.confirm(deleteConfirmationMessage)
                if (confirmDelete){
                    utils.deleteSubobjectRecursively(tasks, task)
                    renderEverything()
                }
            } else {
                utils.deleteSubobjectRecursively(tasks, task)
                renderEverything()
            }
        })
        taskButtons.appendChild(c)
        div.appendChild(taskButtons)
    }
    const d = createInputElement('taskTitle', task.title)
    d.placeholder = "Title"
    d.addEventListener("input", function(){
        task.title = d.value
    })
    div.appendChild(d)
    const i = createInputElement('taskTimeline',task.dateToComplete)
    i.placeholder = "Date"
    i.addEventListener("input", function(){
        task.dateToComplete = i.value
    })
    div.append(document.createElement('div').appendChild(document.createTextNode('Due: ')))
    div.appendChild(i)
    const v = createInputElement('taskDescription', task.content)
    v.placeholder = "Description"
    v.addEventListener("input", function(){
        task.content = v.value
    })
    div.append(document.createElement('div').appendChild(document.createTextNode('Description: ')))
    div.appendChild(v)
    return div
}

// Initialize the create task modal
function initializeModal() {
    const createTaskModal = document.getElementById("createTaskModal")
    const modalTask = createTask({
        'title': '', 
        'dateCreated': '', 
        'dateToComplete': '', 
        'content': ''
    }, false)
    createTaskModal.appendChild(modalTask)
    const saveButton = document.createElement('button')
    saveButton.innerHTML = '<i class="fa-solid fa-square-plus"></i>'
    saveButton.className = 'createButton'
    // Save the new task object (defined by the user in the create task model) by sending a custom event called modallDataSaved
    saveButton.addEventListener("click", function(){
        var item1Input = modalTask.querySelector(".taskTitle")
        var item2Input = document.querySelector(".taskTimeline")
        var item3Input = document.querySelector(".taskDescription")
        var data = {
            title: item1Input.value,
            date_due: item2Input.value,
            content: item3Input.value
        }
        var event = new CustomEvent("modalDataSaved", { detail: data });
        document.dispatchEvent(event);
        document.getElementById("createTaskModal").style.display = "none"
        item1Input.value = ""
        item3Input.value = ""
        item2Input.value = ""
    })
    const cancelButton = document.createElement('button')
    cancelButton.className = 'cancelButton'
    cancelButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    // Hide the create task modal
    cancelButton.addEventListener("click", function() {
        document.getElementById("createTaskModal").style.display = "none"
    })
    createTaskModal.appendChild(saveButton)
    createTaskModal.appendChild(cancelButton)
}


// Revursive Task generation that starts at the high level task 
// and goes through subtask objects creating long and tall task 
// containers to hold all task objects in the given task object
function renderTaskObject(tasks, parent, lines, parentTask){
    for (var subtask in tasks.subtasks){
        const divLong = document.createElement('div')
        divLong.classList.add('longTaskContainer')
        var task = createTask(tasks.subtasks[subtask], true)
        divLong.append(task)
        parent.append(divLong)
        const divTall = document.createElement('div')
        divTall.classList.add('tallTaskContainer')
        divLong.append(divTall)
        if ('subtasks' in tasks.subtasks[subtask]){
            var longs = renderTaskObject(tasks.subtasks[subtask], divTall, lines, task)
            if (longs !== undefined) {divTall.append(longs)}
        }
        if (parentTask !== undefined) {
            lines[Object.keys(lines).length + 1] = {"lineStarter": parentTask, "lineEnder": task}
        }
    }
}
