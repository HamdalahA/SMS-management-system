import moongose from 'mongoose';
import { Schema } from 'mongoose';

const contactSchema = new Schema({
  name: {type: String, required: true },
  phoneNumber: {type: String, unique: true, required: true},
  message: {type: [Schema.Types.ObjectId], ref: 'SMS'}
});

const Contact = moongose.model('Contact', contactSchema);
export default Contact;
