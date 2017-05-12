# React Skeleton

Minimal and simple React-based skeleton with the following features:

* Babel for transpiling the React code.
* ESLint for static code analysis.
* Code compilation and bundling using WebPack.
* Testing in browser with code coverage, and testing during build.

## Running Application
* ```npm start```
* Go to ```http://localhost:9001```

## Testing
* Tests should be stored in the ```test``` directory. 
* When writing and debugging tests, the browser option should be used, the CLI version should only be used when running in CI.
* To run tests in the browser, assuming that the app is running as described in the previous section, go to ```http://localhost:9001/test/```
* Coverage can be accessed by clicking ```line coverage``` at the top right of the page.

## Building 
* ```npm run build``` will run the build standalone.
* ```npm run test``` will run the build with test cases afterwards.
* Output of build is in the ```target``` directory. Coverage files and other build artifacts can all be found in here.
* App files to be served in production can be found in ```target/dist```.


