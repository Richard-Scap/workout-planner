//********************global**************************

var i = 0; //designates current circuit
var j = 0; // designates current ex in circuit[i]
var t = 10; // designates current div (ex)
var p = 100; // designates current p (circuit)
var r = 0; // designates current span row (exName or rep)

window.windowName = 'createPage';
window.addEventListener('load', function() {            //load initial input
  var span = create.span();
  span.appendChild(create.newCircuitInput());
  var div = create.div();
  div.id = t;
  div.appendChild(span);
  var paragraph = create.paragraph();
  paragraph.id = p;
  paragraph.appendChild(div);
  document.body.appendChild(paragraph);

  
}, false); 

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
    // i++;
    this.circuit.push({
      ex: [], //generate new circuit
      sets: '',
      rest: '',
    });
    this.addEx(exName);
  },

  addEx: function(exName) {
    var circuit = workout.circuit;
    circuit[i].ex.push({ //push ex into circuit
      exName: exName,
      reps: '',
      repsType: false,
    });
  },

  addReps: function(reps) {
    this.circuit[i].ex[j].reps = reps;
  },

  addRepsType: function(repsType) {
    this.circuit[i].ex[j].repsType = repsType;
  },

  addSets: function(sets) {
    this.circuit[i].sets = sets;
  },
 
  addRest: function(rest) {
    this.circuit[i].rest = rest; 
  },

  delete: function(circ, clickedRow) {
    this.circuit[circ / 100 -1].ex.splice(clickedRow, 1); 
  },
}; 

var tools = {
  
  enableEnterKeyAdd: function(target, type, listener) {
    target.addEventListener(type, function fn(event) { // for enter key to add newExInput
      if (event.key === "Enter") {
      target.removeEventListener(type, fn);
      listener(event);
      }
    }); 
  },
  
  enableEnterKeyAddC: function(target, type, listener) {
    target.addEventListener(type, function fn(event) { // for enter key to add newExInput
      if (event.key === "Enter") {
        target.removeEventListener(type, fn);
        listener(event);
      }
    });
  }, 
  
  setUpEventListeners: function() {
    document.body.addEventListener('mouseover', function(e) {
      if (e.target.className === 'flippedEx' || e.target.className === 'deleteButton') {
        e.target.parentNode.style.fontWeight = 'bold';
        e.target.parentNode.style.backgroundColor = 'lightgrey';
        e.target.style.cursor = 'pointer';
        e.target.parentNode.childNodes[2].className = 'visibleDeleteButton';
      }
    });
    document.body.addEventListener('mouseout', function(e) {
      if (e.target.tagName === 'SPAN' || e.target.className === 'visibleDeleteButton') {
        e.target.parentNode.style.color = "black";
        e.target.parentNode.style.backgroundColor = 'white';
        e.target.parentNode.style.fontWeight = 'normal';
        e.target.parentNode.childNodes[2].className = 'deleteButton'; 
      } 
    });    
     
     
     //delete button listener!
//     document.body.addEventListener('click', function(e) { 
//       if (e.target.className === 'visibleDeleteButton') { 
//         var clickedSpan = e.target;
//         var clickedDiv = e.target.parentNode;
//         var clickedDivId = clickedDiv.id;
//         var currentP = clickedDiv.parentNode.id;
//         if(workout.circuit[currentP /100 - 1].ex.length === 1) { 
//           clickedDiv.parentNode.innerHTML = '';
//           r = 0;
//           var newSpan = create.span();
//           var newDiv = create.div();
//           newDiv.id = t;
        
//           } else { 
//         clickedDiv.parentNode.removeChild(clickedDiv);
//         workout.delete(currentP, clickedSpan.id);
//         j--;
//         }
//       }
//     });
  },
};
tools.setUpEventListeners();


