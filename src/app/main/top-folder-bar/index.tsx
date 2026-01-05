import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import style from './folder.module.css'
import FolderMenu from "./component/folder-menu";
import { request } from 'graphql-request'
import foldersByUserQuery from './foldersByUser.graphql'

type FoldersByUserResponse = {
  foldersByUser: Folder[];
};

const FolderBar = async () => {
  const data = await request<FoldersByUserResponse>({
    url: process.env.GRAPGQL_URL!,
    document: foldersByUserQuery,
    variables: {
      userId: "507f1f77bcf86cd799439011"
    }
  })
  const items: Folder[] = data.foldersByUser || []
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
      <FolderMenu items={items} />
    </div>
  );
};

export default FolderBar;
