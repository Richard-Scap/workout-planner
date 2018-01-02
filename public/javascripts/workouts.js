//********************global**************************

var t = 10; // designates current div (ex)
var p = 100; // designates current p (circuit)
var r = 0; // designates current span row (exName or rep)
var addCheckButtons = false;  // tells if addCheck boxes are up
var addCircuitOrFinishButtons = false; // tells if addCircuit and Finish buttons are up

//load initial input
$(document).ready(function () {
  $('body').append('<p class='+p+'></p>');
  $('p.'+p).append('<div class='+t+'></div>');
  $('div.'+t).append('<span class='+r+'></span></span>');
  $('span.'+r).append(create.newCircuitInput());
  document.body.querySelector('input').select();
});

var ChangeInstructions = function() {
  var makeP = document.createElement('p');
  makeP.style.fontSize = "small";
  makeP.innerHTML = "                    ";  //instructions will go here
  makeP.id = "instructions";
  var makeBr = document.createElement('br');
  document.body.insertAdjacentElement('afterend', makeP);
  document.body.insertAdjacentElement('afterend', makeBr);
};
ChangeInstructions();

//****************************************************

var workout = {
  circuit: [],

  addCircuit: function(exName) {
    this.circuit.push({
      ex: [], 
      sets: '',
      rest: '',
    });
    this.addEx(exName);
  },

  addEx: function(exName) {
    var circuit = workout.circuit;
    circuit[p/100 - 1].ex.push({ 
      exName: exName,
      reps: '',
      repsType: false,
    });
  },

  addReps: function(reps) {
    this.circuit[p/100 - 1].ex[r].reps = reps;
  },

  addRepsType: function(repsType) {
    this.circuit[p/100 - 1].ex[r].repsType = repsType;
  },

  addSets: function(sets) {
    this.circuit[p/100 - 1].sets = sets;
  },
 
  addRest: function(rest) {
    this.circuit[p/100 - 1].rest = rest; 
  },

  delete: function(circ, clickedRow) {
    this.circuit[circ / 100 -1].ex.splice(clickedRow, 1); 
  },
}; 

