import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "../authContext";
import request from "../../request";
import { API_KEY, value_converter } from '../../data';

const YoutubeContext = React.createContext();

export const useFun=()=>{
    return useContext(YoutubeContext);
  }

export const YoutubeProvider = ({children})=>{
    const {accesstoken} =useAuth();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState("false");
    const [text,setText]=useState('');
    const [searchVideo , setSearchVideo]=useState([]);
    const [subscriber,setSubscriber] =useState([]);
    const [sidebar, setSidebar] = useState(true);
    const [category,setCategory] = useState(0);
    
    const getSubscribedChannels = async () => {
      if(!accesstoken) return;
      console.log(accesstoken,"subd")
      try {
         
         const { data } = await request('/subscriptions', {
            params: {
               part: 'snippet,contentDetails',
               mine: true,
               maxResults: 15
            },
            headers: {
               Authorization: `Bearer ${accesstoken}`,
            },
         })
         setSubscriber(data.items)
         console.log("subscriber data",data);
      } catch (error) {
         console.log("error",error.response.data)
      }
   }
    
    const fetchVideoData = async (videoId) => {

        // Fetching Video Data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=${videoId}`;
        await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]));
    }

    const fetchOtherData = async (videoId) => {

        // Fetching Channel Data
        if(!apiData) return;
        const channelLogo_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet?.channelId}&key=${API_KEY}`;
        await fetch(channelLogo_url).then(res => res.json()).then(data => setChannelData(data.items[0]));
      
    }

    const fetchComment = async(videoId) =>{
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

    const checkSubscriptionStatus = async () => {
        if(!apiData) return;
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
            setIsSubscribed(data.items.length == 0 ? false : true)

         } catch (error) {
            console.log(error.response.data)
         }
        
    };

    const handleComment =async(e,videoId) =>{
        e.preventDefault();
        if(text.length==0) return;
        console.log(text)
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
            setTimeout(() => fetchComment(videoId), 3000)
         } catch (error) {
            console.log(error.response.data)
         }
    }

   const getVideosBySearch = async(text) => {
      try {

         const { data } = await request('/search', {
            params: {
               part: 'snippet',
               maxResults: 20,
               q: text,
               type: 'video,channel',
            },
         })
         console.log(data.items);
         setSearchVideo(data.items);
      } catch (error) {
         console.log(error.message)
      }
   }

    const value = {
        isSubscribed,
        apiData,
        channelData,
        fetchComment,
        fetchOtherData,
        fetchVideoData,
        handleComment,
        text,
        setText,
        commentData,
        checkSubscriptionStatus,
        getVideosBySearch,
        searchVideo,
        subscriber,
        getSubscribedChannels,
        setSidebar,
        sidebar,
        category,
        setCategory
    }
    console.log(apiData,text)

    return (
        <YoutubeContext.Provider value={value}>
            {children}
        </YoutubeContext.Provider>
    )
}