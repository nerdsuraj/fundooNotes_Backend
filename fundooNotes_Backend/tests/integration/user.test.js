import HttpStatus from 'http-status-codes';
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

let loginToken;
let noteid;

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  describe('POST /UserRegistration', () => {
    it('IT WILL RETURN 201 STATUS WHEN USER ADDED', (done) => {
      const userReg = {
        firstname:"suraj",
        lastname:"pandit",
        email:"soorajkrpandit@gmail.com",
        password:"Suraj@6200"
      }

      request(app)
        .post('/api/v1/users')
        .send(userReg)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  
    it('if user pass invalid details then ',(done)=>{
      const userReg ={
        firstname:"123456",
        lastname:"236423",
        email: "1245365@455",
        password:"123456456789"
      };
      request(app)
      .post('/api/v1/users')
      .send(userReg)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  //for login
  describe('POST /userLogin', () => {
    it('IT WILL RETURN 200 STATUS WHEN USER login', (done) => {
      const userLogin = {
        email:"soorajkrpandit@gmail.com",
        password:"Suraj@6200"
      }

      request(app)
        .post('/api/v1/users/login')
        .send(userLogin)
        .end((err, res) => {
          loginToken=res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  
    it('given user unsuccessfull login should return status 400 ',(done)=>{
      const userLogin ={
        email: "1245365@455",
        password:123456456789
      };
      request(app)
      .post('/api/v1/users/login')
      .send(userLogin)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
    });
  });
 
  // for notes test

// Create New Note ##############
// Positive senario ##############

describe('Note', () => {
  it('Create note should return status 200', (done) => {
    const userdetails = {
      Title: 'This is A Test Title',
      Descreption:'This is a test description'
    };
    request(app)
      .post('/api/v1/notes/')
      .set('Authorization', `Bearer ${loginToken}`) 
      .send(userdetails)
      .end((err, res) => {
        noteid = res.body.data._id;
        expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
        done();
      });

  });

//  Create New Note ##############
// Negetive senario ##############

  it('Create New Note authentication failed  should return status 400', (done) => {
    const userdetails = {
      Title: 'This is A Test Title',
      Descreption:'This is a test description'
    };
    request(app)
      .post('/api/v1/notes/')
      // .set('Authorization',`Bearer ${loginToken}` )
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
       
      });
      done();
  });
  
});

// get all note ######################
// Positive senario ##############

describe('Note', () => {
  it('get all note should return status 200', (done) => {
    const userdetails = {  };
    request(app)
      .get('/api/v1/notes/')
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });

  });

// get all note ######################
// Negetive senario ##############

it('get all note authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .get('/api/v1/notes/')
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
     
    });
    done();
  });
  
});

//get one note ######################
// Positive senario ##############


describe('Note', () => {
  it('get single note by note id should return status 200 ', (done) => {
    const userdetails = {  };
    request(app)
      .get(`/api/v1/notes/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });

  });

// get one note ######################
// Negetive senario ##############

it('get single note authentication failed should return status 400', (done) => {
  const userdetails = { };
  request(app)
    .get(`/api/v1/notes/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      
    });
    done();
  });
  
});

//update note ######################
// Positive senario ##############

describe('Note', () => {
  it('update note by note id should return status 200 ', (done) => {
    const userdetails = { 
      Title : 'This is the test title',
      Descreption : 'This is the test description'
  };
    request(app)
      .put(`/api/v1/notes/${noteid}`)
      .set('Authorization', `Bearer ${loginToken}`) 
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(202);
        done();
      });

  });

// update note ######################
// Negetive senario ##############

it('update note authentication failed should return status 400', (done) => {
  const userdetails = { 
    Title : 'This is the test title',
    Descreption : 'This is the test description'
  };
  request(app)
    .put(`/api/v1/notes/${noteid}`)
    // .set('Authorization', `Bearer ${loginToken}`) 
    .end((err, res) => {
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      
    });
    done();
  });
  
});

// Delete Note ###############
// Positive senario ##############

