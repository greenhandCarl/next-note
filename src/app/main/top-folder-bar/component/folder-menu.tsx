"use client"

import { FolderOpenOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { FC, useState } from "react";
import { buildMenuItemsFromFolders } from "../utils/buildMenuItems";
import ContextMenu from "../../client-components/ContextMenu";

type LevelKeysProps = {
  key?: string;
  children?: LevelKeysProps[];
}
type Props = {
  items: Folder[];
}

const getLevelKeys = (items: LevelKeysProps[]) => {
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
  func(items);
  return key;
};



const FolderMenu: FC<Props> = ({ items }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
  }
  const menuItems: MenuItem[] = [
    {
      key: "0",
      icon: <FolderOpenOutlined />,
      label: <div onContextMenu={handleContextMenu}>My folders 1</div>,
      children: buildMenuItemsFromFolders(items),
    },
  ];
  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);
  const [stateOpenKeys, setStateOpenKeys] = useState(["2"]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])


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
    <div>
      <Menu
        mode="inline"
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{ width: 208, marginTop: 22, fontSize: 13 }}
        items={menuItems}
        selectedKeys={selectedKeys}
      />
      {
        showContextMenu && <ContextMenu
          x={0}
          y={0}
          options={[
            { label: "Option 1", action: () => console.log("Option 1 selected") },
            { label: "Option 2", action: () => console.log("Option 2 selected") },
          ]}
          onClose={() => {}}
        />
      }
    </div>
  );
};

export default FolderMenu;
