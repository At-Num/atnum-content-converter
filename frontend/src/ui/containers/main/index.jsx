import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import { Outlet } from 'react-router-dom';
import { TranscodeAVIToMp4, GetGicon, ShutDown } from '../../../../wailsjs/go/transcode/Services'
import { LogDebug } from '../../../../wailsjs/runtime/runtime'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';
import { WaveSpinner } from "react-spinners-kit";


// https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react

export const MainContainer = () => {
    let location = useLocation();

    useEffect(() => {
        console.log(`MainContainer location ${location.pathname}`)
    }, [location])
    let props = {
        debug: "debug prop"
    }

    return (<MainView {...props} />)
}

const MainView = ({ debug } = props) => {
    const [selectedFile, setSelectedFile] = useState('')
    const [selected, isSelected] = useState(false)
    const [logo, setLogo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [transCodeError, setTransCodeError] = useState('run')

    useEffect(() => {

        GetGicon().then((imageData) => {
            LogDebug(`MainView imageData size ${imageData.length}`)
            setLogo(imageData)
        })

    }, [])

    const onTranscode = (event) => {
        console.log(`${selectedFile}`)
        setIsLoading(true)
        TranscodeAVIToMp4(`${selectedFile}`).then((ret) => {
            console.log(`TranscodeAVIToMp calls back ${ret}`)
            switch (ret) {
                case 'true':
                    setIsLoading(false)
                    break;
                case 'exists':
                    // error condition
                    setIsLoading(false)
                    setTransCodeError('exists')
                    break;
                case 'false':
                    // error condition
                    setIsLoading(false)
                    setTransCodeError('false')
                    break;
                default:
                    console.log(`Sorry, we are out of ${expr}.`);
            }
        })
    }

    if (isLoading) return (
        <Stack direction="column" spacing={2}
            sx={{ bgcolor: 'transparent', height: '50vh', width: '70vw', margin: '100px' }} >
            <Typography variant="h5" component="h5" gutterBottom sx={{ width: 'auto' }}>
                Processing the video
            </Typography>
            <WaveSpinner size={30} color="#686769" loading={isLoading} />;
        </Stack>)

    const presentErrorView = (mssg, error) => {
        return (
            <Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}
                sx={{ bgcolor: 'transparent', height: '50vh', width: '70vw', margin: '100px' }} >
                <Typography variant="h5" component="h5" gutterBottom sx={{ width: 'auto' }}>{error}</Typography>
                <Typography x={{ typography: { sm: 'body2', xs: 'body3' } }}>{mssg}</Typography>
                <Button disabled={!selected}
                    sx={{ mt: 4 }} variant="outlined"
                    onClick={(e) => {
                        setIsLoading(false)
                        setTransCodeError('run')
                    }}
                >Continue </Button>

            </Stack>)

    }

    const renderErrorView = (isGeneric) => {
        return (
            <>
                {isGeneric
                    ? presentErrorView("generic", "error")
                    : presentErrorView("mp4 exists", "error")}
            </>
        )
    }

    const renderMainView = () => {

        return (
            <>
                <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}
                    sx={{ height: '15vh', width: '100vw', bgcolor: 'white', p: 1, m: 0 }}>
                    <img style={{ width: '15vw', margin: '10 5 5 20' }} src={`data:image/jpeg;charset=utf-8;base64, ${logo}`} alt="logo" />
                    <Box sx={{ bgcolor: 'white', p: 1, m: 0, border: 0 }}>
                        <Typography variant="h5" component="h5" gutterBottom sx={{ width: 'auto' }}>
                            AtNum Content Converter
                        </Typography>
                        <Typography x={{ typography: { sm: 'body2', xs: 'body3' } }}>
                            select your recording to convert to mp4
                        </Typography>
                    </Box>
                    <Button sx={{ mt: 4, ml:'20vw' }} variant="text" color="secondary"  size="medium"
                            onClick={(e) => ShutDown()}>Quit </Button>
                </Stack>
                <Grid container spacing={2} sx={{ bgcolor: 'white', height: '100vh', width: '100vw', margin: '0' }}  >
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Button disabled={!selected} color="primary" size="large"
                            sx={{ mt: 4 }} variant="contained"
                            onClick={(e) => onTranscode(e)}
                        >Convert </Button></Grid>  <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>  <input
                        type="file"
                        onChange={(e) => {
                            setSelectedFile(e.target.files[0].name)
                            isSelected(true)
                        }}
                    /></Grid><Grid item xs={4}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
                <Outlet />
            </>
        )
    }


    const renderView = () => {
        switch (transCodeError) {
            case 'exists': return renderErrorView(false)
            case 'false': return renderErrorView(true)
            default: return renderMainView()
        }
    }

    return (<> {renderView()} </>)

}