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
