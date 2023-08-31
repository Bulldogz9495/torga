
export function interpretTask(task, level=1, parent){
    if (Array.isArray(task)){
        const div = document.createElement('div')
        div.classList.add('taskContainer')
        div.classList.add('taskLevel' + level)
        task.forEach(task => {
            interpretTask(task, level, div)
        })
        return div
    }else {
        if (task.hassubtasks){
            const t = createTask(task)
            t.style.float = 'left'
            parent.append(t)
            parent.append(interpretTask(task.subtasks, level+1))
        } else {
            parent.append(createTask(task))
        }
    }
}


// Creates and returns a task div based on a task object
function createTask(task){
    console.log("task")
    const div = document.createElement('div')
    div.classList.add('task')
    const d = document.createElement('div')
    d.classList.add('taskTitle')
    let content = document.createTextNode(task.taskName)
    d.appendChild(content)
    div.appendChild(d)
    const i = document.createElement('div')
    i.classList.add('taskTimeline')
    content = document.createTextNode(`${task.dateCreated} - ${task.dateToComplete}`)
    i.appendChild(content)
    div.appendChild(i)
    const v = document.createElement('div')
    v.classList.add('taskDescription')
    content = document.createTextNode(task.description)
    v.appendChild(content)
    div.appendChild(v)
    // console.log(div)
    return div
}