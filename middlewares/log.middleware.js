module.exports = (req, res, next) =>{
    console.log(`Path; ${req.path}`)
    console.log(`Ip; ${req.ip}`)
    console.log(`Time`, new Date())
    next()
}