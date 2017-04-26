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
    * Install .NET Core SDK from https://www.microsoft.com/net/core#windowscmd
    * Install Visual Studio Code with extensions:
      * C#
      * mssql
      * In preferences->settings, associate .vue files with html:
      ```javascript
      "files.associations": {
        "*.vue": "html"
      }
      ```
    * Open root directory with Visual Studio Code
    * Edit the src/appsettings.json file
      * Set the "ZillowClientId" field to the Zillow Web Services ID obtained from [Zillow API Overview](http://www.zillow.com/howto/api/APIOverview.htm)
    * In the src directory, run
    ```bat
    dotnet restore
    ```
    * Select ".NET Core Launch (web)" config in debug menu to debug the app
      * The database is created the first time the app runs, and is updated with migrations as they are available when it runs
        * To query db, open queries.sql, and create connection with the mssql extension with parameters:
          * server: (localdb)\\MSSQLLocalDB, then execute the statement(s)
          * database: FreedomCalculator2
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