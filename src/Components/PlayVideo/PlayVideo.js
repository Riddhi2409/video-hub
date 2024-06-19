import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import {useAuth} from '../../contexts/authContext'
import ReactShowMoreText from 'react-show-more-text'
import axios from 'axios';
import request from '../../request'
const PlayVideo = ({ videoId }) => {
const {accesstoken} = useAuth();
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState("false");
    const [text,setText]=useState('')
    
    const fetchVideoData = async () => {

        // Fetching Video Data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=${videoId}`;
        await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]));
    }

    const fetchOtherData = async () => {

        // Fetching Channel Data
        const channelLogo_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet?.channelId}&key=${API_KEY}`;
        await fetch(channelLogo_url).then(res => res.json()).then(data => setChannelData(data.items[0]));

        // Fetching Comment Data
      
    }
    console.log("apidata",apiData)
    const fetchComment = async() =>{
        try { 
            const { data } = await request('/commentThreads', {
               params: {
                  part: 'snippet',
                  videoId: videoId,
               },
            })
            setCommentData(data.items)
            console.log("runned",data.items,commentData)

         } catch (error) {
            console.log(error.response.data)
         }
    }
    const [error, setError] = useState(null);
  
    const checkSubscriptionStatus = async () => {
        try {
            const { data } = await request('/subscriptions', {
               params: {
                  part: 'snippet',
                  forChannelId: apiData?.snippet.channelId,
                  mine: true,
               },
               headers: {
                  Authorization: `Bearer ${accesstoken}`,
               },
            })
            console.log(data,"ss")
         } catch (error) {
            console.log(error.response.data)
         }
        
    };

    const handleComment =async(e) =>{
        e.preventDefault();
        if(text.length==0) return;
        try {
            const obj = {
               snippet: {
                  videoId: videoId,
                  topLevelComment: {
                     snippet: {
                        textOriginal: text,
                     },
                  },
               },
            }
      
            await request.post('/commentThreads', obj, {
               params: {
                  part: 'snippet',
               },
               headers: {
                  Authorization: `Bearer ${accesstoken}`,
               },
            })
            setText('')      
            setTimeout(() => fetchComment(), 3000)
         } catch (error) {
            console.log(error.response.data)
         }
    }

   
    useEffect(() => {
        // fetchData();
        checkSubscriptionStatus();
        fetchVideoData();
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        fetchOtherData();
        fetchComment()
    }, [apiData])

    return (
        <div className="play-video">
            <iframe src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            {/* Best YouTube Channel To Learn Web Development  */}
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : 1525} Views  &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "2 days ago"}</p>
                <div>
                    <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : 125}</span>
                    <span><img src={dislike} alt="" />2</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? value_converter(channelData.snippet.thumbnails.default.url) : ""} alt="" />
                <div>
                    {/* GreatStack */}
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    {/* 500K Subscribers */}
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button type="button" className={`${isSubscribed ? "bg-slate-300" : "bg-red-900"}`}>{isSubscribed ? "subscribe": "unsubscribe"}</button>
            </div>
            <div className="vid-description">
                {/* Channel that makes learning Easy
                Subscribe GreatStack to Watch More Tutorials on web development */}
                <p>{apiData ? 
                <ReactShowMoreText
                lines={2}
                more='SHOW MORE'
                less='SHOW LESS'
                anchorClass='showMoreText'
                expanded={false}
                >{ apiData.snippet.description}</ReactShowMoreText>
               : "Description Here"}</p>
                <hr />
                {/* 130 Comments */}
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 130} Comments</h4>
                <div  className='flex flex-row flex-grow-1 gap-4 w-full '>
                    {/* <div> */}
                    <input
                        type='text'
                        className='w-[90%] p-2'
                        placeholder='Write a comment...'
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    {/* </div> */}
                    <button className='p-2 border-2 hover:bg-slate-300 bg-slate-200 rounded-xl' onClick={(e)=>handleComment(e)}>Add</button>
                </div>

                {commentData.map((item, index) => {
                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/* <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nicholson <span>2 days ago</span></h3>
                        <p>A global computer network providing a variety of information and communication facilities, consisting
                            of interconnected networks using standardized communication protocols.</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>
                    </div>
                </div> */}
            </div>

        </div>
    )
}

export default PlayVideo
