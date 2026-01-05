import type { MenuProps } from "antd";

export {};

declare global {
  type Folder = {
    id: string;
    name: string;
    parentId: string | null;
    children: Folder[]
  };

  type MenuItem = Required<MenuProps>["items"][number];
}