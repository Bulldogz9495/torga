export function initializeTasks(){
    return {
        subtasks: {
            0: {
                'title': 'task1', 
                'dateCreated': '07/06/2022', 
                'dateToComplete': '07/06/2022', 
                'content': 'lipsum',
                subtasks: {
                    0: {
                        'title': 'task1_1',
                        'dateCreated': '07/06/2022',
                        'dateToComplete': '07/06/2022',
                        'content': 'lipsum Urum 1',
                        subtasks: {},
                    },
                    1: {
                        'title': 'task1_2',
                        'dateCreated': '07/06/2022',
                        'dateToComplete': '07/06/2022',
                        'content': 'lipsum Urum 2',
                        subtasks: {
                            0: {
                                'title': 'task1_2_1',
                                'dateCreated': '07/06/2022',
                                'dateToComplete': '07/06/2022',
                                'content': 'lipsum Urum Factum 1',
                                subtasks: {},
                            },
                            1: {
                                'title': 'task1_2_2',
                                'dateCreated': '07/06/2022',
                                'dateToComplete': '07/06/2022',
                                'content': 'lipsum Urum Factum 2',
                                subtasks: {},
                                
                            },
                            2: {
                                'title': 'task1_2_3',
                                'dateCreated': '07/06/2022',
                                'dateToComplete': '07/06/2022',
                                'content': 'lipsum Urum Factum 3',
                                subtasks: {},
                            }
                        }
                    },
                    2: {
                        'title': 'task1_3',
                        'dateCreated': '07/06/2022',
                        'dateToComplete': '07/06/2022',
                        'content': 'lipsum Urum 3',
                        subtasks: {},
                    }
                }
            },
            1: {
                'title': 'task2', 
                'dateCreated': '07/06/2022', 
                'dateToComplete': '07/06/2022', 
                'content': 'lipsum',
                subtasks: {
                    0: {
                        'title': 'task2_1',
                        'dateCreated': '07/06/2022',
                        'dateToComplete': '07/06/2022',
                        'content': 'lipsum Urum',
                        subtasks: {
                            0: {
                                'title': 'task1_2_1',
                                'dateCreated': '07/06/2022',
                                'dateToComplete': '07/06/2022',
                                'content': 'lipsum Urum Factum 1',
                                subtasks: {},
                            },
                            1: {
                                'title': 'task1_2_2',
                                'dateCreated': '07/06/2022',
                                'dateToComplete': '07/06/2022',
                                'content': 'lipsum Urum Factum 2',
                                subtasks: {},
                            },
                            2: {
                                'title': 'task1_2_3',
                                'dateCreated': '07/06/2022',
                                'dateToComplete': '07/06/2022',
                                'content': 'lipsum Urum Factum 3',
                                subtasks: {},
                                subtasks: {
                                    0: {
                                        'title': 'task1_2_1',
                                        'dateCreated': '07/06/2022',
                                        'dateToComplete': '07/06/2022',
                                        'content': 'lipsum Urum Factum 1',
                                        subtasks: {},
                                    },
                                    1: {
                                        'title': 'task1_2_2',
                                        'dateCreated': '07/06/2022',
                                        'dateToComplete': '07/06/2022',
                                        'content': 'lipsum Urum Factum 2',
                                        subtasks: {},
                                        
                                    },
                                    2: {
                                        'title': 'task1_2_3',
                                        'dateCreated': '07/06/2022',
                                        'dateToComplete': '07/06/2022',
                                        'content': 'lipsum Urum Factum 3',
                                        subtasks: {},
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}