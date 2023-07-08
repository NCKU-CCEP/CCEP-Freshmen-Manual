import * as MyFunction from './function.js';

$(document).ready(() => {
    $(".DepartmentSocietyResources").on('click', () => {
        MyFunction.IncludeData("DepartmentSocietyResources");
        $(".DataPage").css("display", "flex");
    })

    $(".InstructionsForNewStudents").on('click', () => {
        MyFunction.IncludeData("InstructionsForNewStudents");
        $(".DataPage").css("display", "flex");
    })

    $(".AccommodationInformation").on('click', () => {
        MyFunction.IncludeData("AccommodationInformation");
        $(".DataPage").css("display", "flex");
    })

    $(".CourseDescription").on('click', () => {
        MyFunction.IncludeData("CourseDescription");
        $(".DataPage").css("display", "flex");
    })
    
    $(".OnlineResources").on('click', () => {
        MyFunction.IncludeData("OnlineResources");
        $(".DataPage").css("display", "flex");
    })

    $(".FAQ").on('click', () => {
        MyFunction.IncludeData("FAQ");
        $(".DataPage").css("display", "flex");
    })
})