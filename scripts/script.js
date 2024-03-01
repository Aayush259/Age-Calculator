/*
    This function removes display none class from all elemnts of node list.
*/
const RemoveNoneDisplay = (nodeList) => {
    
    nodeList.forEach(element => {
        element.classList.remove('display-none');
    })

    const SubmitBtn = document.getElementById('submit-button');

    SubmitBtn.classList.add('submit-button-error');

}

/*
    This function displays error on screen.
*/
const DisplayError = (inputElement, errorMessage) => {

    inputElement.previousElementSibling.classList.add('error-state-txt');
    inputElement.nextElementSibling.innerHTML = `${errorMessage}`;
    inputElement.classList.add('error-state');

}

/*
    This function checks whether the year is a leap year or not.
    If it's a leap year then this function returns true otherwise it returs false.
*/
const LeapYear = (year) => {

    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return true;
    } else {
        return false;
    }

}

/*
    This function validates the form.
*/
const Validate = () => {

    // Array of months with 30 days.
    const MonthsWith30Days = [4, 6, 9, 11];

    let returnValue = true;

    // Getting all input fields
    const InputFields = document.querySelectorAll('.DOB');

    // Getting all elements which will show error message.
    const ErrorElements = document.querySelectorAll('.error-msg');

    // Reset all previous error messages.
    ErrorElements.forEach(element => {

        element.classList.add('display-none');

    })

    InputFields.forEach(inputElement => {

        inputElement.previousElementSibling.classList.remove('error-state-txt');
        inputElement.nextElementSibling.innerHTML = `&nbsp;`;
        inputElement.classList.remove('error-state');

    })

    // Current Date.
    const CurrentDate = new Date();

    // Display error if user enters wrong date.
    InputFields.forEach(field => {

        if (field.value === '') {

            DisplayError(field, 'This field is required');
            RemoveNoneDisplay(ErrorElements);

            returnValue = false;

        } else if (field.classList.contains('year') && parseInt(field.value) > CurrentDate.getFullYear()) {

            DisplayError(field, 'Must be in the past');
            RemoveNoneDisplay(ErrorElements);

            returnValue = false;

        } else if (field.classList.contains('year') && parseInt(field.value) < 1700) {

            DisplayError(field, 'Must be a valid year');
            RemoveNoneDisplay(ErrorElements);

            returnValue = false;

        } else if (field.classList.contains('day') && (parseInt(field.value) > 31) || parseInt(field.value) < 1) {

            DisplayError(field, 'Must be a valid day');
            RemoveNoneDisplay(ErrorElements);

            returnValue = false;

        } else if (field.classList.contains('day') && MonthsWith30Days.includes(parseInt(InputFields[1].value)) && parseInt(field.value) > 30) {

            DisplayError(field, 'Must be a valid day');
            RemoveNoneDisplay(ErrorElements);

            returnValue = false;

        } else if (field.classList.contains('day') && (parseInt(field.value) > 29) && parseInt(InputFields[1].value) === 2 && LeapYear(parseInt(InputFields[2].value))) {

            DisplayError(field, 'Must be a valid day');
            RemoveNoneDisplay(ErrorElements);

            returnValue = false;

        } else if (field.classList.contains('day') && (parseInt(field.value) > 28) && parseInt(InputFields[1].value) === 2 && !LeapYear(parseInt(InputFields[2].value))) {

            DisplayError(field, 'Must be a valid day');
            RemoveNoneDisplay(ErrorElements);

            returnValue = false;

        } else if (field.classList.contains('month') && (parseInt(field.value) > 12) || parseInt(field.value) < 1) {

            DisplayError(field, 'Must be a valid month');
            RemoveNoneDisplay(ErrorElements);

            returnValue = false;

        }

    })
    
    return returnValue;

}

// This function calculates the age.
const CalculateAge = (birthday) => {

    // Creating a new date object for current date and user's birthdate.
    const CurrentDay = new Date();
    const BirthDay = new Date(birthday);

    const CurrentDate = CurrentDay.getDate();
    let CurrentMonth = CurrentDay.getMonth();
    let CurrentYear = CurrentDay.getFullYear();

    // Number of days between birthday and current day.
    let numberOfDays = CurrentDate - BirthDay.getDate();

    // If number of days is negative, then birthday has not come yet.
    if (numberOfDays < 0) {

        // Array of months with 31 days.
        const MonthsWith31Days = [0, 2, 4, 6, 7, 9, 11];

        /* 
            If the current month has 31 days, then add 31 to current date and subtract the birth date from the sum. Decrease the CurrentMonth by 1.
            If the current month is february, then check whether the year is leap year or not, if it's a leap year, then add 29 to the current date else add 28 to current date and subtract the birth date from the sum.
            If current month has 30 days, then add 30 to current date and subtract the birth date from the sum. Decrease the CurrentMonth by 1.
        */
        if (MonthsWith31Days.includes(CurrentMonth)) {
            numberOfDays = (CurrentDate + 31) - BirthDay.getDate();
            CurrentMonth--;
        } else if (CurrentMonth === 1) {
            console.log('In Progress...');
            if (LeapYear(CurrentYear)) {
                numberOfDays = (CurrentDate + 29) - BirthDay.getDate();
            } else {
                numberOfDays = (CurrentDate + 28) - BirthDay.getDate();
            }
            CurrentMonth--;
        } else {
            numberOfDays = (CurrentDate + 30) - BirthDay.getDate();
            CurrentMonth--;
        }
    }

    // Number of months between current month and birth month.
    let numberOfMonths;

    /*
        If number of months is negative, then it means that the birthday's month has not come yet.
        So add 12 to CurrentMonth and subtracts the Birth Month from the sum. Reduce the year by 1.
    */
    if (CurrentMonth < BirthDay.getMonth()) {
        numberOfMonths = (CurrentMonth + 12) - BirthDay.getMonth();
        CurrentYear--;
    } else {
        numberOfMonths = CurrentMonth - BirthDay.getMonth();
    }

    // Number of years between current year and birth year.
    let numberOfYears = CurrentYear - BirthDay.getFullYear();

    // Returning the array of years, months and days of age.
    return [numberOfYears, numberOfMonths, numberOfDays];
}

/*
    This function shows the age as output to user.
*/
const ShowOuput = () => {

    // Getting input fields.
    const BYear = document.getElementById('year').value;
    const BMonth = document.getElementById('month').value;
    const BDate = document.getElementById('day').value;

    // Calling the function to calculate age.
    const age = CalculateAge(`${BYear}-${BMonth}-${BDate}`);

    // Getting output fields.
    const OYears = document.querySelector('.o-year');
    const OMonths = document.querySelector('.o-month');
    const ODays = document.querySelector('.o-day');

    // Updating the values of output fields to the desired output.
    OYears.textContent = age[0];
    OMonths.textContent = age[1];
    ODays.textContent = age[2];

}

// Adding event listener to submit button.
document.getElementById('submit-button').addEventListener('click', (event) => {

    // Preventing the default behavior of form submitting.
    event.preventDefault();

    // Validate the form.
    if (Validate()) {
        ShowOuput();
    };

})
