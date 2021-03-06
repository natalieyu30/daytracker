import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGoals, updateGoal, reset } from "../features/goals/goalSlice";
import { FaRegSmile, FaRegCalendarAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    if (isError) console.log(message);
    if (!user) navigate("/login");
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onCheckClick = (id) => {
    dispatch(updateGoal(id));
  } 

  if (isLoading) <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>
          Welcome <FaRegSmile /> {user && user.name}
        </h1>
        <p>DayTracker Dashboard</p>
        <p className="date">
          <FaRegCalendarAlt />{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem
                key={goal._id}
                goal={goal}
                onCheckClick={onCheckClick}
              />
            ))}
          </div>
        ) : (
          <h3>You have not set your day tracker yet</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
