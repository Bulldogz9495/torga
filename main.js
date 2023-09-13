import { drawLinesFromObjects, drawLinestoSub, rightMidpoint, leftMidpoint, findMidpoints, drawLine, setSpacing } from './modules/graphics.js';
import { initializeTasks } from './modules/tasks.js';
import * as utils from './modules/utils.js';

var tasks = {}
var lines = {}
var currentSaveTask = {}


initializeLeftNav()
initializeModal()
tasks = initializeTasks();
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
        'dateCreated': date,
        'dateToComplete': savedData.date_due,
        'content': savedData.content,
        'completed': savedData.completed,
        subtasks: {},
    }
    currentSaveTask = {}
    renderEverything()
})

// Add zoom functionality to main content window
document.getElementById("top_zoom_in").addEventListener("click", () => {
    var main = document.getElementById("taskContent")
    utils.zoomIn(document.getElementById("taskContent"), 0.25)
})
document.getElementById("top_zoom_out").addEventListener("click", () => {
    utils.zoomIn(document.getElementById("taskContent"), -0.25)
})

// Before closing main content window
window.addEventListener('beforeunload', () => {
    saveFile()
})

// #### Functions
// Load Logic
async function loadFile() {
    if (document.getElementsByClassName('selected').length > 0) {
        const fileName = document.getElementsByClassName('selected')[0].getElementsByTagName('ul')[0].textContent
        window.ipcRenderer.invoke('load-file', fileName + '.json').then((response) => {
            tasks = response
            renderEverything()
        })
        // .catch((error) => {console.error('IPC request error:', error)})
    } else {console.log("Cannot load file because there are no files selected")}
}

// Save Logic
function saveFile() {
    if (document.getElementsByClassName('selected').length > 0) {
        const fileName = document.getElementsByClassName('selected')[0].getElementsByTagName('ul')[0].textContent + '.json'
        window.ipcRenderer.invoke('save-file', tasks, fileName)
    } else {
        window.ipcRenderer.invoke('save-file', tasks, "sample.json")
    }
}

// Remove all task objects and replace them with the new objects based directly on the high level tasks object. Also draw lines
function renderEverything(){
    var longTaskContainers = document.querySelectorAll(".longTaskContainer");
    longTaskContainers.forEach(function(container) {
        container.remove();
    });
    renderTaskObject(tasks, document.getElementById("taskContent"), lines)
    drawLinesFromObjects(lines)
}

