import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const VerifyModal = ({secret_key}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // JavaScript code snippet to display
  const codeSnippetOld = `
    <script>
      // Function to get user's geolocation information and log it to the console
      async function getUserLocation() {
        try {
          // Fetch the user's IP address using ip-api (or any similar API)
          const response = await fetch('http://ip-api.com/json/');
          const data = await response.json();
      
          if (response.ok) {
            // Prepare the data object
            const userData = {
              secret_key:"${secret_key}",
              ip_address: data.query,          // User's IP address
              user_agent: navigator.userAgent, // User's browser user-agent
              page_url: window.location.href,  // Current page URL
              visit_time: new Date().toLocaleTimeString(), // Current time when the page is loaded
              domain_url: window.location.hostname, // Domain of the current page
              state: data.regionName,          // Full state name from the geolocation data
              zip_code: data.zip               // ZIP code of the user
            };
    
            // Send the data to your API using a POST request
            const apiUrl = 'http://3.81.40.84/GoogelAnalytics/Visitor/save_visitor_data';
            const apiResponse = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });
    
            if (apiResponse) {
              console.log('Visitor data successfully sent to the API');
            } else {
              console.error('Failed to send visitor data:', apiResponse.statusText);
            }
          } else {
            console.error('Failed to fetch user location:', data.message);
          }
        } catch (error) {
          console.error('Error fetching geolocation data:', error);
        }
      }
    
      // Automatically call the function on page load
      window.onload = function() {
        getUserLocation();
      };
    
    </script>
    
  `;

  // const codeSnippet=`
  //    <script>
  //     let sessionData = {};
  //     async function getUserLocation() {
  //       try {
  //         const response = await fetch('http://ip-api.com/json/');
  //         const data = await response.json()
  //         if (response.ok) {
  //           const visitTime = new Date();
  //           const formattedVisitTime = visitTime.toLocaleString('en-US', {
  //             year: 'numeric',
  //             month: '2-digit',
  //             day: '2-digit',
  //             hour: '2-digit',
  //             minute: '2-digit',
  //             second: '2-digit',
  //             hour12: true,
  //           });
  //           sessionData = {
  //             secret_key:"${secret_key}",
  //             ip_address: data.query,          // User's IP address
  //             user_agent: navigator.userAgent, // User's browser user-agent
  //             page_url: window.location.href,  // Current page URL
  //             domain_url: window.location.hostname, // Domain of the current page
  //             state: data.regionName,          // Full state name
  //             zip_code: data.zip,              // ZIP code
  //             visit_time: formattedVisitTime,  // Formatted session start time
  //           };
  //           console.log("Session data initialized:", sessionData);
  //         } else {
  //           console.error('Failed to fetch user location:', data.message);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching geolocation data:', error);
  //       }
  //     }
  //     async function sendSessionData() {
  //       if (!sessionData.visit_time) {
  //         console.error("Session data is not ready to be sent.");
  //         return;
  //       }
  //       const sessionEndTime = new Date();
  //       const sessionDurationSeconds = (sessionEndTime - new Date(sessionData.visit_time)) / 1000; // Duration in seconds
  //       const minutes = Math.floor(sessionDurationSeconds / 60);
  //       const seconds = Math.floor(sessionDurationSeconds % 60);
  //       const formattedSessionTime = minutes+"m "+ seconds +"s";
  //       sessionData.session_time = formattedSessionTime;
  //       try {
  //         const apiUrl = 'http://3.81.40.84/GoogelAnalytics/Visitor/save_visitor_data';
  //         const response = await fetch(apiUrl, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(sessionData),
  //         });
  //         if (response.ok) {
  //           console.log('Session data successfully sent to the API');
  //         } else {
  //           console.error('Failed to send session data:', response.statusText);
  //         }
  //       } catch (error) {
  //         console.error('Error sending session data:', error);
  //       }
  //     }
  //     window.onload = function () {
  //       getUserLocation();
  //     };
  //     window.onunload = function () {
  //       sendSessionData();
  //     };
  //   </script>`
    const code=`
      <script>
      let sessionData = {};
      let isFirstApiCallDone = false; // Flag to track the first API call
    
      async function getUserLocation() {
        try {
          const response = await fetch('http://ip-api.com/json/');
          const data = await response.json();
          if (response.ok) {
            const visitTime = new Date();
            const formattedVisitTime = visitTime.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            });
            sessionData = {
              secret_key: "${secret_key}",
              ip_address: data.query, // User's IP address
              user_agent: navigator.userAgent, // User's browser user-agent
              page_url: window.location.href, // Current page URL
              domain_url: window.location.hostname, // Domain of the current page
              state: data.regionName, // Full state name
              zip_code: data.zip, // ZIP code
              visit_time: formattedVisitTime, // Formatted session start time
            };
            console.log("Session data initialized:", sessionData);
    
            // First API call without session_time and left_time
            sendSessionData(false);
          } else {
            console.error('Failed to fetch user location:', data.message);
          }
        } catch (error) {
          console.error('Error fetching geolocation data:', error);
        }
      }
    
      async function sendSessionData(includeSessionTime = true) {
        // If includeSessionTime is false, remove session_time and left_time
        if (!includeSessionTime) {
          const dataToSend = { ...sessionData }; // Clone sessionData
          try {
            const apiUrl = 'http://3.81.40.84/GoogelAnalytics/Visitor/save_visitor_data';
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToSend),
            });
            if (response.ok) {
              console.log('First session data successfully sent to the API');
            } else {
              console.error('Failed to send first session data:', response.statusText);
            }
            isFirstApiCallDone = true;
          } catch (error) {
            console.error('Error sending first session data:', error);
          }
        } else {
          // Add session_time and left_time for the second API call
          const sessionEndTime = new Date();
          const sessionDurationSeconds = (sessionEndTime - new Date(sessionData.visit_time)) / 1000; // Duration in seconds
          const minutes = Math.floor(sessionDurationSeconds / 60);
          const seconds = Math.floor(sessionDurationSeconds % 60);
          const formattedSessionTime = minutes + "m " + seconds + "s";
          sessionData.session_time = formattedSessionTime;
          sessionData.left_time = sessionEndTime.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });
    
          try {
            const apiUrl = 'http://3.81.40.84/GoogelAnalytics/Visitor/save_visitor_data';
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sessionData),
            });
            if (response.ok) {
              console.log('Final session data successfully sent to the API');
            } else {
              console.error('Failed to send final session data:', response.statusText);
            }
          } catch (error) {
            console.error('Error sending final session data:', error);
          }
        }
      }
    
      window.onload = function () {
        getUserLocation();
      };
    
      window.onunload = function () {
        // Second API call with session_time and left_time
        sendSessionData(true);
      };
    </script>`




    const codeSnippetV1=`
      <script>
      let sessionData = {};
      async function getUserLocation() {
        try {
          const response = await fetch('http://ip-api.com/json/');
          const data = await response.json();
          if (response.ok) {
            const visitTime = new Date();
            const formattedVisitTime = visitTime.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            });
            sessionData = {
              // f8ee6fa3b93b416bc790f4a2674cf9ed
              secret_key: "${secret_key}",
              ip_address: data.query,
              user_agent: navigator.userAgent,
              page_url: window.location.href,
              domain_url: window.location.hostname,
              state: data.regionName,
              zip_code: data.zip,
              visit_time: formattedVisitTime,
              left_time: null, // Initially null
              session_time: null, // Initially null
            };
            console.log("Session data initialized:", sessionData);
            sendSessionData(); // API call on session start
          } else {
            console.error('Failed to fetch user location:', data.message);
          }
        } catch (error) {
          console.error('Error fetching geolocation data:', error);
        }
      }
    
      async function sendSessionData() {
        try {
          const apiUrl = 'https://ewebsftp.com/GoogelAnalytics/Visitor/save_visitor_data';
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
          });
          if (response.ok) {
            console.log('Session data successfully sent to the API:', sessionData);
          } else {
            console.error('Failed to send session data:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending session data:', error);
        }
      }
    
      window.onload = function () {
        getUserLocation();
      };
    
      window.onunload = async function () {
        const sessionEndTime = new Date();
        const formattedLeftTime = sessionEndTime.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        const sessionDurationSeconds = (sessionEndTime - new Date(sessionData.visit_time)) / 1000; // Duration in seconds
        const minutes = Math.floor(sessionDurationSeconds / 60);
        const seconds = Math.floor(sessionDurationSeconds % 60);
        const formattedSessionTime = minutes+" m"+ seconds" s";
    
        sessionData.left_time = formattedLeftTime; // Update left_time
        sessionData.session_time = formattedSessionTime; // Update session_time
    
        await sendSessionData(); // API call on session end
      };
    </script>`

    const codeSnippetv2=`
      <script>
      // Latest Version Pexel
      let sessionData = {};
async function getUserLocation() {
  try {
    // First API call to get IP address from ipify
    const response = await fetch('https://api.ipify.org/?format=json');
    const data = await response.json();
    console.log("API response:", data.ip);

    if (response.ok) {
      const visitTime = new Date();
      const formattedVisitTime = visitTime.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      // Initialize session data with IP from ipify
      sessionData = {
        secret_key: "${secret_key}", // This can be a secret key you use to authenticate the request
        ip_address: data.ip,
        user_agent: navigator.userAgent,
        page_url: window.location.href,
        domain_url: window.location.hostname,
        visit_time: formattedVisitTime,
        left_time: null, // Initially null
       // session_time: null,  Initially null
        session_id: generateSessionId(), // Unique session ID to track the session
      };

      console.log("Session data initialized:", sessionData);

      // Send session data directly to your database API
      await sendSessionData('start');
    } else {
      console.error('Failed to fetch user location:', data.message);
    }
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
  }
}

function generateSessionId() {
  // Generate a simple unique session ID (You can replace this with a more robust approach if needed)
  return 'session-' + Math.random().toString(36).substr(2, 9);
}

async function sendSessionData(type) {
  try {
    const apiUrl = 'https://ewebsftp.com/GoogelAnalytics/Visitor/save_visitor_data';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });

    if (response.ok) {
      const responseData = await response.json(); // Parse the JSON response

      if(responseData?.data?.visit_time){
        sessionData.visit_time=responseData?.data?.visit_time
      }

    } else {
      console.error("Failed" );
    }
  } catch (error) {
    console.error("error");
  }
}

window.onload = function () {
  getUserLocation();
};

// Capture page change or reload events (unload or beforeunload)
window.addEventListener('beforeunload', async function (event) {
  const sessionEndTime = new Date();
  const formattedLeftTime = sessionEndTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  // Calculate session duration in seconds
  // let entry_time=localStorage.getItem('entry_time')
  // console.log(entry_time)
  // const sessionDurationSeconds = (sessionEndTime - new Date(sessionData.visit_time)) / 1000;
  // const minutes = Math.floor(sessionDurationSeconds / 60);
  // const seconds = Math.floor(sessionDurationSeconds % 60);
  // const formattedSessionTime = minutes +"m" +seconds+"s";

  // Update sessionData with left time and session duration
  sessionData.left_time = formattedLeftTime;
  // sessionData.session_time = formattedSessionTime;
  // Send session data on page unload
  try {
    await sendSessionData('end');
     // API call when session ends
  } catch (error) {
    console.error('Error sending session data on unload:', error);
  }
});

// Optionally handle reloads to avoid sending redundant data
window.addEventListener('load', function () {
  const storedSessionId = sessionStorage.getItem('session_id');
  if (storedSessionId) {
    sessionData.session_id = storedSessionId;
  } else {
    sessionStorage.setItem('session_id', sessionData.session_id);
  }
});

    </script>`

    const codeSnippetWorking=`
    <script>
      let sessionData = {};
    
      async function getUserLocation() {
        try {
          // First API call to get IP address from ipify
          const response = await fetch('https://api.ipify.org/?format=json');
          const data = await response.json();
          console.log("API response:", data.ip);
    
          if (response.ok) {
            const visitTime = new Date();
            const formattedVisitTime = visitTime.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            });
            // Initialize session data with IP from ipify
            sessionData = {
              secret_key: "${secret_key}", // Your secret key
              ip_address: data.ip,
              user_agent: navigator.userAgent,
              page_url: window.location.href,
              domain_url: window.location.hostname,
              visit_time: formattedVisitTime,
              left_time: null, // Initially null
              session_id: generateSessionId(), // Unique session ID
            };
    
            console.log("Session data initialized:", sessionData);
    
            // Store session ID to sessionStorage to reuse on reloads
            sessionStorage.setItem('session_id', sessionData.session_id);
    
            // Send session data directly to your database API
            await sendSessionData('start');
          } else {
            console.error('Failed to fetch user location:', data.message);
          }
        } catch (error) {
          console.error('Error fetching geolocation data:', error);
        }
      }
    
      function generateSessionId() {
        // Generate a simple unique session ID (You can replace this with a more robust approach if needed)
        return 'session-' + Math.random().toString(36).substr(2, 9);
      }
    
      async function sendSessionData(type) {
        try {
          const apiUrl = 'https://ewebsftp.com/GoogelAnalytics/Visitor/save_visitor_data';
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sessionData),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            console.log("responseData");
            if (responseData?.data?.visit_time) {
              sessionData.visit_time = responseData?.data?.visit_time;
            }
          } else {
            console.error("response.statusText");
          }
        } catch (error) {
          console.error("error");
        }
      }
    
      window.onload = function () {
        getUserLocation();
    
        // Capture session ID from sessionStorage if it exists
        const storedSessionId = sessionStorage.getItem('session_id');
        if (storedSessionId) {
          sessionData.session_id = storedSessionId;
        }
      };
    
      // Handle page unload or beforeunload events
      window.addEventListener('beforeunload', async function (event) {
      event.preventDefault();
        const sessionEndTime = new Date();
        const formattedLeftTime = sessionEndTime.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
    
        // Update session data with left time
        sessionData.left_time = formattedLeftTime;
    
        // Send session data when the page is about to unload
        try {
          await sendSessionData('end');
        } catch (error) {
          console.error('Error sending session data on unload:', error);
        }
      });
    
      // To avoid sending redundant data, use sessionStorage to track if a session was already initiated
      window.addEventListener('load', function () {
        const storedSessionId = sessionStorage.getItem('session_id');
        if (storedSessionId) {
          sessionData.session_id = storedSessionId;
        } else {
          sessionStorage.setItem('session_id', sessionData.session_id);
        }
      });
    </script>`

  const codeSnippet=`
  <script type="text/javascript">
  window.secretKey = "${secret_key}";
  </script>
  <script type="text/javascript" src="https://ewebsftp.com/GoogelAnalytics/public/uploads/pexel.js" async></script>`

  return (
    <div>
      <div className="flex justify-end mt-2">
        <button
          onClick={toggleModal}
          className="bg-yellow-500 text-white px-2 py-2 rounded-lg hover:bg-yellow-600"
        >
          Show Code
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="relative p-4 bg-white rounded-lg shadow w-full max-w-2xl"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Code Snippet
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(codeSnippet);
                alert("Code copied to clipboard!");
              }}
              className="bg-blue-500 text-white px-3 py-2 mb-3 rounded-lg hover:bg-blue-600"
            >
              Copy
            </button>
            <h1 className="my-2 text-xl text-rose-600 text-justify">
            {`Copy the following code and paste it into every page (or into the master template) of your website just before the closing </body> tag.`}
            </h1>
            <div className="overflow-auto">
              <SyntaxHighlighter language="javascript" style={docco}>
                {codeSnippet}
              </SyntaxHighlighter>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyModal;