var create = {
  
  editFrame: function () {
    p = 100;
    $('body').html('');
    $('body').append('<h1>Create</h1>', '<h class="exercise">Exercise</h>', '<h class="reps">Reps</h>');
  },

  newCircuitInput: function() {
    var createInput = document.createElement('input');
    createInput.setAttribute("type", "text");
    createInput.id = 'circuitNameInput';
    createInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {        
        flow.flipCircuitNameInput(); 
      }
    });
    return createInput;
  }, 
  
  newRepsInput: function() {   
    var repsInput = document.createElement('input');
    repsInput.setAttribute('type', 'number');
    repsInput.id = 'repsInput';
    repsInput.value = 0;
    repsInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        flow.flipRepsInput();
      }
    });
    return repsInput; 
  }, 
  
  newExInput: function() {
    var createInput = document.createElement('input');   
    createInput.setAttribute("type", "text");
    createInput.id = 'exNameInput';
    createInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") { 
        flow.flipExNameInput();
      }
    });
    return createInput;
  },
  
  newSetsInput: function() {
    var getRow = document.getElementById(r);
    var createSetsInput = document.createElement('input');
    createSetsInput.setAttribute("type", "number"); //pop up reps input
    createSetsInput.id = 'setsInput';
    createSetsInput.value = 0;
    createSetsInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        flow.flipSetsInput();
      }
    });
    return createSetsInput;
  },

  newRestInput: function() {
    var restInput = document.createElement('input');
    restInput.setAttribute("type", "number"); //pop up reps input
    restInput.id = 'restInput';
    restInput.value = 0;
    restInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        flow.flipRestInput();
      }
    });
    return restInput;
  },

  addCircuitButton: function() {
    var createButton = document.createElement('img');
    createButton.setAttribute("src", "../images/plusSign.jpg")
    createButton.id = "newCircuitButton";
    createButton.addEventListener('mouseover', function (e) {                        
      e.target.style.cursor = "pointer";
      e.target.setAttribute("src", "../images/plusSignOn.jpg");
    });
    createButton.addEventListener('mouseout', function (e) {
      e.target.setAttribute("src", "../images/plusSign.jpg");   
    });
    createButton.addEventListener('click', function() {
      flow.flipAddCircuitButton();
      addCircuitOrFinishButtons = !addCircuitOrFinishButtons;      
    });
    return createButton;
  },

  addButton: function() {
    var createButton = document.createElement('img');
    createButton.setAttribute("src", "../images/plusSign.jpg")
    createButton.className = "addCheckButtonCombo";
    createButton.id = "addButton";
    createButton.addEventListener('mouseover', function (e) {                        
        e.target.style.cursor = "pointer";
        e.target.setAttribute("src", "../images/plusSignOn.jpg");
    });
    createButton.addEventListener('mouseout', function (e) {
        e.target.setAttribute("src", "../images/plusSign.jpg");   
    });
    createButton.addEventListener('click', function () {
      flow.flipAddButton();
    });
    return createButton;
  },
  
  checkButton: function() {
    var createButton = document.createElement('img');
    createButton.setAttribute("src", "../images/checkMark.jpg")
    createButton.className = "addCheckButtonCombo";
    createButton.addEventListener('mouseover', function (e) {                        
        e.target.style.cursor = "pointer";
        e.target.setAttribute("src", "../images/checkMarkOn.jpg");
    });
    createButton.addEventListener('mouseout', function (e) {
        e.target.setAttribute("src", "../images/checkMark.jpg");   
    });
    createButton.addEventListener('click', function () {
      flow.flipCheckButton();
    });
    return createButton;
  },

  dropdown: function() {
    var dropdown = document.createElement('select');
    dropdown.id = 'dropdown';
    var optionReps = document.createElement('option');
    var optionSeconds = document.createElement('option');
    optionReps.textContent = 'Repetitions';
    optionSeconds.textContent = 'Seconds';
    dropdown.appendChild(optionReps);
    dropdown.appendChild(optionSeconds);
    return dropdown;
  },
  
  deleteButton: function(r) {
    var createButton = document.createElement('img');
    createButton.setAttribute("src", "../images/x.jpg");
    createButton.className = r;
    createButton.id = 'deleteButton';
    createButton.addEventListener('mouseover', function (e) {                        
      e.target.style.cursor = "pointer";
      e.target.setAttribute("src", "../images/xOn.jpg");
    });
    createButton.addEventListener('mouseout', function (e) {
        e.target.setAttribute("src", "../images/x.jpg");   
    });
    return createButton;
  },
  
  deleteCircuitButton: function (r) {
    var button = document.createElement('span')
    button.id = 'deleteCircuitButton';
    button.innerHTML = '';
    return button; 
  },

  finishButton: function() {
    var finishButton = document.createElement('img');
    finishButton.setAttribute("src", "../images/finish.jpg");
    var finishButton = document.createElement('span');
    finishButton.innerHTML = 'Finish';
    finishButton.id = "finishButton";
    finishButton.addEventListener('mouseover', function (e) {                        
      e.target.style.cursor = "pointer";
      e.target.style.color = "rgb(56, 147, 174)";
    });
    finishButton.addEventListener('mouseout', function (e) {
      e.target.style.color = "black";
    });
    finishButton.addEventListener('click', function () {
      document.body.innerHTML = '';
      var reviewPage = window.open("", "_self", "", false);
      reviewPage.document.write("<h1>Review<h1>");
      review.setUp();
      review.populate(); 
    });
    return finishButton;
  },  

  changeExInput: function (clickedPClass, clickedDivClass, clickedSpanClass) {
    var input = document.createElement('input');
    input.id = 'changeExInput';
    // $('input#changeExInput').keyup(function (event) {
      input.addEventListener('keyup', function (event) {
      if (event.key === "Enter") { 
        workout.circuit[clickedPClass/100 - 1].ex[clickedSpanClass].exName = $('input').val();           
        $('input').remove();
        $('#addCheckSpan').html(workout.circuit[clickedPClass/100 - 1].ex[clickedSpanClass].exName);
        $('#addCheckSpan').addClass(''+ clickedSpanClass);    
        $('#addCheckSpan').attr('id', 'flippedEx');
        //Pop reps input and dropdown
        $('div.'+clickedDivClass).append('<span class='+clickedSpanClass+'></span>');
        $('span.'+clickedSpanClass+':last').append(create.changeRepsInput(clickedPClass, clickedDivClass, clickedSpanClass));
        document.body.querySelector('input').select();
        $('span.'+clickedSpanClass+':last').append(create.dropdown());      
      }
    });
    return input;
  },

  changeRepsInput: function (clickedPClass, clickedDivClass, clickedSpanClass) {
    var input = document.createElement('input');
    input.id = 'repsInput';
    input.addEventListener('keyup', function () {
      if (event.key === "Enter") {
        //change in array    
        workout.circuit[clickedPClass/100 - 1].ex[clickedSpanClass].reps = $('input').val();
        workout.circuit[clickedPClass/100 - 1].ex[clickedSpanClass].repsType = $('#dropdown').val();
        $('input').remove();
        //Flip input into text. If seconds / else repetitions
        if ($('select').val() === 'Seconds') {
          $('span.'+clickedSpanClass+':last').html(workout.circuit[clickedPClass/100 - 1].ex[clickedSpanClass].reps + ' s');
        } else {
        $('span.'+clickedSpanClass+':last').html('x' + workout.circuit[clickedPClass/100 - 1].ex[clickedSpanClass].reps);}
        $('span.'+clickedSpanClass+':last').attr('id', 'flippedReps');
        $('select').remove();
        $('div.'+clickedDivClass+':last').append(create.deleteButton(clickedSpanClass));
        if (addCheckButtons === true) {
          $('.'+p).append('<div id="addCheckDiv"></div>')
          $('#addCheckDiv').append('<span id="addCheckSpan"></span>')
          $('#addCheckSpan').append(create.addButton());
          $('#addCheckSpan').append(create.checkButton());
        }
        //creates one time event listener to use enter key on window. pulls up nexExInput
        // setTimeout(function() {
        //   tools.enableEnterKeyAdd(window, "keyup", function(event) {
        //     if (event.key === "Enter") {
        //     if (addCheckButtons === true) {
        //       flow.flipAddButton();}}}
        //   );}, 100);
      }
    });
    return input;
  },

  changeSetsInput: function (currentPId) {
    var input = document.createElement('input');
    input.id = 'setsInput';
    input.setAttribute('type', 'number');
    input.addEventListener('keyup', function (event) {
      if (event.key === "Enter") { 
      workout.circuit[currentPId / 100 - 1].sets = document.body.querySelector('input').valueAsNumber;
      $('input').remove();
      $('#'+currentPId+'.flippedSets').html('x' + workout.circuit[currentPId / 100 - 1].sets);
      }  
    });
    return input;
  },

  changeRestInput: function (currentPId) {
    var input = document.createElement('input');
    input.id = 'changeRepsInput';
    input.setAttribute('type', 'number');
    input.addEventListener('keyup', function (event) {
      if (event.key === "Enter") { 
      workout.circuit[currentPId / 100 - 1].rest = document.body.querySelector('input').valueAsNumber;
      $('input').remove();
      $('#'+currentPId+'.flippedRest').html('' + workout.circuit[currentPId / 100 - 1].rest + ' seconds rest');
      }  
    });
  
    return input;
  },
  
};

