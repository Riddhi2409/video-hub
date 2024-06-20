import React, { useEffect, useState } from 'react'
// import './videoHorizontal.css'
import { AiFillEye } from 'react-icons/ai'
import request from '../../api'
import moment from 'moment'
import numeral from 'numeral'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { API_KEY } from '../../data'

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
    console.log(video, searchScreen, subScreen)
    const navigate = useNavigate();
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            description,
            title,
            publishedAt,
            thumbnails: { medium },
            resourceId,
        },
    } = video
    const isVideo = !(id.kind === 'youtube#channel' || subScreen)

    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)

    const getVideoDetails = async () => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${id.videoId}&key=${API_KEY}`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const contentDetails = data.items[0].contentDetails;
            const statistics = data.items[0].statistics;
            console.log('Content Details:', contentDetails);
            console.log('Statistics:', statistics);
            
            setDuration(contentDetails.duration)
            setViews(statistics.viewCount)
          } else {
            console.log('Video not found');
          }
        } catch (error) {
          console.error('Error fetching video details:', error);
        }
      };
      useEffect(()=>{
        getVideoDetails()
      },[id])
      
    const getChannelIcon = async () => {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const channelIcon = data.items[0].snippet.thumbnails.default.url; // You can also use 'medium' or 'high'
            setChannelIcon(channelIcon)
          } else {
            console.log('Channel not found');
          }
        } catch (error) {
          console.error('Error fetching channel details:', error);
        }
      };
    useEffect(() => {
        getChannelIcon()
    }, [channelId])

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const _channelId = resourceId?.channelId || channelId

    const handleClick = () => {
        isVideo
            && navigate(`/video/${0}/${id.videoId}`);

    }

    return (
        <div
            className='py-2 m-1 flex align-items-center w-full  gap-6'
            onClick={handleClick}>
            <div>
                <div className=' '>
                    <img src={medium.url} className='w-[20rem] h-[15rem] rounded-2xl' />
                </div>
                {isVideo && (
                    <span className=' p-[0.2rem] bottom-2 right-[1.2rem]'>{_duration}</span>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <p className='mb-1 font-bold'>{title}</p>

                {isVideo && (
                    <div className=' flex items-center gap-2 text-xs'>
                        <AiFillEye /> {numeral(views).format('0.a')} Views 
                        <div>• {moment(publishedAt).fromNow()}
                        </div>
                    </div>
                )}

                {(searchScreen || subScreen) && (
                    <p className='mt-1 text-sm font-medium'>{description}</p>
                )}

                <div className='my-1 flex items-center  gap-3 '>
                    {isVideo && (
                        //   <LazyLoadImage src={channelIcon?.url} effect='blur' />
                        <img src={channelIcon} className=' rounded-full h-[2rem] ' />
                    )}
                    <p className='mb-0 text-sm font-semibold'>{channelTitle}</p>
                </div>
                {subScreen && (
                    <p className='mt-2 bg-red-900'>
                        {video.contentDetails.totalItemCount} Videos
                    </p>
                )}
            </div>
        </div>
    )
}

export default VideoHorizontal