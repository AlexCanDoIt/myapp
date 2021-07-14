const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    error.message = "cannot read contacts file";
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find(({ id }) => id === contactId);

    if (!findContact) {
      throw new Error("id incorrect");
    }

    return findContact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };

  try {
    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];
    const str = JSON.stringify(newContacts);

    await fs.writeFile(contactsPath, str);
    return newContact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      throw new Error("id incorrect");
    }
    const filteredСontacts = contacts.filter(({ id }) => id !== contactId);
    const str = JSON.stringify(filteredСontacts);

    await fs.writeFile(contactsPath, str);
    return contacts[index];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
