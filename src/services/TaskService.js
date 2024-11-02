import apiClient from './apiClient';

export default {
  async getTasks() {
    const response = await apiClient.get('/tasks');
    return response.data;
  },
  async createTask(task) {
    const response = await apiClient.post('/tasks', task);
    return response.data;
  },
  async updateTask(task) {
    const response = await apiClient.put(`/tasks/${task.id}`, task);
    return response.data;
  },
  async deleteTask(id) {
    await apiClient.delete(`/tasks/${id}`);
  },
};