var create = {
  
  paragraph: function () {
    var paragraph = document.createElement('p');
    return paragraph;
  },
  
  div: function () {
    var div = document.createElement('div');
    return div;
  },
  
  span: function () {
    var span = document.createElement('span');
    span.id = r;
    return span;
  },
  
  newCircuitInput: function() {
    var createInput = document.createElement('input');
    createInput.setAttribute("type", "text");
    createInput.className = 'exNameInput';
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
    repsInput.className = 'repsInput';
    repsInput.value = 0;
    repsInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        flow.flipRepsInput();
      }
    });
    return repsInput; 
  }, 
  
  newExInput: function() {
    j++;  
    var createInput = document.createElement('input');   
    createInput.setAttribute("type", "text");
    createInput.className = 'exNameInput';
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
    createSetsInput.className = 'setsInput';
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
    restInput.className = 'restInput';
    restInput.value = 0;
    restInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        flow.flipRestInput();
      }
    });
    return restInput;
  },

  addCircuitButton: function() {
    var button = document.createElement('button');
    button.innerHTML = "+";
    button.id = "newCircuitButton";
    button.addEventListener('click', function() {
      flow.flipAddCircuitButton();
    });
    return button;
  },

  addButton: function() {
    var createButton = document.createElement('button');
    createButton.innerHTML = "+";
    createButton.className = "addCheckButtonCombo";
    createButton.id = "addButton";
    createButton.addEventListener('click', function() {
      flow.flipAddButton();
    });
    return createButton;
  },
  
  checkButton: function() {
    var createButton = document.createElement('button');
    createButton.innerHTML = "v";
    createButton.className = "addCheckButtonCombo";
    createButton.addEventListener('click', function() {
    flow.flipCheckButton();
    });
    return createButton;
  },

  dropdown: function() {
    var dropdown = document.createElement('select');
    var optionReps = document.createElement('option');
    var optionSeconds = document.createElement('option');
    optionReps.textContent = 'Repetitions';
    optionSeconds.textContent = 'Seconds';
    dropdown.appendChild(optionReps);
    dropdown.appendChild(optionSeconds);
    dropdown.id = "dropdown";
    return dropdown;
  },
  
  deleteButton: function() {
    var createButton = document.createElement('button');
    createButton.innerHTML = "X";
    createButton.id = r;
    createButton.className = 'deleteButton';
    return createButton;
  },
  
  finishButton: function() {
    var finishButton = document.createElement('button');
    finishButton.innerHTML = "Finish";
    finishButton.id = "finishButton";
    finishButton.addEventListener('click', function() {
      var reviewPage = window.open("", "_self", "", false);
      reviewPage.document.write("<h1>Review<h1>");
      review.setUp();
      review.populate(); 
    });
    return finishButton;
  },  
  
};

var destroy = {
  
  input: function() {
    document.querySelector('input').remove();
  },   
  
  dropdown: function() {
    document.querySelector('select').remove();
  },
}; 


