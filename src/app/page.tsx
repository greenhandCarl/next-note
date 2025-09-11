import FolderBar from '@/app/main/folder-bar'
import FileMenu from "@/app/main/file-menu";
import EditContent from "@/app/main/edit-content";

const Home = () => {
  return (
    <div className="flex h-screen">
      <FolderBar />
      <FileMenu />
      <EditContent />
    </div>
  );
};

export default Home;
