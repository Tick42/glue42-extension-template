# Glue42 Extension Template

Easy 3rd party integrations without any code changes/bridges/plug-ins/APIs.

## Prerequisites

[**Glue42 Enterprise**](https://glue42.com) 3.9.1 or later, [`node` & `npm`](https://nodejs.org/en/).

## Creating an Extension

1. Clone this repo: https://github.com/Tick42/glue42-extension-template.
2. Open the `manifest.json` file and edit the extension `name` and the `content_script.matches` URL string array with the name and URL of your application.
3. Open the `content.js` file and write the code you want to inject to the URLs listed in the `matches` array (you need to [initialize the Glue42 library](#initializing-the-glue42-library) to use [Glue42 APIs](https://docs.glue42.com/g4e/reference/glue/latest/glue/index.html).
4. [Add your application to **Glue42 Enterprise**](https://docs.glue42.com/getting-started/how-to/glue42-enable-your-app/javascript/index.html#application_configuration). In the `details` property for your application, add `"allowExtensions": true`.
5. Open the `system.json` file of **Glue42 Enterprise** (located in `%LOCALAPPDATA%/Tick42/GlueDesktop/config/system.json`) and add the path to the `glue42-extension-template` folder to the `extensions` string array.
6. Start **Glue42 Enterprise** and launch your application.

*Note that you need to restart **Glue42 Enterprise** whenever you rebuild your extension for the changes to take place.*

## Initializing the Glue42 Library

1. Configure **Glue42 Enterprise** to [auto inject the Glue42 library](https://docs.glue42.com/getting-started/how-to/glue42-enable-your-app/javascript/index.html#auto_injecting_the_library).
2. Use the following code to initialize the Glue42 library:
  
```javascript
const glue = await Glue();
```

## Examples

This repo contains three examples that inject extension into LinkedIn, Glassdoor and Yahoo Finance. Check the `/examples` directory for details.
