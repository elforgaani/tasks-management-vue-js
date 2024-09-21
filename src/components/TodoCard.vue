<script setup lang="ts">
import type { TodoStatus, Todo } from "@/interfaces/Todo";
const props = defineProps<{
  todo: Todo;
  setActiveTaskFn: (todo: Todo) => void;
}>();
const getTodoDesc = () => {
  return props.todo.description.substring(0, 90);
};
</script>

<template>
  <div
    @click="() => setActiveTaskFn(todo)"
    class="todo-card w-[80%] rounded-lg flex flex-col px-6 py-4 justify-center border-2 border-slate-200 text-ellipsis my-4 cursor-pointer"
  >
    <div class="flex justify-between items-center py-3">
      <div class="flex items-center">
        <div class="w-3 h-3 bg-black rounded-full"></div>
        <h2 class="text-lg font-bold ms-4">{{ props.todo.title }}</h2>
      </div>
      <div
        :class="{
          'rounded-full py-1  px-3 text-white': true,
          'bg-blue-500': props.todo.status === 'completed',
          'bg-yellow-500': props.todo.status === 'pending',
          'bg-emerald-700': props.todo.status === 'in-progress',
        }"
      >
        {{ props.todo.status }}
      </div>
    </div>
    <p class="text-md font-light text-slate-700 text-ellipsis">
      {{ getTodoDesc() }}
    </p>
  </div>
</template>

<style scoped></style>
