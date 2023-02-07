import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/server";
import User from "../../src/users/model";
import Profile from "../../src/profile/model";

const expect = chai.expect;
chai.use(chaiHttp);

describe("User Authentication", () => {
  let testUser: any;
  let testProfile: any;

  beforeEach(async () => {
    testUser = await User.create({
      email: "test@test.com",
      password: "testpassword",
    });
    testProfile = await Profile.create({
      username: "testUser",
      user: testUser._id,
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Profile.deleteMany({});
  });
  
  describe("register", () => {
    it("should register a user", (done) => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          email: "test2@test.com",
          password: "Testpassword@2",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.user.email).to.equal("test2@test.com");
          done();
        });
    });
  });

  describe("login", () => {
    it("should login a user", (done) => {
      chai
        .request(app)
        .post("/users/login")
        .send({
          email: "test@test.com",
          password: "testpassword",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.user.email).to.equal("test@test.com");
          done();
        });
    });
  });


  describe("updateRole", () => {
    it("should update a user's role", (done) => {
      chai
        .request(app)
        .post("/users/updateRole")
        .send({
          email: "test@test.com",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.user.email).to.equal("test@test.com");
          expect(res.body.user.role).to.equal("admin");
          done();
        });
    });
  });
});
