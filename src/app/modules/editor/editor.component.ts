import { ConnectApiService } from './../../shared/services/connect-api.service';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, filter, tap } from 'rxjs/operators';
import { SingleArticle } from 'src/app/shared/models/article.model';
import { CanComponentDeactivate } from 'src/app/shared/services/candeactive.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy, CanComponentDeactivate {
  //#region Properties
  @ViewChild('inpFocus') inpFocus!: ElementRef;
  
  public submitForm!: FormGroup;

  public submitted = false;
  
  public subscriptions = new Subscription();

  public isEdit = false;

  public isLoading = false;

  public slug: string = '';

  //#end region

  //#region Constructor
  public constructor(
    private route: ActivatedRoute,
    private api: ConnectApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  //#end region

  //#region Methods
  public ngOnInit(): void {
    const paramsSub = this.route.params
      .pipe(
        tap(() => {
          this.submitForm = this.formBuilder.group({
            title: [
              '',
              Validators.compose([
                Validators.required
              ])
            ],
            description: [
              '',
              Validators.compose([
              Validators.required
              ])
            ],
            tagList: [
              '',
              Validators.compose([
                Validators.required
              ])
            ],
            body: [
              '',
              Validators.compose([
                Validators.required
              ])
            ],
          });
        }),
        filter((params) => params.slug != null),
        switchMap((params: Params) => {
          this.isEdit = params.slug != null;
          this.isLoading = true;
          return this.api.onGetArticleBySlug(params.slug);
        })
      )
      .subscribe(
        (res: SingleArticle) => {
          this.isLoading = false;
          if(Object.keys(res.article).length > 0) {
            this.submitForm = this.formBuilder.group({
              title: [
                res.article.title,
                Validators.compose([
                  Validators.required
                ])
              ],
              description: [
                res.article.description,
                Validators.compose([
                Validators.required
                ])
              ],
              tagList: [
                res.article.tagList.join(','),
                Validators.compose([
                  Validators.required
                ])
              ],
              body: [
                res.article.body,
                Validators.compose([
                  Validators.required
                ])
              ],
            });
            this.slug = res.article.slug;
          } else {
            this.router.navigate(['page-not-found'])
          }
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        }
      );

    this.subscriptions.add(paramsSub);
  }

  public get handle(): { [key: string]: AbstractControl } {
    return this.submitForm.controls;
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.inpFocus.nativeElement.focus();
    })
  }

  public canDeativate(): boolean | Promise<boolean> {
    if(this.submitForm.dirty && !this.submitted) {
      return Swal.fire({
        icon: 'question',
        title: 'Wait!?',
        text: 'Are you sure to leave!?',
        iconColor: '#0f0e15',
        confirmButtonColor: '#0f0e15',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        } else {
          return false
        }
      })
    }
    return true;
  }

  public onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.isEdit) {
      console.log(form.value);
      Swal.fire({
        icon: 'question',
        iconColor: '#0f0e15',
        confirmButtonColor: '#0f0e15',
        showCancelButton: true,
        cancelButtonColor: '#0f0e15',
        title: 'Are you sure?!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          const editArticleSub = this.api.onUpdateArticle({
            ...form.value,
            tagList: form.value.tagList.split(','),
          },
          this.slug)
            .subscribe((res) => {
              console.log(res);
              
              this.isLoading = false;
              Swal.fire({
                icon: 'success',
                iconColor: '#0f0e15',
                confirmButtonColor: '#0f0e15',
                title: 'Conglaturation!',
                text: 'Succesful update article!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate([`../article/`, res.article.slug]);
            }, (err) => {
              console.log(err);
              this.isLoading = false;
              Swal.fire({
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#0f0e15',
                title: 'Oops...',
                text: 'Title ' + err.error.errors.title,
                showConfirmButton: false,
                timer: 1500
              })
            })
  
          this.subscriptions.add(editArticleSub);
        }
      });
      return;
    }

    this.isLoading = true;
    const createArticleSub = this.api
      .onCreateArticle({
        ...form.value,
        tagList: form.value.tagList.split(','),
      })
      .subscribe(
        (res) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            iconColor: '#0f0e15',
            confirmButtonColor: '#0f0e15',
            title: 'Conglaturation!',
            text: 'Succesful add new article!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate([`../article/`, res.article.slug]);
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
          Swal.fire({
            icon: 'error',
            iconColor: '#d33',
            confirmButtonColor: '#0f0e15',
            title: 'Oops...',
            text: 'Title ' + err.error.errors.title,
            showConfirmButton: false,
            timer: 1500
          })
        }
      );

    this.subscriptions.add(createArticleSub);
  }

  public ngOnDestroy(): void {
    if (this.subscriptions && !this.subscriptions.closed) {
      this.subscriptions.unsubscribe();
    }
  }

  //#end region
}
