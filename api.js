var axios = require("axios")
require("dotenv").config()
var api = {
    getUser(userName){
        return axios 
        .get(`https://api.github.com/users/${userName}?client_id=${
            process.env.CLIENT_ID
          }&client_secret=${process.env.CLIENT_SECRET}`)
          .catch(err => {console.log("user not found")})
          process.exit(1);
    },

getTotalStars(username){
    return axios
    .get(
        `https://api.github.com/users/${username}/repos?client_id=${
          process.env.CLIENT_ID
        }&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
    )
    // .then(response =>{return response.data.reduce((acc, curr)=>{
    //     acc += curr.stargazer_count 
    //     return acc
    // },0 )})
}

}
module.exports = api
