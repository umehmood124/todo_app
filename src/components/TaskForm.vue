<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-300">Task:</label>
      <input
        type="text"
        v-model="task.task"
        required
        class="w-full p-2 border rounded-md shadow-sm bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-300">Description:</label>
      <textarea
        v-model="task.description"
        rows="3"
        class="w-full p-2 border rounded-md shadow-sm bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      ></textarea>
    </div>
    <div class="flex items-center justify-end">
      <button
        type="submit"
        class="w-25 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      >
        {{ props.isEdit ? 'Update' : 'Add' }} Task
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, watch } from 'vue';

export default {
  name: 'TaskForm',
  props: {
    initialTask: {
      type: Object,
      default: () => ({ task: '', description: '' }),
    },
    isEdit: {
      // type: Boolean,
      // default: false,
    },
  },
  setup(props, { emit }) {
    // Create a reactive copy of initialTask
    const task = reactive({ ...props.initialTask });

    // Watch for changes in initialTask prop and update task accordingly
    watch(() => props.initialTask, (newValue) => {
        console.log(props.isEdit, "props.isEdit")
        Object.assign(task, newValue);
      },
      { deep: true, immediate: true }
    );


    // Handle form submission
    const handleSubmit = () => {
      emit('submit', task);
      if (!props.isEdit) {
        // Reset the form if not editing
        task.task = '';
        task.description = '';
      }
      // Close the modal after submitting
      emit('close');
    };

    return {
      task,
      handleSubmit,
      props, // Expose props to template
    };
  },
};
</script>

