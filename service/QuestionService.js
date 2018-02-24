var _ = require('underscore');
var commonModels = require('../model/CommonModels');
var questionModels = require('../model/QuestionModels');

questionService = {
    getRandomQuestion: function(forbiddenIds, forbidenDayAndMonths) {
        var randomQuestionId = this.getRandomQuestionId(forbiddenIds);
        var randomDayAndMonth = this.getRandomDayAndMonth(forbidenDayAndMonths);

        var question = questionModels.question();
        question.id  = randomQuestionId;
        question.day = randomDayAndMonth.day;
        question.month = randomDayAndMonth.month;

        return question;
    },

    getRandomQuestionId: function(forbiddenValues) {
        var possibleIds = _.range(1, 367);

        var remainingPossibleIds = possibleIds.filter(function (element) {
            return !forbiddenValues.includes(element);
        });

        var randomId = _.shuffle(remainingPossibleIds)[_.random(1, remainingPossibleIds.length - 1)];

        if(randomId) {
            return randomId;
        } else {
            //throw e
        }
    },

    getRandomDayAndMonth: function(forbiddenValues) {
        var forbidenValuesAsDates = forbiddenValues.map(function(element) {
            return new Date(2018, element.month, element.day);
        });
        var randomDate = this.getRandomDate(forbidenValuesAsDates);

        return {"day": randomDate.getDate(), "month": randomDate.getMonth() + 1}
    },

    getRandomDate: function(forbiddenValues) {
        var possibleDates = [];
        var firstDate = new Date(2018, 0, 1);
        var lastDate = new Date(2018, 12, 31);

        possibleDates.push(firstDate);
        while (firstDate < lastDate) {
            firstDate.setDate(firstDate.getDate() + 1);
            possibleDates.push(new Date(firstDate));
        }

        var remainingPossibleDates = possibleDates.filter(function (element) {
            return !forbiddenValues.includes(element);
        });

        var randomDate = _.shuffle(remainingPossibleDates)[_.random(1, remainingPossibleDates.length - 1)];

        if(randomDate) {
            return randomDate;
        } else {
            //throw e
        }
    }
};

module.exports = questionService;