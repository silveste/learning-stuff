;(function(global, $){

    // Function that returns new instance of the constructor to automatically
    // instantiate an object without typing "new" keyword
    var Greetr = function(fName, lName, lang) {
      return new Greetr.init(fName, lName, lang);
    }

    var supportedLangs = ['en', 'es'];

    var greetings = {
      en: "Hello",
      es: "Hola"
    };

    var formalGreetings = {
      en: "Greetings",
      es: "Saludos"
    };

    var logMessages = {
      en: 'Logged in',
      es: 'Sesión iniciada'
    };


    //Methods will be in the prototype while data in the object itself
    //Greetr.prototype will be set as the new object prototype down in the code
    Greetr.prototype = {

      // Returns Full name
      fullName: function(){
        return this.fName + ' ' + this.lName;
      },

      //Check if the argument lang is supported
      validate: function(){
        if (supportedLangs.indexOf(this.lang) === -1) {
          throw "Invalid Language";
        }
      },

      //Return a normal greeting
      greeting: function(){
        return greetings[this.lang] + ' ' + this.fName + ','
      },

      //Returns a formal greeting
      formalGreeting: function(){
        return formalGreetings[this.lang]+ ', ' + this.fullName() + '.';
      },

      //Chainable method that Log the greeting
      greet: function(formal){
        var msg;

        if(formal){
          msg = this.formalGreeting();
        } else {
          msg = this.greeting();
        }

        // Variable console is true when the console is open
        if (console) {
          console.log(msg);
        }

        //making the method chainable by returning 'this', which refers to the calling Object
        return this;
      },

      // Chainable method that log the message init session
      log: function(){

        // Variable console is true when the console is open
        if(console){
          console.log(logMessages[this.lang] + ': ' + this.fullName());
        }

        //Make it chainable
        return this;
      },

      //Chainable method that set the language used
      setLang: function(lang) {
        this.lang = lang;

        this.validate();

        return this;
      },

      //Chainable method that insert a greeting into html
      // jQuery is required
      // Can take 2 arguments:
      // selector (required) that points to the HTML element where greeting will be inserted
      // Formal (optional) that indicates the type of greeting
      queryGreeting: function (selector, formal){
        if ($ && selector){
          var msg = formal ? this.formalGreeting() : this.greeting();
          $(selector).html(msg);
          return this;
        }

        // The method requires jQuery and a selector, if they are not present throws an error
        throw "Something went wrong!";
      }
    };

    //Object created when Greetr library is called
    Greetr.init = function(fName, lName, lang){
      var self = this; //it will prevent non-wanted behaviour of "this" keyword
      self.fName = fName || "";
      self.lName = lName || "";
      self.lang = lang || "en";

      //Check if lang argument is valid
      self.validate();
    }

    //Set out Greetr.prototype to the new object prototype
    Greetr.init.prototype = Greetr.prototype;

    //Adding the new object to the global Object using also the alias G$
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));
