import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const buildMenuItemsFromFolders = (folders: Folder[]): MenuItem[] => {
  return folders.map((folder) => ({
    key: folder.id,
    label: folder.name,
    children: folder.children
      ? buildMenuItemsFromFolders(folder.children)
      : undefined,
  }));
};