const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "ADD PATIENTS"
    });
});
router.get('/about', (req, res) => {
    res.render("employee/about", {
        viewTitle: ""
    });
});
router.get('/service', (req, res) => {
    res.render("employee/service", {
        viewTitle: "service page here"
    });
});
router.get('/appointment', (req, res) => {
    res.render("employee/appointmentlist", {
        viewTitle: "service page here"
    });
});



router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.age=req.body.age;
    employee.weight=req.body.weight;
    employee.height=req.body.height;   
    employee.city = req.body.city;
    employee.address=req.body.address;
    employee.calender=req.body.calender;
    employee.diseases=req.body.diseases;
    
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "ADD PATIENTS",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
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
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs,
                employee: req.body
            });
        }
        else {
                
        }
    });
});
router.get('/view', (req, res) => {
    Employee.findOne((err, docs) => {
        if (!err) {
            res.render("employee/view/:id", {
                list: docs
            });
        }
        else {
                
        }
    });
});




function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "UPDATE PATIENTS",
                employee: doc
            });
        }
    });
});
router.get('/view/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/view", {
                viewTitle: "view",
                employee: doc
            });
        }
    });
});
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});





module.exports = router;