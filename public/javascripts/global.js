$('#btnRandomizeQuestion').on('click', randomizeQuestion);

function randomizeQuestion(event) {
    event.preventDefault();

    $.getJSON('/question/randomize', function(data) {
        $('#questionId').text(data.id.toString().padStart(2, '0'));
        $('#questionDate').text(data.day.toString().padStart(2, '0') + "/" + data.month.toString().padStart(2, '0'));
    });
}