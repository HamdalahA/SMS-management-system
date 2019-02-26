import moongoose from 'mongoose';
import { Schema } from 'mongoose';

const smsSchema = new Schema({
receiver: { type: String, required: true},
sender: { type: String, required: true},
message: {type: String, required: true},
contact: {type: Schema.Types.ObjectId, ref: 'Contact' }
});

const SMS = moongoose.model('SMS', smsSchema)
export default SMS
