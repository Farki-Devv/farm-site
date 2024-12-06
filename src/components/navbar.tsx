import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

import { navLink } from '../constants'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
	return (
		<div className='mx-auto border-b h-24 rounded-md flex px-10 justify-between items-center shadow-lg'>
			{/* Website Logo */}
			<Link href={'/'}>
				<div className='flex gap-4 items-center'>
					<Image src={`/logo.png`} alt='' width={60} height={40} />
					<span className='text-3xl max-xl:hidden'>UzFK</span>
				</div>
			</Link>

			{/* Desktop navbar */}
			<div className='flex gap-4 max-xl:gap-1 max-lg:hidden'>
				{navLink.map(item => (
					<div key={item.id}>
						<Select>
							<SelectTrigger className='border-none bg-none font-medium text-lg text-green-600'>
								{item.title}
							</SelectTrigger>
							<SelectContent>
								{item.links?.map(child => (
									<div
										key={child.id}
										className='p-2 hover:bg-green-100 rounded-md'
									>
										<Link href={child.url}>{child.title}</Link>
									</div>
								))}
							</SelectContent>
						</Select>
					</div>
				))}
			</div>

			{/* Mobile navbar */}
			<div className='lg:hidden'>
				<Sheet>
					<SheetTrigger>
						<Menu className='size-8 text-green-600' />
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>
								<div className='flex gap-4 items-center'>
									<Image src={`/logo.png`} alt='' width={60} height={40} />
									<span className='text-3xl'>UzFK</span>
								</div>
							</SheetTitle>
						</SheetHeader>
						{navLink.map(item => (
							<Accordion key={item.id} type='single' collapsible>
								<AccordionItem value={`${item.id}`}>
									<AccordionTrigger>{item.title}</AccordionTrigger>
									<AccordionContent className='space-y-2'>
										{item.links?.map(child => (
											<div key={child.id} className='space-y-2'>
												<Link
													href={`${child.url}`}
													className='p-2 hover:bg-green-600 rounded-md transition-all hover:text-white'
												>
													{child.title}
												</Link>
											</div>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						))}
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}

export default Navbar
