# Link to the deployed app
https://event-search-react.wl.r.appspot.com/

# How to run the project

## Development 
In development, the client and server are run separately.

To start client, inside `/client` run:
```console
npm start
```
Then the client will be served at http://localhost:3000

To start server, inside `/server` run:
```console
npm run dev
```
Then the server will be served at http://localhost:8080

## Deployment
In deployment, the client is built into static files and the server is transpiled into javascript files. The server will serve the static files.
Then the server is deployed to Google Cloud.

### Build the client
First build the client into static files, inside `/client` run:
```
npm run build
```
The built static files will be in `/server/build`.

### Transpile the server
Then transpile the server's typescript files into javascript, inside `/server` run:
```
tsc
```
The transpiled javascript files will be in `/server/dist`.

### Local testing
To test the deployment build locally, inside `/server` run:
```
npm start
```
Then the app will be served at http://localhost:8080

### Deploy to Google cloud
To deploy to Google cloud, inside `/server` run:
```
gcloud app deploy
```

# APIs

## GET /api/suggest
Get attraction suggestions based on the keyword from Ticketmaster API.

Query parameters:
- keyword: the keyword to search for

## GET /api/tickets
Get tickets information based on the queries from Ticketmaster API.

Query parameters:
- keyword: the keyword to search for
- category: the category of the event
- lat: the latitude of the location
- lng: the longitude of the location
- distance: the distance from the location

## GET /api/event
Get event information based on the event id from Ticketmaster API.

Query parameters:
- id: the event id

## GET /api/artist
Get artist information based on the keyword from Spotify API.

Query parameters:
- keyword: the keyword to search for

## GET /api/venue
Get venue information based on the keyword from Ticketmaster API.

Query parameters:
- keyword: the keyword to search for