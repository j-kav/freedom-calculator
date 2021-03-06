# Freedom Calculator

* Setup
  * Frontend
    * Install Node.js
    * In src directory, run 
    ```javascript
    npm install
    ```
    * Run webpack (leave running in a separate terminal for automatic updates) to create the bundle.js file from vue files, etc. In the same directory, run
    ```javascript
    npm run dev-build
    ```
  * Backend
    * Install SQL Server Express with LocalDB enabled (it's unchecked by default in the installation options) from https://www.microsoft.com/en-us/sql-server/sql-server-editions-express
      * When running the installer, select "Download Media" and then "LocalDB"
    * Install .NET Core SDK 3.1 from https://dotnet.microsoft.com/download/dotnet-core/3.1
    * Install Visual Studio Code with extensions:
      * C# (ms-vscode.csharp)
      * mssql (ms-mssql.mssql)
      * Vetur (octref.vetur) or a similar one that provides .vue file formatting/intellisense
    * Open root directory with Visual Studio Code
    * Create a src/appsettings.user.json file with content:
      ```javascript
      {
        "FreedomCalculatorConfig": {
          "AlphaVantageApiKey": "",
          "ZillowClientId": "",
          "JWTSecret": ""
        }
      }
      ```
      * Set the "AlphaVantageApiKey" field to the Alpha Vantage API key obtained from https://www.alphavantage.co/
      * Set the "ZillowClientId" field to the Zillow Web Services ID obtained from [Zillow API Overview](http://www.zillow.com/howto/api/APIOverview.htm)
      * Set the "JWTSecret" field to any unique value
    * In the src directory, run
    ```bat
    dotnet restore
    ```
    * Select ".NET Core Launch (web)" config in debug menu to debug the app
      * The database is created the first time the app runs, and is updated with migrations as they are available when it runs
        * To query db, open queries.sql, and create connection with the mssql extension with parameters:
          * server: (localdb)\.
          * database: FreedomCalculator2
          * authentication type: Integrated
          * name: FreedomCalculator2
          Then execute the statement(s) using Ctrl+Shift+e, and selecting the connection created.
        * Use [.NET Core CLI](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet) to perform Entity Framework migrations when needed
          * You may need to install the tool with `dotnet tool install --global dotnet-ef`
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