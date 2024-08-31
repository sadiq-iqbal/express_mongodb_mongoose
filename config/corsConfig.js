const whiteList = ["http://localhost:3000", "https://www.google.com", "https://chatgpt.com"];
const options = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}

module.exports = options