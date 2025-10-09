import style from './file.module.css'
import SearchBar from './component/search-bar';
import MenuTitle from './component/menu-title';

const FileMenu = () => {
  return (
    <div className={style.menusContainer}>
      <SearchBar />
      <MenuTitle />
    </div>
  );
};

export default FileMenu;
