# Freedom Calculator

* Setup
  * Frontend
    * Install Node.js
    * In src directory, run 
    ```javascript
    npm install
    ```
    * Run webpack to create the bundle.js file from vue files, etc. In the same directory, run 
    ```javascript
    npm run dev-build
    ```
  * Backend
    * Install SQL Server Express with LocalDB enabled (it's unchecked by default in the installation options)
    * Install .NET Core SDK 2.0 from https://www.microsoft.com/net/core#windowscmd
    * Install Visual Studio Code with extensions:
      * C# (ms-vscode.csharp)
      * mssql (ms-mssql.mssql)
      * Vue 2 Snippets (hollowtree.vue-snippets) or a similar one that provides .vue file formatting/intellisense
    * Open root directory with Visual Studio Code
    * Create a src/appsettings.user.json file with content:
      ```javascript
      "FreedomCalculatorConfig": {
        "AlphaVantageApiKey": "",
        "ZillowClientId": ""
      }
      ```
      * Set the "AlphaVantageApiKey" field to the Alpha Vantage API key obtained from https://www.alphavantage.co/
      * Set the "ZillowClientId" field to the Zillow Web Services ID obtained from [Zillow API Overview](http://www.zillow.com/howto/api/APIOverview.htm)
    * In the src directory, run
    ```bat
    dotnet restore
    ```
    * Select ".NET Core Launch (web)" config in debug menu to debug the app
      * The database is created the first time the app runs, and is updated with migrations as they are available when it runs
        * To query db, open queries.sql, and create connection with the mssql extension with parameters:
          * server: (localdb)\\MSSQLLocalDB
          * database: FreedomCalculator2  
          Then execute the statement(s) using Ctrl+Shift+e, and selecting the connection created.
        * Use [.NET Core CLI](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet) to perform Entity Framework migrations when needed
* Testing
    * Frontend
      * In the src directory, run
      ```javascript
      npm test
      ```
    * Backend
      * In the test directory, run
      ```bat
      dotnet restore
      dotnet test
      ```