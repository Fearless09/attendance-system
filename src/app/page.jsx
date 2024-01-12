import { Star } from './components/SVGs'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={`p-3 sm:p-5 bg-[url('/pexels-yan-krukau-8197534.jpg')] bg-cover min-h-screen h-full flex items-center justify-center`}>
      <div className={`max-w-[650px] w-full mx-auto rounded-lg shadow-lg p-5 pb-14 backdrop-blur-lg relative`}>
        <div className='flex items-center justify-end gap-5'>
          <button>
            <Star color={'#1f1f1f'} />
          </button>
        </div>

        <div className='mt-[50px] grid gap-20 items-center justify-center'>
          <h1 className='text-[#181717] text-4xl font-semibold text-center'>Smart Attendance System</h1>
          <Link
            href={'/login'}
            className='py-4 px-10 rounded-lg text-white text-lg font-medium bg-gradient-to-t from-[#181717] to-[#1f1f1f] active:scale-[0.95] uppercase text-center'
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
