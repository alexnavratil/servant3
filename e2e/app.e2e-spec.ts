import { Servant3Page } from './app.po';

describe('servant3 App', () => {
  let page: Servant3Page;

  beforeEach(() => {
    page = new Servant3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
