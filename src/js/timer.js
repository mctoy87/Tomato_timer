// создаем класс для счетчика

const Timer = class {
  id = Date.now();
  _counter;
  activeTask = null;
  // принимает параметры
  constructor({
    taskTime = 25,
    pauseTime = 5,
    bigPauseTime = 15,
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
  }
  // делает задачу активной
  doActiveTask(id) {

  }


  // геттер для счетчика
  get counter() {
    return this._counter;
  }

  // сеттер для счетчика
  set counter(value) {
    this._counter = value;
  }
}

const newTimer = new Timer('Новый таймер');

// меняю значение счетчика +1
newTimer.counter = 1;
console.log('newTimer.counter: ', newTimer.counter);

