-- SELECT * FROM information_schema.tables WHERE TABLE_TYPE='BASE TABLE';
-- select * from aspnetusers;
-- select * from aspnetroles;
-- select * from aspnetusertokens;
-- select * from aspnetuserclaims;
-- select * from aspnetuserlogins;
-- select * from aspnetroleclaims;
-- select * from aspnetuserroles;

-- select * from Asset;
-- select * from Liability;
-- select * from Budget;
-- select * from BudgetEarnedIncomeItem;
-- select * from BudgetPassiveIncomeItem;
-- select * from BudgetInvestmentItem;
-- select * from BudgetExpense;
-- select * from BudgetExpenseItem;
-- select * from Expense;

-- insert into Asset (AssetType, Name, NumShares, Symbol, UserId, Value) values (4, 'Microsoft', 10, 'msft', '3daf0738-c3ed-4030-b940-32ae0eac231d', 1000);
-- delete Liability where LiabilityId = 4;
-- update budget set networth = 500 where budgetid=1
-- insert into budget (UserId, Month, Year, NetWorth) values ('f8f3dfc2-482f-464c-a1a7-8abd63c68b78', 10, 2016, 0)

-- delete Asset;
-- delete Liability;
-- delete Expense;
-- delete Budget;
-- delete aspnetusers;
-- delete BudgetExpense;
-- delete BudgetExpenseItem;

-- SELECT Name, SUM(Amount) / (SELECT COUNT(*) FROM Budget) AS Amount
-- FROM Expense JOIN BudgetExpense on BudgetExpense.ExpenseId = Expense.ExpenseId
-- JOIN Budget ON Budget.BudgetId = BudgetExpense.BudgetId
-- JOIN BudgetExpenseItem on BudgetExpenseItem.BudgetExpenseId = BudgetExpense.BudgetExpenseId
-- GROUP BY Name

-- sp_help budget