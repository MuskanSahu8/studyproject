import React, { useState,useEffect } from 'react'

const TimeWidget = () => {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date)
        }, 1000);
        return () => clearInterval(timer)
    }, [])
    return (
        <div className='timer-head'>
            <p className='timer-label'>CURRENT TIME</p>
            <br/>
            <br/>
            <h2>
                {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                })}
            </h2>
            <p className='date'>
                {time.toLocaleDateString([], {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>
            <div className='time-actions'>
                <button>
                    <span>⏰</span>
                    <small>Alarm</small>
                </button>
                <button>
                    <span>🔔</span>
                    <small>Reminder</small>
                </button>

                <button>
                    <span>⏱️</span>
                    <small>Stopwatch</small>
                </button>

                <button>
                    <span>🍅</span>
                    <small>Focus</small>
                </button>
            </div>


        </div>
    )
}

export default TimeWidget
