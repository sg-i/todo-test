import { useState } from 'react';
import './AddTask.scss';

interface PropsAddTask {
  saveNewTask: (title: string, description: string, status: string) => void;
  setAddingTask: (value: boolean) => void;
}

//Страница добавления заметки
function AddTask({ saveNewTask, setAddingTask }: PropsAddTask) {
  //Название заметки
  const [title, setTitle] = useState<string>('');

  //Описание заметки
  const [description, setDescription] = useState<string>('');

  //Статус заметки
  const [status, setStatus] = useState<string>('Ожидает');

  //Сохранение заметки
  function saveTask() {
    //Проверка, что строка не пустая
    if (title.trim() == '') {
      alert('Введите название заметки!');
    } else {
      saveNewTask(title, description, status);
    }
  }

  //Изменение статуса на "Ожидает"
  function setStatusWait() {
    setStatus('Ожидает');
  }

  //Изменение статуса на "В процессе"
  function setStatusDuring() {
    setStatus('В процессе');
  }
  //Изменение статуса на "Выполнена"
  function setStatusComplete() {
    setStatus('Выполнена');
  }

  //Отмена добавления новой заметки
  function stopAdding() {
    setTitle('');
    setDescription('');
    setStatus('');
    setAddingTask(false);
  }
  return (
    <div className="AddTask">
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        className="inputTask"
        placeholder="Название.."
      />
      <div className="changeStatus">
        <button
          onClick={setStatusWait}
          className={`buttonStatus ${status === 'Ожидает' ? 'waitButtonActive' : 'waitButton'}`}>
          Ожидает
        </button>
        <button
          onClick={setStatusDuring}
          className={`buttonStatus ${
            status === 'В процессе' ? 'duringButtonActive' : 'duringButton'
          }`}>
          В процессе
        </button>
        <button
          onClick={setStatusComplete}
          className={`buttonStatus ${
            status === 'Выполнена' ? 'completeButtonActive' : 'completeButton'
          }`}>
          Выполнена
        </button>
      </div>
      <textarea
        onChange={(e) => setDescription(e.currentTarget.value)}
        value={description}
        rows={9}
        className="textareaTask"
        placeholder="Описание.."
      />
      <div className="bottomButtons">
        <button onClick={saveTask} className="customButton buttonSave">
          Сохранить
        </button>
        <button onClick={stopAdding} className="customButton buttonDelete">
          <svg
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px">
            <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AddTask;
