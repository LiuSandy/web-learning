import { ADD, MINUS } from '@/action-types';
import { LocationDescriptorObject } from "history";
import { push, CallHistoryMethodAction } from 'connected-react-router';
import { TodoLocationState } from "@/components/todos";

export function add() {
  return { type: ADD }
}

export function minus() {
  return { type: MINUS }
}

export function go(path: LocationDescriptorObject<TodoLocationState>):
  CallHistoryMethodAction<[LocationDescriptorObject<TodoLocationState>]> {
  return push<TodoLocationState>(path)
}

export type CounterAction = ReturnType<typeof add> | ReturnType<typeof minus>