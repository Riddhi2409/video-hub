import React from 'react'
import './Sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import explore from '../../assets/explore.png'
import subscriprion from '../../assets/subscriprion.png'
import sports from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import jack from '../../assets/jack.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'
import { Link } from 'react-router-dom'

const Sidebar = ({sidebar,category,setCategory,subscriber}) => {
  console.log(subscriber,)
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"} overflow-auto`}>
      <div className="shortcut-links">
            <Link to='/' onClick={()=>{setCategory(0) }} className={`side-link ${category===0?"active":""}`}><img src={home} alt="" /><p>Home</p></Link>
            <Link to='/' onClick={()=>{setCategory(20)}} className={`side-link ${category===20?"active":""}`}><img src={game_icon} alt="" /><p>Gaming</p></Link>
            <Link to='/'  onClick={()=>{setCategory(2)}} className={`side-link ${category===2?"active":""}`}><img src={automobiles} alt="" /><p>Automobiles</p></Link>
            <Link to='/' onClick={()=>{setCategory(17)}} className={`side-link ${category===17?"active":""}`}><img src={sports} alt="" /><p>Sports</p></Link>
            <Link to='/'  onClick={()=>{setCategory(24)}} className={`side-link ${category===24?"active":""}`}><img src={entertainment} alt="" /><p>Entertainment</p></Link>
            <Link to='/'  onClick={()=>{setCategory(28)}} className={`side-link ${category===28?"active":""}`}><img src={tech} alt="" /><p>Technology</p></Link>
            <Link to='/'  onClick={()=>{setCategory(10)}} className={`side-link ${category===10?"active":""}`}><img src={music} alt="" /><p>Music</p></Link>
            <Link to='/' onClick={()=>{setCategory(22)}} className={`side-link ${category===22?"active":""}`}><img src={blogs} alt="" /><p>Blogs</p></Link>
            <Link to='/' onClick={()=>{setCategory(25)}} className={`side-link ${category===25?"active":""}`}><img src={news} alt="" /><p>News</p></Link>
            <hr/>
        </div>
        <div className="subscribed-list">
            <h3>SUBSCRIBED</h3>
            
            {subscriber && subscriber?.map((item,id)=>
            (
              <div className={`side-link`} key={item.id}><img src={item.snippet.thumbnails.default.url} alt="" /><p>{item.snippet.title}</p></div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar
