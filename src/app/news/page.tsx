'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface News {
	id: number
	title: string
	description: string
	image: string
	date: string
	category: string
	slug: string
	content: string
	author: string
	added_at: string
}

export default function NewsPage() {
	const [news, setNews] = useState<News[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const apiUrl = 'http://37.27.188.235:5000/ru/api/news/most_read/list/'
	useEffect(() => {
		setIsLoading(true) // Har bir so'rovda loadingni o'rnatamiz
		fetch(apiUrl)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP xato! Status: ${response.status}`)
				}
				return response.json()
			})
			.then(data => {
				setNews(data)
				setError(null) // Agar ma'lumot muvaffaqiyatli kelsa xatoni tozalaymiz
			})
			.catch(error => {
				console.error('So`rovda xatolik yuz berdi:', error.message)
				setError(error.message) // Xatoni saqlaymiz
			})
			.finally(() => {
				setIsLoading(false) // Yuklanishni to'xtatamiz
			})
	}, [apiUrl])

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
		<div className='min-h-screen bg-green-900/80'>
			<div className=' px-5 py-24 mx-auto'>
				<div className='text-center mb-20'>
					<h1 className='sm:text-3xl text-2xl font-medium title-font text-white mb-4'>
						So`nggi Yangiliklar
					</h1>
					<p className='text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-white font-semibold'>
						Qishloq xo`jaligi sohasidagi eng so`nggi yangiliklar va muhim
						voqealar
					</p>
					<div className='flex mt-6 justify-center'>
						<div className='w-16 h-1 rounded-full bg-indigo-500 inline-flex'></div>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{news.map(item => (
						<Link key={item.id} href={`/news/${item.slug}`} className='group'>
							<div className='bg-white rounded-lg shadow-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-300'>
								<div className='relative h-48'>
									<Image
										src={item.image}
										alt={item.title}
										fill
										className='object-cover'
									/>
								</div>
								<div className='p-6'>
									<div className='mb-2'>
										<span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded'>
											{item.category}
										</span>
									</div>
									<h2 className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300'>
										{item.title.slice(0, 50)}
									</h2>
									<p className='text-gray-600 mb-4'>{item.description}</p>
									<div className='flex items-center justify-between text-sm text-gray-500'>
										<span>✍️ {item.author}</span>
										<span className='text-gray-500'>
											📅{' '}
											{new Date(item.added_at)
												.toLocaleDateString('uz-UZ', {
													day: '2-digit',
													month: '2-digit',
													year: 'numeric',
												})
												.replace(/\./g, '/')}
										</span>
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
