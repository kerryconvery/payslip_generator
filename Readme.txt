Assumptions
1. CSV is only comma separated, i.e. it will not a different seperators such as ;
2. CSV column order will be as described in the specification and that all column are required
3. In the CSV If a string value such as the first name contains a comma then it must be in quotes
4. Annual salary will not exceed 99999999 dollars
5. There are no other tax rates required besides those for the period 2012-2013.

Running the application
Requirements:
  latest npm
  node version 6.10.3 or later
  A web server to host the client side application or you can install webpack-dev-server globally

Note:
The client application looks for the server on localhost:3000 so run both on the same machine
 
Extract the entire solution into a folder
 
To run server side tests:
Change to API directory and run npm install --dev to install all dependencies. Then type npm test

To run client side tests:
Change to Client directory and run npm install --dev to install all dependencies.  Then type npm test

To run the server side application:
Change to API directory and run npm install (if you haven't already run it with the --dev option) to install all dependencies. Then type npm start

To run the client side application where you have webpack-dev-server installed globally: 
Change to Client directory and run npm install (if you haven't already run with --dev option) to install all dependencies. Then type npm start

To run the client side application using a web server other than webpack-dev-server:
Change to Client directory and run npm install (if you haven't already run with --dev option) to install all dependencies. Then point the webserver to the <install dir>/client/dist

Browse to localhost:<whatever port the webserver is running on> and you should get the payslip csv input dialog.