var tools = {
  
  // enableEnterKeyAdd: function(target, type, listener) {
  //   target.addEventListener(type, function fn(event) { // for enter key to add newExInput
  //     if ($('input').length === 0 && event.key === "Enter") {
  //     target.removeEventListener(type, fn);
  //     listener(event);
  //     }
  //   }); 
  // },
  
  // enableEnterKeyAddC: function(target, type, listener) {
  //   target.addEventListener(type, function fn(event) { // for enter key to add newExInput
  //     if ($('input').length === 0) {
  //     if (addCircuitOrFinishButtons === true) {
  //       target.removeEventListener(type, fn);
  //       listener(event);
  //     }
  //     }
  //   });
  // }, 
  
  setUpChangeDeleteListeners: function() {
  //mouseovers
    document.body.addEventListener('mouseover', function(e) {
      if($('input').length === 0) {        
        if (e.target.id === 'flippedEx' || e.target.id === 'flippedReps' || e.target.id === 'deleteButton') {
          e.target.parentNode.style.fontWeight = 'bold';
          e.target.parentNode.style.backgroundColor = 'rgb(56, 147, 174)';
          e.target.style.cursor = 'pointer';
          e.target.parentNode.childNodes[2].id = 'visibleDeleteButton';
        }
      }
    });
    document.body.addEventListener('mouseout', function(e) {
      if($('input').length === 0) {
        if (e.target.tagName === 'SPAN' || e.target.id === 'visibleDeleteButton') {
          e.target.parentNode.style.color = "black";
          e.target.parentNode.style.backgroundColor = 'white';
          e.target.parentNode.style.fontWeight = 'normal';
          e.target.parentNode.childNodes[2].id = 'deleteButton'; 
        }
      }
    });    
    document.body.addEventListener('mouseover', function(e) {
      if($('input').length === 0) {
        if(e.target.className === "flippedSets" || e.target.className === "flippedRest") {
          e.target.style.fontWeight = 'bold';
          e.target.style.color = "rgb(56, 147, 174)";          
          e.target.style.cursor = 'pointer';
      }
    }
    });    
      document.body.addEventListener('mouseout', function(e) {
        if($('input').length === 0) {
          if(e.target.className === "flippedSets" || e.target.className === "flippedRest") {
            e.target.style.color = "black";
            e.target.style.fontWeight = 'normal';
        }
      }
    });    

     
     
  //  delete button listener 
    document.body.addEventListener('click', function(e) { 
      if (e.target.id === 'visibleDeleteButton') {
        workout.delete($(event.target).parent().parent().attr('class'), $(event.target).attr('class'));
        $('body').html('');        
        create.editFrame();

        //rebuild circuits/ex
        for (var i = 0; i < workout.circuit.length; i++) {
          r = 0;
          t = 10;
          $('body').append('<p class='+p+'></p>');
          for(var y = 0; y < workout.circuit[i].ex.length; y++) {
            $('p.'+p).append('<div class='+t+'></div>');
            $('div.'+t).append('<span id="flippedEx" class='+r+'></span>');
            $('span#flippedEx:last').html(workout.circuit[p/100 - 1].ex[r].exName);
            $('div.'+t).append('<span id="flippedReps" class='+r+'></span>');
            if(workout.circuit[p/100 - 1].ex[r].repsType === 'Seconds') {
              $('span#flippedReps:last').html(workout.circuit[p/100 -1].ex[r].reps + ' sec');
            } else {
              $('span#flippedReps:last').html('x' + workout.circuit[p/100 -1].ex[r].reps);
            }  
            $('div.'+t).append(create.deleteButton());
            t = t + 10;
            r++;                        
          }
          if (typeof workout.circuit[i].sets === 'number') {
            $('p.'+p).append('<div class="setsRestDiv"><span class="flippedSets"></span></div>')
            $('span.flippedSets:last').html('x' + workout.circuit[p/100 -1].sets);
          }
          if (typeof workout.circuit[i].rest === 'number') {
            $('div.setsRestDiv:last').append('<span class="flippedRest"></span>');
            $('span.flippedRest:last').append(workout.circuit[i].rest + ' seconds rest');
            p = p + 100;        
          }
        } 
        //end circuit rebuild loop
        //if addcheckcombo is up, keep it up after loop
        if (addCheckButtons === true) {
          $('p.'+p).append('<div id="addCheckDiv"><span id="addCheckSpan"></span></div>')
          $('#addCheckSpan:last').append(create.addButton(), create.checkButton());
        }
        if (addCircuitOrFinishButtons === true) {
          p = p + 100; 
          r = 0;
          $('body').append('<p class='+p+'><div class='+t+'><span class='+r+'></span></div></p>')
          $('span.'+r+':last').append(create.addCircuitButton());
          addCircuitOrFinishButtons = !addCircuitOrFinishButtons;
        }
        
      }
    });

  // change exName/reps listener
    document.body.addEventListener('click', function(e) {
      if($('input').length === 0) {                
        if (e.target.id === 'flippedEx' || e.target.id === 'flippedReps') {          
          //when row is clicked, clear content and add exName input
          var clickedDivClass = $(e.target).parent().attr('class');
          var clickedSpanClass = $(e.target).attr('class');
          var clickedPClass = $(e.target).parent().parent().attr('class');
          $('.'+clickedDivClass).html('');
          //pop changeExInput
          $('.'+clickedDivClass).append('<span id="addCheckSpan"></span>')
          $('#addCheckSpan').append(create.changeExInput(clickedPClass, clickedDivClass, clickedSpanClass));
          $('#addCheckSpan').attr('class', '' + $(e.target).attr('class'));
          document.body.querySelector('input').select();     
          //remove buttons while change is initiated
          if (addCheckButtons === true) {
            $('#addCheckDiv').remove();
          }
          if (addCircuitOrFinishButtons === true) {
            document.getElementById('newCircuitButton').remove();
            document.getElementById('finishButton').remove();
            addCircuitOrFinishButtons = !addCircuitOrFinishButtons;
          }
        }
      }
    });
  //sets ch listener
    document.body.addEventListener('click', function (e) {
      if($('input').length === 0) {                
        if (e.target.className === 'flippedSets') {
          $(e.target).html('Sets: ');
          $(e.target).append(create.changeSetsInput($(e.target).attr('id')));
          document.body.querySelector('input').select();
        }
      }  
    });
  //rest ch listener
    document.body.addEventListener('click', function (e) {
      if($('input').length === 0) {                
        if (e.target.className === 'flippedRest') {
          $(e.target).html('Rest: ');
          $(e.target).append(create.changeRestInput($(e.target).attr('id')));
          document.body.querySelector('input').select();
        }
      }  
    });
  
  },


};
tools.setUpChangeDeleteListeners();

