import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastModelNewComponent } from './past-model-new.component';

describe('PastModelNewComponent', () => {
  let component: PastModelNewComponent;
  let fixture: ComponentFixture<PastModelNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastModelNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastModelNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
