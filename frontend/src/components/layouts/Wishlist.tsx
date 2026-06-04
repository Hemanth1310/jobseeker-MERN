import { Bookmark, BookmarkCheck, Loader } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
isWishlisted:boolean,
id: string,
handleDeWishlist:(id:string)=>void
handleWishlist:(id:string)=>void
}

const Wishlist = ({isWishlisted,id,handleDeWishlist,handleWishlist}: Props) => {
      const [isWhisListing, setIsWishlisting] = useState(false)

      const addWishList = async () => {
            setIsWishlisting(true)
            try {
                await handleWishlist(id) // Wait for the real API call to finish
            } finally {
                setIsWishlisting(false) // Turn loader off right when the network answers
            }
    }

      const removeWishlist = async()=>{
       setIsWishlisting(true)
            try {
                await handleDeWishlist(id) // Wait for the real API call to finish
            } finally {
                setIsWishlisting(false) // Turn loader off right when the network answers
            }
      }

      if(isWhisListing){
        return <Loader className="animate-spin [animation-duration:4s] text-brand-primary" size={28}/>
      }
      
  return (
   
        <div>
          
                 {isWishlisted?<BookmarkCheck size={28} onClick={removeWishlist} />:
                    <Bookmark size={28} onClick={addWishList} />}
                
                   
        </div>

  )
}

export default Wishlist