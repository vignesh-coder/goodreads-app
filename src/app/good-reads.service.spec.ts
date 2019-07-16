import { TestBed } from '@angular/core/testing';

import { GoodReadsService } from './good-reads.service';

describe('GoodReadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodReadsService = TestBed.get(GoodReadsService);
    expect(service).toBeTruthy();
  });
});
