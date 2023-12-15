(() => {
    const todo = {
        description: 'todo',
        done: false
    };

    const reminder = {
        description: 'reminder',
        date: '14.12.2023',
    };

    const taskView = {
        render(tasks: Array<Object>) {
            const tasksList = document.getElementById('taskList');
            while(tasksList?.firstChild){
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('LI');
                const textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList?.appendChild(li);
            });
        },
    };

    //o que a view deve armazenar em memória dentro do navegador: as tasks
    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Object> = [todo, reminder];

        //renderizar
        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        } 
        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);
    };

    TaskController(taskView);
}) ();