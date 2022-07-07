import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { visuallyHidden } from "@mui/utils";

function TableCellContent(props) {
  return (
    <div>
      <KeyboardArrowUpIcon
        sx={
          props.sortBy == props.title.toLowerCase() &&
          props.sortOrder == "ascend"
            ? null
            : visuallyHidden
        }
      />
      <KeyboardArrowDownIcon
        sx={
          props.sortBy == props.title.toLowerCase() &&
          props.sortOrder == "descend"
            ? null
            : visuallyHidden
        }
      />
      {props.title}
    </div>
  );
}

export default TableCellContent;
