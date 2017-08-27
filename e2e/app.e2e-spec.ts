import { AutionPage } from './app.po';

describe('aution App', () => {
  let page: AutionPage;

  beforeEach(() => {
    page = new AutionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
