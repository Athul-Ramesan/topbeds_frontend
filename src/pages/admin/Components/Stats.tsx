
import React, { useEffect, useState } from 'react'
import { bookingApiInstance } from '../../../config/instances'

const Stats = () => {
    const [activeBookings, setActiveBookings] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalUsers,setTotalUsers] = useState(0)
    const [propertiesListed, setPropertiesListed] = useState(0)
   

    useEffect(()=>{
        const fetchConsolidatedData = async()=>{
            const response = await bookingApiInstance.get('/dashboard/consolidated-data')
            console.log("🚀 ~ fetchConsolidatedData ~ response:", response)
            if(response.statusText==="OK"){
                const consolidatedData = response.data
                setActiveBookings(consolidatedData.activeBookings)
                setTotalRevenue(consolidatedData.totalRevenue)
                setTotalUsers(consolidatedData.totalUsers)
                setPropertiesListed(consolidatedData.propertiesListed)
                console.log("🚀 ~ fetchConsolidatedData ~ response.data:", response.data)
            }
        }
        fetchConsolidatedData()
    },[])
    return (
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Active Bookings</div>
                    <div className="stat-value">{activeBookings}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value">{totalRevenue}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Properties Listed</div>
                    <div className="stat-value">{propertiesListed}</div>
                    <div className="stat-desc">↗︎ </div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{totalUsers}</div>
                    <div className="stat-title">↗︎ </div>
                </div>
            </div>
    )
}

export default Stats
