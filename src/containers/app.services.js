const googleApi = (function(){

    const CLIENT_ID = '28576487880-usdrjfiq5c4e9t7992quhgs0vtcfgops.apps.googleusercontent.com';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    const colors = {
        9:"#5484ed",
        1:"#a4bdfc",
        7:"#46d6db",
        2:"#7ae7bf",
        10:"#51b749",
        5:"#fbd75b",
        4:"#ffb878",
        11:"#ff887c",
        3:"#dc2127",
        6:"#dbadff",
        8:"#e1e1e1"
    };
    let googleApi, userIsSignedIn = false;

    return {
        fetchCalEvents, // get calendar events ([{calId, timeMin, timeMax}] or {calId, timeMin, timeMax}) return an array;
        fetchCalendarList, // get the list of user's calendars;
        init, // Initialize gapi object;
        signIn, // Sign in;
        signOut, // Sign out;
        userIsSignedIn // is the user connected ? => Boolean;
    }

    function fetchCalEvents(req, timeMin, timeMax, firstDay, cb, err){        
        if(!userIsSignedIn || !googleApi.client) return;
        let fetchCounter = 0, fetched = [];
        const reqIsArray = Array.isArray(req);
        const loops = reqIsArray ? req.length : 1

        for(let i = 0; i < loops; i++){
            googleApi.client.calendar.events.list({
                'calendarId': reqIsArray ? req[i] : req.calId,
                'timeMin': timeMin,
                'timeMax': timeMax,
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 50,
                'orderBy': 'startTime'
                }).then(res => {
                  let events = res.result.items;
                  fetched = fetched.concat(events);
                  fetchCounter++;                  
                  if(!reqIsArray || fetchCounter === req.length){
                      if(cb){
                          return cb(_processData(fetched, firstDay))
                      }
                    return fetched;
                };
                }).catch(e => {
                    err();
                })
        };
        return cb({}); // Set empty object state if there's no calendar in selectedCalendars array.
    };

    function fetchCalendarList(cb){
        if(!userIsSignedIn || !googleApi.client) return;
        googleApi.client.calendar.calendarList.list()
            .then(response => {
                return cb(response.result.items);
            });
    }

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

    function _processData(eventsArray, firstDay){
        let newProcessedData = {};
        eventsArray.forEach(el=>{
            if(el.start.date || el.start.dateTime){
                const fullDayDate = el.start.date ? true : false;
                // Remove Google Timezone info;
                const startDate = fullDayDate ? new Date(el.start.date.indexOf('+') !== -1 ? el.start.date.split('+')[0] : el.start.date ) : new Date(el.start.dateTime.indexOf('+') !== -1 ? el.start.dateTime.split('+')[0] : el.start.dateTime);
                if(!newProcessedData[startDate.getDate()+firstDay]){
                    newProcessedData[startDate.getDate()+firstDay] = [];
                }
                newProcessedData[startDate.getDate()+firstDay].push({
                    eventText : el.summary,
                    startTime : !fullDayDate ? `${startDate.getHours()}:${startDate.getMinutes() < 10 ? "0"+startDate.getMinutes() : startDate.getMinutes()}` : null,
                    color : el.colorId ? colors[el.colorId] : "#f2c463"
                });
            } else {
                return;
            }
        });
        return newProcessedData;
    }

    function signIn(cb, cb2){
        if(gapi && !userIsSignedIn){
            gapi.auth2.getAuthInstance().signIn().then(() => {
                userIsSignedIn = true;
                cb(gapi.auth2.getAuthInstance().isSignedIn.get());
                cb2();
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
        if(callback) callback(userIsSignedIn);
    };

}())

export { googleApi };