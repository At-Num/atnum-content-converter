import React, {useMemo } from "react";
import { useDropzone } from "react-dropzone"
import Grid from '@mui/material/Grid'

const dropStyle = {
    textAlign: 'center', padding: '20px',
    border: '3px blue dashed', width: '60%', margin: 'auto'
}

export const DropArea = ({ isSelected, setFile }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
    useMemo(() => {
        if (acceptedFiles[0] != null) {
            setFile(acceptedFiles[0].path)
            isSelected(true)
        }

    }, [acceptedFiles])

    return (
        <Grid item xs={10}>
            <div style={dropStyle} {...getRootProps({ className: "dropzone" })}>
                <input  {...getInputProps()} />
                <div>
                    <p > Drag the avi file here, or click to select</p>
                </div>
            </div>
        </Grid>
    )

}