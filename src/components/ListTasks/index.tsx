import { TaskType } from '../../types/TaskType';
import Task from '../Task';
import './ListTasks.scss';

interface PropsListTasks {
  tasks: TaskType[];
  onClickTask: (element: TaskType) => void;
}
function ListTasks({ tasks, onClickTask }: PropsListTasks) {
  return (
    <div className="listTasks">
      {tasks.map((el) => (
        <Task onClickTask={onClickTask} key={`${el.id + el.title}`} element={el} />
      ))}
    </div>
  );
}
export default ListTasks;
