import React, { Component } from 'react';
import ReportsTable from './reportsTable';
import './getReports.css';

export default class GetReports extends Component {

    state = ({
        editRow: false,
        editTitle: '',
        editReport: '',
        editTime: '',
        editChannel: ''
    });


    handleDeletedRow = (filteredArray) => {
        this.setState({
            scheduledReports: filteredArray
        });

    }


    handleEditRow = () => {
        this.setState({
            editRow: true,
            editTitle: '',
            editReport: '',
            editTime: '',
            editChannel: ''
        })
    }



    async componentDidMount() {
        try {
            const res = await fetch('http://localhost/reports/scheduledReports');
            if (!res.ok) {
                return console.error(res.statusText);
            }
            const reports = await res.json();
            this.setState({
                scheduledReports: reports
            });
        } catch (e) {
            console.error(e);
        }
    }

    render() {

        const editRowMessageBox = this.state.editRow ? <div className="container" id="editDiv">
            <form>

                <div className="form-group">
                    <label id="topLabel" htmlFor="titleEdit" className="col-sm-3 col-form-label"> Title:  </label>
                    <input type="text" value={this.state.editTitle} id="titleEdit" onChange={this.handleTitleEdit}></input>
                    <label htmlFor="titleEdit" className="col-sm-3 col-form-label"> Report:  </label>
                    <input type="text" value={this.state.editReport} id="reportEdit" onChange={this.handleReportEdit}></input>
                    <label htmlFor="titleEdit" className="col-sm-3 col-form-label"> Time:  </label>
                    <input type="text" value={this.state.editTime} id="timeEdit" onChange={this.handleTimeEdit}></input>
                    <label htmlFor="titleEdit" className="col-sm-3 col-form-label"> Channel:  </label>
                    <input type="text" value={this.state.editChannel} id="channelEdit" onChange={this.handleChannelEdit}></input>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
                <button className="btn btn-primary">Close</button>
            </form>
        </div> : null;

        return (
            <>
                <ReportsTable reports={this.state.scheduledReports} onHandleDeletedRow={this.handleDeletedRow} onHandelEditRow={this.handleEditRow} />
                {editRowMessageBox}
            </>
        )
    }
}