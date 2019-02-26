export const contactValidator = (req, res, next) => {
  const { name, phoneNumber } = req.body;
  if (!name || name.trim() === '') {
    return res.status(422).json({ error: 'You cannot save a contact without a name' });
  }
  if (!phoneNumber) {
    return res.status(422).json({ error: 'No phone number supplied' });
  }
  next();
};

export const smsValidator = (req, res, next) => {
  const { sender, receiver, message } = req.body;
  if (!sender) {
    return res.status(422).send({ error: 'No sender provided' })
  }
  if (!receiver) {
    return res.status(422).send({ error: 'No receiver provided' })
  }
  if (!message) {
    return res.status(422).send({ error: 'You cannot send an empty message' })
  }
  next();
}
