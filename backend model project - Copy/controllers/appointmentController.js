const { application } = require('express');
 express = require('express');
var router = express.Router();
mongoose = require('mongoose');
const appointment = mongoose.model('appointment');

// router.get('/service', (req, res) => {
//     res.render("employee/service", {
//         viewTitle: "service page here"
//     });
// });

// router.get('/service', (req, res) => {
//     res.render("employee/service", {
//         viewTitle: "appointment page here"
//     });
// });

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var appointment = new appointment();
   
appointment.name=req.body.name;
appointment.Email=req.body.Email;





    appointment.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/appointmentist", {
                    viewTitle: "ADD PATIENTS",
                    appointment: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    appointment.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'UPDATE PATIENTS LIST',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}



router.get('/list', (req, res) => {
    appointment.find((err, docs) => {
        if (!err) {
            res.render("employee/appointmentlist", {
                list: docs,
                employee: req.body
            });
        }
        else {
                
        }
    });
});






module.exports = router;