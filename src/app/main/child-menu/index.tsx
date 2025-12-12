import style from './file.module.css'
import SearchBar from './component/search-bar';
import MenuTitle from './component/menu-title';
import FileList from './component/file-list';

const FileMenu = () => {
  return (
    <div className={style.menusContainer}>
      <SearchBar />
      <MenuTitle />
      <FileList />
    </div>
  );
};

export default FileMenu;
