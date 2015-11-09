var StateMachine;
(function (StateMachine) {


  // Event class
  var Event = (function() {

    function Event(name) {
      if (!arguments.length) throw new Error("Event(): no name has been passed");
      this.name = name;
    }

    return Event;
  })();
  StateMachine.Event = Event;


  // State class
  var State = (function() {

    function State(name, options) {
      if (!arguments.length) throw new Error("State(): no name has been passed");
      this.name = name;
      var defaults = {
        onStart: function() {};
        onFinish: function() {};
      }

      options = options || {};
      for (var prop in defaults) {
        options[prop] = options[prop] || defaults[prop];
      }
    }

    return State;
  })();
  StateMachine.State = State;


  // Transition class
  var Transition = (function() {

    function Transition(from, to, on) {
      this.from = from;
      this.to = to;
      this.on = on;
    }

    return Transition;
  })();
  StateMachine.Transition = Transition;


  // State class
  var Machine = (function() {

    function Machine() {
      this.isWorking = false;
      this.transitions = [];
    }

    Machine.prototype.setInitialState = function(initialState) {
      this.initialState = initialState;
    }

    Machine.prototype.start = function() {
      if (this.initialState) {
        this.isWorking = true;
        this.currentState = this.initialState;
        this.currentState.onStart();
      } else {
        throw new Error("Machine.start(): there is no initialState");
      }
    }

    Machine.prototype.send = function(event) {
      if (isWorking) {
        transitions.forEach(function(transition) {
          if (transition.from == this.currentState && transition.on == this.event) {
            this.currentState.onFinish();
            this.currentState = transition.to;
            this.currentState.onStart();
            return;
          }
        });
        console.warn("There is no transition from " + this.currentState.name + " on " + event.name);
      } else {
        throw new Error("Machine.send(): Machine hasn't been started");
      }
    }

    Machine.prototype.bind = function() {
      if (arguments[0] instanceof State && arguments[1] instanceof State && arguments[2] instanceof Event) {
        transitions.push(new Transition(arguments[0],arguments[1],arguments[2]));
      } else if (arguments[0] instanceof Transition) {
        transitions.push(arguments[0]);
      } else {
        throw new Error("Machine.bind(): wrong arguments");
      }
    }

    return Machine;
  })();
  StateMachine.Machine = Machine;

})(StateMachine || (StateMachine = {}));