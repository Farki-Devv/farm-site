import Image from 'next/image'
import HtmlContent from '@/components/HtmlContent'

async function getNews(slug: string) {
	const res = await fetch(
		`http://37.27.188.235:5000/ru/api/news/detail/${slug}/`,
		{
			cache: 'no-store',
		}
	)
	const data = await res.json()
	return data
}

export default async function NewsDetail({
	params,
}: {
	params: { slug: string }
}) {
	const news = await getNews(params.slug)

	if (!news) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-xl text-gray-600'>Yangilik topilmadi</div>
			</div>
		)
	}

	return (
		<article className='container	 px-24 mx-auto  py-8'>
			<div className='relative w-full h-[400px] mb-8'>
				<Image
					src={news.image}
					alt={news.title}
					fill
					className='object-cover rounded-lg'
					priority
				/>
			</div>
			<h1 className='text-4xl text-center font-bold mb-4 text-green-800'>
				{news.title}
			</h1>
			<div className='flex items-center text-gray-600 mb-8'></div>
			<div className='prose max-w-none'>
				<HtmlContent content={news.post} />
			</div>
		</article>
	)
}
