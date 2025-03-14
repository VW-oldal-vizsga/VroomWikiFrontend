import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorColorComponent } from './configurator-color.component';

describe('ConfiguratorColorComponent', () => {
  let component: ConfiguratorColorComponent;
  let fixture: ComponentFixture<ConfiguratorColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