var flow = {
  
  flipCircuitNameInput: function() {  
    //Add to array
    workout.addCircuit($('input').val());
    $('input').remove();
    //Flip input into text
    $('.'+r+':last').html(workout.circuit[p/100 - 1].ex[r].exName);
    $('.'+r+':last').attr('id', 'flippedEx');
    //Pop reps input and dropdown
    $('div.'+t+':last').append('<span class='+r+'></span>');
    $('span.'+r+':last').append(create.newRepsInput());
    document.body.querySelector('input').select();
    $('span.'+r+':last').append(create.dropdown());
  },  
  
  flipExNameInput: function() {   
    //Add to array, flip into text
    workout.addEx($('input').val());
    $('input').remove();
    $('#addCheckSpan').html(workout.circuit[p/100 - 1].ex[r].exName);
    $('#addCheckSpan').addClass(''+ r);    
    $('#addCheckSpan').attr('id', 'flippedEx');
    //Pop reps input
    $('div.'+t).append('<span class='+r+'></span>');
    $('span.'+r+':last').append(create.newRepsInput());
    document.body.querySelector('input').select();
    $('span.'+r+':last').append(create.dropdown());
  },  
  
  flipRepsInput: function() {     
    //Add to array    
    workout.addReps($('input').val());
    workout.addRepsType($('#dropdown').val());
    $('input').remove();
    //Flip input into text. If seconds / else repetitions
    if ($('select').val() === 'Seconds') {
      $('span.'+r+':last').html(workout.circuit[p/100 - 1].ex[r].reps + ' s');
    } else {
      $('span.'+r+':last').html('x' + workout.circuit[p/100 - 1].ex[r].reps);}
    $('span.'+r+':last').attr('id', 'flippedReps');
    $('select').remove();
    //pop delete buttons
    if ($('span.'+r+':last').attr('class') === 0) {
      $('div.'+t+':last').append(create.deleteCircuitButton());
    }
    $('div.'+t+':last').append(create.deleteButton());
    
    //pop add/check buttons in new div/span
    $('.'+p).append('<div id="addCheckDiv"></div>')
    $('#addCheckDiv').append('<span id="addCheckSpan"></span>')
    $('#addCheckSpan').append(create.addButton());
    $('#addCheckSpan').append(create.checkButton());
    addCheckButtons = !addCheckButtons;
    r++;
    // //creates one time event listener to use enter key on window. pulls up nexExInput
    // setTimeout(function() {
    //   tools.enableEnterKeyAdd(window, "keyup", function(event) {
    //     if (event.key === "Enter") {
    //     if (addCheckButtons === true) {
    //       flow.flipAddButton();}}}
    //   );}, 100);
  },
  
  flipAddButton: function () {    
    $('#addCheckSpan').html('');
    $('#addCheckSpan').addClass(''+r);
    t = t + 10;
    $('#addCheckDiv').addClass(''+t);
    $('#addCheckDiv').attr('id', 'exNameInput');
    $('#addCheckSpan').append(create.newExInput());
    document.querySelector('input').select();
    addCheckButtons = !addCheckButtons;
  },
  
  flipCheckButton: function () {
    $('#addCheckDiv').attr({
      class: 'setsRestDiv',
      id: p,
    });
    $('#addCheckSpan').attr({id: ''+p, class: 'setsSpan',});
    $('#'+p+'.setsSpan').html('Sets: ');
    $('.setsSpan').append(create.newSetsInput());
    document.querySelector('input').select();
    addCheckButtons = !addCheckButtons;
  },
  
  flipSetsInput: function() {
    //flip sets input
    workout.addSets(document.querySelector('input').valueAsNumber);
    $('input').remove();
    $('#'+p+'.setsSpan').html('x' + workout.circuit[p/100 - 1].sets);
    $('#'+p+'.setsSpan').attr('class', 'flippedSets');
    //pop sets span,input
    $('.setsRestDiv:last').append('<span id='+p+' class="restSpan">Rest:'+' '+'</span>')
    $('#'+p+'.restSpan').append(create.newRestInput());
    document.querySelector('input').select();
  },
  
  flipRestInput: function () {
    //add to array
    workout.addRest(document.querySelector('input').valueAsNumber);
    //flip input to text
    $('.restSpan').attr('class', 'flippedRest')
    $('input').remove()
    $('#'+p+'.flippedRest').html(workout.circuit[p/100 - 1].rest + ' seconds rest')
    //pop finish button
    var getInstructions = document.getElementById('instructions');
    getInstructions.insertAdjacentElement('afterend', create.finishButton());  
    //create new p with addcirc button, reset ex variable
    p = p + 100; 
    r = 0;
    t = t + 10;
    $('body').append('<p class='+p+'></p>'); 
    $('p.'+p).append('<div class='+t+'></div>');
    $('div.'+t).append('<span class='+r+'></span>'); 
    $('.'+r+':last').append(create.addCircuitButton());
    addCircuitOrFinishButtons = !addCircuitOrFinishButtons;
    //enable enter key to add circuit as well
    setTimeout(function() {
      tools.enableEnterKeyAddC(window, "keyup", function(event) {
        if (event.key === "Enter") {
            flow.flipAddCircuitButton();
            addCircuitOrFinishButtons = !addCircuitOrFinishButtons;          
        }
      })}, 100);
  },
  
  flipAddCircuitButton: function () { 
      $('#newCircuitButton').remove();
      $('#finishButton').remove();
      $('.'+r+':last').append(create.newCircuitInput());
      document.querySelector('input').select();
  },
};  




