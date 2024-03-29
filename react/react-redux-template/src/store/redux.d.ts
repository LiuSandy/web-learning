interface ActionParams<T = any> {
  type: string;
  payload: Object<T>
}

interface IState {
  menu: IMenu;
}