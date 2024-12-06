'use client'

import parse from 'html-react-parser'

interface HtmlContentProps {
	content: string
}

export default function HtmlContent({ content }: HtmlContentProps) {
	return (
		<div className='text-gray-800 leading-relaxed px-10'>{parse(content)}</div>
	)
}
