export default class Queue<T> {
  private store: T[] = [];

  enqueue = (value: T) => this.store.push(value);
  dequeue = () => this.store.splice(0, 1);

  get length() {
    return this.store.length;
  }

  forEach(callback: (v: T) => void, dequeue = true) {
    this.store.forEach(v => {
      callback(v);
    });
    if (dequeue) {
      this.store = [];
    }
  }
}
