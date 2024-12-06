import { Facebook, Instagram, Twitter } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
	return (
		<footer className='bg-white text-gray-600 py-8 mt-12'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-wrap justify-between'>
					<div className='w-full md:w-1/3 mb-8 md:mb-0'>
						<h3 className='text-lg font-semibold mb-4'>Biz haqimizda</h3>
						<p className='mb-4'>
							O'zbekiston fermer, dehqon xo'jaliklari va tomorqa <br /> yer
							egalari kengashi
						</p>
					</div>
					<div className='w-full md:w-1/3 mb-8 md:mb-0'>
						<h3 className='text-lg font-semibold mb-4'>Bog'lanish</h3>
						<p className='mb-2'>Telefon: +998 71 123-45-67</p>
						<p className='mb-2'>Email: info@uzfk.uz</p>
						<p>
							Manzil: Taras Shevchenko ko'chasi, 1, Tashkent, Yunusabad,
							Tashkent, Uzbekistan 
						</p>
					</div>
					<div className='w-full md:w-1/3'>
						<h3 className='text-lg font-semibold mb-4'>Ijtimoiy tarmoqlar</h3>
						<div className='flex space-x-4'>
							<a href='#' className='text-gray-600 hover:text-gray-800'>
								<Facebook />{' '}
							</a>
							<a href='#' className='text-gray-600 hover:text-gray-800'>
								<Twitter />
							</a>
							<a href='#' className='text-gray-600 hover:text-gray-800'>
								<Instagram />
							</a>
						</div>
					</div>
				</div>
				<div className='border-t border-gray-200 mt-8 pt-8 text-center'>
					<p>&copy; 2024 UzFK. Barcha huquqlar himoyalangan.</p>
				</div>
			</div>
		</footer>
	)
}
