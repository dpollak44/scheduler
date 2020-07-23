import React, { Component } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Reports from "./reports";
import TimePicker from 'react-time-picker';
import './scheduler.css';


export default class Scheduler extends Component {




    state = {

        title: '',
        selectedReport: null,
        selectedSchedule: null,

        daysOfWeek: 0,
        channels: '',
        selectTime: false,
        time: '10:00',
        selectDate: false,
        selectDaysOfWeek: false,
        reports: []

    };

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        });

    }

    handleReportSelect = (e, id) => {
        e.preventDefault();


        this.setState({
            selectedReport: e.target.text,
            reportId: e.target.id
        })

    }

    handleDaily = (e) => {
        e.preventDefault();
        this.setState({
            selectedSchedule: e.target.text,
            selectTime: true,
            selectDate: false,
            selectDaysOfWeek: false
        });

    }

    handleMonThruFri = e => {
        e.preventDefault();
        this.setState({
            selectedSchedule: e.target.text,
            selectTime: true,
            selectDate: false,
            selectDaysOfWeek: false
        });
    }

    handleWeekly = e => {
        e.preventDefault();
        this.setState({
            selectedSchedule: e.target.text,
            selectTime: true,
            selectDate: false,
            selectDaysOfWeek: true
        });
    }

    handleMonthly = e => {
        e.preventDefault();
        this.setState({
            selectedSchedule: e.target.text,
            selectTime: true,
            selectDate: true,
            selectDaysOfWeek: false
        });
    }


    handleDayOfMonthChange = (e) => {
        console.log(e.target.value);
        this.setState({
            dayOfMOnth: e.target.value
        });
    }




    handleTimeChange = time => {
        console.log(time);
        this.setState({ time });
    };

    onChange = time => {
        this.setState({ time })
        console.log(time)
    };

    handleDayOfWeekChange = e => {
        this.setState({ daysOfWeek: e })
        console.log(this.state.daysOfWeek)
    };

    handleChannelChange = (e) => {
        this.setState({
            channels: e.target.value
        })
    };

    getReports = async () => {
        console.log('fetchin reports')
        try {
            const resp = await fetch('http://localhost:5000/reports');

            if (!resp.ok) {
                return console.error(resp.statusText)
            }
            const reports = await resp.json();
            this.setState({
                reports
            });
        }
        catch (e) {
            console.error(e);
        };
    };

    handleSubmit = async e => {
        e.preventDefault();

        try {
            const resp = await fetch('http://localhost:5000/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: this.state.title, reportId: this.state.reportId, schedule: this.state.selectedSchedule, date: this.state.dayOfMOnth, schedule_time: this.state.time, slack_address: this.state.channels })
            });

            if (!resp.ok) {
                return console.error(resp.statusText);
            }


            this.setState({
                title: '',
                selectedReport: null,
                selectedSchedule: null,
                daysOfWeek: 0,
                channels: ' ',
                selectTime: false,
                time: '10:00',
                selectDate: false,
                selectDaysOfWeek: false
            });

        } catch (e) {
            console.error(e);

        }
    }

    render() {


        const { reports, selectedReport, selectedSchedule, selectTime, selectDate, selectDaysOfWeek, daysOfWeek } = this.state;


        const timePicker = selectTime ? <div className="form-group">
            <label>Time:
<div>
                    <TimePicker
                        onChange={this.onChange}
                        value={this.state.time}
                    />
                </div>
            </label>
        </div> : null;

        const datePicker = selectDate ? <div className="form-group">
            <div>
                <label htmlFor="monthInput"> Day of month:      </label>
            </div>
            <input type="number" id="monthInput" onChange={this.handleDayOfMonthChange}></input>


        </div > : null;


        const dayOfWeekPicker = selectDaysOfWeek ?

            <>
                <div><label htmlFor="dayPicker">Days of week:</label></div>
                <ToggleButtonGroup name="dayPicker" type="checkbox" value={daysOfWeek} onChange={e => this.handleDayOfWeekChange(e)}>
                    <ToggleButton value={1}>Sunday</ToggleButton>
                    <ToggleButton value={2}>Monday</ToggleButton>
                    <ToggleButton value={3}>Tuesday</ToggleButton>
                    <ToggleButton value={4}>Wednesday</ToggleButton>
                    <ToggleButton value={5}>Thursday</ToggleButton>
                    <ToggleButton value={6}>Friday</ToggleButton>
                </ToggleButtonGroup> </> : null;

        return (
            <>
                <div className="container">
                    <div className="jumbotron text-center">
                        <h1>Schedule Reports</h1>
                        <hr></hr>

                        <form id="setChronJob" onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="titleInput" className="col-sm-3 col-form-label"> Schedule Title/Subject:  </label>
                                <input type="text" value={this.state.title} id="titleInput" onChange={this.handleTitleChange}></input>
                            </div>

                            <div className="form-group">
                                <div onClick={this.getReports} className="dropdown show">
                                    <label id="dropdownLabel" htmlFor="dropdownMenuLink">Report:</label>
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {selectedReport !== null ? selectedReport : 'Select'}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <Reports reports={reports} onReportSelected={this.handleReportSelect} />
                                    </div>

                                </div>

                                <div className="dropdown show" id="scheduleDropdown">
                                    <label id="dropdownLabel" htmlFor="dropdownMenuLink">Schedule:</label>
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {selectedSchedule !== null ? selectedSchedule : 'Select'}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item" key="1" href="#" onClick={e => this.handleDaily(e)}>Daily</a>
                                        <a className="dropdown-item" key="2" href="#" onClick={e => this.handleMonThruFri(e)}>Monday to Friday</a>
                                        <a className="dropdown-item" key="3" href="#" onClick={e => this.handleWeekly(e)}>Weekly</a>
                                        <a className="dropdown-item" key="4" href="#" onClick={e => this.handleMonthly(e)}>Monthly</a>
                                    </div>

                                </div>

                            </div>



                            {dayOfWeekPicker}
                            {datePicker}
                            {timePicker}




                            <div className="form-group" id="channels">
                                <label htmlFor="channelInput">Channels(comma delimited):</label>
                                <div>
                                    <textarea name="channelInput" value={this.state.channels} rows="3" onChange={this.handleChannelChange}></textarea>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form >
                    </div >
                </div>

            </>
        )
    }
}