// review Page
c=-2// for auto populate (circuit);

var review = {
  
  createTable: function () {
    var table = document.createElement('table');
    c++
    table.id = '';
    return table;
  },
  
  createTbody: function () {
    var tbody = document.createElement('tbody');
    c++;
    tbody.id = '';
    return tbody;
  },
  
  createTr: function () {
    var tr = document.createElement('tr');
    tr.id = '';
    return tr;
  },
  
  createTd: function () {
    var td = document.createElement('td');
    td.id = '';
    return td;
  },
  
  createNameWorkoutInput: function () {
    var nameWorkoutInput = document.createElement('input');
    nameWorkoutInput.id = 'nameWorkoutInput';
    nameWorkoutInput.value= 'My Badass Workout 1';
    nameWorkoutInput.setAttribute('type', 'text');
    return nameWorkoutInput;
  },
  
  createSaveButton: function () {
    var saveButton = document.createElement('span');
    saveButton.id = 'saveButton';
    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', function () {review.save()});
    saveButton.addEventListener('mouseover', function () {
      saveButton.style.color = "rgb(56, 147, 174)";
      saveButton.style.cursor = "pointer";
    });
    saveButton.addEventListener('mouseout', function () {
      saveButton.style.color = "black";
    });
    return saveButton; 
  },
  
  createRunButton: function () {
    var runButton = document.createElement('span');
    runButton.id = 'runButton';
    runButton.innerHTML = 'Run';
    runButton.addEventListener('click', function () {c = 0; run.circuitDisplay()});
    runButton.addEventListener('mouseover', function () {
      runButton.style.color = "rgb(56, 147, 174)";
      runButton.style.cursor = "pointer";
    });
    runButton.addEventListener('mouseout', function () {
      runButton.style.color = "black";
    });
    return runButton;
  },
  createEditButton: function () {
    var editButton = document.createElement('span');
    editButton.id = 'editButton';
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', function () {review.returnToEditPage()});
    editButton.addEventListener('mouseover', function () {
      editButton.style.color = "rgb(56, 147, 174)";
      editButton.style.cursor = "pointer";
    });
    editButton.addEventListener('mouseout', function () {
      editButton.style.color = "black";
    });
    return editButton;
  },

   
  weightButton: function (e) {
    var weightPic = document.createElement('img');
    weightPic.setAttribute("src", "../images/pickWeight.jpg");
    weightPic.className = "weightPic";
    weightPic.id = e;
    weightPic.addEventListener('mouseover', function (e) {                        
      if(e.target.className === "weightPic" ) {
        e.target.style.cursor = "pointer";
        e.target.setAttribute("src", "../images/pickWeightOn.jpg");
        weightPic.setAttribute("alt", "Add Weight! (optional)");            
      }
    });
    weightPic.addEventListener('mouseout', function (e) {
      if(e.target.className === "weightPic" ) {
        e.target.setAttribute("src", "../images/pickWeight.jpg");   
      }         
    });
    weightPic.addEventListener('click', function (e) {
      var clickedTd = e.target.parentNode;
      clickedTd.innerHTML = '';
      weightInput = review.weightInput();
      weightInput.id = e.target.id;
      clickedTd.appendChild(weightInput);
      var lbs = document.createElement('span');
      lbs.innerHTML = ' lbs';
      clickedTd.appendChild(lbs);            
    });
    return weightPic;
  },

  weightInput: function () {
    var weightInput = document.createElement('input');
      weightInput.setAttribute("type", "number");
      weightInput.className = 'weightInput';
      // var enteredWeight = weightInput.valueAsNumber;      
      weightInput.addEventListener('keyup', function (e) {
        if (e.key === "Enter") {
          var currentInput = e.target;
          var currentTbody = e.target.parentNode.parentNode.parentNode;
          workout.circuit[currentTbody.id].ex[currentInput.id].weight = weightInput.valueAsNumber;
          var weight = weightInput.valueAsNumber;
          
          currentTd = e.target.parentNode;
          currentTd.innerHTML = weight + ' lbs';
        }
        
      });
    return weightInput;    
  },


  setUp: function () {
    document.head.innerHTML = "<link rel=\"stylesheet\" href=\"../stylesheets/style.css\">"
  },
  
  populate: function () {
    $('')
    var newTr = review.createTr(); 
    newTr.id = r;
   
    //create a table for every circuit stored 


    for (var c = 0; c < workout.circuit.length; c++) {

      $('body').append('<table><tbody id='+c+'></tbody></table>')
      c++;

    
    
      // var table = document.createElement('table');
      // c++
      // table.id = '';

      var newTable = document.createElement('table');
      newTable.className = "reviewTables";
      var newTBody = this.createTbody();
      newTBody.id = c;
      document.body.appendChild(newTable);
      newTable.appendChild(newTBody);
      
      var setsTd = document.createElement('td');
      setsTd.innerHTML = 'x' + workout.circuit[c].sets;
      setsTd.className = 'reviewSets';
      newTBody.appendChild(setsTd);                   // ch to newTBody
      var rSpan = workout.circuit[c].ex.length + 1;
      setsTd.setAttribute("rowspan", rSpan);
      
      //create a tr for every ex stored
      for(var e = 0; e < workout.circuit[c].ex.length; e++) {
          var tr = this.createTr();
          tr.id = e; 
          newTBody.appendChild(tr);                 

          var exName = this.createTd();
          exName.className = 'reviewExName';
          exName.innerHTML = '     ' + workout.circuit[c].ex[e].exName;
          tr.appendChild(exName); 
  
          var reps =  this.createTd();
          reps.className = 'reviewReps';
          if (workout.circuit[c].ex[e].repsType === 'Seconds') {
            reps.innerHTML = workout.circuit[c].ex[e].reps + ' s';
            tr.appendChild(reps);
          } else {
            reps.innerHTML = 'x' + workout.circuit[c].ex[e].reps;
            tr.appendChild(reps);            
          }

          var weight = this.createTd();
          weight.className = 'reviewWeight';
          tr.appendChild(weight);
          
          weight.appendChild(review.weightButton(e));

          if (e === 0) {
           var restTd = document.createElement('td');
            restTd.setAttribute("rowspan", rSpan);
            restTd.id = "restTd";
            restTd.innerHTML = workout.circuit[c].rest + ' s rest';
            tr.appendChild(restTd);
          }
      }
    } 

    var reviewBottom = document.createElement('span');
    
      reviewBottom.appendChild(this.createNameWorkoutInput());
      reviewBottom.appendChild(this.createSaveButton());
      reviewBottom.appendChild(this.createRunButton());
      reviewBottom.appendChild(this.createEditButton());
    document.body.appendChild(reviewBottom);

  },
 
  save: function () {
    console.log('workout saved');
  },

  returnToEditPage: function () {
    console.log('returned to edit page');

  },
};






