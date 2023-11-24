//  создать переменную с именем экземпляр (для синглтона)
let _instance;


// создаем класс для счетчика
const Timer = class {
  // id задача
  idTask = Date.now();
  // счетчик задачи
  _counter = 0;
  // активнная задача
  activeTask = null;
  // дедлайн задачи
  deadline = null;
  // флаг пауза/задача
  pause = false;
  // принимает параметры
  constructor({
    // время задачи
    taskTime = 1,
    // время паузы
    pauseTime = 5,
    // время большой паузы
    bigPauseTime = 15,
    // задачи(массив)
    tasks = [],
  }) {
    // если экземпляр класса есть
    if (_instance) {
      // вернуть этот экземпляр
      return _instance;
    }
    this.taskTime = taskTime;
    this.pauseTime = pauseTime;
    this.bigPauseTime = bigPauseTime;
    this.tasks = tasks;
    // если нет экземпляра класса, то сделать его текущим экземпляром
    _instance = this;
  }

  // добавить задачу
  addTask(task) {
    this.tasks.push(task);
    console.log('tasks: ', this.tasks);
    // task.id = Date.now();
    // this.taskId = task.id;
  }
  // делает задачу активной
  doActiveTask(idTask) {
    this.activeTask = idTask;
  }

  // запустить таймер
  initTimer() {
    try {
      if (this.activeTask) {
        const timer = this.getTimeRemaining();
        console.log('timer: ', timer);
  
        // запустить каждую секунду таймер рекурсией
        const inervalId = setTimeout(() => {
          this.initTimer();
        }, 1000);
  
        // если таймер обнулился
        if (timer.seconds === 0 && timer.minutes === 0) {
          // удаляю таймер
          clearTimeout(inervalId);
          // меняю значение счетчика +1
          this.counter += 1;
          console.log('this.counter: ', this.counter);
          // меняю значение флага пауза/задача
          this.toogleStatus();
          // меняю деадлайн
          this.getDeadline();
          // запускаю таймер
          this.initTimer();
        }
      } else throw Error('Ошибка, нет активной задачи');
    } catch (err) {
      console.error('Поймали ошибку! Вот она: ', err.message);
    }
  }

  // получает время окончания таймера, плюс минуты и секунды
  getTimeRemaining() {
    // начинаем отсчёт времени
    const start = Date.now();
    // получить таймстэмп задачи
    const timeRemaining = (this.deadline - start);

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    return { timeRemaining, seconds, minutes };
  }

  // получить дедлайн задачи
  getDeadline() {
    // если флаг пауза
    if (this.pause === true) {
      // и если счетчик задачи кратен 3
      if (this.counter % 3 === 0) {
        // дедлайн высчитывается от большой паузы
        this.deadline = new Date(Date.now() + this.bigPauseTime * 1000 * 60);
        console.log('deadline: ', this.deadline);
      } else {
        // иначе дедлайн высчитывается от малой паузы
        this.deadline = new Date(Date.now() + this.pauseTime * 1000 * 60);
        console.log('deadline: ', this.deadline);
      }
      // если флаг задача
    } else {
      // дедлайн высчитывается от задачи
      this.deadline = new Date(Date.now() + this.taskTime * 1000 * 60);
      console.log('deadline: ', this.deadline);
    }
  }

  // меняет флаг пауза/задача
  toogleStatus() {
    this.pause ? this.pause = false : this.pause = true;
  }

  // геттер для счетчика
  get counter() {
    return this._counter;
  }

  // сеттер для счетчика
  set counter(value) {
    this._counter = value;
  }
};

// создать Класс для задач
const Task = class {
  constructor(text = '') {
    // описание задачи
    this.text = text;
    // счетчик помодорок
    this.count = 0;
    // id задача
    this.idTask = Date.now();
  }
};

