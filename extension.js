/* global injectedGlue, gapi */

const CLIENT_ID =
  "1089231910448-3kp6k9k79qt2eth14727e3s5h09hrgan.apps.googleusercontent.com";
const API_KEY = "AIzaSyCQnbjs6MH4vTGUZC72RoHqbSZIMlN1fRc";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
  // "https://translation.googleapis.com/$discovery/rest?version=v3beta1"
];
const SCOPES = "https://mail.google.com/";

const gapi = (window.gapi = window.gapi || {});

function listLabels() {
  gapi.client.gmail.users.labels
    .list({
      userId: "me"
    })
    .then(function(response) {
      console.log("list labels response", response);
      var labels = response.result.labels;
      appendPre("Labels:");

      if (labels && labels.length > 0) {
        for (i = 0; i < labels.length; i++) {
          var label = labels[i];
          appendPre(label.name);
        }
      } else {
        appendPre("No Labels found.");
      }
    })
    .catch(a => {
      console.log("list labels failed", a);
    });
}

const authorizeButton = document.createElement("div");
authorizeButton.style.position = "fixed";
authorizeButton.style.top= "0px";
authorizeButton.style.right = "0px";
authorizeButton.style.zIndex = "9001";
authorizeButton.textContent = "Authorize";

const appendPre = message => {
  var pre = document.querySelector(".oo");
  var textContent = document.createTextNode(message + "\n");
  pre.appendChild(textContent);
};

const handleAuthClick = () => {
  gapi.auth2
    .getAuthInstance()
    .signIn()
    .catch(console.error);
};

const handleClientLoad = async () => {
  gapi.load("client:auth2", initClient);

  document.body.appendChild(authorizeButton);


  // gapi.auth2.authorize({
  //   response_type: 'permission',
  //   scope: SCOPES,
  //   client_id: CLIENT_ID,
  // }, (response, err) => {
  //   console.log("Auth response", response, err)

  // }, err => {
  //   console.log("Auth err", err)
  // })
};

const initClient = () => {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(
      res => {
        console.log("Client init response", res);
        // Listen for sign-in state changes.

        gapi.auth2.getAuthInstance().isSignedIn.listen(a => {
          console.log("is signedin changed", a);
        });

        const signedIN = gapi.auth2.getAuthInstance().isSignedIn.get();

        if (signedIN) {
          initPage();
        }
        // Handle the initial sign-in state.

        authorizeButton.onclick = handleAuthClick;
      },
      error => {
        appendPre(JSON.stringify(error, null, 2));
      }
    );
};

const initPage = () => {
  window.onhashchange = e => {
    const threadIdNode = document.querySelector(".ha .hP");
    const threadId =
      threadIdNode && threadIdNode.getAttribute("data-thread-perm-id");

    if (!threadId) {
      return;
    }

    console.log("legacy thread id", threadId);

    gapi.client.gmail.users.threads.get({
      userId: 'me',
      id: threadId
    }).then(({ result}) => {

      console.log("Thread result", result)
      const sender = getSender(result)

      console.log("Sender is", sender)

      injectedGlue.agm.invoke("T42.GNS.Publish.RaiseNotification", {
        notification: {
          title: "Email opened",
          severity: "Low",
          description: sender
        }
      });
    }).catch(b => {
      console.log('Thread err', b)
    })
  };
};

const getSender = (thread) => {

  const headers = thread.messages[0].payload.headers

  const fromHeader = headers.find(header => header.name === 'From')
  const sender = fromHeader.value
  return sender
}
// const getThreads = (query, labels) => {
//   return gapi.client.gmail.users.threads.list({
//     userId: "me",
//     q: query, //optional query
//     labelIds: labels //optional labels
//   }); //returns a promise
// };

//takes in an array of threads from the getThreads response
// const getThreadDetails = threads => {
//   var batch = new gapi.client.newBatch();

//   for (var ii = 0; ii < threads.length; ii++) {
//     batch.add(
//       gapi.client.gmail.users.threads.get({
//         userId: "me",
//         id: threads[ii].id
//       })
//     );
//   }

//   return batch;
// };

// const getThreadHTML = threadDetails => {
//   var body = threadDetails.result.messages[0].payload.parts[1].body.data;
//   return B64.decode(body);
// };

setTimeout(() => {
  handleClientLoad();
}, 2000)

