//********************global**************************

var i = -1; //designates current circuit
var j = 0; // designates current ex in circuit[i]
var t = 10; // designates current table
var r = 0; // designates current row
var buttonCombo = false;

var tools = {

  append: function(element) {
    var getRow = document.getElementById(r);
    var createTd = document.createElement('td');
    getRow.appendChild(createTd.innerHTML = element);
  },

  setUpEventListeners: function() {

    document.body.addEventListener('mouseover', function(e) {
      if (e.target.tagName === 'TD' || e.target.className === 'deleteButton') {
        e.target.parentNode.style.fontWeight = 'bold';
        e.target.style.cursor = 'pointer';
        e.target.parentNode.childNodes[2].className = 'visibleDeleteButton';

      }
    });
    document.body.addEventListener('mouseout', function(e) {
      if (e.target.tagName === 'TD' || e.target.className === 'visibleDeleteButton') {
        e.target.parentNode.style.color = "black";
        e.target.parentNode.style.fontWeight = 'normal';
        e.target.parentNode.childNodes[2].className = 'deleteButton';
      }
    });
    document.body.addEventListener('click', function(e) {
      if (e.target.className === 'visibleDeleteButton') {
        var clickedRow = e.target.parentNode;
        var clickedRowId = clickedRow.id;
        var currentTable = clickedRow.parentNode.id;
        console.log(clickedRow);
        console.log(currentTable);
        clickedRow.parentNode.removeChild(clickedRow);
        workout.delete(currentTable, clickedRowId);
        j--;
      }


    });

    document.body.addEventListener('click', function(e) {
      if (e.target.nodeName === 'TD') {

        //when row is clicked, clear content and add exName input
        var clickedRow = e.target.parentNode;
        console.log(clickedRow);
        clickedRow.innerHTML = "";

        var changeExInput = document.createElement('input');
        changeExInput.className = 'exNameInput';

        //remove buttons while change is initiated
        var buttonRow = document.getElementById('addButton').parentNode;
        buttonRow.parentNode.removeChild(buttonRow);

        changeExInput.addEventListener('keyup', function(event) {
          if (event.key === "Enter") {
            var circuit = workout.circuit;
            var currentTableId = clickedRow.parentNode.id;
            circuit[currentTableId / 10 - 1].ex[clickedRow.id - 1] = {
              exName: document.querySelector('input').value,
              reps: '',
              repsType: 'Repetitions',
            };

            //flepExInput *for change
            destroy.input();
            var x = clickedRow.insertCell(-1); //show input data in place of input
            x.innerHTML = workout.circuit[currentTableId / 10 - 1].ex[clickedRow.id - 1].exName;


            //create reps input *for change
            var createRepsInput = document.createElement('input');
            createRepsInput.setAttribute("type", "number"); //pop up reps input
            createRepsInput.className = 'repsInput';
            createRepsInput.addEventListener('keyup', function(event) {
              if (event.key === "Enter") {
                var repsInput = document.querySelector('input');
                var dropdown = document.querySelector('select');
                workout.circuit[currentTableId / 10 - 1].ex[clickedRow.id - 1].reps = repsInput.valueAsNumber;
                workout.circuit[currentTableId / 10 - 1].ex[clickedRow.id - 1].repsType = dropdown.value;

                destroy.input();
                var x = clickedRow.insertCell(-1); //show input data in place of input
                if (dropdown.value === 'Seconds') {
                  x.innerHTML = workout.circuit[currentTableId / 10 - 1].ex[clickedRow.id - 1].reps + ' s';
                } else {
                  x.innerHTML = 'x' + workout.circuit[currentTableId / 10 - 1].ex[clickedRow.id - 1].reps;
                }
                create.row();
                create.AddCheckButtonCombo();
                destroy.dropdown();
              }
            });

            clickedRow.appendChild(createRepsInput);
            clickedRow.appendChild(create.dropdown());
            document.querySelector('input').select();

          }
        });

        clickedRow.appendChild(changeExInput);
        document.querySelector('input').select();
      }
    });
  },

  enableEnterKeyAdd: function(target, type, listener) {
    target.addEventListener(type, function fn(event) { // for enter key to add newExInput
      target.removeEventListener(type, fn);
      listener(event);
    });
  },

  enableEnterKeyAddC: function(target, type, listener) {
    target.addEventListener(type, function fn(event) { // for enter key to add newExInput
      target.removeEventListener(type, fn);
      listener(event);
    });
  },
};

