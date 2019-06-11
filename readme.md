# Hubspot Gulp

This is a little gulp environment that allows you to save a running a list of files that you work with, and use Hubspot's API to publish them.

## Getting Started
This recipe that watches any code changes in the `/dist` or `/sass` directory, compiles it with sourcemaps (if applicable) and then prompts the user to choose one of your files to send to Hubspot with their COS API.

To start using this taskrunner, enter your HAPI key into the file named `.env` in the `/gulp` directory.

```shell
HAPI_KEY="YOUR-API-KEY"
```

Open a new terminal and navigate to the `/gulp` directory. Then install the package with NPM.

```shell
npm install
```

### Sources

You'll need to link up your source files on your local machine to external files on our Hubspot site by using their ID's. Source files must be added to `/gulp/files.js`. You'll need to have created a file in the Hubspot Design manager to have a place for the API to send your saved or compiled file from `/dist`.

```javascript
var files = [{
    title: 'An Internal Name',
    value: {
        id: '6437133935',
        source: 'test.css'
    }
}];
```
`title` is the internal name for the asset that you're working with.
 Within `value` - you'll need to set the `id` to the corresponding Hubspot ID of the file you wish to connect in the Hubspot Design Manager. `source` should be the sourcefile name on your local machine within `/dist` that you wish to target to push to Hubspot.

### Usage
Make sure that you're in the /gulp directory

To use the gulp recipe to write to the current file's buffer (save changes to Hubspot, but don't "Publish" the file).
```shell
gulp draft init
```
Or to use the gulp recipe to write and publish the current file upon save.
```shell
gulp
```

These will begin the task that watches the /dist directory for changes. 

#### SASS
Sass files are located in /sass. Gulp looks for any filechanges to `.scss` files and partials in that directory and will compile them with a sourcemap to `/dist`.

#### Get
I also needed a file to update these if they were fiddled with in the Design Manager instead of here. This will grab the same list of assets from `files` and will overwrite whatever that file has in it from what Hubspot has. You can hit:

```shell
node get
```

#### LiveReload

As an extra bonus you can use this Chrome extension: [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) - for easy live reloading of tabs. Just get the extension and run the gulpfile. Once your gulpfile is running, click on the LiveReload extension icon in Chrome. The page will reload whenever a file is uploaded to Hubspot.