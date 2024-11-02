import { defineStore } from 'pinia';
import TaskService from '../services/TaskService';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      this.tasks = await TaskService.getTasks();
      console.log(this.tasks, "this.tasks")
    },
    async addTask(task) {
      const newTask = await TaskService.createTask(task);
      this.tasks.push(newTask);
    },
    async updateTask(task) {
      const updatedTask = await TaskService.updateTask(task);
      const index = this.tasks.findIndex(t => t.id === task.id);
      this.tasks.splice(index, 1, updatedTask);
    },
    async deleteTask(id) {
      await TaskService.deleteTask(id);
      this.tasks = this.tasks.filter(t => t.id !== id);
    },
  },
});
