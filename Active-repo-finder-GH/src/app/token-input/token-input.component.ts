import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AppService } from '../app.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-token-input',
  templateUrl: './token-input.component.html',
  styleUrls: ['./token-input.component.scss']
})
export class TokenInputComponent implements OnInit {

  constructor(
    private appService: AppService
  ) { }

  activeRepos: string[] = [];

  ngOnInit(): void {
  }

  tokenFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  onFetchReposClick() {
    this.activeRepos = [];
    this.appService.fetchReposfromGH(this.tokenFormControl.value).subscribe( (res: any) => {
      if (res.length) {
        res.forEach((data: any) => {
          if (!data.archived && !data.disabled) {
            this.activeRepos.push(data.name);
          }
        })
      }
    })
  }

}
