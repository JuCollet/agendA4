const googleApi = (function(){

    const CLIENT_ID = '28576487880-usdrjfiq5c4e9t7992quhgs0vtcfgops.apps.googleusercontent.com';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    let googleApi, userIsSignedIn = false;

    return {
        fetchCalEvents, // get calendar events ([{calId, timeMin, timeMax}] or {calId, timeMin, timeMax}) return an array;
        init, // Initialize gapi object;
        signIn, // Sign in;
        signOut, // Sign out;
        userIsSignedIn // is the user connected ? => Boolean;
    }

    function fetchCalEvents(req){        
        if(!userIsSignedIn || !googleApi.client) return;
        let fetchCounter = 0, fetched = [];
        const reqIsArray = Array.isArray(req);
        
        for(let i = 0; i < reqIsArray ? i < req.length : i < 1; i++){
            googleApi.client.calendar.events.list({
                'calendarId': reqIsArray ? req[i].calId : req.calId,
                'timeMin': reqIsArray ? req[i].timeMin : req.timeMin,
                'timeMax': reqIsArray ? req[i].timeMax : req.timeMax,
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 50,
                'orderBy': 'startTime'
                }).then(res => {
                  let events = res.result.items;
                  fetched.concat(events);
                  fetchCounter++;                  
                  if(!reqIsArray || fetchCounter === req.length){
                    return fetched;
                };
            });
        };
    };

    function init(cb){
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        
        script.onload = () => {
          gapi.load('client:auth2', () => {
            gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
            }).then(() => {
              googleApi = gapi;
              gapi.auth2.getAuthInstance().isSignedIn.listen(_updateSigninStatus);
              _updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get(), cb);
            });
          });
        };
        document.body.appendChild(script);      
    };

    function signIn(cb){
        if(gapi && !userIsSignedIn){
            gapi.auth2.getAuthInstance().signIn().then(() => {
                cb(gapi.auth2.getAuthInstance().isSignedIn.get());
            });
        };
    };

    function signOut(cb){
        if(gapi && userIsSignedIn){
            gapi.auth2.getAuthInstance().disconnect().then(() => {
                cb(gapi.auth2.getAuthInstance().isSignedIn.get());
            });
        };
    };

    function _updateSigninStatus(isSignedIn, callback) {
        userIsSignedIn = isSignedIn;
        callback(userIsSignedIn);
    };

}())

export { googleApi };