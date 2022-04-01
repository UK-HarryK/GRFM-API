const express = require("express")
const app = express()
const port = 3000
const ReviewableObject = require("../javascript/ReviewableObject")
const lpRoutes = require("./routes/lpRoutes")
const epRoutes = require("./routes/epRoutes")
const singlesRoutes = require("./routes/singlesRoutes")
const genreRoutes = require("./routes/genreRoutes")
const chartRoutes = require("./routes/chartRoutes")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/lps", lpRoutes)
app.use("/eps", epRoutes)
app.use("/singles", singlesRoutes)
app.use("/charts", chartRoutes)
app.use("/genres", genreRoutes)
app.listen(port, async ()=>{
    ReviewableObject.bootup()
})