// describe('Note', () => {
//   it('Delete note by note id should return status 200 ', (done) => {
//     const userdetails = { };
//     request(app)
//       .delete(`/api/v1/notes/${noteid}`)
//       .set('Authorization', `Bearer ${loginToken}`) 
//       .end((err, res) => {
//         expect(res.statusCode).to.be.equal(HttpStatus.OK);
//         done();
//       });
//   });

// // Delete note ######################
// // Negetive senario ##############

// it('Delete note authentication failed should return status 400', (done) => {
//   const userdetails = { };
//   request(app)
//     .delete(`/api/v1/notes/${noteid}`)
//     // .set('Authorization', `Bearer ${loginToken}`) 
//     .end((err, res) => {
//       expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
//       done();
//     });
//   });
// });


// Archive Note ##############
// Positive senario ##############

// describe('Note', () => {
//   it('Archive Note by note id should return status 200 ', (done) => {
//     const userdetails = { };
//     request(app)
//       .put(`/api/v1/notes/${noteid}/isArchived`)
//       .set('Authorization', `Bearer ${loginToken}`) 
//       .end((err, res) => {
//         expect(res.statusCode).to.be.equal(HttpStatus.OK);
//         done();
//       });
//   });

// // Archive Note ######################
// // Negetive senario ##############

// it('Archive Note authentication failed should return status 400', (done) => {
//   const userdetails = { };
//   request(app)
//     .put(`/api/v1/note/${noteid}/isArchived`)
//     // .set('Authorization', `Bearer ${loginToken}`) 
//     .end((err, res) => {
//       expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
//       done();
//     });
//   });
// });

// // Unarchive Note ##############
// // Positive senario ##############

// describe('Note', () => {
//   it('Unarchive Note by note id should return status 200 ', (done) => {
//     const userdetails = { };
//     request(app)
//       .put(`/api/v1/note/unarchive/${noteid}`)
//       .set('Authorization', `Bearer ${loginToken}`) 
//       .end((err, res) => {
//         expect(res.statusCode).to.be.equal(HttpStatus.OK);
//         done();
//       });
//   });

// // Unarchive Note ######################
// // Negetive senario ##############

// it('Unarchive Note authentication failed should return status 400', (done) => {
//   const userdetails = { };
//   request(app)
//     .put(`/api/v1/note/unarchive/${noteid}`)
//     // .set('Authorization', `Bearer ${loginToken}`) 
//     .end((err, res) => {
//       expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
//       done();
//     });
//   });
// });


// // Move to trash Note ##############
// // Positive senario ##############

// describe('Note', () => {
//   it('Move to trash by note id should return status 200 ', (done) => {
//     const userdetails = { };
//     request(app)
//       .put(`/api/v1/note/movetrash/${noteid}`)
//       .set('Authorization', `Bearer ${loginToken}`) 
//       .end((err, res) => {
//         expect(res.statusCode).to.be.equal(HttpStatus.OK);
//         done();
//       });
//   });

// // Move to trash Note ##############
// // Negetive senario ##############

// it('Move to trash by note id authentication failed should return status 400', (done) => {
//   const userdetails = { };
//   request(app)
//     .put(`/api/v1/note/movetrash/${noteid}`)
//     // .set('Authorization', `Bearer ${loginToken}`) 
//     .end((err, res) => {
//       expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
//       done();
//     });
//   });
// });

// // Remove from trash Note ##############
// // Positive senario ##############

// describe('Note', () => {
//   it('Remove from trash by note id should return status 200 ', (done) => {
//     const userdetails = { };
//     request(app)
//       .put(`/api/v1/note/removetrash/${noteid}`)
//       .set('Authorization', `Bearer ${loginToken}`) 
//       .end((err, res) => {
//         expect(res.statusCode).to.be.equal(HttpStatus.OK);
//         done();
//       });
//   });

// // Move to trash Note ##############
// // Negetive senario ##############

// it('Remove from trash by note id authentication failed should return status 400', (done) => {
//   const userdetails = { };
//   request(app)
//     .put(`/api/v1/note/removetrash/${noteid}`)
//     // .set('Authorization', `Bearer ${loginToken}`) 
//     .end((err, res) => {
//       expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
//       done();
//     });
//   });
// })

});

