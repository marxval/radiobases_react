import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios'
import styled from 'styled-components'
const Container = styled.div`
  display:flex;
  justify-content:flex-end;
  align-items:center;
  width:1650px;
`
const Message = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:150px;
  height:70px;
`
const SelectComponent = ({ setSelected, loading }) => {

    const [regionsData, setRegions] = useState(null);
    const [regionSelected, setRegion] = useState(null)



    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('http://localhost:3005/regions')
            const { data } = response
            setRegions(data)
        }
        getData()
    }, [])



    const handleChange = (selectedOption) => {
        console.log('new region selected', selectedOption)
        setRegion(selectedOption)
        setSelected(selectedOption.value)
    };

    if (!regionsData) {
        return (
            <>
                Cargando...
            </>
        )
    }


    const options = regionsData.map(region => ({ value: region, label: region }))


    return (
        <Container>
            <Message>
                {loading ?
                    <p>Loading...</p> :
                    <p>Filter by Region</p>
                }
            </Message>
            <Select
                placeholder='..'
                isDisabled={loading}
                value={regionSelected}
                onChange={handleChange}
                options={options}
            />
        </Container>

    );
}

export default SelectComponent;