const express = require("express")
const router = express.Router()
const ReviewableObject = require("../../javascript/ReviewableObject")
function returnObjFromMap(map){
    return Object.fromEntries(map)
}
router.get("/:limit", async (req, res)=>{
    let limit = req.params.limit
    let topLPs = ReviewableObject.topLPs.all(limit)
    let topEPs = ReviewableObject.topEPs.all(limit)
    let topSingles = ReviewableObject.topSingles.all(limit)
    let returnObj = {
        "lps": topLPs,
        "eps": topEPs,
        "singles": topSingles
    }
    res.send(returnObj)
})
module.export = router