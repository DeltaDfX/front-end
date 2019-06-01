import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RegisterComponent} from '../register/register.component';
import {UserService} from '../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    register: RegisterComponent;
    loginForm: FormGroup;
    email;
    password;
    loginError;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private userService: UserService,
                private formBuilder: FormBuilder) {
        this.loginForm = formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    loginOnClick(data) {
        if (this.loginForm.invalid) {
            this.loginError = 'Email is not valid';
        } else if (!this.userService.getAuthentication(data.email, data.password)) {
            this.loginError = 'The email/password is not correct';
        }
        // this.router.navigate(['content']);
    }

    open() {
        const modalRef = this.modalService.open(RegisterComponent);
    }

    get inputEmail() {
        return this.loginForm.get('email');
    }
}
