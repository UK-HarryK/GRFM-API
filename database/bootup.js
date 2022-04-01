const db = require("better-sqlite3")("database.db")
// NOTE: realtiveID is rowid of LP/EP/S review is on, for display purposes, prefix rowid with LP/EP/S, but behind the curtain, just the integer value is used
//NOTE: need to add foreign key for relativeID
db.prepare("CREATE TABLE IF NOT EXISTS lps (rowid INTEGER PRIMARY KEY, title TEXT, artist TEXT, releaseDate TEXT, description TEXT, artURL TEXT, genre TEXT, spotifyLink TEXT, avgScore INTEGER, numReviews INTEGER)").run()
db.prepare("CREATE TABLE IF NOT EXISTS lpsR (user TEXT, score INTEGER, commentStr TEXT, relativeID INTEGER, FOREIGN KEY (relativeID) REFERENCES lps (rowid))").run()
db.prepare("CREATE TABLE IF NOT EXISTS eps (rowid INTEGER PRIMARY KEY, title TEXT, artist TEXT, releaseDate TEXT, description TEXT, artURL TEXT, genre TEXT, spotifyLink TEXT, avgScore INTEGER, numReviews INTEGER)").run()
db.prepare("CREATE TABLE IF NOT EXISTS epsR (user TEXT, score INTEGER, commentStr TEXT, relativeID INTEGER, FOREIGN KEY (relativeID) REFERENCES eps (rowid))").run()
db.prepare("CREATE TABLE IF NOT EXISTS singles (rowid INTEGER PRIMARY KEY, title TEXT, artist TEXT, releaseDate TEXT, description TEXT, artURL TEXT, genre TEXT, spotifyLink TEXT, avgScore INTEGER, numReviews INTEGER)").run()
db.prepare("CREATE TABLE IF NOT EXISTS singlesR (user TEXT, score INTGER, commentStr TEXT, relativeID INTEGER, FOREIGN KEY (relativeID) REFERENCES singles (rowid))").run()

