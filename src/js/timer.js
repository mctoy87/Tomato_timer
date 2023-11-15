// создаем класс для счетчика

const Timer = class {
  // зададим приватное свойство - uniq id
  #id = Date.now();
  _title;
  _counter;
  // принимает параметры название и счетчик
  constructor(title, counter = 0) {
    // имя счетчика только для чтения
    this._title = title;
    // счетчик делаем только для чтения
    this._counter = counter;
  }

  // геттер для счетчика
  get counter() {
    return this._counter;
  }

  // сеттер для счетчика
  set counter(value) {
    this._counter = value;
  }

  // сеттер для имени счетчика
  set title(value) {
    this._title = value;
  }

  // геттер для имени счетчика
  get title() {
    return this._title;
  }
}

const newTimer = new Timer('Новый таймер');

// меняю значение счетчика +1
newTimer.counter = 1;
console.log('newTimer.counter: ', newTimer.counter);
// меняю имя счетчика
newTimer.title = 'Old timer';
console.log('newTimer.title: ', newTimer.title);
