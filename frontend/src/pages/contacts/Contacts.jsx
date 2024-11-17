import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import AddIcon from "@mui/icons-material/Add";
import ContactForm from "./ContactForm";
import {
  Paper,
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "center",
          verticalAlign: "middle",
          whiteSpace: "nowrap",
        },
      },
    },
  },
});

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    { key: "company", label: "Company" },
    { key: "jobTitle", label: "Job Title" },
    { key: "actions", label: "Actions" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/contacts")
      .then((res) => {
        setContacts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    let sure = confirm("Are you SURE to delete this contact?");
    if (sure) {
      axios
        .delete("http://localhost:3000/contacts/" + id)
        .then((res) => {
          setContacts(res.data);
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (id) => {
    console.log("edit clicked with id", id);
    setSelectedContactId(id);
    setOpenEditPopup(true);
  };

  const handleSort = (columnKey) => {
    const direction =
      sortConfig.key === columnKey && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key: columnKey, direction });

    const sortedContacts = [...contacts].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[columnKey] > b[columnKey]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setContacts(sortedContacts);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header
        title="Erino Contact Manager"
        subTitle="Stay Organized, Stay Connected"
        icon={<PeopleOutlinedIcon fontSize="large" />}
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "last-baseline",
          marginY: 5,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 2,
            width: "100%",
            height: "auto",
          }}
          elevation={6}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#5868fc" }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    sx={{
                      color: "white",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      position: "relative",
                      whiteSpace: "nowrap",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                    onClick={() => handleSort(column.key)}
                    onMouseEnter={() => setHoveredColumn(column.key)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {column.label}

                      {column.key !== "actions" && (
                        <Box
                          sx={{
                            width: "1.5rem",
                            height: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            visibility:
                              hoveredColumn === column.key
                                ? "visible"
                                : "hidden",
                          }}
                        >
                          {sortConfig.key === column.key &&
                          sortConfig.direction === "asc" ? (
                            <ArrowDropUpIcon />
                          ) : (
                            <ArrowDropDownIcon />
                          )}
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>{contact.jobTitle}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        sx={{ marginX: 1, pointer: "cursor" }}
                        onClick={() => {
                          handleDelete(contact._id);
                        }}
                      />
                      <EditIcon
                        sx={{ marginX: 1, pointer: "cursor" }}
                        onClick={() => {
                          handleEdit(contact._id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={contacts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenPopup(true);
          }}
          sx={{
            marginY: 2,
            width: "15%",
            color: "#0b06bb",
            fontWeight: "600",
            border: " 2px solid #0b06bb",
          }}
        >
          Add New
        </Button>
      </Container>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={"Contact Form"}
      >
        <ContactForm></ContactForm>
      </Popup>
      <Popup
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
        title={"Edit Form"}
      >
        <ContactForm contactId={`${selectedContactId}`}></ContactForm>
      </Popup>
    </ThemeProvider>
  );
};

export default Contacts;
