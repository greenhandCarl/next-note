"use client"

import { FolderOpenOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];
type LevelKeysProps = {
  key?: string;
  children?: LevelKeysProps[];
}

const items: MenuItem[] = [
  {
    key: "2",
    icon: <FolderOpenOutlined />,
    label: "My folders",
    children: [
      { key: "21", label: "Backend" },
      { key: "22", label: "EnglishStudy" },
      {
        key: "23",
        label: "Interview",
        children: [
          { key: "231", label: "Option 1" },
          { key: "232", label: "Option 2" },
          { key: "233", label: "Option 3" },
        ],
      },
      {
        key: "24",
        label: "Frontend",
        children: [
          { key: "241", label: "Option 1" },
          { key: "242", label: "Option 2" },
          { key: "243", label: "Option 3" },
        ],
      },
    ],
  },
];

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const FolderMenu = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2"]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  
  return (
    <Menu
      mode="inline"
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 208, marginTop: 22, fontSize: 13 }}
      items={items}
    />
  );
};

export default FolderMenu;
