import ArrowRight from "@/assets/icons/ArrowRight";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";

export const ActionBody = rowData => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-1">
      <Button className="" onClick={() => navigate(`/url/update/${rowData._id}`)}>
        Update
      </Button>
    </div>
  );
};

export const PaginationTemplate = {
  PrevPageLink: options => {
    return (
      <Button
        onClick={options.onClick}
        disabled={options.disabled}
        color="gray"
        icon={() => <ArrowLeft stroke="gray" disabled={options.disabled} height={18} width={18} />}
      >
        Previous
      </Button>
    );
  },
  PageLinks: options => {
    if (
      (options.view.startPage === options.page && options.view.startPage !== 0) ||
      (options.view.endPage === options.page && options.page + 1 !== options.totalPages)
    ) {
      return <span style={{ userSelect: "none" }}>...</span>;
    }

    const { page } = options;
    const isCurrentPage = options.currentPage === page;

    return (
      <button
        onClick={options.onClick}
        className={`${options.className}${isCurrentPage ? " bg-primary-50  text-primary-600" : "inherit"}`}
        style={{ borderRadius: "8px" }}
      >
        {options.page + 1}
      </button>
    );
  },

  NextPageLink: options => {
    return (
      <Button
        onClick={options.onClick}
        disabled={options.disabled}
        color="gray"
        icon={() => <ArrowRight stroke="gray" disabled={options.disabled} height={18} width={18} />}
      >
        Next
      </Button>
    );
  },
};

export const RedirectURLBody = rowData => {
  return (
    <Link to={rowData.redirectURL} target="_blank">
      <span className="text-blue-500 cursor-pointer">{rowData.redirectURL}</span>
    </Link>
  );
};
