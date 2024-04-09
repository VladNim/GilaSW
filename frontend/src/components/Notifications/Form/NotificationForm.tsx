import './NotificationForm.css';

import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import MessageCategoryService from '../../../services/MessageCategories/MessageCategoryService';
import MessageCategory from '../../../services/classes/MessageCategory';

type Props = {
	sendNotification: Function
};
const NotificationForm: React.FC<Props> = ({ sendNotification }) => {
	const [message, setMessage] = useState('');
	const [messageCategories, setMessageCategories] = useState<MessageCategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	
	useEffect(() => {
		const service: MessageCategoryService = new MessageCategoryService();
		service.getMessageCategories().then((categories: MessageCategory[]) => {
			setMessageCategories(categories);
		});
	}, []);

	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (message.trim() !== '' && selectedCategory !== '') {
			sendNotification(selectedCategory, message);
			setMessage('');
			setSelectedCategory('');
		} else {
			alert('Message cannot be empty and you need to select a Message category!');
		}
	};

	const categoryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { value } } = e;
		setSelectedCategory(value);
	};

  	return (
		<div className="row justify-content-center h-100">
			<div className="col-md-8 my-auto">
				<Card>
					<Card.Body>
						<Form onSubmit={handleFormSubmit}>
							<Form.Group>
								<Form.Label className="form-label">Select a Category</Form.Label>
								<Form.Control as="select" value={selectedCategory} onChange={categoryChanged}>
										<option
											key={''}
											value={''}
										>
										</option>
									{messageCategories.map(({ id, name }: MessageCategory) => (
										<option
											key={id}
											value={id}
										>
											{name}
										</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label className="form-label">Enter the message</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									value={message}
									onChange={handleTextAreaChange}
								/>
							</Form.Group>
							<Button className="submit" variant="primary" type="submit">Send notifications</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
  	);
}

export default NotificationForm;
