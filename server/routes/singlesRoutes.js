const express = require("express")
const router = express.Router()
const ReviewableObject = require("../../javascript/ReviewableObject")
function returnObjFromMap(map){
    return Object.fromEntries(map)
}
router.get("/", async (req, res)=>{
    let returnObj = returnObjFromMap(ReviewableObject.allSingles)
    res.send(returnObj)
})
router.post("/", async (req, res)=>{
    let { title, artist, releaseDate, description, artURL, genre, spotifyLink } = req.body
    new ReviewableObject(title, artist, releaseDate, description, artURL, genre, "single", spotifyLink, 0, 0)
    res.sendStatus(201)
})
router.get("/:id", async (req, res)=>{
    let id = Number(req.params.id)
    let returnObj = ReviewableObject.allSingles.get(id)
    res.send(returnObj)
})
router.get("/:genre", async (req, res)=>{
    let genre = req.params.genre
    let allLPsGenre = ReviewableObject.getGenreSingles.all(genre)
    res.send(allLPsGenre)
})
router.post("/:id/submitReview", async (req, res)=>{
    let id = Number(req.params.id)
    let { user, rating, comment } = req.body
    let obj = ReviewableObject.allSingles.get(id)
    obj.addReview(user, rating, comment)
    res.sendStatus(200)
})
router.get("/:id/reviews", async (req, res)=>{
    let id = Number(req.params.id)
    let allReviews = ReviewableObject.getOneSingleReviews.all(id)
    res.send(allReviews)
})
module.exports = router