import React, { Component } from 'react';

export default class ReportsTable extends Component {

    state = ({

    });


    handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/reports/scheduledReports/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(`${res.status} ${res.statusText} ${result.error}`);
            }

            console.log(this.props.reports);


            let arrayCopy = this.props.reports.filter((row) => row.id !== id);

            console.log(arrayCopy);

            this.props.onHandleDeletedRow(arrayCopy);

        } catch (error) {
            console.error(error);
        }
    };

    handleEdit = () => {
        this.props.onHandelEditRow();
    }





    render() {
        let reports;
        reports = this.props.reports ? this.props.reports.map(r => <tr key={r.id}><td>{r.title}</td><td>{r.slack_address}</td><td>{r.schedule}</td><td>{r.schedule_time}</td><td><button onClick={() => this.handleEdit()}>edit</button><button onClick={() => this.handleDelete(r.id)}>delete</button></td></tr>) :
            <tr><td colSpan="6">No reports to display...</td></tr>

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Channels</th>
                        <th scope="col">Schedule/Date</th>
                        <th scope="col">Schedule Time</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reports}
                </tbody>
            </table>
        )
    }
}