import React from 'react';
import './ToDo.scss';
import AddTask from '../AddTask';
import EditTask from '../EditTask';
import EmptyTasks from '../EmptyTasks';
import HoldingTasks from '../HoldingTasks';
import LeftSideButtons from '../LeftSideButtons';
import ListTasks from '../ListTasks';
import { TaskType } from '../../types/TaskType';

function ToDo() {
  //Открытие и закрытие поиска
  const [searchActive, setSearchActive] = React.useState<boolean>(false);

  //Значение строки поиска
  const [search, setSearch] = React.useState<string>('');

  //Список заметок
  const [tasks, setTasks] = React.useState<TaskType[]>([]);

  //Выбранная в данный момент заметка
  const [focusTask, setFocusTask] = React.useState<TaskType | null>();

  //Ширина левого элемента
  const [widthLeftSide, setWidthLeftSide] = React.useState(0);

  //Открытие и закрытие страницы добавления заметки
  const [addingTask, setAddingTask] = React.useState<boolean>(false);

  //Ссылка на левый элемент
  const refLeftSide = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  React.useEffect(() => {
    //Изменение начальной ширины левого элемента в зависимости от размеров экрана
    setWidthLeftSide(refLeftSide.current.clientWidth);
  }, []);

  //Изменение ширины левого элемента по удержанию и перемещению правой границы курсором мыши
  function handleChangeWidthLeftSide(e: React.MouseEvent) {
    const startSize = widthLeftSide;
    const startPosition = e.pageX;
    function onMouseMove(mouseMoveEvent: MouseEvent) {
      const newWidth = startSize - startPosition + mouseMoveEvent.pageX;
      setWidthLeftSide(newWidth > 60 ? newWidth : 60);

      //убрать возможное выделение текста при перемещении курсора с зажатой левой кнопкой мыши
      if (window.getSelection != null) {
        const select = window.getSelection();
        select != null && select.removeAllRanges();
      }
    }
    function onMouseUp() {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    }
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  }

  //Выбор существующей заметки из списка
  function onClickTask(element: TaskType) {
    setAddingTask(false);
    setFocusTask(element);
  }

  //Добавление новой заметки
  function saveNewTask(title: string, description: string, status: string) {
    const newState: TaskType = {
      id: Date.now(),
      title,
      description,
      status,
    };
    setTasks((prevstate) => [newState, ...prevstate]);
    setAddingTask(false);
    setFocusTask(null);
  }

  //Редактирование заметки
  function updateTask(id: number, title: string, description: string, status: string) {
    if (tasks.some((e) => e.id === id)) {
      const newState = tasks.map((obj) => {
        if (obj.id === id) {
          return { id, title, description, status };
        }
        return obj;
      });
      setTasks(newState);
    } else {
      saveNewTask(title, description, status);
    }
  }

  //Удаление заметки
  function deleteTask(id: number) {
    setTasks(tasks.filter((el) => el.id != id));
    setAddingTask(false);
    setFocusTask(null);
  }

  //Открытие окна добавления заметки
  function addTaskWindow() {
    setAddingTask(true);
  }

  //Открытие или закрытие поиска
  function openSearch() {
    setSearchActive(!searchActive);
  }

  return (
    <div className="toDo">
      <div className="wrapper">
        <div
          className="leftSide"
          ref={refLeftSide}
          style={widthLeftSide === 0 ? { width: `60%` } : { width: `${widthLeftSide}px` }}>
          <LeftSideButtons
            search={search}
            setSearch={setSearch}
            searchActive={searchActive}
            openSearch={openSearch}
            addTaskWindow={addTaskWindow}
          />
          {searchActive ? (
            <ListTasks
              onClickTask={onClickTask}
              tasks={tasks.filter(
                (el) =>
                  el.title.toLowerCase().includes(search.toLowerCase()) ||
                  el.description.toLowerCase().includes(search.toLowerCase()),
              )}
            />
          ) : (
            <ListTasks onClickTask={onClickTask} tasks={tasks} />
          )}
        </div>
        <div onMouseDown={handleChangeWidthLeftSide} className="changeWidthLeftSide"></div>
        <div className="middle"></div>
        <div className="rightSide">
          {addingTask ? (
            <AddTask setAddingTask={setAddingTask} saveNewTask={saveNewTask} />
          ) : focusTask ? (
            <EditTask updateTask={updateTask} deleteTask={deleteTask} focusTask={focusTask} />
          ) : tasks.length ? (
            <HoldingTasks addTaskWindow={addTaskWindow} />
          ) : (
            <EmptyTasks addTaskWindow={addTaskWindow} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
