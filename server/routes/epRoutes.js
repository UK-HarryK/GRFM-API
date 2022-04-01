const express = require("express")
const router = express.Router()
const ReviewableObject = require("../../javascript/ReviewableObject")
function returnObjFromMap(map){
    return Object.fromEntries(map)
}
router.get("/", async (req, res)=>{
    let returnObj = returnObjFromMap(ReviewableObject.allEPs)
    res.send(returnObj)
})
router.post("/", async (req, res)=>{
    let { title, artist, releaseDate, description, artURL, genre, spotifyLink } = req.body
    new ReviewableObject(title, artist, releaseDate, description, artURL, genre, "ep", spotifyLink, 0, 0, true)
    res.sendStatus(201)
})
router.get("/:id", async (req, res)=>{
    let id = Number(req.params.id)
    let returnObj = ReviewableObject.allEPs.get(id)
    res.send(returnObj)
})
router.get("/genre/:genre", async (req, res)=>{
    let genre = req.params.genre
    let allEPsGenre = ReviewableObject.getGenreLPs.all(genre)
    res.send(allEPsGenre)
})
router.post("/:id/submitReview", async (req, res)=>{
    let id = Number(req.params.id)
    let { user, score, comment } = req.body
    let obj = ReviewableObject.allEPs.get(id)
    obj.addReview(Number(score), comment, user)
    res.sendStatus(200)
})
router.get("/:id/reviews", async (req, res)=>{
    let id = Number(req.params.id)
    let allReviews = ReviewableObject.getOneEpReviews.all(id)
    res.send(allReviews)
})
module.exports = router