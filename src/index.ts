(() => {
    enum NotificationPlataform{
        SMS = 'SMS',
        EMAIL = 'EMAIL',
        PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
    }

    //gerar ID aleatório para todo e reminder
    const UUID = (): string => {
        return Math.random().toString(32).substr(2, 9);
    }

    const DateUtils = {
        tomorrow(): Date{
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },

        today(): Date{
            return new Date;
        },

        formatDate(date: Date): string{
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        }
    };
    interface Task{
        id: string;
        dateCreated: Date;
        dateUpdate: Date;
        description: string;
        render(): string;
    }
    class Reminder implements Task {
        id: string = UUID();
        dateCreated: Date = DateUtils.today();
        dateUpdate: Date = DateUtils.today();
        description: string = '';

        date: Date = DateUtils.tomorrow();
        notifications: Array<NotificationPlataform> = [NotificationPlataform.EMAIL];

        constructor(description: string, date = Date, notifications: Array<NotificationPlataform>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }

        render(): string {
            return `
            ---> Reminder <---
            description: ${this.description}
            date: ${DateUtils.formatDate(this.date)}
            plataform: ${this.notifications.join(',')}
            `;
        }

    }

    class Todo implements Task {
        id: string = UUID();
        dateCreated: Date = DateUtils.today();
        dateUpdate: Date = DateUtils.today();
        description: string = '';

        done: boolean = false;

        constructor(description: string){
            this.description = description
        }

        render(): string {
            return `
            ---> TODO <---
            description: ${this.description}
            done: ${this.done}
            `;
        }
}

    const todo = new Todo('ToDo criado com a classe');

    const reminder = new Reminder('Reminder criado com a classe', new Date(), [NotificationPlataform.EMAIL]);

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