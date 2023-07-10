import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    sendEmail:{
        title:{
            type:String
        },
        increase:{
            type:Number
        },
        progress:{
            type:Number
        }
    },
    totalSales:{
        title:{
            type:String
        },
        increase:{
            type:Number
        },
        progress:{
            type:Number
        }
    },
    newClients:{
        title:{
            type:String
        },
        increase:{
            type:Number
        },
        progress:{
            type:Number
        }
    },
    totalTraffic:{
        title:{
            type:String
        },
        increase:{
            type:Number
        },
        progress:{
            type:Number
        }
    },
    generatedRevenue:{
        type:String
    },
    campaignCost:{
        cost:{
            type:String
        },
        progress:{
            type:Number
        }
    }
},{
    capped: { max: 1, size: 1000000 }
})
const dashboardDataModel = mongoose.model('dashboard',schema)

export default dashboardDataModel