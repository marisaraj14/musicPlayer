import WaveSurfer from "wavesurfer.js";
import React, { useRef, useEffect, useState } from "react";


export default function Player(props) {
    const waveformRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveSurfer, setWaveSurfer] = useState(null);
    let number = useRef("0.5");

    let lyrics = useRef();
    useEffect(() => {
        setWaveSurfer(WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#3BAFDD',
            progressColor: '#013380',
            cursorColor: 'transparent',
            barWidth: 4,
            hideScrollbar: true
        }))

    }, [])

    useEffect(() => {
        if (waveSurfer) {
            stopMusic();
            waveSurfer.load('music/' + props.song.path);
        }
        lyrics.current.value = localStorage.getItem(props.song.title)

    }, [props.song.title])

    const handleSpace = (e) => {
        if (e.key == " ") {
            togglePlayPause();
        }
        else if (e.key === "Enter") {
            stopMusic();
        }
    };

    const togglePlayPause = () => {
        waveSurfer.playPause()
        setIsPlaying(!isPlaying)
    }

    const stopMusic = () => {
        if (isPlaying)
            setIsPlaying(!isPlaying)
        waveSurfer.stop();
    }

    const handleSubmit = () => {
        localStorage.setItem(props.song.title, lyrics.current.value);
    }

    const handleVolumeChange = () => {
        waveSurfer.setVolume(number.current.value)
    }

    return (
        <>
            <section ref={waveformRef} className="row-start-1 w-11/12 m-4 h-1/4 border-4 rounded-md border-blue-700" tabIndex="0" onKeyDown={(e) => handleSpace(e)} />
            <section className="text-5xl p-0 text-gray-700 row-start-2">
                <button className="focus:none" onClick={() => togglePlayPause()} >
                    {
                        isPlaying ? <i className="fa fa-pause"></i>
                            : <i className="fa fa-play"></i>
                    }</button>
                <i className="fa fa-stop p-4" onClick={() => stopMusic()}></i>
                <i className="fa fa-volume-off"></i>
                <input className="p-2 w-20 bg-green-300" type="range" min="0" max="1" step="0.1" ref={number} onChange={() => handleVolumeChange()} />
            </section>
            <section className="row-start-3 text-center w-11/12">
                <h1 className="font-bold text-3xl">{props.song.title}</h1>
                <h2 className="text-2xl">{props.song.artist}</h2>
                <textarea
                    className="form-textarea mt-1 bg-blue-200 rounded w-11/12 m-4 p-4 text-2xl"
                    rows="3"
                    placeholder="Enter your lyrics here!" ref={lyrics}>{lyrics}</textarea>
                <button className="text-2xl bg-blue-800 p-2 rounded-md text-white px-20 m-4 float-right" onClick={() => handleSubmit()}>Save</button>
            </section>
        </>
    );

}