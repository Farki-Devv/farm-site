'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/cards/card'

interface Management {
	id: number
	title: string
	name: string
	position: string
	number: string
}

export default function Page() {
	const [management, setManagement] = useState<Management[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER}:${process.env.NEXT_PUBLIC_PORT}/ru/api/workers/list/`
				)
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				const data = await res.json()
				setManagement(data)
			} catch (err: unknown) {
				const errorMessage =
					err instanceof Error
						? `Маълумотлар юкланишида хатолик: ${err.message}`
						: 'Номаълум хатолик юз берди'
				setError(errorMessage)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<div>
			<section className='text-gray-600 body-font'>
				<div className=' px-5 py-24 mx-auto flex flex-wrap'>
					<div className='flex flex-wrap -m-4'>
						{management.map((item, index) => (
							<Card key={index} {...item} />
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
