import { DailyExpensesPage } from './app.po';

describe('daily-expenses App', () => {
  let page: DailyExpensesPage;

  beforeEach(() => {
    page = new DailyExpensesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
