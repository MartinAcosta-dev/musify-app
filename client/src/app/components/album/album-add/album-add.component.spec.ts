import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumAddComponent } from './album-add.component';

describe('AlbumAddComponent', () => {
  let component: AlbumAddComponent;
  let fixture: ComponentFixture<AlbumAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumAddComponent]
    });
    fixture = TestBed.createComponent(AlbumAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
