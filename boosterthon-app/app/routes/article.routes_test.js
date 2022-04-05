const assert = require('assert');
const axios = require('axios');
const expect = require('chai').expect;
const REST_PORT = 6868;
const REST_URL = 'http://localhost:'+REST_PORT;



/** TESTING REST API ENDPOINTS with HTTP Requests */
describe('Server Tests', ()=>{
	/** REACT CLIENT LOADS */
	// describe("docker / integration tests",() =>{
    //     // #####
    //     it("server started", (done) =>{
	// 		setTimeout(() =>{
	// 			done();
	// 		}, 1000);
	// 	});

    //     // #####
    //     it("database is connected", (done) =>{
	// 		setTimeout(() =>{
	// 			done();
	// 		}, 1000);
	// 	});

	// });

    /** REACT CLIENT LOADS */
	describe("Routes Testing",() =>{
        // GET /api/articles
        it("GET /api/articles/ returns 200 status", async () =>{
            // make get req
            axios({
                method: 'get',
                url: REST_URL+"/"
            })
            .then(function (response) {
                // console.log(response);
                expect(response.status).to.equal(200);
            });

		});

	});
});



/** BOILERPLATE TESTS */
// describe("Test Rest API Endpoints..", ()=>{
//   describe("subcategory1",()=>{
//     it("test1", (done)=>{
//         setTimeout(()=>{
//             done();
//         }, 1000);
//     });

//   });
// });