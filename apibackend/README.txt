You can see the API code you were interacting with during the workshop under routes > index.js, the rest of this is boiler plate code that was generated when making the node/express project.

-For anyone trying to run this yourself-
This API's translation functions will not work unless you run a docker instance of a tool called libretranslate which can be found @ https://github.com/LibreTranslate/LibreTranslate

you will then need to replace the fetch urls in index.js with the address pointing to your libretranlate container.
