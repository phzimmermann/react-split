const Store = class Store {
  constructor() {
    this.listeners = [];
    this.events = [];
  }

  addListener = listener => this.listeners.push(listener);

  addEvent = event => {
    this.events.push(event);
    this.listeners.forEach(listener => {
      listener.onAddEvent(event);
    });
  };

  getEvents = () => this.events;

  toObject = () => this.events.reduce((curr, event) => ({ ...curr, [event.getIdentifier()]: event.get() }), {});
  fromObject = dataStructure => Object.keys(dataStructure).forEach(key => {
    this.events.forEach(event => {
      if (event.getIdentifier() === key) {
        event.set(dataStructure[key]);
      }
    });
  });
}

const defaultStore = new Store();

export default defaultStore;
