import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ActionBody, PaginationTemplate, RedirectURLBody } from "@/pages/Stats/Template";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingIcon from "@/assets/icons/LoadingIcon";
import { ServerURL } from "@/helper/utils";

const AllURLs = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchURLs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/api/user/urls`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        console.log(userData);

        setData(userData);
      } catch (error) {
        toast.error("Error fetching users:");
      }
    };

    fetchURLs();
  }, []);

  return (
    <div className="flex flex-col flex-wrap py-[5vh] items-center gap-4">
      <div className="flex w-full items-center justify-center">
        <span className="font-medium text-[32px] text-blue-500">All URLs</span>
      </div>
      <div className="flex flex-col gap-6 w-full px-[15vw] mt-10">
        {data.length > 0 ? (
          <DataTable
            className="items-center"
            value={data}
            removableSort
            tableStyle={{ minWidth: "100%" }}
            dataKey="id"
            scrollable
            paginator
            rows={7}
            paginatorTemplate={PaginationTemplate}
            paginatorClassName="justify-between"
          >
            <Column field="slug" header="Slug"></Column>
            <Column field="URL" header="URL"></Column>
            <Column field="redirectURL" header="Redirect URL" body={RedirectURLBody}></Column>
            <Column field="count" header="Count"></Column>
            <Column field="Action" header="Action" body={ActionBody}></Column>
          </DataTable>
        ) : (
          <LoadingIcon />
        )}
      </div>
    </div>
  );
};

export default AllURLs;
