import React,{useState} from 'react'
import ContentWrapper from '../../../contentWrapper/ContentWrrapper'
import SwitchTags from '../../../components/switchTags/SwitchTags'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'


const TopRated = () => {
    const [endPoint,serEndPoint] = useState("movie")
    
    const {data,loading}= useFetch(`/${endPoint}/top_rated`)
    const onTabChange = (tab)=>{
        serEndPoint(tab==="Movies"?"movie":"tv")
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper >
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTags data={["Movies","TV Shows"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data ={data?.results} loading= {loading} endPoint={endPoint}/>

    </div>
  )
}

export default TopRated