var create = {

  row: function() {
    r++;
    var getTable = document.getElementById(t);
    var createTr = document.createElement('tr');
    createTr.id = r;
    getTable.appendChild(createTr);
  },

  newCircuitInput: function() {
    var createInput = document.createElement('input');
    createInput.setAttribute("type", "text");
    createInput.className = 'exNameInput';
    createInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        workout.addCircuit(document.querySelector('input').value); //generate new circuit^
        console.log(workout.circuit);
        flow.flipExNameInput(); //begin input flip/flow
      }
    });
    return createInput;
  },

  newExInput: function() {
    j++;
    var createInput = document.createElement('input');
    createInput.setAttribute("type", "text");
    createInput.className = 'exNameInput';
    createInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        var circuit = workout.circuit;
        circuit[i].ex.push({
          exName: document.querySelector('input').value,
          reps: '',
        });
        console.log(workout.circuit);
        flow.flipExNameInput();
      }
    });
    return createInput;
  },

  newRepsInput: function() {
    var getRow = document.getElementById(r);
    var createRepsInput = document.createElement('input');
    createRepsInput.setAttribute("type", "number"); //pop up reps input
    createRepsInput.className = 'repsInput';
    createRepsInput.value = 0;
    createRepsInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        var repsInput = document.querySelector('input');
        workout.addReps(repsInput.valueAsNumber);
        var dropdown = document.getElementById('dropdown');
        workout.addRepsType(dropdown.value);
        flow.flipRepsInput();
      }
    });
    getRow.appendChild(createRepsInput);
    document.querySelector('input').select();
  },

  newSetsInput: function() {
    var getRow = document.getElementById(r);
    var createSetsInput = document.createElement('input');
    createSetsInput.setAttribute("type", "number"); //pop up reps input
    createSetsInput.className = 'setsInput';
    createSetsInput.value = 0;
    createSetsInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        var setsInput = document.querySelector('input');
        workout.addSets(setsInput.valueAsNumber);
        flow.flipSetsInput();
      }
    });
    return createSetsInput;
  },

  newRestInput: function() {
    var getRow = document.getElementById(r);
    var createRestInput = document.createElement('input');
    createRestInput.setAttribute("type", "number"); //pop up reps input
    createRestInput.className = 'restInput';
    createRestInput.value = 0;
    createRestInput.addEventListener('keyup', function(event) {
      if (event.key === "Enter") {
        var restInput = document.querySelector('input');
        workout.addRest(restInput.valueAsNumber);
        var setsRest = document.getElementById('setsRest');
        var restP = document.getElementById('restP');
        flow.flipRestInput();
        setsRest.id = "setsRestDone"; // resetting id for sets/rest
        restP.id = "restPDone";
      }
    });
    return createRestInput;
  },

  repsDropdown: function() {

  },

  addButton: function() {
    var createButton = document.createElement('button');
    createButton.innerHTML = "+";
    createButton.className = "addCheckButtonCombo";
    createButton.id = "addButton";
    createButton.addEventListener('click', function() {
      destroy.row();
      create.row();
      tools.append(create.newExInput());
      document.querySelector('input').select();
    });
    return createButton;
  },

  addCircuitButton: function() {
    var createButton = document.createElement('button');
    createButton.innerHTML = "+";
    createButton.id = "newCircuit";
    createButton.addEventListener('click', function() {
      t = t + 10;
      var makeT = document.createElement('table');
      makeT.id = t;
      makeT.className = "exName";
      document.body.insertAdjacentElement('beforeend', makeT);

      document.getElementById('newCircuit').remove();
      document.getElementById('finishButton').remove();
      create.row();
      var getRow = document.getElementById(r);
      getRow.appendChild(create.newCircuitInput());
      document.querySelector('input').select();
      j = 0;
    });
    return createButton;
  },

  checkButton: function() {
    var createButton = document.createElement('button');
    createButton.innerHTML = "v";
    createButton.className = "addCheckButtonCombo";
    createButton.addEventListener('click', function() {
      flow.closeCircuit();
    });
    return createButton;
  },

  AddCheckButtonCombo: function() {
    buttonCombo = !buttonCombo;
    var getRow = document.getElementById(r); //pop up path buttons
    getRow.appendChild(create.addButton());
    getRow.appendChild(create.checkButton());
    setTimeout(function() {

      //creates one time event listener to use enter key on window. pulls up nexExInput
      tools.enableEnterKeyAdd(window, "keyup", function(event) {
        if (event.key === "Enter") {
          destroy.row();
          create.row();
          tools.append(create.newExInput());
          document.querySelector('input').select();
        }
      });
    }, 100);
  },

  finishButton: function() {
    var finishButton = document.createElement('button');
    finishButton.innerHTML = "Finish";
    finishButton.id = "finishButton";
    finishButton.addEventListener('click', function() {
      console.log('works');
    });
    return finishButton;
  },

  deleteButton: function() {
    var createButton = document.createElement('button');
    createButton.innerHTML = "X";
    createButton.id = r;
    createButton.className = 'deleteButton';
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

};
window.addEventListener('load', function() { //load initial input
  create.row();
  var getTable = document.querySelector('tbody');
  var getRow = document.getElementById(r);
  tools.append(create.newCircuitInput());
}, false);

