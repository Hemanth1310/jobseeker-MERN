
type Props = {
    children: React.ReactNode
}

const JobCard = ({children}: Props) => {

  return (
    <div className='flex flex-col justify-between border-2 border-mist-200 p-5 rounded-lg '>

        {children}
        
    </div>
  )
}

export default JobCard