import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/server";
import Post from "../../src/posts/model";
import User from "../../src/users/model";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Blog Posts Controller", () => {
  let testPost: any;
  let testUser: any;

  beforeEach(async () => {
    testUser = await User.create({
      email: "test@test.com",
      password: "testpassword",
    });
    testPost = await Post.create({
      title: "Test Post Title",
      content: "Test Post Content",
      auteur: testUser._id,
    });
  });

  afterEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
  });

  describe("getAll", () => {
    it("should return all blog posts", (done) => {
      chai
        .request(app)
        .get("/posts")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0].title).to.equal("Test Post Title");
          done();
        });
    });
  });

  describe("getOne", () => {
    it("should return one blog post by id", (done) => {
      chai
        .request(app)
        .get(`/posts/${testPost._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.title).to.equal("Test Post Title");
          done();
        });
    });
  });

  describe("create", () => {
    it("should create a new blog post", (done) => {
      chai
        .request(app)
        .post("/posts")
        .send({
          title: "New Test Post Title",
          content: "New Test Post Content",
          auteur: testUser._id,
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body.title).to.equal("New Test Post Title");
          done();
        });
    });
  });

  describe("update", () => {
    it("should update a blog post", (done) => {
      chai
        .request(app)
        .put(`/posts/${testPost._id}`)
        .send({
          title: "Updated Test Post Title",
          content: "Updated Test Post Content",
          auteur: testUser._id,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.title).to.equal("Updated Test Post Title");
          done();
        });
    });
  });

  describe("delete", () => {
    it("should delete a blog post", (done) => {
      chai
        .request(app)
        .delete(`/posts/${testPost._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("getAllByUser", () => {
    it("should return all blog posts by user", (done) => {
      chai
        .request(app)
        .get(`/posts/user/${testUser._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0].title).to.equal("Test Post Title");
          done();
        });
    });
  });
});
