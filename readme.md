# Accelerance Front End

This is the codebase for Accelerance's front end. We use Hubspot the Hubspot CMS to host our content.

## Gulp
We use the Gulp taskrunner with a custom recipe that watches any code changes in the `./dist` directory, compiles it with sourcemaps (if applicable) and then prompts the user to choose a file to send to Hubspot with their CMS API.

To start using this taskrunner, first create an empty file named `.env` in the `/gulp` directory.

```shell
HAPI_KEY="YOUR-API-KEY"
```

Copy or write the code from above and paste it into your new `.env` file. Replace `YOUR-API-KEY` with a HAPI (_Hubspot API, lol_) key generated from our Hubspot portal (which should be 396606).

Open a new terminal and navigate to the `/gulp` directory. Then install the package with NPM.

```shell
npm install
```

### Sources

If you're creating something new or not on the list, you'll need to link up your  source files on your local machine to external files on our Hubspot site by using their ID's. Source files must be added to `/gulp/gulpfile.js` in an array named `files`. You'll need to have created a file in the Hubspot Design manager to have a place for the API to send your saved or compiled file from `/dist`.

```javascript
var files = [{
    title: 'Bare Minimum(css)',
    value: {
        id: '6487193955',
        source: 'bare-minimum.css'
    }
}];
```
`title` is the internal name for the asset that you're working with.
 Within `value` - you'll need to set the `id` to the corresponding Hubspot ID of the file you wish to connect in the Hubspot Design Manager. `source` should be the sourcefile name on your local machine that you wish to target to push to Hubspot.

### Usage
To use the gulp recipe
```shell
cd gulp
gulp
```
This will begin the task that watches the /dist directory for changes.

#### SASS
Sass files are located in /sass. Gulp looks for any filechanges to `.scss` files and partials in that directory and will compile them with a sourcemap to `/dist`. 

NOTE: In Hubspot when using dev tools, you'll need to add the query "hsDebug=True" to your URL in order to see sourcemaps.

#### Upload
This gulp recipe watches for changes in `/dist`. Once it sees something change, you'll be prompted with something like this
```shell
? Pick a file ›
Bare Minimum(css)
Master (css)
Rapid Referral Master (html)
Private Partner (html)
Resources (html)
```
Simply use your arrows keys or start typing to search for any files that were added to the list in the gulpfile. Hit enter and your file will be submitted to the API. If you need to roll things back, for now just do it from the Design Manager and then copy the rolled back code back into here.

#### LiveReload

As an extra bonus you can use this Chrome extension: [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) - for easy live reloading of tabs. Just get the extension and run the gulpfile. Once your gulpfile is running, click on the LiveReload extension icon in Chrome. The page will reload whenever a file is uploaded to Hubspot.

If you are confused - I'm sorry and my email is gfoster92@gmail.com if you need some help.