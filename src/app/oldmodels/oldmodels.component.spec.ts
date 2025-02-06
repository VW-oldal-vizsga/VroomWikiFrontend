import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldmodelsComponent } from './oldmodels.component';

describe('OldmodelsComponent', () => {
  let component: OldmodelsComponent;
  let fixture: ComponentFixture<OldmodelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldmodelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldmodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
