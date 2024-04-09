import './App.css';

import React, { useEffect, useRef, useState } from 'react';
import NotificationForm from './components/Notifications/Form/NotificationForm';
import NotificationTable from './components/Notifications/Table/NotificationTable';
import NotificationLog from './services/classes/NotificationLog';
import NotificationService from './services/Notification/NotificationService';

const FCApp: React.FC = () => {
  const service = useRef(new NotificationService());
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);

  const getLogs = () => {
    service.current.getLogs().then((logs: NotificationLog[]) => {
			setNotificationLogs(logs);
		});
  }

  useEffect(getLogs, [notificationLogs]);

  const sendNotification = (messageCategoryId: string, message: string) => {
    service.current.sendNotifications(messageCategoryId, message).then(response => {
      if (response) {
        alert('Notifications sent');
        getLogs();
      } else {
        alert('An error has occurred, please try again later.')
      }
    });
  };

  return (
    <div className="container-fluid h-100 form-container">
      <NotificationForm sendNotification={sendNotification} />
      <NotificationTable notificationLogs={notificationLogs} />
    </div>
  );
}

export default FCApp;
