import { useState, useEffect } from "react";
import { Grid2, TextField, CssBaseline, Button } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import axios from "axios";
import PropTypes from "prop-types";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  company: "",
  jobTitle: "",
};

const ContactForm = ({ contactId }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contactId) {
      console.log("contact id ", contactId);
      axios
        .get(`http://localhost:3000/contacts/` + contactId)
        .then((response) => {
          setValues(response.data);
        })
        .catch((error) => {
          console.error("Error fetching contact:", error);
        });
    }
  }, [contactId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validate = () => {
    let temp = {};

    const phoneRegex = /^\d{10}$/;
    temp.phoneNumber = phoneRegex.test(values.phoneNumber)
      ? ""
      : "Phone Number must be exactly 10 digits.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      const { firstName, lastName, email, phoneNumber, company, jobTitle } =
        values;

      const requestData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        jobTitle,
      };

      const requestUrl = contactId
        ? `http://localhost:3000/contacts/` + contactId
        : "http://localhost:3000/contacts";

      const requestMethod = contactId ? axios.put : axios.post;

      requestMethod(requestUrl, requestData)
        .then((response) => {
          console.log("Response:", response.data);
          alert(
            contactId
              ? "Contact successfully updated!"
              : "Contact successfully added!"
          );
          handleReset();
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error submitting contact:", error);
          alert("An error occurred while submitting the contact.");
        });
    }
  };

  return (
    <div>
      <form
        autoComplete="off"
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
        onSubmit={handleSubmission}
      >
        <Grid2 container sx={{ marginY: 2, width: "95%" }}>
          <Grid2 item xs={6}>
            <TextField
              variant="outlined"
              label="First Name"
              name="firstName"
              value={values.firstName}
              sx={{ margin: 1, width: "95%" }}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={values.lastName}
              sx={{ margin: 1, width: "95%" }}
              onChange={handleChange}
              required
            />
            <br />
            <TextField
              type="email"
              variant="outlined"
              label="Email"
              name="email"
              value={values.email}
              sx={{ margin: 1, width: "95%" }}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              value={values.phoneNumber}
              sx={{ margin: 1, width: "95%" }}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              required
            />
            <br />
            <TextField
              variant="outlined"
              label="Company"
              name="company"
              value={values.company}
              sx={{ margin: 1, width: "95%" }}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="Job Title"
              name="jobTitle"
              value={values.jobTitle}
              sx={{ margin: 1, width: "95%" }}
              onChange={handleChange}
              required
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddCircleSharpIcon />}
              sx={{ padding: 1, margin: 1, backgroundColor: "#5869FC" }}
            >
              {contactId ? "Update" : "Submit"}
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="default"
              sx={{ paddingX: 4, paddingY: 1, margin: 1 }}
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid2>
        </Grid2>
      </form>
      <CssBaseline />
    </div>
  );
};

ContactForm.propTypes = {
  contactId: PropTypes.string,
};

export default ContactForm;
