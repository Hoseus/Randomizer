var express = require('express');
var commonModels = require('../model/CommonModels');
var service = require('../service/QuestionService');
var router = express.Router();

/* GET users listing. */
router.get("/random", function(req, res) {
    mysqlClient.query("SELECT * FROM QUESTION", function (err, result) {
        if (err) throw err;

        var alreadyUsedIds = result.map(function(element) {
            return element.question_id;
        });

        var alreadyUsedDates = result.map(function(element) {
            var dayAndMonth = commonModels.dayAndMonth();
            dayAndMonth.day = element.question_day;
            dayAndMonth.month = element.question_month;
            return dayAndMonth;
        });

        var question = service.getRandomQuestion(alreadyUsedIds, alreadyUsedDates);

        res.status(200).send(question);
    });
});

router.post("", function(req, res) {
    mysqlClient.query(
        "INSERT INTO QUESTION (question_id, question_day, question_month)" +
        "VALUES ( " + req.body.id + ", " + req.body.day + ", " + req.body.month + " )",
        function (err, result) {
            if (err) throw err;

            res.status(200).send("OK");
        }
    );
});

module.exports = router;
