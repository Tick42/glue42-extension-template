Glue42 Extension Template
=========================

##### Easy 3rd party integrations without any code changes/bridges/plug-ins/APIs!

### Prerequisites

[```Glue42 Desktop```](https://glue42.com) 3.9.1 or later, [```node``` & ```npm```](https://nodejs.org/en/).

### Steps to create your own extension

1. Clone https://github.com/Tick42/glue42-extension-template
2. ```cd glue42-extension-template```
3. ```npm i```
4. Inside of ```manifest.json``` edit the extension ```name``` and the content_script's ```matches``` URL string array
5. Inside of ```extension.js``` write the code you want to inject to the URLs listed inside of the ```matches``` array (use ```injectedGlue``` for access to all the [Glue42 APIs](https://docs.glue42.com/g4e/reference/glue/latest/glue/index.html))
6. ```npm run build```
7. [Add your application to Glue42 Desktop](https://docs.glue42.com/g4e/configuration/index.html#configuration-application_configuration) - inside the ```details``` for your application specify ```allowExtensions: true``` for the extension to work
8. Add the path to the glue42-extension-template folder inside the ```extensions``` string array inside of ```%LOCALAPPDATA%/Tick42/GlueDesktop/config/system.json```
9. Start ```Glue42 Desktop``` and launch your application - the extension should be running

##### Please note that you need to restart Glue42 Desktop whenever you rebuild your extension for the changes to take place.
