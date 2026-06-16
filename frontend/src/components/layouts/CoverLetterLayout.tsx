
import Modal from './Modal'

type Props = {
    isOpen: boolean,
    onClose:()=>void,
    coverLetter:string
}

const CoverLetterLayout = ({isOpen, onClose, coverLetter}: Props) => {

  return (
    <Modal onClose={onClose} isOpen={isOpen} title={"Cover Letter"}>
        <div className='p-5 whitespace-pre-wrap w-fit max-h-full overflow-y-hidden'>{coverLetter}</div>
    </Modal>
  )
}

export default CoverLetterLayout