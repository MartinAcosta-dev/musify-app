import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAddComponent } from './artist-add.component';

describe('ArtistAddComponent', () => {
  let component: ArtistAddComponent;
  let fixture: ComponentFixture<ArtistAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistAddComponent]
    });
    fixture = TestBed.createComponent(ArtistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
