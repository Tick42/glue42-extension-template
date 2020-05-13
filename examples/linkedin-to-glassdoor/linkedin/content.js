(async () => {
    const { setStatusToConnected, setStatusToDisconnected } = createGlue42Indicator();

    // Call the Glue42 JS SDK's Glue factory function and assign the Glue42 APIs entry point glue to window.injectedGlue to be used inside of extension.js and for debugging purposes
    window.injectedGlue = await Glue();

    // Set the status to connected
    setStatusToConnected();

    // Set the status to disconnected when the Glue42 GW connection drops
    injectedGlue.connection.disconnected(setStatusToDisconnected);

    // sync contact every second
    let lastUrl = "";
    setInterval(() => {
        const currentUrl = window.document.location.href;
        if (lastUrl !== currentUrl) {
            syncContact();
            lastUrl = currentUrl;
        }
    }, 1000);
})();

function createGlue42Indicator() {
    // Wrapper element for the connectionImageElement and toolTipElement
    const wrapperElement = document.createElement('div');
    wrapperElement.style.position = 'fixed';
    wrapperElement.style.top = '0px';
    wrapperElement.style.left = '0px';
    wrapperElement.style.zIndex = '9001';
    wrapperElement.style.textAlign = 'left';

    // ConnectionImageElement for the image
    const connectionImageElement = document.createElement('img');
    // Base64 connected and disconnected icons
    const connected = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5VJREFUeNrsnL9rE2EYx9/cY4R0kGZSA0q3DBmSQsShg3UrOIhL5ghC54KZxTmLf4DQOtpFRZx1ikuhImSJgyFKligpLfgLNb5vsRKwudy1977Pc/d+v/Byhbx5r/f53I/3Lve+SiEIgiAIgiAIgiAIgiC+JCfpn2m1Wot68VKXmuVVbbXb7du2t+fOiy9me5q63NRlVZc9Xd7o8ujhjYUtUQIcwnciQcM32/FEl6UZVYyI6+QpfJPaysrKUqfTeWYBvoH+WpcLIdXMZ2uBp/CP0tTr37TQ7j1dFqPsBIHH8G1KaEatGHgOP3EJ+vSzGqd+APjWT0eyuqFx4JdKJVWpVGKvo9vtquFwyNI7+nsBfi9SQFz46+vrqlAoxFrHzs6O2t7eZu2iagm7UY/uAPCtnI7uR6y3F/gG37Rfr9etStB3uU/14kGEqhuBb/BN+41Gw4WEDb24pUv/mI9f6bJsHkfkfIM/3b75nvm+g2tCberGrK/B961fhKXDdy1hVshn+Cammzsej6N0W608OyKf4UuQQL7D55ZAgM8rgQCfVwIBPq8E8g3+5tsf6vm7n+rKRVJ5yrFLIN/gdz7+UvvfJ6r76bcICeQb/KNIkUA+wpckgXyFL0UC+QxfggTyHT63BAJ8XgkE+LwSCPB5JRDg80ogwOeVQIDPK4EAn1cCAT6vBAJ8XgnsAzSmUywWT/1jStpC+jz0TR8Kj/Xfayp8SI06ODhQvV5PVatVlc/nI6/E7NkGrnlrOSyj0ehwz5n3RvTyeVKfv07Uh/2JU1iXzgXq7tWzaiEf/jpVnHeNDq8BkiSYw1aiBBvwzYte/3pBkOAe/n/3AZDgFv6xd8LSJJhSLpdD27clwTb8mc+CpF2Yo7SftAQX8EOfhkqSELX9pCS4gh8qwFcJLuHPFeCbBNfwIwnwRQIH/MgCsi6BC34sAVmVwAk/toCsSeCGfyIBWZEgAf6JBaRdghkcKgH+qQSkWcK1y2dCf1BxBf/UAtIqYV5cjh1OZIxYliS4Hrid2CjJLEjgGDWf6DjhNEvgmrIg8ZHyaZTAOV+Elbki0iQhk5N1pEUCN3yrAqRLkADfugCpEgaDgQj4TgRIlBBxSksnM6w7m7xbkgQp8JXCxK2s8FkExJXgOE7hswkQKsE5fFYBwiSwwGcXIEQCG3wRApglsMIXI4BJAjt8UQIcSxABH0EQBEEQBEEQBEEQBPErfwQYAIFzYLri2yOjAAAAAElFTkSuQmCC';
    const disconnected = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5BJREFUeNrsnb9O21AUh285RAoSiDIkilhSwcDAQAY2pm59gsztxMLKU/AEmQpj2foEbEwMZMjCkCFDFgYqIH+QIlKfSKmo2ji2Sc451/f3k6IQydjO9+XY8c29184hCIIgCIIgCIIgCIIgoeSDpZ05PT39WCqVrk5OTmpra2tzl7+5uXGXl5dZNnV+dnb2zcJ7Jkvwo6erfr9fu7u7cwcHB65QKMT+z/b2ttva2nKtVivt5mpHR0efrq+vf0LAG/gMhl8/PT25UCSQNfjTpJWwu7s7kTAajbySQBbhZ5HAVbC3t+eazaZXEsgq/LcSqtWqK5fLc9e5sbHhnQSyDJ9Tr9ddrVZLvG7fJKxYh394eJh6G3w4KhaLWXbva7R/33NbARLwB4OBazQa7v7+PutuilYC5RF+t9t97+6KSVgJDT5/ZU24fpHDEYUG//j4eHJSf3h4SFIpS68ECg3+tI1pf3/fhAQKEf40FiRQqPCtSKCQ4VuQQKHD15ZAgK8rgQBfVwIBvq4ECg3+y8uL6/V6cxvrpCRQaPA7nc7kNwb+gceCBAoN/uvr6+T18/OzCQkUIvxpLEigUOFbkUAhw7cggUKHry2BAF9XAgG+rgQCfF0JBPi6EgjwdSUQ4OtKIMDXlUCAryuBAF9Xgnjn3Lhwp9rQQtFxaBiVwo/o7y/RoxK3MI9AYUj8SU0T/tTwIAsebMFt8bPCHWqTDMhYXV116+vr7vHx0Y3HYzFYlUrFbW5uzl2OBw7yAMIEOZ+cAyxJSDoqRlrCMuDzSM0/34IgQR7+P9cBkCAL/79XwpAgB39mWxAkyMCPbQ0NWYIU/FgBoUqQhD9XQGgSpOEnEhCKBA34iQXkXYIW/FQC8ipBE35qAXmToA0/k4C8SLAAP7MA3yVwe74F+O8S4LOEJBN5SMB/twBfJViBvxABeZMgCX9hAvIiQRr+QgX4LkED/sIF+CpBC/5SBPgmQRP+0gT4IkEb/lIFWJdgAf7SBViVwL3qLMAXEWBRQsJJ/URmWBebNdGSBCvwRQVIS+CZc4fDoWn4HPHOudGb+xU9fY4etwu8OPor3DPZB/jiFZC1ErgKkkzezeHjO3eF5y7x1uGrVEDaSmD4Ozs7uYTPUb+HTNwAkTQTMLXbbXdxceEVfBMCZklIA9/nm/mYuYvSWwmhwFc9B8w6J5RKpdtQ4CMIgiAIgiAIgiAIgiBh5bcAAwDaDiB3qOTxkAAAAABJRU5ErkJggg==';
    // Width of the image
    const connectionImageElementPixelWidth = 48;
    // Height of the image
    const connectionImageElementPixelHeight = 48;
    connectionImageElement.style.width = `${connectionImageElementPixelWidth}px`;
    connectionImageElement.style.height = `${connectionImageElementPixelHeight}px`;
    wrapperElement.appendChild(connectionImageElement);

    // TooltipElement for the Glue42 connection details
    const tooltipElement = document.createElement('div');
    // Hide the tooltipElement initially
    tooltipElement.style.display = 'none';
    tooltipElement.style.top = `${connectionImageElementPixelHeight}px`;
    tooltipElement.style.backgroundColor = 'black';
    tooltipElement.style.color = 'white';
    // Method that hides the tooltipElement
    const hideTooltipElement = () => {
        tooltipElement.style.display = 'none';
    };
    // Method that shows the tooltipElement
    const showTooltipElement = () => {
        tooltipElement.style.display = 'block';
    };
    wrapperElement.appendChild(tooltipElement);

    // Method that sets the status to connected by displaying the connected icon and connection details inside the tooltip
    const setStatusToConnected = () => {
        connectionImageElement.src = connected;
        if (typeof injectedGlue !== 'undefined') {
            tooltipElement.textContent = `Extension: Glue42 Extension Template Examples LinkedIn to GlassDoor (LinkedIn); Version: ${injectedGlue.version}; Username: ${injectedGlue.connection.resolvedIdentity.user}; GW URL: ${injectedGlue.config.connection.ws};`;
        }
    };
    // Method that sets the status to disconnected by displaying the disconnected icon and disconnected tooltip
    const setStatusToDisconnected = () => {
        connectionImageElement.src = disconnected;
        tooltipElement.textContent = 'Disconnected ☹️';
    };
    // Set the initial status to disconnected
    setStatusToDisconnected();

    document.body.appendChild(wrapperElement);

    // Stores the state of the mouse's right click
    let isMouseDown = false;

    // Hide the tooltipElement when not hovering over the connectionImageElement
    connectionImageElement.onmouseout = hideTooltipElement;
    // Show the tooltipElement when hovering over the connectionImageElement and when the mouse's right click isn't pressed
    connectionImageElement.onmouseover = () => {
        if (!isMouseDown) {
            showTooltipElement();
        }
    };

    // Stores the X and Y offsets from the
    let offsetX = 0;
    let offsetY = 0;

    // Callback called whenever the connectionImageElement is clicked
    const connectionImageElementMouseDown = (event) => {
        // Set the mouse's right click value to true
        isMouseDown = true;
        // Hide the tooltipElement while dragging
        hideTooltipElement();
        // Prevent the default image dragging behaviour that allows you to drop the url inside of an input field
        event.preventDefault();
        // Get the new mouse coordinates
        const x = event.clientX;
        const y = event.clientY;

        // Calculate the X offset from the current wrapperElement position
        const wrapperElementLeft = wrapperElement.style.left;
        const wrapperElementLeftInt = +wrapperElementLeft.slice(0, wrapperElementLeft.indexOf('px'));
        offsetX = x - wrapperElementLeftInt;

        // Calculate the Y offset from the current wrapperElement position
        const wrapperElementTop = wrapperElement.style.top;
        const wrapperElementTopInt = +wrapperElementTop.slice(0, wrapperElementTop.indexOf('px'));
        offsetY = y - wrapperElementTopInt;

        // Attach the wrapperElementMove callback to mousemove
        window.addEventListener('mousemove', wrapperElementMove, true);
    };

    // Callback called whenever the mouse is released
    const mouseUp = () => {
        // Set the mouse's right click value to false
        isMouseDown = false;
        // Detach the wrapperElementMove callback from mousemove
        window.removeEventListener('mousemove', wrapperElementMove, true);
    };

    // Callback called whenever the wrapperElement is dragged
    const wrapperElementMove = (event) => {
        // Get the new mouse coordinates
        const x = event.clientX;
        const y = event.clientY;

        // Calculate and set the newLeft of the wrapperElement
        let newLeft = x - offsetX;
        if (newLeft < 0) {
            newLeft = 0;
        }
        if (newLeft + connectionImageElementPixelWidth > window.innerWidth) {
            newLeft = window.innerWidth - connectionImageElementPixelWidth;
        }
        wrapperElement.style.left = newLeft + 'px';

        // Calculate and set the newTop of the wrapperElement
        let newTop = y - offsetY;
        if (newTop < 0) {
            newTop = 0;
        }
        if (newTop + connectionImageElementPixelHeight > window.innerHeight) {
            newTop = window.innerHeight - connectionImageElementPixelHeight;
        }
        wrapperElement.style.top = newTop + 'px';
    };

    // Attach the mousedown and mouseup listeners
    connectionImageElement.addEventListener('mousedown', connectionImageElementMouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
    // Show the tooltipElement when the mouse is released
    connectionImageElement.addEventListener('mouseup', showTooltipElement, false);

    return {
        setStatusToConnected, setStatusToDisconnected
    }
}

// Stores the current to be executed timeout id
let timeout;
function syncContact() {
    // Clear the timeout in case the user is switching profiles fast
    if (typeof timeout !== 'undefined') {
        clearTimeout(timeout);
    }

    // There isn't a way to tell when the SPA content is loaded. 500 ms after every location change check if there is a company on the current page
    timeout = setTimeout(async () => {
        let ownProfile;

        // Determine if the opened profile is of the currently logged in user
        const artDecoElement = document.getElementsByClassName('artdeco-button__text')[2];

        if (typeof artDecoElement !== 'undefined') {
            ownProfile = artDecoElement.innerText === 'Add profile section';
        }

        let company;

        if (ownProfile) {
            // Get the company from the profile's description
            const t18Elements = document.getElementsByClassName('t-18');
            const positionElement = t18Elements[t18Elements.length - 1];

            if (typeof positionElement !== 'undefined') {
                const positionElementSplit = positionElement.textContent.split('at');

                if (positionElementSplit.length > 0) {
                    company = positionElementSplit[positionElementSplit.length - 1].trim();
                }
            }
        } else {
            // Get the company from the past positions
            const profileCurrentCompanyElement = document.getElementsByClassName('pv-entity__secondary-title')[0];

            if (typeof profileCurrentCompanyElement !== 'undefined') {
                company = profileCurrentCompanyElement.textContent.trim();
            }
        }

        if (typeof company !== 'undefined') {
            try {
                // Invoke the 'T42.GlassDoor.SyncCompany' method with the company to sync with the GlassDoor application
                await injectedGlue.agm.invoke('T42.GlassDoor.SyncCompany', {
                    company: company
                }, 'all');

                // Invoke the 'T42.GNS.Publish.RaiseNotification' method to trigger a notification
                await injectedGlue.agm.invoke('T42.GNS.Publish.RaiseNotification', {
                    notification: {
                        title: company,
                        severity: 'Low',
                        description: 'Company synced (LinkedIn => GlassDoor)!'
                    }
                });
            } catch (e) { }
        }
    }, 500);
};
