import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorExtraComponent } from './configurator-extra.component';

describe('ConfiguratorExtraComponent', () => {
  let component: ConfiguratorExtraComponent;
  let fixture: ComponentFixture<ConfiguratorExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorExtraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
