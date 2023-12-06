import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Card {
	title: string;
	link: string;
}

interface DraggableCardProps {
	data: Card[];
}

const DraggableCard: React.FC<DraggableCardProps> = ({ data }) => {
	const [cards, setCards] = useState(data);

	const onDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}

		const items = [...cards];
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setCards(items);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='cards'>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{cards.map((card, index) => (
							<Draggable
								key={card.title}
								draggableId={card.title}
								index={index}
							>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<div className='card'>
											<a
												href={card.link}
												target='_blank'
												rel='noopener noreferrer'
											>
												<h3>{card.title}</h3>
												{card.link}
											</a>
										</div>
									</div>
								)}
							</Draggable>
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default DraggableCard;
