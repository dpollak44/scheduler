const router = require('express').Router();
const db = require('../modules/pool.js');
// var cors = require('cors')

// router.use(require('cors')({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));

const authenticatedOnly = require('../modules/authenticatedOnly');


router.route('/')

    .get(/*authenticatedOnly,*/ async (req, res, next) => {
        console.log('3', req.session.user)
        db.query(`SELECT id,title from reports`,
            (error, result) => {
                if (error) return next(new Error(`Unable to get reports ${error.message}`));
                console.log(result)
                res.send(result);
            });
    })

    .post(authenticatedOnly, async (req, res, next) => {
        console.log(req.body);

        db.query(`INSERT INTO reportSchedule(reportId, title, schedule, week_days, day_of_month, schedule_time, slack_address)
                  VALUES(?, ?, ?, ?, ?, ?, ?)`,
            [req.body.reportId, req.body.title, req.body.schedule, req.body.week_days, req.body.day_of_month, req.body.schedule_time, req.body.slack_address],
            (error, result) => {
                if (error) return next(new Error(`Unable to schedule report ${error.message}`));
                if (!result.affectedRows) return next(new Error(`Unable to schedule report`));

                const scheduledReport = {
                    report: req.body.report,
                    title: req.body.title,
                    dayOfWeek: req.body.week_days,
                    monthDay: req.body.day_of_month,
                    time: req.body.schedule_time,
                    channels: req.body.slack_address,
                    id: result.insertId
                };
                res.status(201).send(scheduledReport);
            }
        );

    });

router.get('/scheduledReports', (req, res, next) => {
    db.query('SELECT * FROM reportSchedule',
        (error, result) => {
            if (error) return next(new Error(`Unable to get scheduled reports ${error.message}`));
            res.send(result);
        });
});

router.route('/scheduledReports/:id')
    .get((req, res, next) => {
        db.query('SELECT * FROM reportSchedule WHERE id = ?',
            [req.params.id],
            (error, [result], fields) => {
                if (error) return next(new Error(`Unable to get scheduled report ${req.params.id} ${error.message}`));
                if (!result) return next(new Error(`Unable to get scheduled report ${req.params.id}`, 404));

                res.send(result);
            });
    })
    .put(authenticatedOnly, (req, res, next) => {
        db.query(`UPDATE reportSchedule SET reportId = ?, title = ?, schedule = ?, week_days = ?, day_of_month = ?, schedule_time = ?, slack_address = ?   
              WHERE id = ?`,
            [req.body.reportId, req.body.title, req.body.schedule, req.body.week_days, req.body.day_of_month, req.body.schedule_time, req.body.slack_address, req.params.id],
            (error, result) => {
                if (error) return next(new Error(`Unable to update scheduled report ${req.params.id} ${error.message}`));
                console.log(result);
                if (!result.changedRows) return next(new Error(`Unable to update scheduled report`, 404));

                res.status(204).end();
            }
        );
    })
    .delete(authenticatedOnly, (req, res, next) => {
        db.query(`DELETE FROM reportSchedule WHERE id = ?`,
            [req.params.id],
            (error, result) => {
                if (error) return next(new Error(`Unable to delete scheduled report ${req.params.id} ${error.message}`));
                if (!result.affectedRows) return next(new Error(`Unable to delete scheduled report ${req.params.id}`, 404));
                res.status(204).end();
            }
        );
    });




module.exports = router;