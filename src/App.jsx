import { useState, useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration,getGenres } from './store/homeSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResults/SearchResult'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  const dispatch = useDispatch()
  const url = useSelector((state) => state.home)
  // console.log(url)

  useEffect(() => {
    fetchApiConfiguration()
    genresCall()
  }, [])

  const fetchApiConfiguration = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        console.log(res)
        const url = {
          backdrop : res.images.secure_base_url + 'original',
          poster : res.images.secure_base_url + 'original',
          profile : res.images.secure_base_url + 'original'
        }
        dispatch(getApiConfiguration(url))
      })
  }
  const genresCall = async ()=>{
    let promises = []
    let endpPoints = ["tv","movie"]
    let allGenres = {}
    endpPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    console.log(data)
    data.map(({genres})=>{
      return genres.map((items)=>{allGenres[items.id]=items})
    })
    // console.log(allGenres)
    dispatch(getGenres(allGenres))

  }



  return (
    <BrowserRouter>
    <Header />
      <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/:mediaType/:id' element={<Details/>} />
            <Route path='/search/:query' element={<SearchResult/>} />
            <Route path='/explore/:mediaType' element={<Explore/>} />
            <Route path='*' element={<PageNotFound/>} />
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