// Creates and returns a task div based on a task object
export function createTask(task, permission){
    function createInputElement(className, content, elementType, inputType){
        var d = document.createElement(elementType)
        if (inputType !== undefined) {d.type = inputType;}
        d.value = content;
        d.classList.add(className)
        if (elementType == "textarea"){
            d.addEventListener("input", function () {
                d.style.height = 'auto'
                d.style.height = d.scrollHeight + 'px'
                drawLinesFromObjects(lines)
            })
        }
        return d
    }
    const div = document.createElement('div')
    div.classList.add('task')
    if (permission){
        const date = new Date()
        const complete = new Date(task.dateToComplete)
        if (task.completed) {
            div.classList.add('completed')
        } else {
            if (complete < date) {div.classList.add('overdue')} // Check for overdue time
            // if (Date(task.dateToComplete) > Date().now()) {div.classList.add('.overdue')} Normal
        }
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
    const d = createInputElement('taskTitle', task.title, "input", 'text')
    d.placeholder = "Title"
    d.addEventListener("input", function(){
        task.title = d.value
    })
    div.appendChild(d)
    const div1 = document.createElement('div')
    const div11 = document.createElement('div')
    const div12 = document.createElement('div')
    div1.appendChild(div11)
    div1.appendChild(div12)
    div1.style.display = 'flex';
    div1.style['flex-direction'] = 'row';
    div11.style.display = 'flex'
    div11.style['flex-direction'] = 'row';
    div12.style.display = 'flex'
    div12.style['flex-direction'] = 'row';
    div12.style.position = 'absolute'
    div12.style.right = 0
    const check = createInputElement('taskCompletion', true, "input", 'checkbox')
    if (task.hasOwnProperty('completed') && task.completed){check.click()}
    check.addEventListener("input", function(){
        if (check.clicked){task.completed = true}else{task.completed = false}
    })
    div11.appendChild(check)
    div11.appendChild(document.createTextNode('Completed'))
    const i = createInputElement('taskTimeline',task.dateToComplete, "input", 'date')
    i.placeholder = "Date"
    i.addEventListener("input", function(){
        task.dateToComplete = i.value
    })
    div12.append(document.createElement('div').appendChild(document.createTextNode('Due:')))
    div12.appendChild(i)
    div.appendChild(div1)
    const v = createInputElement('taskDescription', task.content, "textarea", undefined)
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
        var item4Input = document.querySelector(".taskCompletion")
        var data = {
            title: item1Input.value,
            date_due: item2Input.value,
            content: item3Input.value,
            completed: item4Input.checked,
        }
        var event = new CustomEvent("modalDataSaved", { detail: data });
        document.dispatchEvent(event);
        document.getElementById("createTaskModal").style.display = "none"
        item1Input.value = ""
        item3Input.value = ""
        item2Input.value = ""
        if (item4Input.checked) {item4Input.click()}
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

// Initialize the left navigation
async function initializeLeftNav() {
    const leftNav = document.getElementById("leftNav")
    const button = document.createElement('button')
    button.textContent = 'create'
    button.className = 'createFileButton'
    button.innerHTML = '<i class="fa-solid fa-file-circle-plus"></i>'
    leftNav.appendChild(button)
    var title = document.createElement("div")
    title.className =  "fileTitle"
    title.innerText = "Files"
    leftNav.appendChild(title)
    var files = []
    if (typeof ipcBridge !== 'undefined' && ipcBridge.electron) {
        files = await window.ipcBridge.requestFileList()
    } else {
        files = ["file 1.json", "file 2.json", "file 3.json", "file 4.json", "file 5.json"]
    }
    files.forEach(name => {
        createFileObject(name.slice(0,-5))
    });
    button.addEventListener("click", function() {
        document.getElementById('createFileModal').style.display = 'flex'
    })
    document.getElementById('submitFileNameButton').addEventListener("click", function() {
        createFileObject(document.getElementById('fileNameInput').value)
        document.getElementById('createFileModal').style.display = 'none'
    })
    document.getElementById('cancelFileNameCreation').addEventListener("click", function() {
        document.getElementById('createFileModal').style.display = 'none'
    })
    if (document.getElementsByClassName('fileName').length > 0) {document.getElementsByClassName("fileDiv")[0].classList.add("selected")}
    if (typeof ipcBridge !== 'undefined' && ipcBridge.electron) { loadFile() }
    // Some styling things
    var element = document.getElementById('new_top_task')
    element.style.left = `${leftNav.getBoundingClientRect().right}px`
    document.getElementById('createTaskModal').style.left = `${leftNav.getBoundingClientRect().right}px`
}

// Create a new file object on the left nav
function createFileObject(fileName) {
    if (fileName != '') {
        const div = document.createElement('div')
        div.className = 'fileDiv'
        document.getElementById('leftNav').appendChild(div)
        const ul = document.createElement("ul")
        ul.className =  "fileName"
        ul.innerText = fileName
        const button = document.createElement('button')
        button.className ='cancelButton fileCancelButton'
        button.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        button.addEventListener('click', function() {
            const confirmed = window.confirm(`Are you sure you want to delete ${fileName}?`);
            if (confirmed) {
                if (typeof ipcBridge !== 'undefined' && ipcBridge.electron) { 
                    window.ipcRenderer.invoke('delete-file', fileName)
                }
                leftNav.removeChild(div)
                document.getElementById('leftNav').querySelectorAll('.fileDiv')[0].classList.add("selected")
            }
        })
        // LeftNav file event listeners to css selected file, save old content, and load new content
        ul.addEventListener('click', function() {
            const files = document.getElementById('leftNav').querySelectorAll('.fileDiv');
            // Remove the 'selected' class from all files
            files.forEach(function(file) {
                if( file.classList.contains('selected')) {
                    if (typeof ipcBridge !== 'undefined' && ipcBridge.electron) { saveFile() }
                    file.classList.remove('selected');
                }
            });
            // Add the 'selected' class to the clicked file
            ul.parentElement.classList.add('selected');
            if (typeof ipcBridge !== 'undefined' && ipcBridge.electron) { loadFile() }
        });
        div.appendChild(ul)
        div.appendChild(button)
    }
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