import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuth } from '../../contexts/authContext'

const Feed = ({category}) => {
  const {accesstoken}=useAuth();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
  const [pageToken,setPageToken]=useState('');
    const [data,setData] = useState([]);
   
    const fetchData = async ()=>{
        if(!pageToken){
            setPageToken('');
        }
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}&pageToken=${pageToken}&order=viewCount`;
        try{
            await fetch(videoList_url).then((response)=>response.json()).then((data)=>{
                setData((prevVideos) => [...prevVideos, ...data.items]);
                // console.log("Token",data.nextPageToken);
            setPageToken(data.nextPageToken);
            if (!data.nextPageToken) {
                setPageToken('');
                setHasMore(false);
              }
        })
     }
    catch(error){
        console.error('Error fetching data:', error);
    setPageToken('');
     setHasMore(false);

    }
    }
    useEffect( ()=>{
        setData([]);
        setPage(1);
        setHasMore(true);
        setPageToken('');
      fetchData();
    },[category])

    
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
    >
   <div className='feed'>
        {data.map((item,index)=>{
            // console.log(item);
            // console.log(item.snippet.thumbnails.default);
            const second=moment.duration(item.contentDetails.duration).asSeconds()
            const _duration=moment.utc(second*1000).format("mm:ss")
            return <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                         
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <span>{_duration}</span>
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        {/* <img src={item.snippet.thumbnails.default.url} alt="" /> */}
                         <p>{value_converter(item.statistics.viewCount)} Views &bull; 
                         {" "+moment(item.snippet.publishedAt).fromNow()}</p>
                     </Link>
        })} 
       
    </div>
    </InfiniteScroll>

 
  )
}
export default Feed
