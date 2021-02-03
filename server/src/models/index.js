// include all of your models here using CommonJS requires
const User = require("./User.js")
const Podcast = require("./Podcast.js")
const Genre = require('./Genre.js')
const Review = require('./Review.js')
const Vote = require('./Vote.js')

module.exports = { User, Podcast, Genre, Review, Vote }
