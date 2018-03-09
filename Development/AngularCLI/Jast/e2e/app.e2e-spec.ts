import { Jast } from './app.po';

describe('Jast', function() {
  let page: Jast;

  beforeEach(() => {
    page = new Jast();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
