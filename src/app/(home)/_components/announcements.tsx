'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Announcement {
	id: number
	title: string
	description: string
	image: string
	date: string
	location: string
	slug: string
}

export default function Announcements() {
	const [announcements, setAnnouncements] = useState<Announcement[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch('http://37.27.188.235:5000/ru/api/elon/most_read/list/')
			.then(res => res.json())
			.then(data => {
				setAnnouncements(data)
				setLoading(false)
			})
			.catch(err => {
				console.error('Error fetching announcements:', err)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return (
			<div className='flex justify-center items-center py-8'>
				<div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600'></div>
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
			{announcements.map(announcement => (
				<Link
					key={announcement.id}
					href={`/announcements/${announcement.slug}`}
					className='block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
				>
					<div className='relative h-48'>
						<Image
							src={announcement.image}
							alt={announcement.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
					<div className='p-4'>
						<h3 className='font-semibold text-lg mb-2 text-gray-800'>
							{announcement.title}
						</h3>
						<p className='text-gray-600 text-sm mb-3'>
							{announcement.description}
						</p>
						<div className='flex justify-between text-sm text-gray-500'>
							<span>{announcement.location}</span>
							<span>{announcement.date}</span>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}
