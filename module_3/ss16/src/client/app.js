const socket = io('http://localhost:3000')
let questions = [];

function submitQuestion(id) {
    // e.preventDefault();
    const choice = document.querySelector('input[name="choice"]:checked').value;
    socket.emit('choice', {choice: choice, id: id});
    for (let index in questions) {
        if (questions[index].id == id) {
            for (let temp of questions[index].choices) {
                console.log(temp)
                if (temp.value.toLowerCase() == choice) {
                    temp.votes = ++temp.votes;
                    console.log(temp)
                }
            }
        }
    }
    $('#answer').empty();
    questions.forEach(function (task) {
        insertQuestion(task);
    });
}

$(function(){
    $('#joinRoom').click( function() {
        var nameRoom = $('#nameRoom').val();
        socket.emit('joinRoom', nameRoom);
    });
});

socket.on('list-question', function (temp) {
    $('#answer').empty();
    if(temp.length === 0) {
        $('#answer').append(`  
            <h1>Không có câu hỏi trong room</h1>
        `);
    }else {
        questions = temp;
        questions.forEach(function (question) {
            insertQuestion(question);
        });
    }

});

function insertQuestion(data) {
    $('#answer').append(`  
            <h1>${data.topic}?</h1>
            <input type="radio" name="choice" value="yes">${data.choices[0].value} . Amount: ${data.choices[0].votes} <br>
            <input type="radio" name="choice" value="no">${data.choices[1].value}. Amount: ${data.choices[1].votes} <br>
            <input type="radio" name="choice" value="perhaps">I really don't care. Amount: ${data.choices[2].votes} <br> 
            <button onclick="submitQuestion(${data.id})" class="btn btn-primary">Confirm</button>
        `);
}
