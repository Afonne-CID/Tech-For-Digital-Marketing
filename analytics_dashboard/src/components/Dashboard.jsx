import React, { useState, useEffect } from 'react'

const metrics = [
    'activeUsers',
    'adUnitExposure',
    'addToCarts',
    // 'advertiserAdClicks',
    // 'advertiserAdCost',
    // 'advertiserAdCostPerClick',
    // 'advertiserAdCostPerConversion',
    // 'advertiserAdImpressions',
    // 'cohortActiveUsers',
    // 'cohortTotalUsers',
    'averagePurchaseRevenue',
    'averagePurchaseRevenuePerPayingUser',
    'averagePurchaseRevenuePerUser',
    'averageRevenuePerUser',
    'averageSessionDuration',
    'bounceRate',
    'cartToViewRate',
    'checkouts',
    'conversions',
    'crashAffectedUsers',
    'crashFreeUsersRate',
    'dauPerMau',
    'dauPerWau',
    'ecommercePurchases',
    'engagedSessions',
    'engagementRate',
    'eventCount',
    'eventCountPerUser',
    'eventValue',
    'eventsPerSession',
    'firstTimePurchaserConversionRate',
    'firstTimePurchasers',
    'firstTimePurchasersPerNewUser',
    'itemListClickEvents',
    'itemListClickThroughRate',
    'itemListViewEvents',
    'itemPromotionClickThroughRate',
    'itemRevenue',
    'itemViewEvents',
    'itemsAddedToCart',
    'itemsCheckedOut',
    'itemsClickedInList',
    'itemsClickedInPromotion',
    'itemsPurchased',
    'itemsViewed',
    'itemsViewedInList',
    'itemsViewedInPromotion',
    'newUsers',
    'organicGoogleSearchAveragePosition',
    'organicGoogleSearchClickThroughRate',
    'organicGoogleSearchClicks',
    'organicGoogleSearchImpressions',
    'promotionClicks',
    'promotionViews',
    'publisherAdClicks',
    'publisherAdImpressions',
    'purchaseRevenue',
    'purchaseToViewRate',
    'purchaserConversionRate',
    'returnOnAdSpend',
    'screenPageViews',
    'screenPageViewsPerSession',
    'screenPageViewsPerUser',
    'scrolledUsers',
    'sessionConversionRate',
    'sessions',
    'sessionsPerUser',
    'shippingAmount',
    'taxAmount',
    'totalAdRevenue',
    'totalPurchasers',
    'totalRevenue',
    'totalUsers',
    'transactions',
    'transactionsPerPurchaser',
    'userConversionRate',
    'userEngagementDuration',
    'wauPerMau',
]

