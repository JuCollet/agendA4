const googleApi = (function(){

    const CLIENT_ID = '28576487880-usdrjfiq5c4e9t7992quhgs0vtcfgops.apps.googleusercontent.com';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    let googleApi, userIsSignedIn = false;

    return {
        init, // Initialize gapi object;
        signIn,
        signOut,
        userIsSignedIn
    }

    function init(){
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
              _updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            });
          });
        };
        document.body.appendChild(script);      
    }

    function signIn(){
        if(gapi && gapi.auth2 && !userIsSignedIn){
            gapi.auth2.getAuthInstance().signIn();            
        }
    }

    function signOut(){
        if(gapi && gapi.auth2 && userIsSignedIn){
            gapi.auth2.getAuthInstance().disconnect();                    
        }
    }

    function _updateSigninStatus(isSignedIn, callback) {
        userIsSignedIn = isSignedIn;
        console.log(userIsSignedIn)
    }

}())

export { googleApi };