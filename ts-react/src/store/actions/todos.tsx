import { ADD_TODO } from '@/action-types';
import { Todo } from "@/models"

export function addTodo(todo: Todo) {
  return { type: ADD_TODO, payload: todo }
}

export type TodosAction = ReturnType<typeof addTodo>