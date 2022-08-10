import './EmptyTasks.scss';

interface PropsEmptyTask {
  addTaskWindow: () => void;
}

//Страница, отображающаяся при отсутствии заметок
function EmptyTasks({ addTaskWindow }: PropsEmptyTask) {
  return (
    <div className="EmptyTasks">
      <div>Список заметок пока пуст</div>
      <button onClick={addTaskWindow} className="customButton buttonSave">
        Добавить
      </button>
    </div>
  );
}
export default EmptyTasks;
