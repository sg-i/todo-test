import './HoldingTasks.scss';

interface PropsHoldingTasks {
  addTaskWindow: () => void;
}

//Страница ожидания действий пользователя
function HoldingTasks({ addTaskWindow }: PropsHoldingTasks) {
  return (
    <div className="HoldingTasks">
      <div>Выберите заметку слева или создайте новую</div>
      <button onClick={addTaskWindow} className="customButton buttonSave">
        Добавить
      </button>
    </div>
  );
}
export default HoldingTasks;
