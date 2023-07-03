const axios = require('axios')
const customError = require('../errors')
const { StatusCodes } = require('http-status-codes');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API-KEY);


const getTopStories = async (req,res) => {
    try{
        newsapi.v2.topHeadlines({
            language: 'en',
            country: 'ng'
          }).then(response => {
            res.status(StatusCodes.OK).json(response)
          })
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

const getNewsByCategory = async (req,res) => {
    const {category} = req.params
    try{
        const newsItems  = await axios.get(`${process.env.NEWSBASEURL}?
        access_key=${process.env.API_KEY}
        &countries=ng
        &limit=20
        &offset=0
        &sources=${category}
        `)
        res.status(StatusCodes.OK).json(newsItems)
    }
    catch(err){
        throw new customError.BadRequestError(err)
    }
}

module.exports = {getTopStories,getNewsByCategory}