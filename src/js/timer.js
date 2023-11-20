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
    this.taskTime = taskTime;
    this.pauseTime = pauseTime;
    this.bigPauseTime = bigPauseTime;
    this.tasks = tasks;
  }

  // добавить задачу
  addTask(task) {
    this.tasks.push(task);
    task.id = Date.now();
    this.taskId = task.id;
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

// создание таймера с помощью конструктора
const newTimer = new Timer('Новый таймер');
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

