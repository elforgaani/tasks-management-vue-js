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
}
export const useTodosStore = defineStore("todos", {
  state(): State {
    return {
      todos: null,
      fetchTodoStatus: STATUS_VALUES.initial,
      fetchTodoErrorMessage: null,
      currentActiveTodo: null,
    };
  },
  actions: {
    async getTodos() {
      const authStore = useAuthStore();
      try {
        this.fetchTodoStatus = STATUS_VALUES.loading;
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
  },
});
