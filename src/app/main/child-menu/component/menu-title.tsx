'use client'

import { ArrowLeftOutlined } from "@ant-design/icons";
import style from "./menu-title.module.css";

const MenuTitle = () => {

  const onBack = () => {};

  return (
    <div className={style.backTitle}>
      <ArrowLeftOutlined className={style.backArrow} onClick={onBack} />
      <div className={style.folderTitle}>Frontend</div>
    </div>
  );
};

export default MenuTitle;
