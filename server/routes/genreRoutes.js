const express = require("express")
const router = express.Router()
const ReviewableObject = require("../../javascript/ReviewableObject")
function returnObjFromMap(map){
    return Object.fromEntries(map)
}
router.get("/:genre", async (req, res)=>{
    let genre = req.params.genre
    let genreLPs = ReviewableObject.getGenreLPs.all(genre)
    let genreEPs = ReviewableObject.getGenreEPs.all(genre)
    let genreSingles = ReviewableObject.getGenreSingles.all(genre)
    let returnObj = {
        "lps": genreLPs,
        "eps": genreEPs,
        "singles": genreSingles
    }
    res.send(returnObj)
})
router.get("/:genre/:limit", async (req, res)=>{
    let genre = req.params.genre
    let limit = req.params.limit
    let lps = ReviewableObject.topLPsFromGenre.all(genre, limit)
    let eps = ReviewableObject.topEPsFromGenre.all(genre, limit)
    let singles = ReviewableObject.topSinglesFromGenre.all(genre, limit)
    let returnObj = {
        "lps": lps,
        "eps": eps,
        "singles": singles
    }
    res.send(returnObj)
})
module.exports = router