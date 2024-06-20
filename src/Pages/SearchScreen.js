import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import VideoHorizontal from '../Components/videoHorizontal/VideoHorizontal'
import { useFun } from '../contexts/youtubeContext.js'
import Sidebar from '../Components/Sidebar/Sidebar.js'

const SearchScreen = () => {
   const { query } = useParams()


   useEffect(() => {
    getVideosBySearch(query)
   }, [query])

   const {searchVideo,getVideosBySearch,category,setCategory,subscriber,sidebar}=useFun();
//    const { videos, loading } = useSelector(state => state.searchedVideos)

   return (
      <>
         <Sidebar setCategory={setCategory} sidebar={sidebar} category={category} subscriber={subscriber} />
         { (
            searchVideo?.map(video => (
               <VideoHorizontal
                  video={video}
                  key={video.id.videoId}
                  searchScreen
               />
            ))
         )}
      </>
   )
}

export default SearchScreen