// создать наследованный Класс для важных задач
class ImportantTask extends Task {
  constructor(text = '', importance = 'important') {
    super();
    // описание задачи
    this.text = text;
    // счетчик помодорок
    this.count = 0;
    // id задача
    this.idTask = Date.now();
    this.importance = importance;
  }
}

// создать наследованный Класс для важных задач
class StandartTask extends Task {
  constructor(text = '', importance = 'standart') {
    super();
    // описание задачи
    this.text = text;
    // счетчик помодорок
    this.count = 0;
    // id задача
    this.idTask = Date.now();
    this.importance = importance;
  }
}

// создать наследованный Класс для важных задач
class UnimportantTask extends Task {
  constructor(text = '', importance = 'unimportant') {
    super();
    // описание задачи
    this.text = text;
    // счетчик помодорок
    this.count = 0;
    // id задача
    this.idTask = Date.now();
    this.importance = importance;
  }
}

// отвечает за взаимодействие с пользователем, события
const ControllerTomato = class {
  constructor() {
    this.model = new Timer('Новый таймер');
  }
  // контроллер добавления задачи
  handleAddTask(task) {
    this.model.addTask(task);
    console.log('task: ', task);
  }
  // контроллер для активирования задачи из списка задач
  handleDoActiveTask(idTask) {
    this.model.doActiveTask(idTask);
  }
  // контроллер запуска таймера
  handleInitTimer() {
    this.model.initTimer();
  }
};

// отвечает за визуальную часть(верстка)
const RenderTomato = class {
  // передаем в конструктор обертку приложения Tomato
  constructor(root) {
    this.root = root;
    this.controller = new ControllerTomato();

    // получить элементы со страницы
    this.windowButtons = document.querySelector('.window__body');
    this.panelTitle = document.querySelector('.window__panel-title');
    this.panelText = document.querySelector('.window__panel-task-text');
    this.taskForm = document.querySelector('.task-form');
    this.pomodoroTasks = document.querySelector('.pomodoro-tasks');
  }


  // слушатели событий
  bindListeners() {
    // на запуск таймера задачи
    this.windowButtons.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;
      console.log('target: ', target);
      if (target.classList.contains('button-primary')) {
        this.controller.handleInitTimer();
      }
    });
    // на добавление задачи
    this.taskForm.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;
      if (target.classList.contains('task-form__add-button')) {
        const taskText = this.taskForm.taskName.value;
        const importance = this.taskForm.imporatance;

        if (importance.classList.contains('default')) {
          this.controller.handleAddTask(new StandartTask(taskText));
        }
        if (importance.classList.contains('important')) {
          this.controller.handleAddTask(new ImportantTask(taskText));
        }
        if (importance.classList.contains('so-so')) {
          this.controller.handleAddTask(new UnimportantTask(taskText));
        }
      }
    });
    // на активирование задачи
    this.pomodoroTasks.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;
      console.dir(target.innerText);

      if (target.classList.contains('pomodoro-tasks__task-text')) {
        this.controller.model.tasks.forEach(element => {
          if (element.text === target.innerText) {
            this.controller.handleDoActiveTask(element.idTask);
            this.panelTitle.textContent = element.text;
            this.panelText.textContent = `Томат ${element.count + 1}`;
          }
        });
      }
    })
  }
};

/*
// создание таймера с помощью конструктора
const newTimer = new Timer({
  // время задачи
  taskTime: 5,
  // время паузы
  pauseTime: 10,
  // время большой паузы
  bigPauseTime: 15,
  // задачи(массив)
  tasks: [],
});
console.log('newTimer.counter: ', newTimer.counter);
// добавить задачу в массив задач
newTimer.addTask({
  task: 'Записаться на стрижку',
});
// сделать задачу активной
newTimer.doActiveTask(newTimer.idTask);
// определить дедлайн задачи
newTimer.getDeadline();
// вызов таймера
newTimer.initTimer();
*/

const renderTomato = new RenderTomato(document.querySelector('.main'));
console.log('renderTomato: ', renderTomato);
renderTomato.bindListeners();

