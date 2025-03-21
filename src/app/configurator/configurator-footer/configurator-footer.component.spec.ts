import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorFooterComponent } from './configurator-footer.component';

describe('ConfiguratorFooterComponent', () => {
  let component: ConfiguratorFooterComponent;
  let fixture: ComponentFixture<ConfiguratorFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
