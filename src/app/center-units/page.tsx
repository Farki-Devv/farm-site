'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/cards/card'

interface CenterUnit {
	id: number
	title: string
	name: string
	position: string
	number: string
}

export default function Page() {
	const [centerUnits, setCenterUnits] = useState<CenterUnit[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER}:${process.env.NEXT_PUBLIC_PORT}/ru/api/bolimlar/list/`
				)
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				const data = await res.json()
				setCenterUnits(data)
			} catch (err: unknown) {
				const errorMessage =
					err instanceof Error
						? `Маълумотлар юкланишида хатолик: ${err.message}`
						: 'Маълумотлар юкланишида хатолик'
				setError(errorMessage)
				console.error('Error fetching center units data:', err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div className=' px-5 py-12 mx-auto'>
				<div className='flex justify-center'>
					<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='container px-5 py-12 mx-auto'>
				<div className='text-center text-red-500'>
					<p>{error}</p>
				</div>
			</div>
		)
	}

	return (
		<section className='text-gray-600 body-font'>
			<div className='container px-5 py-24 mx-auto flex flex-wrap'>
				<div className='flex flex-wrap -m-4'>
					{centerUnits.map(item => (
						<Card key={item.id} {...item} />
					))}
				</div>
			</div>
		</section>
	)
}
