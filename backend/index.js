import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ContactModel } from "./models/contacts.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ErinoCRM")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/contacts", (req, res) => {
  ContactModel.find({})
    .then((data) => res.json(data))
    .catch((err) => res.send("Error Fetching Contacts ", err));
});

app.post("/contacts", (req, res) => {
  ContactModel.create(req.body)
    .then((contact) => res.json(contact))
    .catch((err) => res.send("Error Adding Contacts ", err));
});
app.get("/contacts/:id", (req, res) => {
  ContactModel.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch("Error fetching data with id");
});
app.put("/contacts/:id", (req, res) => {
  let contact_id = req.params.id;
  ContactModel.findByIdAndUpdate(
    contact_id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      company: req.body.company,
      jobTitle: req.body.jobTitle,
    },
    { new: true }
  )
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).send("Contact not found");
      }
    })
    .catch((error) => {
      console.error("Error in PUT API:", error);
      res.status(500).send("Error updating contact");
    });
});

app.delete("/contacts/:id", (req, res) => {
  let contact_id = req.params.id;
  ContactModel.findByIdAndDelete(contact_id).then((result) => {
    res.json(result);
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
