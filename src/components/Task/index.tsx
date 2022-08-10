import './Task.scss';
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}
interface PropsTask {
  element: Task;
  onClickTask: (task: Task) => void;
}
function Task({ element, onClickTask }: PropsTask) {
  function handleClickTask() {
    onClickTask(element);
  }
  return (
    <div
      onClick={handleClickTask}
      className={`Task ${
        element.status === 'Ожидает'
          ? 'waitTask'
          : element.status === 'В процессе'
          ? 'duringTask'
          : 'completeTask'
      }`}>
      <div>
        <div className="title">{element.title}</div>
        <div className="description">{element.description}</div>
      </div>
    </div>
  );
}
export default Task;
