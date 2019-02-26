import SMS from '../models/sms.model';
import Contact from '../models/contact.model';

export default {
  sendMessage(req, res) {
    const { sender, receiver, message } = req.body;
    SMS.create({sender, receiver, message }).then((createdMessage) => {
      if(createdMessage.sender === createdMessage.receiver) {
        return res.status(422).send({ error: 'You cannot send an sms to yourself' })
      }
      if(!createdMessage) {
        return res.status(404).send({ error: 'No message found' })
      }
      return res.status(201).send({
        message: 'Message sent',
        status: 'Delivered',
        createdMessage
      })
    })
  },

  getSentMessages(req, res) {
    const { sentId } = req.params;
    Contact.findById({_id: sentId}).exec().then((contactFound) => {
      if(!contactFound) {
        return res.status(404).send({ error: 'Contact not found' });
      }
      const contactNum = contactFound.phoneNumber;
      SMS.find({sender: contactNum}).exec().then((sentMessages) => {
        if(!sentMessages) {
          return res.status(404).send({ error: 'You have not sent any messages yet'});
        }
        return res.status(200).send({
          status: 'sent',
          message: 'Here are the messages you have sent',
          sentMessages
        })
      })
    }).catch(() => {
      return res.status(500).send({ error: 'something went wrong' });
    })
  },

  getRecievedMessages(req, res) {
    const { receivedId } = req.params;
    Contact.findById({_id: receivedId}).exec().then((contactFound) => {
      if(!contactFound) {
        return res.status(404).send({ error: 'Contact not found' });
      }
      const contactNum = contactFound.phoneNumber;
      SMS.find({receiver: contactNum}).exec().then((receivedMessages) => {
        if(!receivedMessages) {
          return res.status(404).send({ error: 'You have not received any messages yet'});
        }
        return res.status(200).send({
          status: 'delivered',
          message: 'Here are the messages you have received',
          receivedMessages
        })
      })
    }).catch(() => {
      return res.status(500).send({ error: 'something went wrong' });
    })
  }
}