const Dashboard = () => {

    const [sumTotal, setSumTotal] = useState(0)
    const [analyticsData, setAnalyticsData] = useState(null)

    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    const initialEndDate = `${year}-${month}-${day}`
    const initalStartDate = `${year}-${month}-${String(today.getDate() - 1).padStart(2, '0')}`

    const [startDate, setStartDate] = useState(initalStartDate)
    const [endDate, setEndDate] = useState(initialEndDate)
    const [metric, setMetric] = useState('activeUsers')

    const [loading, setLoading] = useState(false)

    const [dateError, setDateError] = useState(null)

    const fetchAnalyticsData = async () => {

        setLoading(true)

        if (new Date(startDate) > new Date(endDate)) {
            setDateError(`start date ${startDate} must be less than or equal to end date ${endDate}`)
            setLoading(false)
        } else {

            setDateError(null)

            try {
                const queryParams = new URLSearchParams([
                    ['metrics', JSON.stringify([{ name: metric }])
                    ],
                    ['dimensions', JSON.stringify([{ name: 'country' }])],
                    ['dateRanges', JSON.stringify([{ startDate: startDate, endDate: endDate }])],
                ])
    
                const response = await fetch(`/api/analytics?${queryParams}`)
                const data = await response.json()
                setAnalyticsData(data)
    
                if (data && data[0].rows){
                    const total = data[0].rows.reduce((sum, row) => {
                        return sum + parseInt(row.metricValues[0].value, 10)
                    }, 0)
                    setSumTotal(new Intl.NumberFormat('en-US').format(total))
                }
    
            } catch(error) {
                console.error('Error', error)
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchAnalyticsData()
    }, [])


    console.log(analyticsData)

    return (
        <div className='p-2'>
            <div className='bg-[#14b8a6]'>
                <div className='bg-[#082f49] text-white font-bold text-[36px] h-[100%] w-[100%] ml-2 p-2'>Dashboard</div>
            </div>

            <form className='flex items-start justify-end text-end p-2 m-2'>
                <div className='p-2' >
                    <label htmlFor="startDate">Start Date{'  '}</label>
                    <small>(earlier mm/dd/yy)</small>
                </div>
                <input 
                    className='p-2 rounded-md border-double border-2 border-[#082f49]' 
                    type="date" 
                    name="startDate" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <div className='p-2' >
                    <label htmlFor="endDate">End Date{'  '}</label>
                    <small>(later mm/dd/yy)</small>
                </div>
                <input 
                    className='p-2 rounded-md mx-2 border-double border-2 border-[#082f49]' 
                    type="date" 
                    name="endDate" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <select 
                    className='p-2 rounded-md border-double border-2 border-[#082f49]' 
                    type="select" 
                    name="metric" 
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                >
                    {metrics.map((metric, index) => {
                            return (
                                <option value={metric} key={index}>{metric}</option>
                            )
                        })
                    }
                </select>
                <input className='p-2 ml-2 rounded-md text-white text-[18px] font-bold bg-[#14b8a6] w-[200px]' type="button" onClick={() => {console.log(startDate, endDate); fetchAnalyticsData()}} value='Fetch'/>
            </form>

            {dateError && <div className='bg-[#f59e0b] text-white p-2 rounded-sm'>{dateError}</div>}

            <div className='flex flex-1 w-[100%] pt-2'>
                <div className='flex-col w-[20%]'>
                    <div className='flex items-center justify-center bg-[#14b8a6] h-[370px]'>
                        <p className='justify-center text-center text-white font-bold text-[32px] p-2'>Sum Total: <br /> {sumTotal}</p>
                    </div>
                    <div className='flex items-center justify-center bg-white h-[370px]'>
                        <p className='font-bold text-lg'>Chart goes here</p>
                    </div>
                </div>
                <div className='w-[80%]'>
                    <div className='pl-2'>
                        <table className='w-[100%] mb-10'>
                            <thead>
                                <tr className='bg-[#082f49] text-white'>
                                    <th className='p-2 text-center justify-center'>Country</th>
                                    <th className='p-2 text-center justify-center'>Start Date</th>
                                    <th className='p-2 text-center justify-center'>End Date</th>
                                    <th className='p-2 text-center justify-center'>Value</th>
                                </tr>
                            </thead>

                            <tbody className={`${loading ? 'blur' : ''}`}>
                                {loading && (
                                    <div className='absolute inset-0 flex items-start justify-center z-5'>
                                        <div className='border-[#082f49] border-t-4 rounded-full w-12 h-12 animate-spin'></div>
                                    </div>
                                )}
                                {analyticsData && analyticsData[0].rows && analyticsData[0].rows.map((row, index) => {
                                    return (
                                            <tr key={index} className={`${(index % 2) ? 'bg-[#ccfbf1]' : 'bg-[#a5f3fc]'}`}>
                                                <td className='p-2'>{row.dimensionValues[0].value}</td>
                                                <td className='p-2'>{startDate}</td>
                                                <td className='p-2'>{endDate}</td>
                                                <td className='p-2'>{new Intl.NumberFormat('en-US').format(row.metricValues[0].value)}</td>
                                            </tr>
                                        )
                                    })
                                }
                                {analyticsData && analyticsData[0].rows.length <= 0 && (
                                        <tr className='text-center justify-center'>
                                            No data found
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard