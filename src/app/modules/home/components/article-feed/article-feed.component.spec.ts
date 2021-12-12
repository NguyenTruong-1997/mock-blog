import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFeedComponent } from './article-feed.component';

describe('ArticleFeedComponent', () => {
  let component: ArticleFeedComponent;
  let fixture: ComponentFixture<ArticleFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
