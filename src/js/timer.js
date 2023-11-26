//  создать переменную с именем экземпляр (для синглтона)
let _instance;
const timerText = document.querySelector('.window__timer-text');

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
    pauseTime = 1,
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
    this.taskId = task.id;
    this._counter = task.count;
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
        // отобразить таймер на странице
        // если цифра меньше 10, то добавить 0
        timerText.innerText = `${timer.minutes < 10 ?
          '0' + timer.minutes : timer.minutes}:${
            timer.seconds < 10 ?
            '0' + timer.seconds : timer.seconds}`;
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
    // считает deadline задачи
    this.model.getDeadline();
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
    this.windowButtons = document.querySelector('.window__buttons');

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

      // проверяем нажали ли на кнопку старт
      if (target.classList.contains('button-primary')) {
        this.controller.handleInitTimer();
        console.dir(this.controller);
      }
    });
    // на добавление задачи
    this.taskForm.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;
      // проверяем нажали ли на кнопку Добавить задачу
      if (target.classList.contains('task-form__add-button')) {
        // вытаскиваем текст задачи
        const taskText = this.taskForm.taskName.value;
        // вытаскиваем кнопку Важность задачи
        const importance = this.taskForm.imporatance;

        // если важность обычная (проверяем класс)
        if (importance.classList.contains('default')) {
          // инициируем обычную задачу
          this.controller.handleAddTask(new StandartTask(taskText));
        }
        // если важность важная (проверяем класс)
        if (importance.classList.contains('important')) {
          // инициируем важную задачу
          this.controller.handleAddTask(new ImportantTask(taskText));
        }
        // если важность неважная (проверяем класс)
        if (importance.classList.contains('so-so')) {
          // инициируем неважную задачу
          this.controller.handleAddTask(new UnimportantTask(taskText));
        }
      }
    });
    // на активирование задачи
    this.pomodoroTasks.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;

      // проверяем нажали ли на тексте задачи
      if (target.classList.contains('pomodoro-tasks__task-text')) {
        // перебираем весь массив задач
        this.controller.model.tasks.forEach(element => {
          // если текст задачи в массиве совпадает с выбранной пользователем
          if (element.text === target.innerText) {
            // активируем задачу по id
            this.controller.handleDoActiveTask(element.idTask);
            // меняем текст задачи на панели задач
            this.panelTitle.textContent = element.text;
            // меняем счетчик помодоро на панели задач
            this.panelText.textContent = `Томат ${this.controller.model._counter}`;

            // получаем все задачи из верстки
            const tasksList = document.querySelectorAll(
                '.pomodoro-tasks__task-text');
            console.log('tasksList: ', tasksList);
            // перебираем все задачи из верстки
            tasksList.forEach(item => {
              // если совпадает с задачей по клику
              if (item.innerText === target.innerText) {
                // делаем подсветку задачи
                item.classList.add('pomodoro-tasks__task-text_active');
                // если нет - убираем подсветку
              } else {
                item.classList.remove('pomodoro-tasks__task-text_active');
              }
            });
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

