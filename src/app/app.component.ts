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
        'username': new FormControl(null, Validators.required),
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


}

// In course, the form is set up directly in ngOnInit. I have chosen to create a function to set up the form and then call this in ngOnInit instead because I believe it would make testing easier, and keep the code tidier if ngOnInit were to get busier.
// In the course, the onSubmit function logs the entire form. I have chose to log the value of the form so that I can see the object more clearly.
// One thing from a UX stand point - I would have put an input, then the user inputs their hobby and clicks add hobby, which would add the hobby to the array and create another inpute below it.