//Run page ******************************************************
var s = 0;  //designates which set we are on during run mode

var run = {

  createSetsTracker: function () {
    var setsSpan = document.createElement('span');
    setsSpan.id = 'setsTracker';
    setsSpan.innerHTML = s + '/' + workout.circuit[c].sets;
    return setsSpan;
  },

  createTable: function () {
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    table.id = 'tableRun';
    return table;
  },

  createExTr: function () {
    var tr = document.createElement('tr');
    tr.id = e;
    return tr;
  },  

  createExNameTd: function () {
    var exNameTd = document.createElement('td');
    exNameTd.id = e;
    exNameTd.className = 'exNameTdRun';
    exNameTd.innerHTML = workout.circuit[c].ex[e].exName;
    return exNameTd;
  },

  createRepsTd: function () {
    var repsTd = document.createElement('td');
    repsTd.id = e;
    repsTd.className = 'repsTdRun';
    if (workout.circuit[c].ex[e].repsType === 'Seconds') {
      repsTd.innerHTML = workout.circuit[c].ex[e].reps + 'sec';
      } else {
      repsTd.innerHTML = 'x' + workout.circuit[c].ex[e].reps;  
      }
    return repsTd;
  },

  createWFeedback: function () {
    var upFeedback = document.createElement('button');
      upFeedback.innerHTML = '^';
    var downFeedback = document.createElement('button');
      downFeedback.innerHTML = '~'; 
    var feedbackSpan = document.createElement('span');
    feedbackSpan.appendChild(upFeedback);
    feedbackSpan.appendChild(downFeedback);
    return feedbackSpan;
  },

  createWeightTd: function () {
    var weightTd = document.createElement('td');
    weightTd.id = e;
    weightTd.className = 'weightTdRun';
    if (typeof workout.circuit[c].ex[e].weight === 'number') {
    weightTd.innerHTML = workout.circuit[c].ex[e].weight + ' lbs';
    } else {
    weightTd.innerHTML = '';
    }
    return weightTd;
  },

  nextButton: function () {
    var nextButton = document.createElement('button');
    nextButton.id = 'runNextButton';
    nextButton.innerHTML = 'NEXT';
    nextButton.addEventListener('click', function () {run.restTimer()}); 
    return nextButton;
  },
  
  previewRest: function () {
    var previewRest = document.createElement('div');
    previewRest.id = 'runPreview';
    previewRest.innerHTML = 'Up Next:  ' + workout.circuit[c].rest + 'seconds off';
    previewRest.appendChild (this.nextButton());
    return previewRest;
  },

  circuitDisplay: function () {
    document.body.id = 'runBody';
    document.body.innerHTML= '';
    c = 0;
    e = 0;
    for (var i = 0; i <workout.circuit[c].ex.length; i++) {
      if (i === 0) {
        s++;
        document.body.appendChild(run.createSetsTracker());       //setsTracker
        
        var table = this.createTable()
        var tbody = table.childNodes[0];
        document.body.appendChild(table);
        var exTr = tbody.appendChild(this.createExTr());
        exTr.appendChild(run.createExNameTd());
        exTr.appendChild(run.createRepsTd());
        exTr.appendChild(run.createWeightTd());

        
        e++;
        document.body.insertAdjacentElement('afterend', run.previewRest());
        
      } else {
        var exTr = table.appendChild(this.createExTr());
        exTr.appendChild(run.createExNameTd());
        exTr.appendChild(run.createRepsTd());
        exTr.appendChild(run.createWeightTd());                
        e++;
      }
    }    
  },

  restTimer: function () {
    document.body.innerHTML = '';
    document.body.appendChild(run.createSetsTracker());    
    var preview = document.getElementById('runPreview');
    if (s === workout.circuit[c].sets) {
      c++;
      s = 1;
      e = 0;
    } else {
    s++;
    }
    if (c === workout.circuit.length) {
    document.body.innerHTML = '';
    document.body.id = '';
    preview.innerHTML = '';
    s = 0;
    c = 0;
    e = 0;
    var finishWorkoutMessage = document.createElement('div');
    finishWorkoutMessage.id = 'finishWorkoutMessage';
    finishWorkoutMessage.innerHTML = 'You look swole... good for you';
    document.body.appendChild(finishWorkoutMessage);
    var returnToViewPageButton = create.finishButton();
    returnToViewPageButton.innerHTML = 'Back to review page';
    document.body.appendChild(returnToViewPageButton);
    clearInterval(interval);
    } else {
    
    var timer = document.createElement('div');
    timer.id = 'restTimer';
    var x = workout.circuit[c].rest;
    timer.innerHTML = x;
    var interval = setInterval(function () {
      x--;
      timer.innerHTML = x;
      if (x === 0) {
        clearInterval(interval);
        run.nextCircuit();
      }
    }, 1000);
    document.body.appendChild(timer)
    
      preview.innerHTML = 'Up Next: ' + s + '/' + workout.circuit[c].sets + '  ' + workout.circuit[c].ex[0].exName + '...';
    
    //temporarily press timer done button
    var timerDone = document.createElement('button');
    timerDone.innerHTML= 'Who needs rest';
    timerDone.addEventListener('click', function() {
      run.nextCircuit();
      clearInterval(interval);
    });
    preview.appendChild(timerDone);
    }
  },


  //Div content to be replaced by actual timer
  createCountdownDiv: function () {
    var restCountdownDiv = document.createElement('div');
    restCountdownDiv.id = "restCountdownDiv";
    restCountdownDiv.innerHTML = workout.circuit[c].rest;
    return restCountdownDiv;
  },

  nextCircuit: function () {
    document.body.innerHTML = '';
    document.body.appendChild(run.createSetsTracker()); 
    e = 0;
    for (var i = 0; i <workout.circuit[c].ex.length; i++) {
      if (i === 0) {
        var exDiv = document.body.appendChild(run.createExDiv());
        exDiv.id = 'firstExDivRun';
        exDiv.appendChild(run.createExSpan());                 
        exDiv.appendChild(run.createRepsSpan());                  
        e++;        
      } else {
        var exDiv = document.body.appendChild(run.createExDiv());              
        exDiv.appendChild(run.createExSpan());
        exDiv.appendChild(run.createRepsSpan());        
        e++;
      } 
    }
    var preview = document.getElementById('runPreview');
    preview.innerHTML = 'Up Next:  ' + workout.circuit[c].rest + 'seconds off';
    preview.appendChild(this.nextButton());
  },
};
