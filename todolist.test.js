/* eslint-disable max-lines-per-function */
const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first element', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last element', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes the first item, and returns the removed item', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes the last item and returns it', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns true when all items are done, false otherwise', () => {
    expect(list.isDone()).toBe(false);
  });

  test('trying to add an item that isnt a todo object gives a TypeError', () => {
    expect(() => list.add({})).toThrow(TypeError);
  });

  test('calling itemAt returns the item at the index given or a ReferenceError', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test('calling markDoneAt marks the element as done or throws ReferenceError', () => {
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);

    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
  });

  test('calling markUndoneAt should return a reference error or mark the element done', () => {
    expect(() => list.markUndoneAt(4)).toThrow(ReferenceError);

    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
  });

  test('markAllDone marks all todos in list done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('calling removeAt removes the item at the index, reaises a reference error', () => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError);

    expect(list.removeAt(0)).toEqual([todo1]);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
    string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    list.markDoneAt(0);
    expect(list.toString()).toBe(string);
    list.markAllDone();
    string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('calling forEach iterates of the elements in list', () => {
    let result = [];
    list.forEach(todo => result.push(todo));

    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });

});