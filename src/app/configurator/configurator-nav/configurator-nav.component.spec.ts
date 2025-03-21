import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorNavComponent } from './configurator-nav.component';

describe('ConfiguratorNavComponent', () => {
  let component: ConfiguratorNavComponent;
  let fixture: ComponentFixture<ConfiguratorNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
