import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import {useSelector} from 'react-redux'
import Img from '../../../components/ladyLoadImg/Img'
import ContentWrapper from '../../../contentWrapper/ContentWrrapper'
import './style.scss'

const HeroBanner = () => {
    const [background, setBackground] = useState("")
    const [query, setQuery]= useState('')
    const navigate = useNavigate()
    const {data,loading} = useFetch('/movie/upcoming')
    const {url} = useSelector((state)=>state.home)

useEffect(()=>{
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)].backdrop_path
    
    setBackground(bg)
},[data])


    const searchQueryHandler = (event)=>{
        if(event.key==='Enter' && query.length >0){
            navigate(`/search/${query}`)
        }
    }


  return (
    <div className='herobanner'>
       {!loading && <div className="backgroung-img">
            <Img src={background} />
        </div>}
        <div className="opacity-layer">
        </div>
        <ContentWrapper>
        <div className="wrapper">
            <div className="herobannercontent">
                <span className="title">Welcome</span>
                <span className="subTitle">Millions od movie watched this time</span>
                <div className="searchInput">
                    <input type="text" placeholder='Search for a movie daily show'  onKeyUp={searchQueryHandler} 
                    onChange={(e)=>setQuery(e.target.value)}
                    /><button>Search</button>
                </div>
            </div>
        </div>
      
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner
