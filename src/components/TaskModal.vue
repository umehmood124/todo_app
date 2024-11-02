<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @click.self="close">
    <div class="bg-gray-900 p-5 rounded-lg w-full max-w-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-white">{{ isEdit ? 'Edit Task' : 'Add New Task' }}</h2>
        <button class="text-white" @click="close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <TaskForm :initialTask="task" :isEdit="isEdit" @submit="handleTaskSubmit" />
    </div>
  </div>
</template>

<script>
import TaskForm from './TaskForm.vue';

export default {
  components: {
    TaskForm
  },
  props: {
    show: Boolean,
    task: {
      type: Object,
      default: () => ({ task: '', description: '' })
    },
    isEdit: Boolean
  },
  emits: ['close', 'submit'],
  methods: {
    close() {
      this.$emit('close');
    },
    handleTaskSubmit(task) {
      this.$emit('submit', task);
    }
  }
};
</script>
