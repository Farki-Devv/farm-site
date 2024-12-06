import React from 'react'
interface ICard {
	title: string
	position: string
	number: string
	name: string
}
function Card(item: ICard) {
	return (
		<div  className='p-4 lg:w-1/2 md:w-full'>
			<div className='flex border-2 rounded-lg border-gray-200 bg-white border-opacity-50 p-8 sm:flex-row flex-col'>
				<div className='w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0'>
					<svg
						fill='none'
						stroke='currentColor'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						className='w-8 h-8'
						viewBox='0 0 24 24'
					>
						<path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
					</svg>
				</div>
				<div className='flex-grow'>
					<h2 className='text-gray-900 text-lg title-font font-medium mb-3'>
						{item.title}
					</h2>
					<p className='leading-relaxed text-base'>{item.position}</p>
					<div className='w-full flex justify-between items-center'>
						<a className='mt-3 text-indigo-500 inline-flex items-center font-bold'>
							{item.name}
						</a>
						<span className='mt-3 text-indigo-500 inline-flex items-center font-bold'>
							{item.number}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
