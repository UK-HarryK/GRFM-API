const express = require("express")
const router = express.Router()
const ReviewableObject = require("../../javascript/ReviewableObject")
function returnObjFromMap(map){
    return Object.fromEntries(map)
}
router.get("/", async (req, res)=>{
    let returnObj = returnObjFromMap(ReviewableObject.allLPs)
    res.send(returnObj)
})
router.get("/:id", async (req, res)=>{
    let id = Number(req.params.id)
    let returnObj = ReviewableObject.allLPs.get(id)
    res.send(returnObj)
})
router.get("/:genre", async (req, res)=>{
    let genre = req.params.genre
    let allLPsGenre = ReviewableObject.getGenreLPs.all(genre)
    res.send(allLPsGenre)
})
router.post("/:id/submitReview", async (req, res)=>{
    let id = Number(req.params.id)
    let { user, rating, comment } = req.body
    let obj = ReviewableObject.allLPs.get(id)
    obj.addReview(user, rating, comment)
    res.sendStatus(200)
})
router.get("/:id/reviews", async (req, res)=>{
    let id = Number(req.params.id)
    let allReviews = ReviewableObject.getOneLpReviews.all(id)
    res.send(allReviews)
})
