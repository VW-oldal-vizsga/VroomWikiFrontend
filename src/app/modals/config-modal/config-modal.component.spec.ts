import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigModalComponent } from './config-modal.component';

describe('ConfigModalComponent', () => {
  let component: ConfigModalComponent;
  let fixture: ComponentFixture<ConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
