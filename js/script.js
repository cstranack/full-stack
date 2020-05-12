//--------- CALENDER JS-----------

!function() {

  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if(current) {
      var self = this;
    }
  }

  Calendar.prototype.draw = function() {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();
  }

  Calendar.prototype.drawHeader = function() {
    var self = this;
    if(!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'right');
      right.addEventListener('click', function() { self.nextMonth(); });

      var left = createElement('div', 'left');
      left.addEventListener('click', function() { self.prevMonth(); });

      //Append the Elements
      this.header.appendChild(this.title); 
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format('MMMM YYYY');
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;
    
    this.events.forEach(function(ev) {
     ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
    });
    
    
    if(this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function() {
        //If months are clicked too fast - error here
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement('div', 'month');
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function() {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
        this.month = createElement('div', 'month');
        this.el.appendChild(this.month);
        //backFill is the dates from the previous months 
        //that fill up the first week before the current 
        //month starts
        this.backFill();
        //currentMonth displays current month dates 
        this.currentMonth();
        //forwardfill are the next months dates that fill up
        //the last week of the current months
        this.fowardFill();
        this.month.className = 'month new';
    }
  }

  //visibe dates from previous month
  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }

  //visible dates from next month
  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while(clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  }


  Calendar.prototype.getWeek = function(day) {
    if(!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));
   

    //Drawing the day Name above the date
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Drawing the day Number
    var number = createElement('div', 'day-number', day.format('DD'));


    //Events
    // var events = createElement('div', 'day-events');
    // this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    // outer.appendChild(events);
    this.week.appendChild(outer);


    //this is selecting the days that are clicked
    // outer.addEventListener("click", daySelected);
    
    // outer.onclick = function(){outer.style.backgroundColor = '#a9d2d5'};
    // outer.onclick = function(){outer.style.backgroundColor = '#ffffff'};

    //this prints the current visible date on the calender
    // console.log(day._d);
    // console.log(outer);
    // return outer;

    // outer.addEventListener("click", function() {
    //   console.log("pressed");
    //   this.classList.toggle("active");
    //   // if (this.classList.contains("active")) {
    //   //   this.classList.remove("active");
    //   //   console.log("if");
    //   // } else this.classList.add("active");
    //   // console.log("else");
    // });
    
    
  }


  

  


  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if(day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  }

  //going to the next month
  Calendar.prototype.nextMonth = function() {
    this.current.add('months', 1);
    this.next = true;
    this.draw();
  }

  //going to the previous month
  Calendar.prototype.prevMonth = function() {
    this.current.subtract('months', 1);
    this.next = false;
    this.draw();
  }


  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
}();

!function() {
  var data = [];
  var calendar = new Calendar('#calendar', data);

}();


// Here are the functions for selecting a date.

// document.querySelector('.day.today').addEventListener("click", daySelectedToday);

// function daySelected(){
//   console.log("test");
//   this.style.backgroundColor = '#a9d2d5';
//   this.style.color = "black";
//   document.getElementById("demo").innerHTML = "Hello World";

  // outer.removeEventListener('click', daySelected);
// };




// function daySelectedToday(){
//   console.log("test1");
//   this.style.backgroundColor = '#a9d2d5';
//   this.style.color = "white";
//   document.getElementById("demo").innerHTML = "Task data";
// };

// function dayDeselected(){
//   this.style.backgroundColor = '#ffffff';
// }

// var calender = document.getElementById("#calender");
// var month = calender.querySelector(".month.new");
// var week = month.querySelector(".week");
var dateSelect = document.querySelector(".day");
// var dateTodaySelect = document.querySelector(".day.today");

// console.log(dateTodaySelect);
// console.log(dateSelect);

dateSelect.addEventListener("click", function() {
  console.log("pressed");
  // this.classList.toggle("active");
  if (this.classList.contains("active")) {
    this.classList.remove("active");
    console.log("if");
  } else this.classList.add("active");
  console.log("else");
});