var ChangeInstructions = function() {
  var makeP = document.createElement('p');
  makeP.style.fontSize = "small";
  makeP.innerHTML = "Click a row to change THAT row!";
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
    i++;
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
    this.circuit[circ / 10 -1].ex.splice(clickedRow - 1, 1);
  },
};





var destroy = {

  row: function() {
    var getRow = document.getElementById(r);
    getRow.parentNode.removeChild(getRow);
    r--;
  },

  input: function() {
    document.querySelector('input').remove();
  },

  dropdown: function() {
    document.querySelector('select').remove();
  },
};

tools.setUpEventListeners();

var flow = {

  flipExNameInput: function() {
    destroy.input();
    var getRow = document.getElementById(r);
    getRow.className = "exName";
    var x = getRow.insertCell(-1); //show input data in place of input
    x.innerHTML = workout.circuit[i].ex[j].exName;
    x.className = 'flippedTd';
    create.newRepsInput();

    //pop dropdown
    getRow.appendChild(create.dropdown());

  },

  flipRepsInput: function() {
    destroy.input();

    if (document.getElementById('dropdown').value === 'Seconds') {
      destroy.dropdown();
      var getRow = document.getElementById(r);
      var x = getRow.insertCell(-1); //show input data in place of input
      x.innerHTML = workout.circuit[i].ex[j].reps + ' s';
      x.className = 'flippedTd';
      x.parentNode.appendChild(create.deleteButton());
      create.row();
      create.AddCheckButtonCombo();

    }
    destroy.dropdown();

    var getRow = document.getElementById(r);
    var x = getRow.insertCell(-1); //show input data in place of input
    x.innerHTML = 'x' + workout.circuit[i].ex[j].reps;
    x.className = 'flippedTd';
    x.parentNode.appendChild(create.deleteButton());
    create.row();
    create.AddCheckButtonCombo();
  },

  flipSetsInput: function() {

    destroy.input();
    var getP = document.getElementById("setsRest");
    getP.innerHTML = 'x' + workout.circuit[i].sets;
    var restP = document.getElementById('restP');
    restP.innerHTML = "Rest  ";
    restP.appendChild(create.newRestInput());
    document.querySelector('input').select();
  },

  flipRestInput: function() {
    destroy.input();
    var getP = document.getElementById("restP");
    getP.innerHTML = workout.circuit[i].rest + ' seconds rest';
    var getPS = document.getElementById("setsRest");
    var getInstructions = document.getElementById('instructions');
    getInstructions.insertAdjacentElement('afterend', create.finishButton());
    getP.insertAdjacentElement('afterend', create.addCircuitButton());

    //enable enter key to add circuit as well
    setTimeout(function() {
      tools.enableEnterKeyAddC(window, "keyup", function(event) {
        if (event.key === "Enter") {
          t = t + 10;
          var makeT = document.createElement('table');
          makeT.id = t;
          makeT.className = "exName";
          document.body.insertAdjacentElement('beforeend', makeT);

          document.getElementById('newCircuit').remove();
          document.getElementById('finishButton').remove();
          create.row();
          var getRow = document.getElementById(r);
          getRow.appendChild(create.newCircuitInput());
          document.querySelector('input').select();
          j = 0;
        }
      })
    }, 100);
  },

  closeCircuit: function() {
    destroy.row();
    var setsRest = document.createElement("p");
    setsRest.id = 'setsRest';
    setsRest.innerHTML = ("Sets: ");
    document.body.insertAdjacentElement('beforeend', setsRest); //create sets text + input
    var restP = document.createElement("p");
    restP.id = 'restP';
    document.body.insertAdjacentElement('beforeend', restP); //create sets text + input
    setsRest.appendChild(create.newSetsInput());
    document.querySelector('input').select();
  },
};