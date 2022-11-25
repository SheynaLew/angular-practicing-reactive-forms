import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  ngOnInit() {
    this.setUpSignUpForm();
  }

  setUpSignUpForm() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl(this.genders[1])
    })
  }

  onSubmit() {
    console.log(this.signupForm.value)
  }
}

// In course, the form is set up directly in ngOnInit. I have chosen to create a function to set up the form and then call this in ngOnInit instead because I believe it would make testing easier, and keep the code tidier if ngOnInit were to get busier.
// In the course, the onSubmit function logs the entire form. I have chose to log the value of the form so that I can see the object more clearly.


// Fixing a Bug
// In the next lecture, we'll add some code to access the controls of our form array:

// *ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"

// This code will fail as of the latest Angular version.

// You can fix it easily though. Outsource the "get the controls" logic into a method of your component code (the .ts file):

// getControls() {
//   return (<FormArray>this.signupForm.get('hobbies')).controls;
// }
// In the template, you can then use:

// *ngFor="let hobbyControl of getControls(); let i = index"

// Alternatively, you can set up a getter and use an alternative type casting syntax:

// get controls() {
//   return (this.signupForm.get('hobbies') as FormArray).controls;
// }
// and then in the template:

// *ngFor="let hobbyControl of controls; let i = index"

// This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).
