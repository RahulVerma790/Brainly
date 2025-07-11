import { useState } from "react";
import { Button } from "../components/Button"
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/Plus";
import { ShareIcon } from "../icons/Share";
import { SideBar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const DashBoard  = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [contents, setContents, fetchContent] = useContent();

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: {Authorization: localStorage.getItem("token")},
                data: {contentId: id}
            })
            setContents((prev) => prev.filter((c) => c._id!==id));
        }catch(err){
            console.error(`Delete failed`,err);
            alert(`Failed to delete the document.`);
        }
    }

    return <>
    <div className="bg-white-700 h-screen">
      <div className={`bg-white-800`}>
        <SideBar/>
      </div>
      <div className={`ml-64 p-10 bg-white-700`} >
        <CreateContentModel open={modalOpen} onClose={() => {
          setModalOpen(false);}}
          onAdd = {() => {
            fetchContent();
            setModalOpen(false);
          }}
          />

        <div className={`flex justify-between items-center`}>
          <div className={`text-2xl font-semibold`}>
            All Notes
          </div>
          <div className={`flex gap-3`}>
              <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon size="sm"/>} />
              <Button onClick={() => setModalOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon size="sm" />}/>
          </div>
        </div>
        <div className={`mt-10 flex flex-wrap items-start gap-8`}>
            {contents.map((content) => (
            <Card
                key={content._id}
                id = {content._id}
                title={content.title}
                link={content.link}
                type={content.type}
                onDelete={handleDelete}
            />
            ))}
        </div>
      </div>
    </div>
  </>
} 