//********************global**************************

var i = 0; //designates current circuit
var j = 0; // designates current ex in circuit[i]
var t = 10; // designates current div (ex)
var p = 100; // designates current p (circuit)
var r = 0; // designates current span row (exName or rep)
var addCheckButtons = false;  // tells if addCheck boxes are up
var addCircuitOrFinishButtons = false; // tells if addCircuit and Finish buttons are up

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
      addCircuitOrFinishButtons = !addCircuitOrFinishButtons;      
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
      document.body.innerHTML = '';
      var reviewPage = window.open("", "_self", "", false);
      reviewPage.document.write("<h1>Review<h1>");
      review.setUp();
      review.populate(); 
    });
    return finishButton;
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
     
     
   //  delete button listener 
    document.body.addEventListener('click', function(e) { 
      if (e.target.className === 'visibleDeleteButton') {
        var clickedSpan = e.target;
        var clickedDiv = e.target.parentNode;
        var clickedDivId = clickedDiv.id;
        var clickedP = clickedDiv.parentNode;
        if(workout.circuit[clickedP.id /100 - 1].ex.length === 1) { 
          clickedDiv.parentNode.innerHTML = '';
          r = 0;
          var newSpan = create.span();
          var newDiv = create.div();
          newDiv.id = t;
        
          } else { 
        clickedDiv.parentNode.removeChild(clickedDiv);
        workout.delete(clickedP.id, clickedSpan.id);
        j--;
     

        //Delete all divs, rebuild frame
        document.body.innerHTML = "";
        var create = document.createElement("h1");
        create.innerHTML = "Create";
        document.body.appendChild(create);
        var exerciseHeader = document.createElement('h');
        exerciseHeader.className = "exercise";
        exerciseHeader.innerHTML = "Exercise";
        document.body.appendChild(exerciseHeader);
        var repsHeader = document.createElement('h');
        repsHeader.className = 'reps';
        repsHeader.innerHTML = 'Reps';
        document.body.appendChild(repsHeader); 
        p = 100;
        for (var i = 0; i < workout.circuit.length; i++) {
          r = 0;
          t = 10;
          var newP = document.createElement('p');
          document.body.appendChild(newP);
          newP.id = p;
          for(var y = 0; y < workout.circuit[i].ex.length; y++) {
            var newDiv = document.createElement('div');
              newDiv.id = t;
            var newExSpan = document.createElement('span');
              newExSpan.id = r;
              newExSpan.className = 'flippedEx';
              newExSpan.innerHTML = workout.circuit[i].ex[y].exName;
            var newRepsSpan = document.createElement('span');
            newRepsSpan.id = r;
              newRepsSpan.className = 'flippedEx';
              newRepsSpan.innerHTML = workout.circuit[i].ex[y].reps;
            newDiv.appendChild(newExSpan);
            newDiv.appendChild(newRepsSpan);
            newP.appendChild(newDiv);
          
            //needs fix
            if (workout.circuit[i].length === 1) {
            var deleteCircuitButton = document.createElement('button');
            deleteCircuitButton.innerHTML = "Delete Circuit"
            deleteCircuitButton.id = r;
            deleteCircuitButton.className = 'deleteButton';
            newDiv.appendChild(deleteCircuitButton);
            r++;                                    
            } else {
            var deleteButton = document.createElement('button');
            deleteButton.innerHTML = "X";
            deleteButton.id = r;
            deleteButton.className = 'deleteButton';
            newDiv.appendChild(deleteButton);
            r++;                        
            }
          }
          if (typeof workout.circuit[i].sets === 'number') {
            var setsRestDiv = document.createElement('div');
              setsRestDiv.id = 'setsRestDiv';
            var setsSpan = document.createElement('span');
              setsSpan.id = 'flippedSets';
              setsSpan.innerHTML = 'x' + workout.circuit[i].sets;
            document.body.appendChild(setsRestDiv);
            setsRestDiv.appendChild(setsSpan);
          }
          if (typeof workout.circuit[i].rest === 'number') {
            var restSpan = document.createElement('span');
              restSpan.id = 'flippedRest';
              restSpan.innerHTML = workout.circuit[i].rest + ' seconds rest';
            document.getElementById('setsRestDiv').appendChild(restSpan);
            p = p + 100;        
          }
        } //end circuit rebuild loop

        //if addcheckcombo is up, keep it up after loop
        if (addCheckButtons === true) {
          var div = document.createElement('div');
          div.id = 'addCheckDiv';      
          newP.appendChild(div);
          var newSpan = document.createElement('span');
          newSpan.id = 'addCheckSpan';
          div.appendChild(newSpan);         
          //the methods wont work...
          // newSpan.appendChild(create.addButton());
          var addButton = document.createElement('button');
          addButton.innerHTML = "+";
          addButton.className = "addCheckButtonCombo";
          addButton.id = "addButton";
          addButton.addEventListener('click', function() {
            flow.flipAddButton();
          });
          newSpan.appendChild(addButton);
          // newSpan.appendChild(create.checkButton());
          var checkButton = document.createElement('button');
          checkButton.innerHTML = "v";
          checkButton.className = "addCheckButtonCombo";
          checkButton.addEventListener('click', function() {
          flow.flipCheckButton();
          });
          newSpan.appendChild(checkButton);
        }
        if (addCircuitOrFinishButtons === true) {
                //create new paragraph (circuit)
          p = p + 100; 
          r = 0;
          var paragraph = document.createElement('p');
          paragraph.id = p;
          var div = document.createElement('div');
          div.id = t;
          var newSpan = document.createElement('span');
          newSpan.id = r;          
          // newSpan.appendChild(create.addCircuitButton())
          var button = document.createElement('button');
          button.innerHTML = "+";
          button.id = "newCircuitButton";
          button.addEventListener('click', function() {
            flow.flipAddCircuitButton();
            addCircuitOrFinishButtons = !addCircuitOrFinishButtons;      
          });
          newSpan.appendChild(button);
          addCircuitOrFinishButtons = !addCircuitOrFinishButtons;
          div.appendChild(newSpan);
          paragraph.appendChild(div);
          document.body.appendChild(paragraph);
        }
        }
      }
    });

  // change listener
    document.body.addEventListener('click', function(e) {
      if (e.target.nodeName === 'SPAN') {
        //when row is clicked, clear content and add exName input
        var clickedSpanId = e.target.id;
        var clickedDiv = e.target.parentNode;
        console.log(clickedDiv);
        clickedDiv.innerHTML = "";

        var changeExInput = document.createElement('input');
        changeExInput.className = 'exNameInput';
        var newSpan =document.createElement('span');
        newSpan.id = clickedSpanId;
        clickedDiv.appendChild(newSpan);
        newSpan.appendChild(changeExInput);
        document.querySelector('input').select();


        //remove buttons while change is initiated
        if (addCheckButtons === true) {
        var buttonSpan = document.getElementById('addButton').parentNode;
        var buttonDiv = buttonSpan.parentNode;
        buttonDiv.parentNode.removeChild(buttonDiv);
        }

        if (addCircuitOrFinishButtons === true) {
          document.getElementById('newCircuitButton').remove();
          document.getElementById('finishButton').remove();
        }
        changeExInput.addEventListener('keyup', function(event) {
          if (event.key === "Enter") {         
            var circuit = workout.circuit;
            var currentP = clickedDiv.parentNode;
            circuit[currentP.id / 100 - 1].ex[clickedSpanId] = {
              exName: document.querySelector('input').value,
              reps: '',
              repsType: 'Repetitions',
            };

            //flepExInput *for change
            var currentSpan = document.querySelector('input').parentNode;
            currentSpan.className = 'flippedEx';
            destroy.input();
            currentSpan.innerHTML = workout.circuit[currentP.id / 100 - 1].ex[clickedSpanId].exName;


            //create reps input *for change 
            var createRepsInput = document.createElement('input');
            createRepsInput.setAttribute("type", "number"); //pop up reps input 
            createRepsInput.className = 'repsInput';
            createRepsInput.addEventListener('keyup', function(event) {
              if (event.key === "Enter") {                                
                var repsInput = document.querySelector('input');
                var dropdown = document.querySelector('select');
                workout.circuit[currentP.id / 100 - 1].ex[clickedSpanId].reps = repsInput.valueAsNumber;
                workout.circuit[currentP.id / 100 - 1].ex[clickedSpanId].repsType = dropdown.value;

                var currentSpan = document.querySelector('input').parentNode;
                currentSpan.className = 'flippedEx';
                currentSpan.id = clickedSpanId;
                destroy.input();
                destroy.dropdown();
                if (dropdown.value === 'Seconds') {
                  currentSpan.innerHTML = workout.circuit[currentP.id / 100 - 1].ex[clickedSpanId].reps + ' s';
                } else {
                  currentSpan.innerHTML = 'x' + workout.circuit[currentP.id / 100 - 1].ex[clickedSpanId].reps;
                }
                //pop delete buttons
                var deleteButton = create.deleteButton();
                clickedDiv.appendChild(deleteButton);
                deleteButton.id = clickedSpanId;

                if(addCheckButtons === true) {
                //pop add/check buttons
                var div = create.div();
                div.id = 'addCheckDiv';
                currentP.appendChild(div);
                var newSpan = create.span();
                newSpan.id = 'addCheckSpan';
                div.appendChild(newSpan);
                newSpan.appendChild(create.addButton()); 
                newSpan.appendChild(create.checkButton());
                // addCheckButtons = !addCheckButtons;
                destroy.dropdown();
                }
                if(addCircuitOrFinishButtons === true) {
                  var paragraph = document.getElementById(p);
                  var div = create.div();
                  div.id = t;
                  var newSpan = create.span();
                  newSpan.appendChild(create.addCircuitButton())
                  div.appendChild(newSpan);
                  paragraph.appendChild(div);
                }
              }
            });
            var newRepsSpan = document.createElement('span');
            clickedDiv.appendChild(newRepsSpan)
            newRepsSpan.appendChild(createRepsInput);
            newRepsSpan.appendChild(create.dropdown());
            document.querySelector('input').select();

          }
        });
      }
    });
  },


};
tools.setUpEventListeners();




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
    //pop delete buttons
    if (workout.circuit[i].ex.length === 1) {
      var deleteCircuitButton = document.createElement('button');
      deleteCircuitButton.innerHTML = "A";
      deleteCircuitButton.id = r;
      deleteCircuitButton.className = 'deleteButton';
      span.parentNode.appendChild(deleteCircuitButton)
    } else {
      span.parentNode.appendChild(create.deleteButton());
    }
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
    addCheckButtons = !addCheckButtons;
    r++;

    
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
    // r++;
    currentSpan.id = r;
    t = t + 10;
    currentSpan.parentNode.id = t;
    currentSpan.appendChild(create.newExInput());
    document.querySelector('input').select();
    addCheckButtons = !addCheckButtons;
    
  },
  
  flipCheckButton: function () {
    var currentSpan = document.getElementById('addCheckSpan');
    currentSpan.parentNode.id = 'setsRestDiv';
    currentSpan.innerHTML = 'Sets:';
    currentSpan.id = 'setsSpan';
    currentSpan.appendChild(create.newSetsInput());
    document.querySelector('input').select();
    addCheckButtons = !addCheckButtons;    
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
    addCircuitOrFinishButtons = !addCircuitOrFinishButtons;
    div.appendChild(newSpan);
    paragraph.appendChild(div);
    document.body.appendChild(paragraph);
     
    //enable enter key to add circuit as well
    setTimeout(function() {
      tools.enableEnterKeyAddC(window, "keyup", function(event) {
        if (event.key === "Enter") {
          flow.flipAddCircuitButton();
          addCircuitOrFinishButtons = !addCircuitOrFinishButtons;          
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
    runButton.addEventListener('click', function () {
      c = 0;
      run.circuitDisplay()
    });
    return runButton;
  },


  setUp: function () {
    document.head.innerHTML = "<link rel=\"stylesheet\" href=\"./stylesheets/style.css\">"
  },
  
  populate: function () {
    var newTr = review.createTr(); 
    newTr.id = r;
   
    //create a tbody for every circuit stored 
    for (var c = 0; c < workout.circuit.length; c++) {
      // var table = document.querySelector('table');
      // var tbody = this.createTbody();
      // tbody.id = c;
      // table.appendChild(tbody);
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
          newTBody.appendChild(tr);                 // ch to newTBody

          var exName = this.createTd();
          exName.className = 'reviewExName';
          exName.innerHTML = '    ' + workout.circuit[c].ex[e].exName;
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
    var preview = document.getElementById('runPreview');
    // document.body.appendChild(this.createCountdownDiv());
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