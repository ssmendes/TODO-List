(() => {
    interface Task{
        id: string;
        dateCreated: Date;
        dateUpdate: Date;
        description: string;
        render(): string;
    }
    class Reminder implements Task {
        id: string = '';
        dateCreated: Date = new Date();
        dateUpdate: Date = new Date();
        description: string = '';

        date: Date = new Date();
        notifications: Array<string> = ['EMAIL'];

        constructor(description: string, date = Date, notifications: Array<string>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }

        render(): string {
            return JSON.stringify(this);
        }

    }

    class Todo implements Task {
        id: string = '';
        dateCreated: Date = new Date();
        dateUpdate: Date = new Date();
        description: string = '';

        done: boolean = false;

        constructor(description: string){
            this.description = description
        }

        render(): string {
            return JSON.stringify(this);
        }
}

    const todo = new Todo('ToDo criado com a classe');

    const reminder = new Reminder('Reminder criado com a classe', new Date(), ['EMAIL']);

    const taskView = {
        render(tasks: Array<Task>) {
            const tasksList = document.getElementById('taskList');
            while(tasksList?.firstChild){
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('LI');
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList?.appendChild(li);
            });
        },
    };

    //o que a view deve armazenar em memória dentro do navegador: as tasks
    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [todo, reminder];

        //renderizar
        const handleEvent = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        } 
        document.getElementById('taskForm')?.addEventListener('submit', handleEvent);
    };

    TaskController(taskView);
}) ();