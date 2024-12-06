import React from 'react'

function Page() {
	return (
		<div>
			<section className='text-gray-600 body-font relative'>
				<div className='absolute inset-0 bg-gray-300'>
					<iframe
						width='100%'
						height='100%'
						frameBorder='0'
						title='map'
						scrolling='no'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.02931848682!2d69.27310227654004!3d41.30822580090103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b27d663f06b%3A0x89baec66c7cf67f0!2sTaras%20Shevchenko%20Street%201%2C%20100029%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1733328385729!5m2!1sen!2s'
					></iframe>
				</div>
				<div className='container px-5 py-24 mx-auto flex'>
					<div className='lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md'>
						<h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>
							Online qabulhona
						</h2>
						<p className='leading-relaxed mb-5 text-gray-600'>
							Email manzilingizni va habaringizni yozing
						</p>
						<div className='relative mb-4'>
							<label
								htmlFor='email'
								className='leading-7 text-sm text-gray-600'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
						<div className='relative mb-4'>
							<label
								htmlFor='message'
								className='leading-7 text-sm text-gray-600'
							>
								Habar
							</label>
							<textarea
								id='message'
								name='message'
								className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
							></textarea>
						</div>
						<button className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
							Button
						</button>
						<p className='text-xs text-gray-500 mt-3'>
							Habaringizni yuboring biz siz bilan 24 soat ichida bog`lanamiz
						</p>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Page
