import axios from "axios";

const API_RUL = "/api/goals/";

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(API_RUL, goalData, config);
  return response.data;
};

// Get goals
const getGoals = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(API_RUL, config);
  return response.data;
};

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const response = await axios.delete(`${API_RUL}${goalId}`, config);
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
