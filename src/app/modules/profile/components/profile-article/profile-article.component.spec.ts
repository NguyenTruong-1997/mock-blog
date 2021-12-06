import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileArticleComponent } from './profile-article.component';

describe('ProfileArticleComponent', () => {
  let component: ProfileArticleComponent;
  let fixture: ComponentFixture<ProfileArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
