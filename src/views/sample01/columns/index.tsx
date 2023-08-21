import { GridColDef } from "@mui/x-data-grid";

export const listColumns = (): GridColDef[] => [
  {
    field: "id",
    headerName: "no",
    headerAlign: "center",
    align: "right",
    sortable: true,
    width: 50
  },
  {
    field: "tokens",
    headerName: "tokens",
    headerAlign: "center",
    align: "right",
    sortable: true,
    width: 70
  },
  {
    field: "characters",
    headerName: "char",
    headerAlign: "center",
    align: "right",
    sortable: true,
    width: 50
  },
  {
    field: "text",
    headerName: "text",
    headerAlign: "left",
    align: "left",
    sortable: false,
    width: 1000,
    // flex: 1,
  },
  {
    field: "tags",
    headerName: "tags",
    headerAlign: "left",
    align: "left",
    sortable: false,
    width: 150,
    // flex: 1,
  },
  {
    field: "vector",
    headerName: "vector",
    headerAlign: "left",
    align: "left",
    sortable: false,
    width: 150,
    // flex: 1,
  },
];
