"use client"

import { FolderOpenOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { FC, useState } from "react";
import { buildMenuItemsFromFolders } from "../utils/buildMenuItems";
import ContextMenu from "../../client-components/context-menu";
import createFolder from "../createFolder.graphql";
import request from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

type CreateFolderResponse = {
  id: number,
  parentId: number
}

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
  const [mousePosition, setMousePosition] = useState<{x: number, y: number}>({x: 0, y: 0})

  const mutation = useMutation({
    mutationFn: async (parameter: { userId: string, name: string }) => {
      return request(
        process.env.NEXT_PUBLIC_GRAPGQL_URL!,
        createFolder,
        parameter
      )
    },
    onError: (error, variables, onMutateResult, context) => {
      console.log(`error`, error)
    },
    onSuccess: (data) => {
      console.log('data', data)
    },
  })

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
    setMousePosition({x: e.pageX, y: e.pageY})
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

  const addFolder = () => {
    mutation.mutate({ userId: "507f1f77bcf86cd799439011", name: 'test' })
  }
  
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
            x={mousePosition.x}
            y={mousePosition.y}
            options={[
              { label: "New", action: () => addFolder() },
              { label: "Delete", action: () => console.log("Option 2 selected") },
              { label: "Rename", action: () => console.log("Option 2 selected") },
            ]}
            onClose={() => setShowContextMenu(false)}
          />
        }
      </div>
  );
};

const FolderMenuWrapper: FC<Props> = ({ items }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FolderMenu items={items} />
    </QueryClientProvider>
  )
}
export default FolderMenuWrapper;
