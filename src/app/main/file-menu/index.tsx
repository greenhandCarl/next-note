import style from './file.module.css'
import SearchBar from './component/search-bar';

const FileMenu = () => {
  return (
    <div className={style.menusContainer}>
      <SearchBar />
    </div>
  );
};

export default FileMenu;
