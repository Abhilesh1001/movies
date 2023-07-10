import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";
import ContentWrapper from "../../../contentWrapper/ContentWrrapper";

import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/ladyLoadImg/Img";


import PosterFallback from "../../../assets/no-poster.png";
import { GenIcon } from "react-icons";
import { PlayIcon } from "../Platbtn";
import VideoPopup from "../../../components/videoPopup/VidieoPopup";

const DetailBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false)
    const [vidieoId,setVideoId] = useState(null)

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    //  console.log(data)
    const { url } = useSelector((state) => state.home)
    //  console.log(url)
    const _genres = data?.genres?.map((g) => g.id);
    // console.log('crew', crew)
    // console.log('director',video)
    const director = crew?.filter((f) => f.known_for_department === "Directing")
    // console.log("directing", director)
    const writer = crew?.filter((f) => f.known_for_department === "Art" || f.known_for_department === "Story" || f.known_for_department === "Writing")
    console.log('data',data)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (

        <div className="detailsBanner">
            {!loading ? (
                <>
                    {
                        !!data && (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data.backdrop_path} />
                                </div>
                                <div className="opacity_layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            {data.poster_path ? (
                                                <Img className='posterImg' src={url.backdrop + data.poster_path} />
                                            ) : (<Img className='posterImg' src={PosterFallback} />)}
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {`${data.name || data.title}(${dayjs(data?.releas_date).format("YYYY")})`}
                                            </div>
                                            <div className="subtitle">
                                                {data.tagline}
                                            </div>
                                            <Genres data={_genres} />
                                            <div className="row">
                                                <CircleRating rating={data.vote_average.toFixed(1)} />
                                                <div className="playbtn" onClick={()=>{
                                                    setShow(true)
                                                    setVideoId(video.key)
                                                }}>
                                                    <PlayIcon />
                                                    <span className="text">Watch Tailer</span>
                                                </div>
                                            </div>
                                            <div className="overview">
                                                <div className="heading">
                                                    Overview
                                                </div>
                                                <div className="description">
                                                    {data.overview}
                                                </div>
                                            </div>
                                            <div className="info">
                                                {data.status && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Status : {" "}
                                                        </span>
                                                        <span className="text">
                                                            {data.status}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.release_date && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Release Date: {" "}
                                                        </span>
                                                        <span className="text">
                                                            {dayjs(data.releas_date).format("MMM D, YYYY")}
                                                        </span>
                                                    </div>
                                                )}
                                                {data.runtime && (
                                                    <div className="infoItem">
                                                        <span className="text bold">
                                                            Run Time: {" "}
                                                        </span>
                                                        <span className="text">
                                                            {toHoursAndMinutes(data.runtime)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {director?.length >0 &&
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => {
                                                        return (
                                                            <span key={i}>{d.name} {i>=0 && i<director?.length-1 ?",":""} </span>
                                                        )
                                                    })}
                                                </span>
                                            </div>}

                                            {writer?.length > 0 && 
                                                <div className="info">
                                                    <span className="text bold">
                                                    Writer:
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => {
                                                        return (
                                                            <span key={i}>{d.name} {i>=0 && i<writer?.length -1 ?"," : ""}  </span>
                                                        )
                                                    })}
                                                </span>
                                                </div>}
                                                
                                                {data?.created_by?.length >0 &&
                                                    <div className="info">
                                                    <span className="text bold">
                                                    Created by:
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map((d, i) => {
                                                        return (
                                                            <span key={i}>{d.name} {i>=0 && i< data?.created_by?.length-1 ?" , " : ""}
                            
                                                             </span>
                                                        )
                                                    })}
                                                </span>
                                                </div>}
                                        </div>
                                    </div>
                                    <VideoPopup 
                                    show={show}
                                    setShow ={setShow}
                                    videoId={vidieoId}
                                    setVideoId={setVideoId}
                                    />
                                </ContentWrapper>
                            </React.Fragment>
                        )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailBanner;