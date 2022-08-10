import './LeftSideButtons.scss';

interface PropsLeftSideButtons {
  search: string;
  setSearch: (string: string) => void;
  searchActive: boolean;
  addTaskWindow: () => void;
  openSearch: () => void;
}

//Верхнее меню с кнопками у левого элемента
function LeftSideButtons({
  search,
  setSearch,
  searchActive,
  addTaskWindow,
  openSearch,
}: PropsLeftSideButtons) {
  //Открыть страницу добавления заметки
  function openAddPage() {
    addTaskWindow();
  }
  return (
    <div className="leftSideButtons">
      <button
        className={`customButton addButton ${searchActive && 'addButtonMini'}`}
        title="Добавить"
        onClick={openAddPage}>
        <svg
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="37px"
          height="37px">
          <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
        </svg>
      </button>
      <div className={`rightContainer ${!searchActive && 'rightContainerMini'}`}>
        <button
          className={`customButton ${!searchActive && 'searchButton'}`}
          title="Поиск"
          onClick={openSearch}>
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="37px"
            height="37px">
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
          </svg>
        </button>
        {searchActive && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            placeholder="Поиск.."
            type="text"
            className="searchInput"
          />
        )}
      </div>
    </div>
  );
}

export default LeftSideButtons;
