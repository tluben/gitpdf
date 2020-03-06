const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")
const open = require("open")
const convertFactory = require("electron-html-to")
const api = require("./api")
const generateHTML = require("./generateHTML")

const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your github user Name?"
    }, {
        type: "list",
        name: "color",
        message: "what is your favorite color?",
        choices: ["red", "blue", "green", "pink"]
    }
];

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
    inquirer.prompt(questions).then(({ github, color }) => {
        console.log("searching...")
        console.log(github)
        api
            .getUser(github)
            .then(response => api.getTotalStars(github).then(stars => {
                var html = generateHTML({
                    stars, color, ...response.data
                })
                console.log(html)
                const conversion = convertFactory({
                    converterPath: convertFactory.converters.PDF
                })
                conversion({ html:html }, function (err, result) {
                    if (err) {
                        return console.log(err);
                    }
                    //results.stream.pipe(fs.createWriteStream(path.join(__dirname, "resume.pdf")))
                    result.stream.pipe(fs.createWriteStream(path.join(__dirname, "resume2.pdf")))

                    conversion.kill()
                    //open(path.join(process.cwd(), "resume2.pdf"))
                })
            }))
    })
}

init()
// inquirer.prompt(questions).then(ans =>{
//     console.log(ans)
// })
