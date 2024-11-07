const sendNotification = (message, recipient) => {
    console.log(`Notification to ${recipient}: ${message}`);
  };
  
  const sendAlert = (message) => {
    console.log(`ALERT: ${message}`);
  };
  
  module.exports = {
    sendNotification,
    sendAlert,
  };
  