import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender': new FormControl(this.genders[1])
    })
  }
}

// In course, the form is set up directly in ngOnInit. I have chosen to create a function to set up the form and then call this in ngOnInit instead because I believe it would make testing easier, and keep the code tidier if ngOnInit were to get busier.
