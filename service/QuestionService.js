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
        var possibleIds = _.range(1, 366);

        var remainingPossibleIds = possibleIds.filter(function (element) {
            return forbiddenValues.includes(element);
        });

        return _.shuffle(remainingPossibleIds)[_.random(remainingPossibleIds.length - 1)];
    },

    getRandomDayAndMonth: function(forbiddenValues) {
        var forbidenValuesAsDates = result.map(function(element) {
            return new Date(2018, element.month, element.day);
        });
        var randomDate = this.getRandomDate(forbidenValuesAsDates);

        return {day: randomDate.getDay(), month: randomDate.getMonth()};
    },

    getRandomDate: function(forbiddenValues) {
        var possibleDates = [];
        firstDate = new Date(2018, 1, 1);
        lastDate = new Date(2018, 12, 31);

        possibleDates.push(firstDate);
        while (firstDate < lastDate) {
            firstDate.setDate(firstDate.getDate() + 1);
            possibleDates.push(new Date(firstDate));
        }

        var remainingPossibleDates = possibleIds.filter(function (element) {
            return forbiddenValues.includes(element);
        });

        return _.shuffle(remainingPossibleDates)[_.random(remainingPossibleDates.length - 1)];
    }
};

module.exports = questionService;