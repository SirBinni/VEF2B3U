//////////////////////////////////////////////////////////////////////////////////////


// 2. - Scope
// Hvað prentast í console og afhverju
(function() {
   var a = b = 5;
})();

console.log(b);

// Prentast út 5 því b yfirskrifar a, ef ég reyni að gera console.log(a) þá kemur undefined

//////////////////////////////////////////////////////////////////////////////////////

// 3. - Hoisting
// Hver er niðurstaðan og afhverju
function test() {
   console.log(a);
   console.log(foo());
   
   var a = 1;
   function foo() {
      return 2;
   }
}
//vantar test()
/*
Ef kóðinn er keyrður svona þá gerist ekkert því það er ekki kallað á test()
Afturámóti ef ég bæti því við þá kemur út 

undefined
2

Hann skilar 'a' sem undefined því console.log(a) er áður en 'a' er skilgreint
function foo er skrifar 2 út því compilerinn les functions áður en breytuskilgreiningar
*/

//////////////////////////////////////////////////////////////////////////////////////

// 4. - this
// Hver er niðurstaðan, útskýrðu svar
var fullname = 'John Doe';
var obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test());

// Niðurstaðan er að það prentast fyrst út Aurelio De Rosa og svo John Doe
// Það gerist vegna þess að 


//////////////////////////////////////////////////////////////////////////////////////

// 5.  
// Notaðu hér fyrir neðan "use strict" á viðeigandi stað og jshint þér til hjálpar
// a) hver er villan
// b) afhverju er villa
// c) lagaðu hana
function canYouSpotTheProblem() {
    "use strict";
  for (var=counter = 0; counter < 10; counter++)
    console.log("Happy happy");
}
canYouSpotTheProblem();

/*
a) Uncaught ReferenceError: counter is not defined
b) Því að counter er ekki skilgreint í for lúppuni
c) Setti var fyrir framan counter
*/


//////////////////////////////////////////////////////////////////////////////////////

// 6. 
//a) hver er villan, b) afhverju er villa, c) lagaðu hana
function Person(name) { this.name = name; }
var ferdinand = Person("Ferdinand"); 
console.log(name); 
console.log(this.name); 

/*
a)Uncaught TypeError: Cannot read property 'name' of undefined
b)ferdinand.name er undefined
c)Ég lagaði villuna með því að setja 'this' í staðinn fyrir ferdinand
*/

//////////////////////////////////////////////////////////////////////////////////////

// 7. 
// Convert a whole number to a string in any base (decimal, binary, and so on) 
// a) Reyndu að greina kóðann t.d. með að setja console.log() í kóðann til að fá frekari upplýsingar
// b) Notaðu debugger í chromeDeveloper eða firebug. (breakpoint á ákveðnum línum til að geta skoðað gildi)

function numberToString(n, base) {
  var result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n /= base;
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10)); // → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…


//////////////////////////////////////////////////////////////////////////////////////

// 8. 
// Útskýrðu notkun á isNaN í kóðanum, afhverju að gera þetta?
function promptNumber(question) {
  var result = Number(prompt(question, ""));
  if (isNaN(result)) return null;
  else return result;
}

console.log(promptNumber("How many trees do you see?")); 

// Ef notandinn slær eitthvað annað en tölu inn þá skrifast út null. 
// Það væri auðvitað betra að gefa upp eitthvað annað en null eins og að gefa villuskilaboð
// eða biðja notandann um að reyna aftur. 



//////////////////////////////////////////////////////////////////////////////////////


// 9. 
//  Útskýrðu hvernig try og catch virkar hér í kóðanum, 
//  hvað gerir throw keyword og hvað gerist þegar það verður error (útskýra kóðaflæði)

function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L")
    return "a house";
  else
    return "two angry bears";
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}


// 