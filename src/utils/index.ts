import { navLink } from '../constants'
import { useParams } from 'next/navigation'

export const useParamsSlug = () => {
	const { slug } = useParams()

	const pageContent = navLink
		.flatMap(item => item.children)
		.find(child => child.slug === slug)

	if (!pageContent) {
		return new Error('Page not found')
	}
	return pageContent
}
