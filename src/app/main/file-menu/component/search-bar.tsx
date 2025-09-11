import { Input } from "antd";
import { OrderedListOutlined } from "@ant-design/icons";
import style from './search-bar.module.css'

const { Search } = Input;

const SearchBar = () => {
  
  const onSearch = () => {
    console.log("onSearch");
  };

  return (
    <div className={style.searchBox}>
      <Search
        placeholder="搜索笔记"
        allowClear
        onSearch={onSearch}
        style={{ width: 180 }}
      />
      <OrderedListOutlined className={style.operate} />
    </div>
  );
};

export default SearchBar;
