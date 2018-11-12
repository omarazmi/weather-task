
import React from "react";

//the yahoo weather icon request an authorisation , we use this icon all time instead
const icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNTZweCIgaWQ9IlNWR1Jvb3QiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI1NiAyNTYiIHdpZHRoPSIyNTZweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMgaWQ9ImRlZnM1NDM1Ii8+PGcgaWQ9ImxheWVyMSI+PGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiBpZD0icGF0aDQyMDYiIHI9Ijg1LjUyNjM4MiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2ZpbGw6I2Y5ZmYwYjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2ZmZGEwOTtzdHJva2Utd2lkdGg6MjA7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOmJldmVsO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIi8+PC9nPjwvc3ZnPg=="


const WeatherInfo = ({ data }) => {
    data = data || {}
    return (
        
        <div className="weather-app" >
            <div className="left-container">
                <h2>{data.cityName}</h2>
                <h3 style={{ fontWeight: 'normal' }}>{data.statusText}</h3>
            </div>
            <div className="right-container" >
                <h1 className="current-temp">{data.tempCurrent}{'\u00b0'}</h1>
                <img src={icon} className="temp-icon" alt="icon" />
                <div className="sub-container">
                    <p><span className="temp-text">H </span>{data.tempHigh}{'\u00b0'}</p>
                    <p><span className="temp-text">L </span>{data.tempLow}{'\u00b0'}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherInfo;
