'use client'

import { useEffect, useState } from 'react'

interface Video {
	id: number
	title: string
	url: string
	description: string
	added_at: string
}

export default function Videos() {
	const [videos, setVideos] = useState<Video[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch('http://37.27.188.235:5000/ru/api/youtube/header/list/')
			.then(res => res.json())
			.then(data => {
				setVideos(data)
				setLoading(false)
			})
			.catch(err => {
				console.error('Error fetching videos:', err)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
			{videos.map(video => (
				<div
					key={video.url}
					className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
				>
					<div className='relative aspect-video'>
						<iframe
							src={video.url}
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
							className='absolute top-0 left-0 w-full h-full'
						/>
					</div>
				</div>
			))}
		</div>
	)
}
