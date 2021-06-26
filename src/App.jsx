import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import styled from 'styled-components'

import Select from './components/select/index.jsx'
import Table from './components/table/index.jsx'
import Loader from './components/loader/index.jsx'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  min-height:100vh;
  justify-content:center;
  align-items:center;
  width:100%;
`
function App() {
  const [tableData, setData] = useState(null);
  const [regionSelected, setRegion] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const response = await axios.get(`https://radiobasesjs.herokuapp.com/radiobases${regionSelected ? `?region=${regionSelected}` : ''}`)
      setLoading(false)
      const { data } = response
      setData(data)
    }
    getData()
  }, [regionSelected])

  // if (loading || !tableData) {
  //   return <p>Loading</p>
  // }
  if (!tableData) {
    return <Loader />
  }

  return (
    <Container>
      <h1>RadioBases</h1>
      <Select
        loading={loading}
        setSelected={setRegion}
      />
      <Table tableData={tableData} />
    </Container>
  );
}

export default App;
