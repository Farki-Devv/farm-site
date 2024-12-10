'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Announcement {
	id: number
	title: string
	description: string
	image: string
	date: string
	location: string
	slug: string
	content: string
	added_at: string
}

export default function AnnouncementsPage() {
	const [announcements, setAnnouncements] = useState<Announcement[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_SERVER}:${process.env.NEXT_PUBLIC_PORT}/ru/api/elon/most_read/list/`
		)
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				return res.json()
			})
			.then(data => {
				setAnnouncements(data)
				setIsLoading(false)
			})
			.catch(err => {
				setError(
					err instanceof Error ? err.message : 'E`lonlar yuklanishida xatolik'
				)
				console.error('Error fetching announcements:', err)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return (
			<div className='container px-5 py-12 mx-auto'>
				<div className='flex justify-center'>
					<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='container px-5 py-12 mx-auto'>
				<div className='text-red-500 text-center'>
					<h2 className='text-2xl font-bold mb-2'>Xatolik yuz berdi</h2>
					<p>{error}</p>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-[#004524]'>
			<div className=' px-5 py-24 mx-auto'>
				{/* Sarlavha */}
				<div className='text-center mb-20'>
					<h1 className='sm:text-3xl text-2xl font-medium title-font text-white mb-4'>
						Barcha E`lonlar
					</h1>
					<p className='text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-white font-bold'>
						Fermerlar va dehqonlar uchun muhim e`lonlar, tadbirlar va
						imkoniyatlar to`plami
					</p>
					<div className='flex mt-6 justify-center'>
						<div className='w-16 h-1 rounded-full bg-indigo-500 inline-flex'></div>
					</div>
				</div>

				{/* E'lonlar ro'yxati */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{announcements.map(announcement => (
						<Link
							key={announcement.id}
							href={`/announcements/${announcement.slug}`}
							className='group'
						>
							<div className='bg-white rounded-lg shadow-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-300'>
								<div className='relative h-48'>
									<Image
										src={announcement.image}
										alt={announcement.title}
										fill
										className='object-cover'
									/>
								</div>
								<div className='p-6'>
									<h2 className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300'>
										{announcement.title.slice(0, 40) + '...'}
									</h2>
									{/* <p className='text-gray-600 mb-4'>
										{announcement.description.slice(0, 50) + '...'}
									</p> */}
									<div className='flex items-center text-sm text-gray-500'>
										<span className='mr-4'>
											📅{' '}
											{new Date(announcement.date).toLocaleDateString('uz-UZ', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</span>
										<span>📍 {announcement.location}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
