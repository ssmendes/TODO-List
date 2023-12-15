"use strict";
(function () {
    var todo = {
        description: 'todo',
        done: false
    };
    var reminder = {
        description: 'reminder',
        date: '14.12.2023',
    };
    var taskView = {
        render: function (tasks) {
            var tasksList = document.getElementById('taskList');
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement('LI');
                var textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        },
    };
    //o que a view deve armazenar em memória dentro do navegador: as tasks
    var TaskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        //renderizar
        var handleEvent = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document.getElementById('taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleEvent);
    };
    TaskController(taskView);
})();
