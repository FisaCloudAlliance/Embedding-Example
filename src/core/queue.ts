export class Queue<T> {
    private _storage: T[] = [];
  
    enqueue(item: T): void {
      this._storage.push(item);
    }
  
    dequeue(): T | undefined {
      return this._storage.shift();
    }
    allDequeue(): Array<T> {
      const newArray = Array.from(this._storage);
      this._storage = [];
      return newArray;
    }
  
    findDequeue(predicate: (item: T) => boolean): T | undefined {
      const index = this._storage.findIndex(predicate);
      if (index > -1) {
        const item = this._storage[index];
        this._storage.splice(index, 1);
        return item;
      }
    }
  
    get length(): number {
      return this._storage.length;
    }
  
    isEmpty(): boolean {
      return this.length == 0;
    }
  }