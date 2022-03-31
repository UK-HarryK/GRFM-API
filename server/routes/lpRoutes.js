const express = require("express")
const router = express.Router()
const ReviewableObject = require("../../javascript/ReviewableObject")
router.get("/", async (req, res)=>{
    //pretend helper function here
    res.send(ReviewableObject.allLPs)
})
router.get("/:id", async (req, res)=>{
    let id = Number(req.params.id)
    let returnObj = ReviewableObject.allLPs.get(id)
    res.send(returnObj)
})
router.get("/:genres", async (req, res)=>{

})
