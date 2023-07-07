import * as MyFunction from './function.js';

$(document).ready(() => {
    $(".DepartmentSocietyResources").on('click', (event) => {
        MyFunction.IncludeData("DepartmentSocietyResources");
        $(".DataPage").css("display", "flex");
    })

    $(".InstructionsForNewStudents").on('click', (event) => {
        MyFunction.IncludeData("InstructionsForNewStudents");
        $(".DataPage").css("display", "flex");
    })

})