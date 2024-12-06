'use client'

import { useState } from 'react'

import Videos from './_components/videos'
import { RegionsMap } from './_components/map'
import Link from 'next/link'
import Announcements from './_components/announcements'
import Image from 'next/image'
import { useEffect } from 'react'

interface News {
	id: number
	title: string
	subtitle: string
	image: string
	slug: string
	added_at: string
}

export default function Page() {
	const [news, setNews] = useState<News[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch('http://37.27.188.235/ru/api/news/most_read/list/')
			.then(res => res.json())
			.then(data => {
				setNews(data)
				setLoading(false)
			})
			.catch(err => {
				console.error('Malumotlar yuklanishida xatolik', err)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	const mainNews = news[0]
	const otherNews = news.slice(1, 4)

	return (
		<div>
			<div className='w-full px-14 mx-auto mt-10'>
				<div className='mb-10 flex flex-col gap-4'>
					<h2 className='text-3xl font-bold text-green-600 mb-6'>
						Yangiliklar
					</h2>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{/* Asosiy yangilik */}
						<div className='lg:col-span-2'>
							<Link href={`/news/${mainNews.slug}`}>
								<div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full'>
									<div className='relative h-[380px]'>
										<Image
											src={mainNews.image}
											alt={mainNews.title}
											fill
											className='object-cover'
											priority
										/>
									</div>
									<div className='p-6'>
										<h3 className='text-2xl font-bold mb-2 text-gray-800'>
											{mainNews.title}
										</h3>

										<div className='text-sm text-gray-500'>
											<span className='text-gray-500'>
												📅{' '}
												{new Date(mainNews.added_at)
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
						</div>

						{/* O'ng tomondagi kichik yangiliklar */}
						<div className='h-full '>
							{otherNews.slice(0, 1).map(news => (
								<Link
									key={news.id}
									href={`/news/${news.slug}`}
									className='block'
								>
									<div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full'>
										<div className='relative h-[380px]'>
											<Image
												src={news.image}
												alt={news.title}
												fill
												className='object-cover'
												priority
											/>
										</div>
										<div className='p-6'>
											<h3 className='text-xl font-semibold mb-2 text-gray-800'>
												{news.title}
											</h3>
											<span className='text-gray-500'>
												📅{' '}
												{new Date(news.added_at)
													.toLocaleDateString('uz-UZ', {
														day: '2-digit',
														month: '2-digit',
														year: 'numeric',
													})
													.replace(/\./g, '/')}
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>

					{/* Pastdagi kichik yangiliklar */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2'>
						{otherNews.slice(0).map(news => (
							<Link
								key={news.id}
								href={`/news/${news.slug}`}
								className='block h-full'
							>
								<div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full'>
									<div className='relative h-[400px]'>
										<Image
											src={news.image}
											alt={news.title}
											fill
											className='object-cover'
											priority
										/>
									</div>
									<div className='p-6'>
										<h3 className='text-xl font-semibold mb-2 text-gray-800'>
											{news.title}
										</h3>
										<span className='text-gray-500'>
											📅{' '}
											{new Date(news.added_at)
												.toLocaleDateString('uz-UZ', {
													day: '2-digit',
													month: '2-digit',
													year: 'numeric',
												})
												.replace(/\./g, '/')}
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
					<Link
						href='/news'
						className='text-green-600 hover:underline mt-4 inline-block'
					>
						Barcha yangiliklar
					</Link>
				</div>

				<div className='mb-10'>
					<h2 className='text-3xl font-bold text-green-600 mb-6'>E`lonlar</h2>
					<Announcements />
					<Link
						href='/announcements'
						className='text-green-600 hover:underline mt-4 inline-block'
					>
						Barcha e`lonlar
					</Link>
				</div>

				<div className='mb-10'>
					<h2 className='text-3xl font-bold text-green-600 mb-6'>Videolar</h2>
					<Videos />
				</div>
			</div>
			<div className='mt-10'>
				<RegionsMap />
			</div>
			<div className='flex flex-col items-center gap-2'>
				<span className='text-green-600 text-2xl'>Bog`lanish uchun</span>
				<span className='text-green-600'>
					почта:{' '}
					<a href='mailto:info@uzfk.uz' className='text-blue-600'>
						info@uzfk.uz
					</a>
				</span>
				<span className='text-green-600'>
					exat:{' '}
					<a href='milto:fermer@exat.uz' className='text-blue-600'>
						fermer@exat.uz
					</a>
				</span>
				<span className='text-green-600'>
					Қабулхона:{' '}
					<a href='tel:+998-71-233-06-18' className='text-blue-600'>
						+998-71-233-06-18
					</a>
				</span>
				<span className='text-green-600'>
					ишонч телефон рақами/девонхона:{' '}
					<a href='tel:+998-71-233-07-14' className='text-blue-600'>
						+998-71-233-07-14
					</a>
				</span>
				<span className='text-3xl font-bold text-green-600'>
					Тошкент шаҳар, Миробод тумани, Ислом Каримов кўчаси 2А уй
				</span>
			</div>
		</div>
	)
}
