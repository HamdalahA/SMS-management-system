import Contact from '../models/contact.model';

export default {
  createContact(req, res) {
    const { name, phoneNumber } = req.body;
    Contact.findOne({ phoneNumber }).then((numberFound) => {
      if(numberFound) {
        return res.status(409).send({ message: 'You already have this contact saved' });
      }
      return Contact.create({ name, phoneNumber }).then((newContact) => {
        return res.status(201).send({
          message: `${name} saved as contact`,
          newContact
        });
      });
    }).catch(error => {
      res.status(500).send({error: error.message })
    })
  },

  getAllContacts(req, res) {
    Contact.find({})
      .then((contacts) => {
        if(!contacts) {
          res.status(404).send({ error: 'No contact yet' });
        }
        return res.status(200).send({
          message: 'Contacts fetched',
          contacts
        })
      }).catch(() => {
        res.status(500).send({ error: 'Something went wrong' })
      })
  },

  getContact(req, res) {
    const { id } = req.params;
    Contact.findById({_id: id}).exec().then((contactFound) => {
      if(!contactFound) {
        return res.status(404).send({ error: 'No contact saved with that number' });
      }
      return res.status(200).send({
        message: 'contact found',
        name: contactFound.name,
        phoneNumber: contactFound.phoneNumber
      })
    }).catch(() => {
      return res.status(500).send({ error: 'Something went wrong' })
    })
  },

  deleteContact(req, res) {
    const { id } = req.params;
    Contact.findById(id).then((contactDeleted) => {
      if(!contactDeleted) {
        return res.status(404).send({ error: 'Contact with this id not found' })
      }
      contactDeleted.deleteOne();
      contactDeleted.save();
      return res.status(200).send({ message: 'Contact successfully deleted' });
    }).catch((err) => {
      return res.status(500).send({ error: 'Something went wrong' })
    })
  }
}
