import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import style from './folder.module.css'
import FolderMenu from "./component/folder-menu";

const FolderBar = () => {
  return (
    <div className={style.folderBar}>
      <Image
        className={style.avatar}
        width={40}
        height={40}
        src="/file.svg"
        alt=""
        priority
      />
      <Button className={style.newButton} type="default">
        <PlusOutlined />
        <span>New</span>
      </Button>
      <FolderMenu />
    </div>
  );
};

export default FolderBar;
