Glue42 Extension Template Examples - LinkedIn to ClientList
===========================================================

##### Selecting a LinkedIn profile syncs contact with the ClientList application

### Prerequisites

[```Glue42 Desktop 3.9.1 or later```](https://glue42.com)

### Steps to run the demo

1. Clone https://github.com/Tick42/glue42-extension-template
2. Paste ```glue42-extension-template/examples/linkedin-to-clientlist/linkedin.json``` inside of %LOCALAPPDATA%/Tick42/GlueDesktop/config/apps
3. Add the path to the glue42-extension-template/examples/linkedin-to-clientlist folder inside the ```extensions``` string array inside of ```%LOCALAPPDATA%/Tick42/GlueDesktop/config/system.json```
4. Start ```Glue42 Desktop``` and launch the LinkedIn (you need to login the first time) and ClientList applications
5. Inside of LinkedIn find the profile of one of the clients from the ClientList application
6. Opening the profile syncs contact with the ClientList application and displays a notification
