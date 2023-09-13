export function initializeTasks(){
    return {
        "subtasks": {
          "1": {
            "title": "task1",
            "dateCreated": "9-11-2023",
            "dateToComplete": "2023-08-29",
            "content": "Test task",
            "completed": false,
            "subtasks": {
              "1": {
                "title": "task1-1",
                "dateCreated": "9-11-2023",
                "dateToComplete": "2023-09-14",
                "content": "Test Task",
                "completed": false,
                "subtasks": {}
              },
              "2": {
                "title": "Task1-2",
                "dateCreated": "9-11-2023",
                "dateToComplete": "2023-08-21",
                "content": "Test task",
                "completed": false,
                "subtasks": {}
              },
              "3": {
                "title": "Task1-3",
                "dateCreated": "9-11-2023",
                "dateToComplete": "2023-09-19",
                "content": "Test task",
                "completed": false,
                "subtasks": {
                  "1": {
                    "title": "Task1-3-1",
                    "dateCreated": "9-11-2023",
                    "dateToComplete": "2023-09-21",
                    "content": "Test Task",
                    "completed": false,
                    "subtasks": {}
                  },
                  "2": {
                    "title": "Task 1-3-2",
                    "dateCreated": "9-11-2023",
                    "dateToComplete": "2023-09-28",
                    "content": "Test task",
                    "completed": false,
                    "subtasks": {}
                  }
                }
              }
            }
          },
          "2": {
            "title": "Task2",
            "dateCreated": "9-11-2023",
            "dateToComplete": "2023-10-16",
            "content": "Test task",
            "completed": false,
            "subtasks": {
              "1": {
                "title": "Task2-1",
                "dateCreated": "9-11-2023",
                "dateToComplete": "2023-09-13",
                "content": "Test Task",
                "completed": false,
                "subtasks": {}
              },
              "2": {
                "title": "",
                "dateCreated": "9-11-2023",
                "dateToComplete": "2023-09-13",
                "content": "Test Task",
                "completed": true,
                "subtasks": {}
              },
              "3": {
                "title": "Test Task2-3",
                "dateCreated": "9-11-2023",
                "dateToComplete": "",
                "content": "",
                "completed": false,
                "subtasks": {}
              }
            }
          }
        }
      }
}