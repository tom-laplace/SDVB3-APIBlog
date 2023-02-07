import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/server";
import Post from "../../src/posts/model";
import User from "../../src/users/model";
import Commentaire from "../../src/commentaires/model";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Commentaires Controller", () => {
  let testPost: any;
  let testUser: any;
  let testCommentaire: any;

  beforeEach(async () => {
    testUser = await User.create({
      username: "testuser",
      email: "test@test.com",
      password: "testpassword",
    });

    testPost = await Post.create({
      title: "Test Post Title",
      content: "Test Post Content",
      auteur: testUser._id,
    });

    testCommentaire = await Commentaire.create({
      content: "Test Commentaire Content",
      auteur: testUser._id,
      post: testPost._id,
    });
  });

  afterEach(async () => {
    await Commentaire.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({});
  });

  describe("getAll", () => {
    it("should return all commentaires", (done) => {
      chai
        .request(app)
        .get("/commentaires")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0].content).to.equal("Test Commentaire Content");
          done();
        });
    });
  });

  describe("getOne", () => {
    it("should return one commentaire by id", (done) => {
      chai
        .request(app)
        .get(`/commentaires/${testCommentaire._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.content).to.equal("Test Commentaire Content");
          done();
        });
    });
  });

  describe("create", () => {
    it("should create a new commentaire", (done) => {
      chai
        .request(app)
        .post("/commentaires")
        .send({
          content: "Test Commentaire Content",
          auteur: testUser._id,
          post: testPost._id,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.content).to.equal("Test Commentaire Content");
          done();
        });
    });
  });

  describe("update", () => {
    it("should update a commentaire by id", (done) => {
      chai
        .request(app)
        .put(`/commentaires/${testCommentaire._id}`)
        .send({
          content: "Updated Commentaire Content",
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.content).to.equal("Updated Commentaire Content");
          done();
        });
    });
  });

  describe("delete", () => {
    it("should delete a commentaire by id", (done) => {
      chai
        .request(app)
        .delete(`/commentaires/${testCommentaire._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("getByPost", () => {
    it("should return all commentaires by post id", (done) => {
      chai
        .request(app)
        .get(`/commentaires/post/${testPost._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0].content).to.equal("Test Commentaire Content");
          done();
        });
    });
  });

  describe("getByUser", () => {
    it("should return all commentaires by user id", (done) => {
      chai
        .request(app)
        .get(`/commentaires/user/${testUser._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0].content).to.equal("Test Commentaire Content");
          done();
        });
    });
  });
});
