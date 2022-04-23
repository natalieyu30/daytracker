import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGoals, updateGoal, deleteGoal, reset } from "../features/goals/goalSlice";
import { FaTrash, FaCheck } from "react-icons/fa";

const GoalItem = ({ goal, onCheckClick }) => {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div className="left">
        <span className="date">
          {new Date(goal.createdAt).toLocaleString("en-US")}
        </span>
        <p className={`${goal.completed ? "completed" : ""}`}>{goal.text}</p>
      </div>
      <div className="right">
        <button
          className="check"
          onClick={() => onCheckClick(goal._id)}
        >
          <FaCheck />
        </button>
        <button
          className="close"
          onClick={() => dispatch(deleteGoal(goal._id))}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default GoalItem;
