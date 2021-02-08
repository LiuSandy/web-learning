import { ADD_TODO } from '@/action-types';
import { Todo } from '@/models';
import { TodosAction } from '../actions/todos';

export interface TodosState {
  list: Array<Todo>
}

const initialState: TodosState = {
  list: new Array<Todo>(),
}

export default function
  (state: TodosState = initialState, action: TodosAction): TodosState {
  switch (action.type) {
    case ADD_TODO:
      return { list: [...state.list, action.payload] }
    default:
      return state

  }
}