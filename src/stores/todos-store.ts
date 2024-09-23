import type { Todo } from "@/interfaces/Todo";
import type { Status } from "@/types/status";
import { apiConstants } from "@/utils/api-constants";
import { instance } from "@/utils/axios-instance";
import { STATUS_VALUES } from "@/utils/constants";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";
import { errorMapping } from "@/utils/error-mapping";

interface State {
  todos: Todo[] | null;
  fetchTodoStatus: Status;
  fetchTodoErrorMessage: string | null;
  currentActiveTodo: Todo | null;
  deleteTodoStatus: Status;
  deleteTodoErrorMessage: string | null;
  updateTodoStatus: Status;
  updateTodoErrorMessage: string | null;
}
export const useTodosStore = defineStore("todos", {
  state(): State {
    return {
      todos: null,
      fetchTodoStatus: STATUS_VALUES.initial,
      fetchTodoErrorMessage: null,
      currentActiveTodo: null,
      deleteTodoErrorMessage: null,
      deleteTodoStatus: STATUS_VALUES.initial,
      updateTodoErrorMessage: null,
      updateTodoStatus: STATUS_VALUES.initial,
    };
  },
  actions: {
    async getTodos() {
      const authStore = useAuthStore();
      try {
        this.fetchTodoStatus = STATUS_VALUES.loading;
        this.fetchTodoErrorMessage = null;
        const response = await instance.get(apiConstants.todos, {
          headers: { Authorization: `Bearer ${authStore.user?.accessToken}` },
        });
        this.fetchTodoStatus = STATUS_VALUES.success;
        this.todos = response.data.data;
        console.log(this.todos);
        console.log(response);
      } catch (error) {
        this.fetchTodoStatus = STATUS_VALUES.failure;
        const message = errorMapping(error as Error);
        this.fetchTodoErrorMessage = message;
      }
    },
    setCurrentTodo(todo: Todo) {
      this.currentActiveTodo = todo;
    },
    async deleteTodo() {
      const authStore = useAuthStore();
      try {
        this.deleteTodoStatus = STATUS_VALUES.loading;
        this.deleteTodoErrorMessage = null;
        await instance.delete(apiConstants.deleteTodo + this.currentActiveTodo?._id, {
          headers: { Authorization: `Bearer ${authStore.user?.accessToken}` },
        });
        this.deleteTodoStatus = STATUS_VALUES.success;
        this.currentActiveTodo = null;
        this.getTodos()
      } catch (error) {
        const message = errorMapping(error as Error);
        this.deleteTodoStatus = STATUS_VALUES.failure;
        this.deleteTodoErrorMessage = message;
      }
    },
  },
});
