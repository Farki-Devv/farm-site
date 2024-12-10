'use server'

import Image from 'next/image'

async function getAnnouncement(slug: string) {
	const res = await fetch(
		`http://37.27.188.235:5000/ru/api/elon/detail/${slug}`,
		{
			cache: 'no-store',
		}
	)
	const data = await res.json()
	return data
}

export default async function AnnouncementDetail({
	params,
}: {
	params: { slug: string }
}) {
	const announcement = await getAnnouncement(params.slug)

	if (!announcement) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl text-gray-600'>E`lon topilmadi</div>
			</div>
		)
	}

	return (
		<article className='max-w-4xl mx-auto px-4 py-8'>
			<div className='relative w-full h-[400px] mb-8'>
				<Image
					src={announcement.image}
					alt={announcement.title}
					fill
					className='object-cover rounded-lg'
					priority
				/>
			</div>
			<h1 className='text-4xl font-bold mb-4'>{announcement.title}</h1>
			<div className='flex items-center text-gray-600 mb-8'>
				<span className='mr-4'>{announcement.location}</span>
				<time>{new Date(announcement.date).toLocaleDateString()}</time>
			</div>
			<div className='prose max-w-none'>
				<p className='text-xl text-gray-600 mb-6'>{announcement.description}</p>
				<div className='text-gray-800 leading-relaxed whitespace-pre-line'>
					{announcement.content}
				</div>
			</div>
		</article>
	)
}
