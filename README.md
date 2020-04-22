Glue42 Extension Template
=========================

##### Easy 3rd party integrations without any code changes/bridges/plug-ins/APIs!

### Prerequisites

[```Glue42 Desktop```](https://glue42.com) 3.9.1 or later, [```node``` & ```npm```](https://nodejs.org/en/).

### Steps to create your own extension

1. Clone https://github.com/Tick42/glue42-extension-template
1. ```cd glue42-extension-template```
1. Inside of ```manifest.json``` edit the extension ```name``` and the content_script's ```matches``` URL string array
1. Inside of ```content.js``` write the code you want to inject to the URLs listed inside of the ```matches``` array (you need to initialize Glue42 to use [Glue42 APIs](https://docs.glue42.com/g4e/reference/glue/latest/glue/index.html), see [Initializing Glue42](#initializing-glue42-api) section)
1. [Add your application to Glue42 Desktop](https://docs.glue42.com/g4e/configuration/index.html#configuration-application_configuration) - inside the ```details``` for your application specify ```allowExtensions: true```
1. Add the path to the glue42-extension-template folder inside the ```extensions``` string array inside of ```%LOCALAPPDATA%/Tick42/GlueDesktop/config/system.json```
1. Start ```Glue42 Desktop``` and launch your application - the extension should be running

##### Please note that you need to restart Glue42 Desktop whenever you rebuild your extension for the changes to take place.

### Initializing Glue42 API

1. Configure Glue42 Enterprise to auto-inject Glue42 <TODO LINK TO INSTRUCTIONS>
1. Use the following code to init Glue42 API
```
const glue = await Glue42();
```

### Examples

This repo contains three examples that inject extension into Linkedin, Glassdoor and Yahoo Finance. Check the examples directory for details