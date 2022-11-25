import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Bob', 'Biff'];

  // lifecycle hooks
  ngOnInit() {
    this.setUpSignUpForm();
  }

  // getters
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  // functions
  setUpSignUpForm() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl(this.genders[1]),
      'hobbies': new FormArray([])
    })
  }

  onSubmit() {
    console.log(this.signupForm.value)
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // Validators
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    else {
      return null;
    }
  }
}

// In course, the form is set up directly in ngOnInit. I have chosen to create a function to set up the form and then call this in ngOnInit instead because I believe it would make testing easier, and keep the code tidier if ngOnInit were to get busier.
// In the course, the onSubmit function logs the entire form. I have chose to log the value of the form so that I can see the object more clearly.
// One thing from a UX stand point - I would have put an input, then the user inputs their hobby and clicks add hobby, which would add the hobby to the array and create another inpute below it.
// In custom validators you cannot return false. Return null instead.
// 'this' is not accessible in the HTML so will cause an error when using custom validators. To get around this, you need to bind 'this' when using the custom validators so that the HTML knows to look at the variable referred to in the ts.

