import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import style from './folder.module.css'
import FolderMenu from "./component/folder-menu";
import { gql, request } from 'graphql-request'

const document = `query FoldersByUser($userId: ID!) {
  foldersByUser(userId: $userId) {
    id
    name
    parentId
  }
}`

const FolderBar = async () => {
  const data = await request({
    url: process.env.GRAPGQL_URL!,
    document,
    variables: {
      userId: "507f1f77bcf86cd799439011"
    }
  })
  console.log('FolderBar data', data)
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
