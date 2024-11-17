import { Table } from "@mui/material";
import PropTypes from "prop-types";

export default function ContactTable({ children }) {
  const TblContainer = ({ children }) => <Table>{children}</Table>;

  TblContainer.propTypes = {
    children: PropTypes.node,
  };

  return <TblContainer>{children}</TblContainer>;
}

ContactTable.propTypes = {
  children: PropTypes.node,
};
