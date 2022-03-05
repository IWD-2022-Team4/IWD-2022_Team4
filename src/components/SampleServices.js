import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ServicesComponentDiv = styled.div`
   background-color: #323956;
    `;
const PageTitle = styled.h1`
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    font-family: Source Sans Pro, sans-serif;
    font-size: 3rem;
    color: #ffffff;
    font-weight: 600;
    line-height: 1.65;
    border-bottom: 2px solid #ffffff;
    margin-bottom: 20px;
    @media(max-width: 670px){
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 0;
    }`;
const ServiceDisplayDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;
const ServiceCard = styled.div`
    width: 90%;   
    margin: 0 auto; 
    display: flex;
    align-items:center;
    justify-content: space-between;
    color: #ffffff;
    @media(max-width: 850px){
        flex-direction: column;
    };
`;
const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    padding: 20px;
    @media(max-width: 850px){
        width: 80%;
        order: -99;
    };
    `;

const InfoDiv = styled.div`
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    @media(max-width: 850px){
        width: 80%;
    };
    `;

const ServiceTitle = styled.h3`
    font-family: Source Sans Pro, sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0;
    padding-bottom: 5px;
    border-bottom: 2px solid #ffffff;
     `;

const ServiceDescription = styled.p`
    font-family: Source Sans Pro, sans-serif;
    font-size: 2rem;
    `;

const Button = styled.button`
    border: 1px solid #ffffff;
    background-color: transparent;
    padding: 16px 30px;
    border-radius: 0;
    text-transform: uppercase;
    font-size: 1.6rem;
    color: #ffffff;
    cursor: pointer;
    &:hover{
        border-color: #9bf1ff;
        color: #9bf1ff;
    }
    @media(max-width: 850px){
        padding: 12px 20px;
    };
    `;

export default function SampleServices() {
    const [services, setServices] = useState([]);
    const history = useHistory();
    // Set up axios get request to get classlist object from server
    useEffect(()=> {
        axios.get('https://anywhere-fitness-tt-webpt-88.herokuapp.com/')
        .then(response => setServices(response.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <ServicesComponentDiv >
            <PageTitle>Sample Services</PageTitle>
            <ServiceDisplayDiv >
                {services.map(sampleService => (
                <ServiceCard key={sampleService.id}>
                { !!(Number(sampleService.id) % 2) ?
                   (<>
                    <ImageDiv>
                        <img
                        src={sampleService.imageUrl}
                        alt={sampleService.name}
                        width="100%"
                        />
                    </ImageDiv>
                    <InfoDiv>
                        <ServiceTitle>{sampleService.name}</ServiceTitle>
                        <ServiceDescription>{sampleService.description}</ServiceDescription>
                        <Button onClick={()=> history.push('/signup')}>Get Started</Button>
                    </InfoDiv>
                    </>
                   ): 
                   (<>
                    <InfoDiv>
                        <ServiceTitle>{sampleService.name}</ServiceTitle>
                        <ServiceDescription>{sampleService.description}</ServiceDescription>
                        <Button onClick={()=> history.push('/signup')}>Get Started</Button>
                    </InfoDiv>
                    <ImageDiv>
                        <img
                        src={sampleService.imageUrl}
                        alt={sampleService.name}
                        width="100%"
                        />
                    </ImageDiv>
                    </>)
                }
                </ServiceCard>
                ))}
                </ServiceDisplayDiv>
                
        </ServicesComponentDiv>
    )

}