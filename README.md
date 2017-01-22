# Freedom Calculator

Setup
* Frontend
  * In /src/FreedomCalculator2 directory, run 
    ```javascript
    npm install
    ```
  * Run webpack to create the bundle.js file from vue files, etc. In the same directory, run 
    ```javascript
    npm run dev-build
    ```
* Backend
  * Install SQL Server Express with LocalDB enabled
  * Install .NET Core 1.1
  * Install Visual Studio Code with extensions:
    * C#
    * mssql
      * To query db, open queries.sql, and create connection to (localdb)\\MSSQLLocalDB, then execute the statement(s)
  * Open root directory with Visual Studio Code
  * Select ".NET Core Launch (web)" config in debug menu to debug the app