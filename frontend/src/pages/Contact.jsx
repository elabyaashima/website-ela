import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>ELA By Aashima</p>
          <p className='text-gray-500'>
            B56 2nd Floor, Nehru Ground, Faridabad <br /> Haryana, India
          </p>
          <p className='text-gray-500'>
            Customer Care: +91 81788 96213 <br />
            Email: elabyaashima@gmail.com
          </p>
          <p className='text-gray-500'>
            Mon - Sat: 10:00 AM - 7:00 PM <br />
            Closed on Sundays<br/>
            by Appointment only
          </p>
          <a href="mailto:elabyaashima@gmail.com" className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Write to us
          </a>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
