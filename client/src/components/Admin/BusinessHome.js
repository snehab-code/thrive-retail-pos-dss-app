import React from 'react'
import {connect} from 'react-redux'
import {Chart} from 'react-google-charts'

function BusinessHome(props){
    return(
    <div className="businessHome">
        <h2>{props.business && props.business.name}</h2>
        <span className="heading">Welcome</span>
        Click on the toggle bar for the business menu.

        // profit for term, total payables, total receivables

        {props.payableHeads[0] && <Chart
            width={'500px'}
            height={'100px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['', ...props.payableHeads, 'purchases'],
                ['', ...props.payableAmounts, props.purchases]
              ]}
              options={{
                chartArea: { width: '50%' },
                isStacked: true,
                hAxis: {
                  title: '',
                  minValue: 0,
                },
                animation: {
                    startup: true,
                    easing: 'linear',
                    duration: 1000,
                },
                backgroundColor: 'transparent'
              }}
        />}
    </div>
    
    )
}

const mapStateToProps = (state, props) => {
    return {
        business: state.businesses.find(business => business._id == props.match.params.businessId),
        payableHeads: state.payables.map(payable => {
            return payable.remark
        }),
        payableAmounts: state.payables.map(payable => {
            return payable.amount
        }),
        sales: state.sales.slice(0, 10),
        purchases: state.purchases[0] && state.purchases.reduce((acc, currentval) => {
            return acc.amount + currentval.amount
        })
    }
}

export default connect(mapStateToProps)(BusinessHome)