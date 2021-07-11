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
  pageNumber = 1;

  ngOnInit(): void {
  }

  tokenFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  onFetchReposClick() {
    this.activeRepos = [];
    this.getAllRepos();
  }

  getAllRepos() {
    this.appService.fetchReposfromGH(this.tokenFormControl.value, this.pageNumber).subscribe( (res: any) => {
      if (res.items.length) {
        res.items.forEach((data: any) => {
          if (!data.archived && !data.disabled) {
            this.activeRepos.push(data.name);
          }
        });
        console.log(this.activeRepos.length);
        console.log('totsl Count', res.total_count);
        if( this.pageNumber < Math.ceil(res.total_count / 100) ) {
          this.pageNumber++;
          this.getAllRepos();
        }
      }
    })
  }

}
