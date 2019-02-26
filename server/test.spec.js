import chai from 'chai';
import chaiHttp from 'chai-http';
import moongoose from 'mongoose';

import server from './server';

chai.should();
chai.use(chaiHttp);

describe('SMS management API', () => {
  let contactId;
  before((done) => {
    moongoose.createConnection(process.env.DATABASE_URL, () => {
      moongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });
  describe('Home page', () => {
    it('should display a welcome page', () => {
      chai.request(server).get('/api/v1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Welcome to SMS management API');
      });
    });
  });

  describe('creating a contact', () => {
    it('should check if name is supplied', (done) => {
      chai.request(server).post('/api/v1/contact').send({
        phoneNumber: '120202020',
        name: ''
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have
          .property('error')
          .equal('You cannot save a contact without a name');
        done();
      })
    });
  
    it('should check if phone number is supplied', (done) => {
      chai.request(server).post('/api/v1/contact').send({
        name: 'Dolla',
        phoneNumber: ''
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have
          .property('error')
          .equal('No phone number supplied');
        done();
      })
    });
    it('should create a new contact', (done) => {
      chai.request(server).post('/api/v1/contact').send({
        name: 'Dalah',
        phoneNumber: '0122333242'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('Dalah saved as contact');
        res.body.should.have.property('newContact');
        contactId = res.body.newContact._id;
        done();
      });
    });
  });

  describe('get contacts', () => {
    it('should return all contacts', (done) => {
      chai.request(server).get('/api/v1/contacts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Contacts fetched');
          done();
        });
    });

    it('should return a single contact', (done) => {
      chai.request(server).get(`/api/v1/contact/${contactId}`)
      .send({})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it('should return a 404 if contact is not available', (done) => {
      const fakeContactId = '5c7493383996536f083fcdcf'
      chai.request(server).get(`/api/v1/contact/${fakeContactId}`)
      .send({})
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });

  describe('get delete location', () => {
    it('should return a 404 if contact is not available', (done) => {
      const fakeContactId = '5c7493383996536f083fcdcf'
      chai.request(server).delete(`/api/v1/contact/${fakeContactId}`)
      .send({})
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });

  describe('Send sms', () => {
    it('should send an SMS', (done) => {
      chai.request(server).post('/api/v1/message')
      .send({
        message: 'hi',
        receiver: '09090009000',
        sender: '134344444442'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('Message sent')
        done();
      });
    });

    it('should return a 422 when reciever and sender are same', (done) => {
      chai.request(server).post('/api/v1/message')
      .send({
        message: 'hi',
        receiver: '09090009000',
        sender: '09090009000'
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.error.should.equal('You cannot send an sms to yourself')
        done();
      })
    })
  })
});
