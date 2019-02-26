import express from 'express';
import contactController from './controllers/contact.controller';
import smsController from './controllers/sms.controller';
import { contactValidator, smsValidator } from './middleware/validators';


const apiUrl = '/api/v1'

const router = express.Router();

router.get(`${apiUrl}`, (req, res) => {
  res.status(200).send({message: 'Welcome to SMS management API' });
})

router.post(`${apiUrl}/contact`, contactValidator, contactController.createContact);
router.get(`${apiUrl}/contacts`, contactController.getAllContacts);
router.get(`${apiUrl}/contact/:id`, contactController.getContact);
router.delete(`${apiUrl}/contact/:id`, contactController.deleteContact);

router.post(`${apiUrl}/message`, smsValidator, smsController.sendMessage);
router.get(`${apiUrl}/message/:sentId`, smsValidator, smsController.getSentMessages);
router.get(`${apiUrl}/message/:receivedId`, smsValidator, smsController.getRecievedMessages);


export default router;
