const { validationResult} = require("express-validator")

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next() 
    } catch (error){
        res.status(403)
        res.send({errors: err.array() })
    }
}

module.exports = { validateResult }