import mongoose from "mongoose";
import Joi from "joi";

const { Schema } = mongoose;

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
    email: String,
    phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { versionKey: false });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;