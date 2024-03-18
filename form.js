// Removed import statements, as these libraries are included in HTML directly
$(document).ready(function() {
    // Reset button functionality
    $("#reset-button").click(function() {
        $(".has-error").removeClass("has-error");
        $("#myform").trigger("reset");
        toastr.success("Form reset successfully!");
    });

    // Calculate total cost and number of days based on inputs
    $("#checkInDate, #checkOutDate, #adultNum").change(function() {
        calculateTotalCostAndDays();
    });

    // Submit button functionality
    $("#submit-button").click(function() {
        var formData = collectFormData();

        var isError = validateFormData(formData);

        if (!isError) {
            $(".has-error").removeClass("has-error");
            $("#myform").trigger("reset");
            toastr.success("Form submitted successfully!");
        }
    });
});

function calculateTotalCostAndDays() {
    var totalAdult = parseInt($("#adultNum").val()) || 0;
    var checkInDate = moment($("#checkInDate").val());
    var checkOutDate = moment($("#checkOutDate").val());
    var totalDays = checkOutDate.diff(checkInDate, 'days');

    if (totalDays > 0 && totalAdult > 0) {
        var costInTotal = 150 * totalDays * totalAdult;
        $("#numOfDays").val(totalDays);
        $("#totalCost").val(costInTotal);
    } else {
        $("#numOfDays").val('');
        $("#totalCost").val('');
        toastr.error("Please ensure the check-out date is after the check-in date and the number of adults is greater than 0.");
    }
}

function collectFormData() {
    return {
        userName: $("#userNameVal").val(),
        firstName: $("#firstNameVal").val(),
        lastName: $("#lastNameVal").val(),
        phoneNumber: $("#phoneNumberVal").val(),
        faxNumber: $("#faxVal").val(),
        emailAd: $("#emailVal").val(),
        totalAdult: parseInt($("#adultNum").val()),
        checkInDate: $("#checkInDate").val(),
        checkOutDate: $("#checkOutDate").val(),
        totalDay: parseInt($("#numOfDays").val()),
        totalCost: parseFloat($("#totalCost").val())
    };
}

function validateFormData(data) {
    var isError = false;

    ["userName", "firstName", "lastName", "phoneNumber", "faxNumber", "emailAd"].forEach(function(field) {
        if (!data[field]) {
            showError(field + "Val", "Please enter your " + field.replace('Ad', ' Address'));
            isError = true;
        }
    });

    if (data.totalDay <= 0 || isNaN(data.totalDay)) {
        toastr.error("Invalid date selection.");
        isError = true;
    }
    if (!data.totalCost || data.totalCost < 0 || isNaN(data.totalCost)) {
        toastr.error("Invalid cost calculation.");
        isError = true;
    }

    return isError;
}

function showError(fieldId, message) {
    toastr.error(message);
    $("#" + fieldId).closest('.form-group').addClass("has-error");
}
