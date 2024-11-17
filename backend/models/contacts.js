import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
});

export const ContactModel = mongoose.model("Contact", ContactSchema);
