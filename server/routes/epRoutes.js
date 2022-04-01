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
router.get("/:id", async (req, res)=>{
    let id = Number(req.params.id)
    let returnObj = ReviewableObject.allEPs.get(id)
    res.send(returnObj)
})
router.get("/:genre", async (req, res)=>{
    let genre = req.params.genre
    let allEPsGenre = ReviewableObject.getGenreLPs.all(genre)
    res.send(allEPsGenre)
})
router.post("/:id/submitReview", async (req, res)=>{
    let id = Number(req.params.id)
    let { user, rating, comment } = req.body
    let obj = ReviewableObject.allEPs.get(id)
    obj.addReview(user, rating, comment)
    res.sendStatus(200)
})
router.get("/:id/reviews", async (req, res)=>{
    let id = Number(req.params.id)
    let allReviews = ReviewableObject.getOneEpReviews.all(id)
    res.send(allReviews)
})