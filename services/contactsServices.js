import Contact from "../models/contactModel.js";

export const listContacts = (filter = {}, setting = {}) => Contact.find(filter, "-createdAt -updateAt", setting).populate("owner", "username email");

export const addContact = (data) => Contact.create(data);

export const getContact = (filter) => Contact.findOne(filter);

export const updateContact = (filter, data) => Contact.findOneAndUpdate(filter, data);

export const removeContact = (filter) => Contact.findOneAndDelete(filter);

export const updateStatusContact = (filter, data) => Contact.findOneAndUpdate(filter, data);