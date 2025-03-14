import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorMainComponent } from './configurator-main.component';

describe('ConfiguratorMainComponent', () => {
  let component: ConfiguratorMainComponent;
  let fixture: ComponentFixture<ConfiguratorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
