const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc Get goals
// @route GET / api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc Set goal
// @route POST / api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc Update goal -> completed: true - false
// @route PUT / api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure the logged in user matches the goal user
  if (goal.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  console.log(req.body);
  const updatedGoalInfo = await Goal.findByIdAndUpdate(
    req.params.id,
    { completed: !goal.completed },
    // req.body,
    { new: true }
  );
  console.log(updatedGoalInfo);
  res.status(200).json(updatedGoalInfo);
});

// @desc Delete goal
// @route DELETE / api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  // make sure the logged in user matches the goal user
  if (goal.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
