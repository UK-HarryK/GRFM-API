//NOTE: WE STILL DO NOT HAVE A BOOTUP FUNCTION
module.exports = class ReviewableObject{
    static db = require("better-sqlite3")("database.db")

    static allLPs = new Map()
    static allEPs = new Map()
    static allSingles = new Map()

    static bootup = function(){
        AllLPsOnDB = ReviewableObject.db.prepare("SELECT * FROM lps;").all()
        AllEPsOnDB = ReviewableObject.db.prepare("SELECT * FROM eps;").all()
        AllSinglesOnDB = ReviewableObject.db.prepare("SELECT * FROM singles;").all()
        for(let x of AllLPsOnDB){
            new ReviewableObject(x.title, x.artist, x.releaseDate, x.description, x.artURL, x.genre, "lp")
        }
        for(let x of AllEPsOnDB){
            new ReviewableObject(x.title, x.artist, x.releaseDate, x.description, x.artURL, x.genre, "ep")
        }
        for(let x of AllSinglesOnDB){
            new ReviewableObject(x.title, x.artist, x.releaseDate, x.description, x.artURL, x.genre, "single")
        }
    }
    static topLPs = ReviewableObject.db.prepare("SELECT * FROM lps WHERE avgReview > 4 LIMIT ? DESC;")
    static topEPs = ReviewableObject.db.prepare("SELECT * FROM eps WHERE avgReview > 4 LIMIT ? DESC;")
    static topSingles = ReviewableObject.db.prepare("SELECT * FROM singles WHERE avgReview > 4 LIMIT ? DESC;")

    static getGenreLPs = ReviewableObject.db.prepare("SELECT * FROM lps WHERE genre = ?;")
    static getGenreEPs = ReviewableObject.db.prepare("SELECT * FROM eps WHERE genre = ?;")
    static getGenreSingles = ReviewableObject.db.prepare("SELECT * FROM singles WHERE genre = ?;")

    static topLPsFromGenre = ReviewableObject.db.prepare("SELECT * from lps WHERE genre = ? AND avgReviews > 4 LIMIT ?;")
    static topEPsFromGenre = ReviewableObject.db.prepare("SELECT * from eps WHERE genre = ? AND avgReviews > 4 LIMIT ?;")
    static topSinglesFromGenre = ReviewableObject.db.prepare("SELECT * from singles WHERE genre = ? AND avgReviews > 4 LIMIT ?;")

    static getAllLpReviews = ReviewableObject.db.prepare("SELECT * FROM lpsR;")
    static getAllEpReviews = ReviewableObject.db.prepare("SELECT * FROM epsR;")
    static getAllSingleReviews = ReviewableObject.db.prepare("SELECT * FROM singlesR;")

    static getOneLpReviews = ReviewableObject.db.prepare("SELECT * FROM lpsR WHERE rowid = ?;")
    static getOneEpReviews = ReviewableObject.db.prepare("SELECT * FROM epsR WHERE rowid = ?;")
    static getOneSingleReviews = ReviewableObject.db.prepare("SELECT * FROM singlesR WHERE rowid = ?;")
    
    static lpGetID = ReviewableObject.db.prepare("SELECT rowid FROM lps WHERE artist = ? AND title = ? AND releaseDate = ?;")
    static epGetID = ReviewableObject.db.prepare("SELECT rowid FROM eps WHERE artist = ? AND title = ? AND releaseDate = ?;")
    static singlesGetID = ReviewableObject.db.prepare("SELECT rowid FROM singles WHERE artist = ? AND title = ? AND releaseDate = ?;")
    
    static insertLP = ReviewableObject.db.prepare("INSERT OR IGNORE INTO lps (title, artist, releaseDate, description, artURL, genre, spotifyLink, avgScore, numReviews) VALUES (?, ?, ?, ?, ?, ?);")
    static insertEP = ReviewableObject.db.prepare("INSERT OR IGNORE INTO eps (title, artist, releaseDate, description, artURL, genre, spotifyLink, avgScore, numReviews) VALUES (?, ?, ?, ?, ?, ?);")
    static insertSingle = ReviewableObject.db.prepare("INSERT OR IGNORE INTO singles (title, artist, releaseDate, description, artURL, genre, spotifyLink, avgScore, numReviews) VALUES (?, ?, ?, ?, ?, ?);")
    
    static insertLpReview = ReviewableObject.db.prepare("INSERT OR IGNORE INTO lpsR (user, score, commentStr, relativeID) VALUES (?, ?, ?, ?);")
    static insertEpReview = ReviewableObject.db.prepare("INSERT OR IGNORE INTO epsR (user, score, commentStr, relativeID) VALUES (?, ?, ?, ?);")
    static insertSinglesReview = ReviewableObject.db.prepare("INSERT OR IGNORE INTO singlesR (user, score, commentStr, relativeID) VALUES (?, ?, ?, ?);")
    
    static updateLP = ReviewableObject.db.prepare("UPDATE lps SET avgScore = ?, numReviews = ? WHERE rowid = ?;")
    static updateEP = ReviewableObject.db.prepare("UPDATE eps SET avgScore = ?, numReviews = ? WHERE rowid = ?;")
    static updateSingles = ReviewableObject.db.prepare("UPDATE singles SET avgScore = ?, numReviews = ? WHERE rowid = ?;")
    
    constructor(title, artist, releaseDate, description, artURL, genre, type){
        this.title = title
        this.artist = artist
        this.releaseDate = releaseDate
        this.genre = genre
        this.numReviews = 0
        this.avgScore = 0
        this.description = description
        this.artURL = artURL
        this.type = type

        switch (this.type){
            case "lp":
                ReviewableObject.insertLP.run(this.title, this.artist, this.releaseDate, this.description, this.artURL, this.genre, this.avgScore, this.numReviews)
                this.dbID = ReviewableObject.lpGetID.run(this.artist, this.title, this.releaseDate)
                ReviewableObject.allLPs.set(this.dbID, this)
                break
            case "ep":
                ReviewableObject.insertEP.run(this.title, this.artist, this.releaseDate, this.description, this.artURL, this.genre, this.avgScore, this.numReviews)
                this.dbID = ReviewableObject.epGetID.run(this.artist, this.title, this.releaseDate)
                ReviewableObject.allEPs.set(this.dbID, this)
                break
            case "single":
                ReviewableObject.insertSingle.run(this.title, this.artist, this.releaseDate, this.description, this.artURL, this.genre, this.avgScore, this.numReviews)
                this.dbID = ReviewableObject.singlesGetID.run(this.artist, this.title, this.releaseDate)
                ReviewableObject.allSingles.set(this.dbID, this)
                break 
            }
    }

    async addReview(score, comment, user){
        this.numReviews++
        this.avgScore = (score + this.avgScore) / this.numReviews
        switch (this.type){
            case "lp":
                ReviewableObject.insertLpReview.run(user, score, comment, this.dbID)
                ReviewableObject.updateLP(this.avgScore, this.numReviews, this.dbID)
                break
            case "ep":
                ReviewableObject.insertEpReview.run(user, score, comment, this.dbID)
                ReviewableObject.updateEP(this.avgScore, this.numReviews, this.dbID)
                break
            case "single":
                ReviewableObject.insertSinglesReview.run(user, score, comment, this.dbID)
                ReviewableObject.updateSingles(this.avgScore, this.numReviews, this.dbID)
                break
        }
    }
}