var flow = {
  
  flipCircuitNameInput: function() {
    //Add to array
    workout.addCircuit(document.querySelector('input').value); 
    var span = document.querySelector('input').parentNode; 
    destroy.input();
    
    //Flip input into text
    span.innerHTML = workout.circuit[i].ex[j].exName;
    span.className = 'flippedEx';
    
    //Pop reps input
    var newSpan = create.span();
    var currentDiv = document.getElementById(t);
    currentDiv.appendChild(newSpan);
    newSpan.appendChild(create.newRepsInput());
    document.querySelector('input').select();
    newSpan.appendChild(create.dropdown());
  },  
  
  flipExNameInput: function() {
    //Add to array
    var span = document.querySelector('input').parentNode; 
    workout.addEx(document.querySelector('input').value);
    destroy.input();

    //Flip input into text
    span.innerHTML = workout.circuit[i].ex[j].exName;
    span.className = 'flippedEx';
    
    //Pop reps input
    var newSpan = create.span();
    var currentDiv = document.getElementById(t);
    currentDiv.appendChild(newSpan);
    newSpan.appendChild(create.newRepsInput());
    document.querySelector('input').select();
    newSpan.appendChild(create.dropdown());
  },  
  
  flipRepsInput: function() {
    //Add to array
    var repsInput = document.querySelector('input');
    workout.addReps(repsInput.valueAsNumber);
    var dropdown = document.getElementById('dropdown'); 
    workout.addRepsType(dropdown.value);
    destroy.input();
    
    //Flip input into text. If seconds / else repetitions
    var span = dropdown.parentNode;
    if (document.getElementById('dropdown').value === 'Seconds') { 
      destroy.dropdown();
      span.innerHTML = workout.circuit[i].ex[j].reps + ' s';
      span.className = 'flippedReps';
    } else {
      destroy.dropdown();
      span.innerHTML = 'x' + workout.circuit[i].ex[j].reps;
      span.className = 'flippedEx';
    }
    
    //pop delete button
    span.parentNode.appendChild(create.deleteButton());
    
    //pop add/check buttons in new div/span
    var div = create.div();
    div.id = 'addCheckDiv';
    var currentP = document.getElementById(p);
    currentP.appendChild(div);
    var newSpan = create.span();
    newSpan.id = 'addCheckSpan';
    div.appendChild(newSpan);
    newSpan.appendChild(create.addButton()); 
    newSpan.appendChild(create.checkButton());
    
    //creates one time event listener to use enter key on window. pulls up nexExInput
    setTimeout(function() {
      tools.enableEnterKeyAdd(window, "keyup", function(event) {
        if (event.key === "Enter") {
          flow.flipAddButton();
        }
      });
    }, 100);
    
  },
  
  flipAddButton: function () {
    var currentSpan = document.getElementById('addCheckSpan');
    currentSpan.innerHTML = '';
    r++;
    currentSpan.id = r;
    t = t + 10;
    currentSpan.parentNode.id = t;
    currentSpan.appendChild(create.newExInput());
    document.querySelector('input').select();
  },
  
  flipCheckButton: function () {
    var currentSpan = document.getElementById('addCheckSpan');
    currentSpan.parentNode.id = 'setsRestDiv';
    currentSpan.innerHTML = 'Sets:';
    currentSpan.id = 'setsSpan';
    currentSpan.appendChild(create.newSetsInput());
    document.querySelector('input').select();
  },
  
  flipSetsInput: function() {
    var setsInput = document.querySelector('input');
    workout.addSets(setsInput.valueAsNumber);
    
    var span = setsInput.parentNode; 
    destroy.input();
    span.innerHTML = 'x' + workout.circuit[i].sets;
    span.id = 'flippedSets';
    var div = span.parentNode;
    var newSpan = create.span();
    newSpan.id = 'restSpan';
    newSpan.innerHTML = 'Rest:';
    div.appendChild(newSpan);
    newSpan.appendChild(create.newRestInput());
    document.querySelector('input').select();
  },
  
  flipRestInput: function () {
    //add to array
    var restInput = document.querySelector('input');
    workout.addRest(restInput.valueAsNumber);
    var span = restInput.parentNode
    span.id = 'flippedRest';
    destroy.input(); 

    //restinput to text
    span.innerHTML = workout.circuit[i].rest + ' seconds rest';
    var getInstructions = document.getElementById('instructions');
    getInstructions.insertAdjacentElement('afterend', create.finishButton());
    
    //create new paragraph (circuit)
    p = p + 100; 
    r = 0;
    var paragraph = create.paragraph();
    paragraph.id = p;
    var div = create.div();
    div.id = t;
    var newSpan = create.span();
    newSpan.appendChild(create.addCircuitButton())
    div.appendChild(newSpan);
    paragraph.appendChild(div);
    document.body.appendChild(paragraph);
     
    //enable enter key to add circuit as well
    setTimeout(function() {
      tools.enableEnterKeyAddC(window, "keyup", function(event) {
        if (event.key === "Enter") {
          flow.flipAddCircuitButton();
        }
      })
    }, 100);
  },
  
  flipAddCircuitButton: function () { 
      //remove buttons
      document.getElementById('newCircuitButton').remove();
      document.getElementById('finishButton').remove();
      
      //reset j = 0. now will be first ex in array again... create Input
      j = 0;
      t = t + 10;
      i++;
      var span = create.span();
      span.id = j;
      span.appendChild(create.newCircuitInput());
      var div = create.div();
      div.id = t;
      div.appendChild(span);
      var paragraph = document.getElementById(p);
      paragraph.appendChild(div);
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
    var saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.innerHTML = 'Save Workout!';
    saveButton.addEventListener('click', function () {review.save()});
    return saveButton; 
  },
  
  createRunButton: function () {
    var runButton = document.createElement('button');
    runButton.id = 'runButton';
    runButton.innerHTML = 'Run';
    runButton.addEventListener('click', function () {run.setUp()});
    return runButton;
  },


  setUp: function () {
    document.head.innerHTML = "<link rel=\"stylesheet\" href=\"./stylesheets/style.css\">"
    var table = document.createElement('table');
    var tbody = this.createTbody();
    var tr = this.createTr();
    var td = this.createTd();

    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);
      var setsTh = document.createElement('th');
        setsTh.innerHTML = ''; 
        setsTh.id = 'setsTh';
        setsTh.className = 'reviewHeaders';
        tr.appendChild(setsTh);
      var exerciseTh = document.createElement('th');
        exerciseTh.innerHTML = '';
        exerciseTh.id = 'exerciseTh';
        exerciseTh.className = 'reviewHeaders';
        tr.appendChild(exerciseTh);  
      var repsTh = document.createElement('th');
        repsTh.innerHTML = '';
        repsTh.id = 'setsTh';
        repsTh.className = 'reviewHeaders';
        tr.appendChild(repsTh);
      var restTh = document.createElement('th');
        restTh.innerHTML = '';
        restTh.id = 'restTh';
        restTh.className = 'reviewHeaders'; 
        tr.appendChild(restTh);      
  },
  
  populate: function () {
    var newTr = review.createTr(); 
    newTr.id = r;
   
    //create a tbody for every circuit stored 
    for (var c = 0; c < workout.circuit.length; c++) {
      var table = document.querySelector('table');
      var tbody = this.createTbody();
      tbody.id = c;
      table.appendChild(tbody);
      
      var setsTd = document.createElement('td');
      setsTd.innerHTML = 'x' + workout.circuit[c].sets;
      setsTd.className = 'reviewSets';
      tbody.appendChild(setsTd); 
      var rSpan = workout.circuit[c].ex.length + 1;
      setsTd.setAttribute("rowspan", rSpan);
      
      //create a tr for every ex stored
      for(var e = 0; e < workout.circuit[c].ex.length; e++) {
          var tr = this.createTr();
          tr.id = e; 
          tbody.appendChild(tr);

          var exName = this.createTd();
          exName.className = 'reviewExName';
          exName.innerHTML = '    ' + workout.circuit[c].ex[e].exName;
          tr.appendChild(exName); 
  
          var reps =  this.createTd();
          if (workout.circuit[c].ex[e].repsType === 'Seconds') {
            reps.innerHTML = workout.circuit[c].ex[e].reps + ' s';
            tr.appendChild(reps);
          } else {
            reps.innerHTML = 'x' + workout.circuit[c].ex[e].reps;
            tr.appendChild(reps);            
          }
          if (e === 0) {
           var restTd = document.createElement('td');
            restTd.setAttribute("rowspan", rSpan);
            restTd.id = "restTd";
            restTd.innerHTML = workout.circuit[c].rest + ' s rest';
            tr.appendChild(restTd);
          }
      }
    } 
    var reviewBottom = create.span();
    reviewBottom.appendChild(this.createNameWorkoutInput());
    reviewBottom.appendChild(this.createSaveButton());
    reviewBottom.appendChild(this.createRunButton());
    document.body.appendChild(reviewBottom);

  },
  
  save: function () {
    console.log('workout saved');
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

  createExDiv: function () {
    var exDiv = document.createElement('div');
    exDiv.id = 'exDivRun';
    return exDiv;
  },

  createExSpan: function () {
    var exSpan = document.createElement('span');
    exSpan.id = 'exSpanRun';
    exSpan.innerHTML = workout.circuit[c].ex[e].exName;
    return exSpan;
    
  },

  createRepsSpan: function () {
    var repsSpan = document.createElement('span');
    repsSpan.id = 'repsSpanRun';
    if (workout.circuit[c].ex[e].repsType === 'Seconds') {
    repsSpan.innerHTML = workout.circuit[c].ex[e].reps + 'sec';
    } else {
    repsSpan.innerHTML = 'x' + workout.circuit[c].ex[e].reps;  
    }
    return repsSpan;
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
    previewRest.id = 'runPreviewRest';
    previewRest.innerHTML = 'Up Next:  ' + workout.circuit[c].rest + 'seconds off';
    previewRest.appendChild (this.nextButton());
    return previewRest;
  },

  setUp: function () {
    document.body.innerHTML= '';
    debugger;
    c = 0;
    e = 0;
    for (var i = 0; i <workout.circuit[c].ex.length; i++) {
      if (i === 0) {
        s++;
        document.body.appendChild(run.createSetsTracker());       //setsTracker
        var exDiv = document.body.appendChild(run.createExDiv()); //ex div
        exDiv.id = 'firstExDivRun';
        exDiv.appendChild(run.createExSpan());                    //exName span
        exDiv.appendChild(run.createRepsSpan());                  //reps span        
        e++;
        document.body.insertAdjacentElement('afterend', run.previewRest());
        
      } else {
        var exDiv = document.body.appendChild(run.createExDiv());              
        exDiv.appendChild(run.createExSpan());
        exDiv.appendChild(run.createRepsSpan());        
        e++;
      }
    }    
  },

  restTimer: function () {
    document.body.innerHTML = '';
    document.body.appendChild(run.createSetsTracker());    
    var preview = document.getElementById('runPreviewRest');
    preview.id = 'runPreviewWork';
    if (s === workout.circuit[c].sets) {
      c++;
    }
    preview.innerHTML = 'Up Next: ' + workout.circuit[c].ex[0].exName + '...';
    //preview.addEventListener('click', function () {});

    //start timer
    //when timer reaches 0 change deleteHTML and put show second set/second circuit
    //temporarily press timer done button
    var timerDone = document.createElement('button');
    timerDone.innerHTML = 'Timer Done';
    timerDone.addEventListener('click', function() {run.nextCircuit();
    });
  },

  nextCircuit: function () {
    document.body.innerHTML = '';
    s++;
    document.body.appendChild(run.createSetsTracker()); 
  },
};