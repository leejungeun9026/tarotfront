import { Skeleton } from '../ui/skeleton'

export default function SkeletonHome() {
  return (
    <div className="Home divide-gray-100 divide-y-10">
      <section className="px-4 pt-2 pb-6">
        <Skeleton className='w-full h-[336px] rounded-3xl' />
        <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
          <Skeleton className='w-full h-[110px]'></Skeleton>
          <Skeleton className='w-full h-[110px]'></Skeleton>
          <Skeleton className='w-full h-[110px]'></Skeleton>
          <Skeleton className='w-full h-[110px]'></Skeleton>
          <Skeleton className='w-full h-[110px]'></Skeleton>
          <Skeleton className='w-full h-[110px]'></Skeleton>
        </div>
      </section>
      <section className="askList px-4 py-6">
        <div className="section_title pb-4 flex items-end justify-between gap-2">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
            <Skeleton className='w-20 h-8'></Skeleton>
          </h4>
        </div>
      </section>
    </div>
  )
}
