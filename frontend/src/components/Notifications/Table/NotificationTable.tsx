import './NotificationTable.css';

import React from 'react';
import { Card, Table } from 'react-bootstrap';
import NotificationLog from '../../../services/classes/NotificationLog';

type Props = {
	notificationLogs: NotificationLog[]
};
const NotificationTable: React.FC<Props> = ({ notificationLogs }) => {
	return (
		<div className="row mt-4 justify-content-center">
			<div className="col-md-8">
				<Card>
					<Card.Header>Notifications history</Card.Header>
					<Card.Body>
						<div className="table-container">
							<Table striped bordered hover responsive>
								<thead>
									<tr>
										<th>Date</th>
										<th>User</th>
										<th>Type</th>
										<th>Channel</th>
										<th>Payload</th>
									</tr>
								</thead>
								<tbody>
								{notificationLogs.map((row, index) => (
									<tr key={index}>
										<td>{row.createdAt}</td>
										<td>{row.userName}</td>
										<td>{row.messageCategory}</td>
										<td>{row.notificationType}</td>
										<td>{row.payload}</td>
									</tr>
								))}
								</tbody>
							</Table>
						</div>
					</Card.Body>
				</Card>
			</div>
		</div>
  	);
}

export default NotificationTable;
