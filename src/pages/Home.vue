<script setup lang="ts">
import TodoCard from "@/components/TodoCard.vue";
import { useTodosStore } from "@/stores/todos-store";
import { STATUS_VALUES } from "@/utils/constants";
import { onMounted } from "vue";

import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import img from "../assets/images/empty.svg";
import img2 from "../assets/images/no-data.png";
const todosStore = useTodosStore();

onMounted(() => {
  todosStore.getTodos();
});
</script>

<template>
  <section class="mt-28 px-20 flex border-t-2 border-slate-200 rounded-lg">
    <!-- Left section (todo list) -->
    <div
      class="todo-list w-[70%] h-[calc(100vh-7rem)] overflow-y-auto ms-2 flex flex-col items-center py-6 border-e-2 border-slate-200 rounded-lg"
    >
      <template v-if="todosStore.fetchTodoStatus === STATUS_VALUES.loading"
        ><div class="flex justify-center items-center h-full w-full">
          <clip-loader :size="'6rem'" :color="'#000000'"> </clip-loader>
        </div>
      </template>
      <template
        v-if="
          todosStore.fetchTodoStatus === STATUS_VALUES.success &&
          todosStore.todos !== null
        "
      >
        <todo-card
          v-for="todo in todosStore.todos"
          :todo="todo"
          :set-active-task-fn="todosStore.setCurrentTodo"
        />
      </template>
      <template
        v-if="
          todosStore.todos === null &&
          todosStore.fetchTodoStatus === STATUS_VALUES.success
        "
      >
        <div class="flex justify-center items-center w-full h-[90%]">
          <picture>
            <img :src="img" alt="No Data Selected" class="w-[90%] m-auto" />
          </picture>
        </div>
      </template>
    </div>

    <!-- Right section (fixed details) -->
    <div
      class="w-[30%] h-[calc(100vh-7rem)] ms-2 fixed top-28 right-6 overflow-y-auto rounded-lg p-4"
    >
      <h2 class="text-lg font-bold">Todo Details</h2>
      <template v-if="todosStore.currentActiveTodo === null">
        <div class="flex justify-center items-center w-full h-[90%]">
          <picture>
            <img :src="img2" alt="No Data Selected" class="w-[90%] m-auto" />
            <h4 class="text-center font-semibold">
              Select Todo to view details ...
            </h4>
          </picture>
        </div>
      </template>
      <div
        v-if="todosStore.currentActiveTodo != null"
        class="m-1 p-2 border rounded-lg"
      >
        <div class="flex justify-between items-center py-2">
          <h4 class="text-slate-500 text-sm">
            {{ todosStore.currentActiveTodo.title }}
          </h4>
          <div class="flex items-center">
            <button
              :disabled="
                todosStore.deleteTodoStatus === STATUS_VALUES.loading ||
                todosStore.updateTodoStatus === STATUS_VALUES.loading
              "
              class="px-2 py-1 border-2 rounded-lg border-blue-600 mx-1"
            >
              <v-icon name="co-pen" animation="float" :hover="true" />
            </button>
            <button
              @click="() => todosStore.deleteTodo()"
              :disabled="
                todosStore.deleteTodoStatus === STATUS_VALUES.loading ||
                todosStore.updateTodoStatus === STATUS_VALUES.loading
              "
              class="px-2 py-1 border-2 rounded-lg border-red-600 mx-1"
            >
              <v-icon name="io-trash-outline" animation="float" :hover="true" />
            </button>
          </div>
        </div>
        <div class="min-h-16 max-h-36 rounded-lg overflow-y-auto my-3">
          {{ todosStore.currentActiveTodo.description }}
        </div>
        <div>
          <table class="w-full">
            <thead>
              <tr>
                <th class="w-[50%]"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="h-10">
                <td>Status:</td>
                <td>{{ todosStore.currentActiveTodo.status }}</td>
              </tr>
              <tr class="h-10">
                <td>Created At:</td>
                <td>{{ todosStore.currentActiveTodo.createdAt }}</td>
              </tr>
              <tr class="h-10">
                <td>Last Update on:</td>
                <td>{{ todosStore.currentActiveTodo.updatedAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Content for todo details goes here -->
    </div>
  </section>
</template>

<style scoped></style>
