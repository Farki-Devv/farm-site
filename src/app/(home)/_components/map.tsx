'use client'

import { FC, useState, SVGProps, CSSProperties } from 'react'
import { IRegion, regionsPathArray } from './map-array'

interface RegionsMapProps extends SVGProps<SVGSVGElement> {
	defaultFillColor?: string
	selectedFillColor?: string
	selectedStyle?: CSSProperties
	handleClick?: (regionId: string) => void
}

export const RegionsMap: FC<RegionsMapProps> = ({
	defaultFillColor = '#E5E7EB',
	selectedFillColor = '#10B981',
	selectedStyle = {},
	handleClick,
	...props
}) => {
	const [curRegion, setCurRegion] = useState(
		regionsPathArray[regionsPathArray.length - 1]
	)
	const [hoveredRegion, setHoveredRegion] = useState<IRegion | null>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	const handleClickRegion = (region: IRegion) => {
		setCurRegion(region)
		if (handleClick) handleClick(region.id)
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		setMousePosition({ x: e.clientX, y: e.clientY })
	}

	const renderRegion = (region: IRegion) => {
		const { id, name, path } = region
		const isCurrentRegion = curRegion.id === region.id
		const isHovered = hoveredRegion?.id === id

		return (
			<path
				d={path}
				key={id}
				name={name}
				onClick={() => handleClickRegion(region)}
				onMouseEnter={() => setHoveredRegion(region)}
				onMouseLeave={() => setHoveredRegion(null)}
				onMouseMove={handleMouseMove}
				style={{
					...selectedStyle,
					cursor: 'pointer',
					transition: 'all 0.3s ease',
					stroke: '#4B5563',
					strokeWidth: isHovered ? 2 : 1,
					...(isCurrentRegion ? { strokeWidth: 2 } : {}),
				}}
				fill={
					isCurrentRegion
						? selectedFillColor
						: isHovered
						? '#D1FAE5'
						: defaultFillColor
				}
			/>
		)
	}

	return (
		<div className='w-full max-w-4xl mx-auto p-4 relative'>
			<svg
				viewBox='0 0 1000 1000'
				style={{ width: '100%', height: 'auto' }}
				xmlnsXlink='http://www.w3.org/1999/xlink'
				xmlns='http://www.w3.org/2000/svg'
				{...props}
			>
				{regionsPathArray.map(renderRegion)}
			</svg>

			{hoveredRegion && (
				<div
					className='absolute bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50 min-w-[350px]'
					style={{
						left: mousePosition.x + 0,
						top: mousePosition.y + 0,
						transform: 'translate(-140%, -60%)',
					}}
				>
					<h3 className='text-lg font-semibold mb-2 text-black text-lg font-bold'>
						{hoveredRegion.name}
					</h3>
					<div className='space-y-1 text-sm'>
						<p>
							<span className='font-medium text-black'>
								Yerlarning umumiy maydoni:
							</span>{' '}
							<span className='text-green-600 font-bold ml-2 text-sm'>
								{hoveredRegion.field}
							</span>
						</p>
						<p>
							<span className='font-medium text-black'>Ekin yerlari:</span>{' '}
							<span className='text-green-600 font-bold ml-2 text-sm'>
								{hoveredRegion.plant} ga
							</span>
						</p>
						<p>
							<span className='font-medium text-black'>Daraxtzorlar:</span>{' '}
							<span className='text-green-600 font-bold ml-2 text-sm'>
								{hoveredRegion.tree} ga
							</span>
						</p>
						<p>
							<span className='font-medium text-black'>Bo'z yerlar:</span>{' '}
							<span className='text-green-600 font-bold ml-2 text-sm'>
								{hoveredRegion.boss}
							</span>
						</p>
						<p>
							<span className='font-medium text-black'>Yaylovlar:</span>{' '}
							<span className='text-green-600 font-bold ml-2 text-sm'>
								{hoveredRegion.pasture}
							</span>
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
