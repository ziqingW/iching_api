const app = require('../app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect
const nock = require('nock')
const axios = require('axios')
const api = nock("http://example.com")
  .get('/api/')
  .reply(200, {status: 'NOT FOUND'})
// unit test
    // synchronous test
describe("app.js tests", function() {
    it("addTwoNumbers returns a number", function() {
        expect(app.addTwoNumbers('a','b')).to.be.a("number")
    })
    it("addTwoNumbers can add 1 + 2", function() {
        expect(app.addTwoNumbers(1,2)).to.equal(3)
    })
    it("addTwoStrings return a string", function() {
        expect(app.addTwoStrings("a","b")).to.be.a("string")
    })
    it("addTwoStrings can add 'a' + 'b'",function(){
        expect(app.addTwoStrings('a','b')).to.equal('ab')
    })
})
    // asynchronous test
describe("Async code", function(){
    it("Async test", function(done){
        setTimeout(function() {
        expect(true).to.be.false
        done()
    }, 1000)   
})
})

// integration test
describe("API test",function() {
    it("API main page return 'Hello World'", function() {
        chai.request(app)
            .get('/')
            .end(function(err,res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.text).to.include("Hello Worlds")
            })
    })
})

// API mock test
describe.only("API mock test", function() {
    describe("example.com test", function() {
        it("example.com/api return status OK", function (done) {
            axios.get("http://example.com/api/")
                .then(response => {
                    expect(response.data.status).to.equal('NOT FOUND')
                    done()
                })
                .catch (done)
        })
    })
})