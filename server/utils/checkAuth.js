import jwt from "jsonwebtoken"
export const checkAuth = (req, res, next) => {
    const token = req.cookies.access_token
    if(token){
        try {
            const decoded = jwt.verify(token, "ismayil")

            req.userId = decoded.id

            next()
        } catch (error) {
            return res.json({message: "No access!"})
        }
    }
    else{
        return res.json({message: "No access!"})
    }
}