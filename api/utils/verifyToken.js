import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies['access-token'];
    if(!token) {
        return res.status(401).send({message: "Access Denied"});
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        return res.status(400).send({message: "Invalid Token"});
    }

}

export const verifyUser = (req, res, next) => {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).send({message: "Unauthorized"});
        }

    }
    );
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req,res,() => {
        if(req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).send({message: "Unauthorized"});
        }

    }
    );
}