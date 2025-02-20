import React from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import VerifyModal from "./VerifyModal";
import { getProjectVisitors } from "../../redux/projects/action";
import { useNavigate } from "react-router-dom";

const DataTableComponent = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.projectReducer.getProjects?.data);

  // Sirf "unverify" wale projects ko filter karen, phir order reverse karen
  const filteredData = data ? data.filter(item => item.status === "unverify") : [];
  const reversedData = [...filteredData].reverse();

  // Columns for the DataTable
  const columns = [
    {
      name: "Site URL",
      selector: (row) => row.site_url,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        row.status === "verify" ? (
          <div className="flex flex-row gap-x-2">
            <button
              onClick={() => navigate(`/projects/traffic/${row.secret_key}`)}
              className="bg-green-600 text-nowrap hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Traffic
            </button>
            <button
              onClick={() => navigate(`/projects/requests/${row.secret_key}`)}
              className="bg-blue-600 text-nowrap hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Enrichments
            </button>
          </div>
        ) : (
          <VerifyModal secret_key={row.secret_key} />
        )
      ),
    },
  ];

  const dispatch = useDispatch();
  
  // Action handler
  const handleAction = (row) => {
    dispatch(getProjectVisitors({ secret_key: row.secret_key }));
    // alert(`Action clicked for ${row.title}`);
  };

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={reversedData}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default DataTableComponent;
