import { useState, useEffect } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ServerURL } from "@/helper/utils";
import { useParams } from "react-router-dom";

const UpdateURL = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${ServerURL}/api/url/update/${id}`,
        { slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Slug updated successfully:");
      navigate(`/stats`);
    } catch (error) {
      console.error("Error updating url:", error.message);
      toast.error("Slug should be unique.");
    }
  };

  const loadURL = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${ServerURL}/api/url/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSlug(response.data.slug);
    } catch (error) {
      console.log(error);
      toast.error("Error updating url:", error.message);
    }
  };
  useEffect(() => {
    loadURL();
  }, []);
  return (
    <div className="flex flex-col flex-wrap py-[10vh] items-center gap-4">
      <div className="flex flex-col gap-10 w-full items-center justify-center">
        <span className="font-medium text-[32px] text-blue-500">Update URL</span>
        <div className="flex flex-col gap-6">
          <span className="p-float-label">
            <InputText id="username" value={slug} onChange={e => setSlug(e.target.value)} />
            <label htmlFor="username">Slug</label>
          </span>
          <div className=" flex justify-center">
            <Button className="text-white font-medium text-base flex items-center " onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateURL;
