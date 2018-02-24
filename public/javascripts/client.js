$('#btnGetRandomQuestion').on('click', getRandomQuestion);
function getRandomQuestion(event) {
    event.preventDefault();

    $.getJSON('/question/random', function(data) {
        $('#questionId').text(data.id.toString().padStart(2, '0'));
        $('#questionDate').text(data.day.toString().padStart(2, '0') + "/" + data.month.toString().padStart(2, '0'));
    });
}

$('#btnSubmitRandomQuestion').on('click', saveRandomQuestion);
function saveRandomQuestion(event) {
    event.preventDefault();

    var request = {
        "id": $('#questionId').text(),
        "day": parseInt($('#questionDate').text().substring(0, 2)),
        "month": parseInt($('#questionDate').text().substring(3, 5))
    };

    saveQuestion(request)
}

$('#btnSubmitQuestion').on('click', saveCustomQuestion);
function saveCustomQuestion(event) {
    event.preventDefault();

    var request = {
        "id": $('#createQuestion fieldset input#inputQuestionId').val(),
        "day": parseInt($('#createQuestion fieldset input#inputDate').val().substring(0, 2)),
        "month": parseInt($('#createQuestion fieldset input#inputDate').val().substring(3, 5))
    };

    saveQuestion(request)
}

function saveQuestion(request) {
    $.ajax({
        type: "POST",
        data: request,
        url: '/question',
        dataType: 'JSON'
    }).done(function( response ) {

    });
}

$('#btnCancelRandomQuestion').on('click', clearRandomQuestionFields);
function clearRandomQuestionFields(event) {
    event.preventDefault();

    $('#questionId').text("");
    $('#questionDate').text("");
}

$('#btnCancelQuestion').on('click', clearCreateQuestionFields);
function clearCreateQuestionFields(event) {
    event.preventDefault();

    $('#createQuestion fieldset input#inputQuestionId').val("");
    $('#createQuestion fieldset input#inputDate').val("");
}