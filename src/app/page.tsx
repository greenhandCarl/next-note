import FolderBar from '@/app/main/top-folder-bar'
import FileMenu from "@/app/main/child-menu";
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
