 /*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

 document.addEventListener( "DOMContentLoaded", initLoad);

 function initLoad()
 {
     /*
      create a new <option> element for each state in the array;
      set the properties of that element appropriately;
      and append that new <option> element as a child of the state select element.
      */
     var states = document.getElementsByName("state");
     for (var i = 0; i < usStates.length; i++)
     {
         var x = document.createElement("OPTION");
         x.value = usStates[i].code;
         x.text = usStates[i].name;
         states[0].appendChild(x);
     }

     var occupation = document.getElementById("occupation");
     occupation.addEventListener( "change", changeOccupation);

     var btn = document.getElementById("cancelButton");
     btn.addEventListener( "click", clickCancel);

     var frm = document.getElementById("signup");
     frm.addEventListener( "submit", validateForm);
 }

 function changeOccupation()
 {
     var occupation = document.getElementById("occupation");
     var txt = document.getElementsByName("occupationOther")[0];
     if(occupation.value == "other")
     {
         txt.style.display = "block";
     }
     else
     {
         txt.style.display = "none";
     }
 }

 function clickCancel()
 {
     var r = confirm("Would you want to leave the page?");
     if (r == true) {
         window.location.href='http://google.com';
     }
 }

 function removeSpace(s)
 {
     while (s.length > 0 && s.charAt(0) == ' ')
         s = s.substring(1);
     while (s.length > 0 && s.charAt(s.length - 1) == ' ')
         s = s.substring(0, s.length - 1);
     return s;
 }

 function validateForm(evt)
 {
     try {
         var missed = "";
         var ziperr = "";
         var phoneerr = "";
         var birtherr = "";

         var err = 0;
         var firstName = document.getElementsByName("firstName")[0];
         var lastName = document.getElementsByName("lastName")[0];
         var address1 = document.getElementsByName("address1")[0];
         var city = document.getElementsByName("city")[0];
         var state = document.getElementsByName("state")[0];
         var zip = document.getElementsByName("zip")[0];
         var birthdate = document.getElementsByName("birthdate")[0];
         var occupation = document.getElementById("occupation");
         var txt = document.getElementsByName("occupationOther")[0];
         var phone = document.getElementById("phone");

         firstName.style.border = 'none';
         if (removeSpace(firstName.value) == "")
         {
             err++;
             firstName.style.border = '1px solid red';
             if (missed != "")
                 missed += ", ";
             missed += "firstName";
         }
         lastName.style.border = 'none';
         if (removeSpace(lastName.value) == "")
         {
             err++;
             lastName.style.border = '1px solid red';
             if (missed != "")
                 missed += ", ";
             missed += "lastName";
         }
         address1.style.border = 'none';
         if (removeSpace(address1.value) == "")
         {
             err++;
             address1.style.border = '1px solid red';
             if (missed != "")
                 missed += ", ";
             missed += "address1";
         }
         city.style.border = 'none';
         if (removeSpace(city.value) == "")
         {
             err++;
             city.style.border = '1px solid red';
             if (missed != "")
                 missed += ", ";
             missed += "city";
         }
         state.style.border = 'none';
         if (removeSpace(state.value) == "")
         {
             err++;
             state.style.border = '1px solid red';
             if (missed != "")
                 missed += ", ";
             missed += "state";
         }
         zip.style.border = 'none';
         var zipRegExp = new RegExp('^\\d{5}$');
         if (zipRegExp.test(removeSpace(zip.value)) == false)
         {
             err++;
             zip.style.border = '1px solid red';
             if (removeSpace(zip.value) == "")
             {
                 if (missed != "")
                     missed += ", ";
                 missed += "zip";
             }
             else
             {
                 ziperr = "\nZIP code must be 5 digits";
             }
         }

         txt.style.border = 'none';
         if(occupation.value == "other" && removeSpace(txt.value) == "")
         {
             err++;
             txt.style.border = '1px solid red';
             if (missed != "")
                 missed += ", ";
             missed += "occupation";
         }

         var date = new Date(birthdate.value);
         var now = new Date();
         birthdate.style.border = 'none';
         var msg = document.getElementById("birthdateMessage");
         msg.innerHTML = "";
         if (isNaN(date))
         {
             err++;
             birthdate.style.border = '1px solid red';
             if (missed != "")
                 missed += ", ";
             missed += "birthdate";
         }
         else
         {
             var ag = now.getUTCFullYear() - date.getUTCFullYear();
             if (ag < 13)
             {
                 err++;
                 birthdate.style.border = '1px solid red';
                 msg.innerHTML = "The user must be 13 years or older to sign up";
                 birtherr = "\nThe user must be 13 years or older to sign up";
             }
         }

         var phonenum = removeSpace(phone.value);
         if (phonenum != "")
         {
             var phoneExp = new RegExp('^\\d+$');
             if (phoneExp.test(phonenum) == false)
                 phoneerr = "\nThe phone number must be digits";
         }

         if (err > 0)
         {
             var errmsg = "";
             if (missed != "")
                 errmsg = "The following required fields are missing: " + missed;
             alert(errmsg + ziperr + phoneerr);
         }

     }
     catch(e)
     {
         alert(e);
         err++;
     }

     if (err == 0)
         return true;
     evt.preventDefault();
     evt.returnValue = false;
     return false;
 }




