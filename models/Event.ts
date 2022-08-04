export class Event {
  static nextId = 0;

  id: number;
  name: string;
  constructor(name: string) {
    this.id = Event.nextId++;
    this.name = name;
  }
}
