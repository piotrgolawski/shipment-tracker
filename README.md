# Frontend (React)

## Available Scripts

In the project directory, you can run:

### `npm install`

Fetches libraries required in the project, it is a first step.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Backend (Spring boot)
## Available Scripts

### `mvn clean install`
To build the project.

### `mvn spring-boot:run`
To run the project.

## Use of tracker (in modal window)
To be able to see current position of the truck, some other service needs to inform our API, in this case we can just use Postman.
No auth is required.

[POST] http://localhost:8080/update-location

[headers] Content-Type: application/json

[body]
    {
    "lat": 54.4915,
    "lng": 18.5411
    }

If frontend and backend is working, you should perceive a change in location, this is made using websocket.
Frontend (in modal window) in subscribing our backend socket. 

# Additional files
- [What could be done more (or better)](./TODO.md)

