import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/server";
import User from "../../src/users/model";
import Profile from "../../src/profile/model/profileModel";
import Person from "../../src/profile/model/personModel";
import Company from "../../src/profile/model/companyModel";
import bcrypt from "bcryptjs";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Profile Controller", () => {
    let password = "Testpassword@1";
    let email = "test@test.com";
    let token: string;

    beforeEach(async () => {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hash,
        });

        // create a profile
        await Person.create({
            firstname: "John",
            lastname: "Doe",
            bio: "I am a person",
            user: user._id
        });

        chai.request(app)
            .post("/users/login")
            .send({
                email: email,
                password: password,
            })
            .end((err, res) => {
                token = res.body.token;
            }
        );
    });

    afterEach(async () => {
        await User.deleteMany({});
        await Profile.deleteMany({});
    });

    describe("createPerson", () => {
        it("should create a person", (done) => {
            chai.request(app)
                .post("/profile")
                .set("x-access-token", `${token}`) 
                .send({
                    kind: "person",
                    firstname: "John",
                    lastname: "Doe",
                    bio: "I am a person",
                    user: "5f9f1b9b9c9d0b2b8c8b9c9d", 
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
    });
});
