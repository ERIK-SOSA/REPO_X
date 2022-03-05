const express = require('express');
const jwt = require('jwt-simple');
const UserService = require('../services/activate-user');

function userApi(app) {
    const router = express.Router();
    app.use("/api/activate-user", router);
    console.log('Hola mundo');

    const userService = new UserService();
    console.log();

    router.put("/", async function (req, res, next) {
        const { body: user } = req;
        const { app: app, baseUrl: baseUrl } = req;
        const { complete: complete, cookies: cookies } = req;
        try {
            console.log('Hola mundo');
            const usr = await userService.getUser(user.id);
            if (usr) {
                const decoded = jwt.decode(usr.token, 'dog');
                console.log('Hola mundo');
                if (decoded.exp && decoded.sub === user.tk) {
                    usr.status = true;
                    const updateUsr = await userService.updateUser(usr, usr._id);
                    res.status(200).json({
                        data: updateUsr,
                        data1: {data: updateUsr, decoded: decoded},
                        example: updateUsr,
                        message: 'user selected successfully'
                    });
                }
                console.log('Hola mundo');
            }
        } catch (err) {
            next(err);
        }
        console.log('Hola mundo');
    });

}


module.exports = userApi;
