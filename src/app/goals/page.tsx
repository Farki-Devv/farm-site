'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/cards/card'

interface Goal {
	id: number
	title: string
	name: string
	position: string
	number: string
}

export default function Page() {
	const [goals, setGoals] = useState<Goal[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_SERVER}:${process.env.NEXT_PUBLIC_PORT}/ru/api/maqsad/list/`
		)
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				return res.json()
			})
			.then(data => {
				setGoals(data)
				setIsLoading(false)
			})
			.catch(err => {
				setError(
					err instanceof Error ? err.message : 'Маълумотлар юкланишида хатолик'
				)
				console.error('Error fetching goals data:', err)
				setIsLoading(false)
			})
	}, [])

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
					{goals.map(item => (
						<Card key={item.id} {...item} />
					))}
				</div>
			</div>
		</section>
	)
}
