var express = require("express");
var router = express.Router();

router.post("/", async (req, res, next) => {
    res.json({
        logout: 'logout',
    })
})



module.exports = router;