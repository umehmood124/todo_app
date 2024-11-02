<template>
  <div
    class="container mx-auto mt-5 p-4 shadow-lg rounded-lg bg-gray-800 text-white"
  >
    <div class="flex justify-between">
      <h1>Todo List</h1>
      <button
        @click="showCreateTaskModal"
        class="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-3 rounded"
      >
        Create
      </button>
    </div>
    <table class="table-auto w-full mt-2">
      <thead>
        <tr class="bg-gray-700">
          <th class="px-4 py-3 border-b-2 border-gray-600">ID</th>
          <th class="px-4 py-3 border-b-2 border-gray-600">Task</th>
          <th class="px-4 py-3 border-b-2 border-gray-600">Description</th>
          <th class="px-4 py-3 border-b-2 border-gray-600">Created At</th>
          <th class="px-4 py-3 border-b-2 border-gray-600 text-right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in tasks"
          :key="task.id"
          class="bg-gray-900 border-b border-gray-700 hover:bg-gray-700"
        >
          <td class="px-4 py-3 text-center">{{ task.id }}</td>
          <td class="px-4 py-3 text-center">{{ task.task }}</td>
          <td class="px-4 py-3 text-center">{{ task.description }}</td>
          <td class="px-4 py-3 text-center">
            {{ formatDate(task.created_at) }}
          </td>
          <td class="px-4 py-3 text-end">
            <button
              @click="openModalForEdit(task)"
              class="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-3 rounded"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded ml-2"
              @click="deleteTask(task.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
<!--    Modal -->
    <TaskModal
      :show="showModal"
      :task="currentTask"
      :isEdit="isEdit"
      @close="handleClose"
      @submit="handleTaskSubmit"
    />
  </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore'
import TaskForm from './TaskForm.vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import Swal from 'sweetalert2'
import TaskModal from '@/components/TaskModal.vue' // Import SweetAlert2

export default {
  components: { TaskModal, TaskForm },
  setup() {
    onMounted(async () => {
      await taskStore.fetchTasks()
    })

    const showModal = ref(false)
    const isEdit = ref(false)
    const taskStore = useTaskStore()
    const { tasks } = storeToRefs(taskStore)
    const currentTask = ref({ task: '', description: '' })

    const showCreateTaskModal = () => {
      console.log('d')
      currentTask.value = { task: '', description: '' } // Reset task for creation
      isEdit.value = false
      showModal.value = true
    }

    const openModalForEdit = task => {
      currentTask.value = { ...task }
      isEdit.value = true
      console.log(isEdit.value, 'isEdit')
      showModal.value = true
    }

    function handleClose() {
      showModal.value = false;
      currentTask.value = {}; // Reset task
    }

    const formatDate = dateString => {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }
      return new Date(dateString).toLocaleDateString('en-US', options)
    }

    const addTask = async task => {
      console.log(task, 'task')
      await taskStore.addTask(task)
    }

    const deleteTask = async id => {
      // SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      if (result.isConfirmed) {
        await taskStore.deleteTask(id)
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success')
      }
    }

    const handleTaskSubmit = async task => {
      if (isEdit.value) {
        await taskStore.updateTask(task)
      } else {
        await taskStore.addTask(task)
      }
      showModal.value = false
      isEdit.value = false
    }

    return {
      tasks,
      addTask,
      deleteTask,
      formatDate,
      showModal,
      currentTask,
      openModalForEdit,
      showCreateTaskModal,
      handleTaskSubmit,
      isEdit,
      handleClose
    }
  },
}
</script>
