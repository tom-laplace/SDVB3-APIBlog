import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/server";
import User from "../../src/users/model";
import bcrypt from "bcryptjs";

const expect = chai.expect;
chai.use(chaiHttp);

describe("User Controller", () => {
    let password = "Testpassword@1";
    let email = "test@test.com";

    beforeEach(async () => {
        const hash = await bcrypt.hash(password, 10);
        await User.create({
            email,
            password: hash,
        });
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    describe("register", () => {
        it("should register a user", (done) => {
            chai.request(app)
                .post("/users/register")
                .send({
                    email: "test2@test2.com",
                    password: "Testpassword@9",
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal("User created");
                    done();
                });
        });
    });

    // log the user and get the token
    describe("login", () => {
        it("should login a user", (done) => {
            chai.request(app)
                .post("/users/login")
                .send({
                    email: "test@test.com",
                    password: "Testpassword@1",
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.token).to.be.a("string");
                    done();
                });
        });
    });
});
