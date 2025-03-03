import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditComponent } from './song-edit.component';

describe('SongEditComponent', () => {
  let component: SongEditComponent;
  let fixture: ComponentFixture<SongEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SongEditComponent]
    });
    fixture = TestBed.createComponent(SongEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
