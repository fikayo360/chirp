const axios = require('axios')
const customError = require('../errors')
const { StatusCodes } = require('http-status-codes');
// install and import node js newsapi package


const getTopStories = async (req,res) => {
    try{
        const topStories = await axios.get(`${process.env.NEWSBASEURL}?
        country=ng
        &apiKey=${process.env.News_API_KEY}
        &limit=20
        &offset=0`
        )
        res.status(StatusCodes.OK).json(topStories)
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