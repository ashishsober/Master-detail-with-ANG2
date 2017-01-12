import { MasterDetailsWithANG2Page } from './app.po';

describe('master-details-with-ang2 App', function() {
  let page: MasterDetailsWithANG2Page;

  beforeEach(() => {
    page = new MasterDetailsWithANG2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
