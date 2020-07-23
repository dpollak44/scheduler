import React, { Component } from 'react';

export default class Reports extends Component {

    // state = ({
    //     reports: []
    // });


    // async componentDidMount() {
    //     console.log('fetchin reports')
    //     try {
    //         const resp = await fetch('http://localhost:5000/reports');

    //         if (!resp.ok) {
    //             return console.error(resp.statusText)
    //         }
    //         const reports = await resp.json();
    //         this.setState({
    //             reports
    //         });
    //     }
    //     catch (e) {
    //         console.error(e);
    //     };
    // };










    render() {
        const reports = this.props.reports.map(r => <a className="dropdown-item" key={r.sr_id} id={r.sr_id} href="#" onClick={(e) => this.props.onReportSelected(e, e.target.id)}>{r.title}</a>)

        return (
            <>
                {reports}
            </>
        )
    }
}