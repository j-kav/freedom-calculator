# Freedom Calculator

Setup
* Frontend
  * In root directory, run 
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
  * Edit the appsettings.json file
    * Set the "ZillowClientId" field to the Zillow Web Services ID obtained from [Zillow API Overview](http://www.zillow.com/howto/api/APIOverview.htm)
  * Select ".NET Core Launch (web)" config in debug menu to debug the app