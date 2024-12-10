'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Banner {
	id: number
	title: string
	subtitle: string
	image: string
	author_post: string
	created_at: string
}

export default function Ads() {
	const [banners, setBanners] = useState<Banner[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBanners = async () => {
			try {
				setLoading(true)
				const response = await fetch(
					'http://37.27.188.235:5000/uz/api/banner/most_read/list/',
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
					}
				)
				const data = await response.json()
				setBanners(Array.isArray(data) ? data : data.results || [])
			} catch (error) {
				console.error('Error fetching banners:', error)
				setBanners([])
			} finally {
				setLoading(false)
			}
		}

		fetchBanners()
	}, [])

	if (loading) {
		return <div className='p-4'>Loading banners...</div>
	}

	if (!banners || banners.length === 0) {
		return <div className='p-4'>No banners available</div>
	}

	const banner = banners[0]

	return (
		<div className='w-full h-44 relative rounded-lg overflow-hidden shadow-md'>
			<Image
				src={banner.image}
				alt={banner.title}
				fill
				className='object-cover'
				priority
			/>
		</div>
	)
}
