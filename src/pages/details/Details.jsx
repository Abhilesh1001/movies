import React from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import {useParams} from 'react-router-dom'
import DetailBanner from './detailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideoSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recomdetation'


const Details = () => {
  const {mediaType,id} = useParams();
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading: creaditsLoading} = useFetch(`/${mediaType}/${id}/credits`)
  // console.log('data',data)
  // console.log('credits',credits)


  return (
    <div>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creaditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id}  />
    </div>
  )
}

export default Details
