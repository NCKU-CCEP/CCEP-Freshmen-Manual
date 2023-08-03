export{IncludeData, setClick}

function IncludeData(WHO)
{
    $(".MainPage").css("opacity", "30%");

    fetch("FreshmenInformation.json")
        .then(function(response) 
        {
            return response.json();
        })
        .then(function(data) 
        {
            let nowPosition = -1;

            for (let key in data) 
            {
                if (key.includes(WHO)) 
                {
                    nowPosition = 0;

                    if(data[key].init[0] === "GuideOpen")
                    {
                        PushGuide(data[key]);
                    }
                    else
                    {
                        $(".DataPageContent").css("right", "0%")
                    }

                    PushContent(data[key]);

                    AddClass(nowPosition, data[key]);
                    
                    if(data[key].init[0] === "GuideOpen"){
                        $(".GuideTitle").eq(0).addClass("GuideTitleClick");

                        $(".GuideTitle").on('click', (event) => {
                            $(".DataPageContent").animate({
                                scrollTop: 0
                            }, 100); 
                            $(".DataPageText").html("");
                            let index = $(".GuideTitle").index(event.target);
                            
                            for(let i = 0; i < $(".GuideTitle").length; i++)
                            {
                                if($(".GuideTitle").eq(i).hasClass("GuideTitleClick"))
                                    $(".GuideTitle").eq(i).removeClass("GuideTitleClick");
                            }

                            $(".GuideTitle").eq(index).addClass("GuideTitleClick");

                            if(index === 0)
                                pushText(data[key].init);
                            else
                                pushText(data[key].include[index - 1]);

                            $(".DataPageTextContainer").removeClass(data[key].DataClass[nowPosition]);
                            nowPosition = index;
                            AddClass(nowPosition, data[key]);
                            
                        })
                    }

                    $(".DataPageX").on('click', () => {
                        $(".DataPageGuide").remove();
                        $(".DataPageContent").remove();
                        $(".DataPage").css("display", "none");
                        $(".MainPage").css("opacity", "100%");
                        clearClick();
                        setClick();
                    })
                    break;
                }
            }
            return data
        })
}

function PushGuide(data)
{
    let Guide = 
    `<div class="DataPageGuide">
    </div>`

    $(".DataPage").append(Guide);

    if(data.init[0] === "GuideOpen")
        $(".DataPageGuide").append(`<div class="GuideTitle OPEN">📖 首頁</div>`);

    for(let i = 0; i < data.include.length; i++)
    {
        $(".DataPageGuide").append(`<div class="GuideTitle">` + data.include[i][0] +`</div>`);
    }
}

function PushContent(data)
{
    let Content = 
    `<div class="DataPageContent">
        <div class="DataPageTitle">
        </div>

        <div class="DataPageTextContainer">
            <div class="DataPageText">
            </div>
        </div>
    </div>`

    $(".DataPage").append(Content);

    pushText(data.init);

    $(".DataPageTitle").text(data.title);
}

function pushText(Data)
{
    let paragraph = "<p>";

    for(let i = 1; i < Data.length; i++)
    {
        if(Data[i][2] === "url")
            paragraph += ('<span><a href="' + Data[i][1] + '">' + Data[i][0]+ '</a></span>');
        else if(Data[i][1] === "img")
            paragraph += ('<span><img src="' + Data[i][0] + '"></span>');
        else if($.isArray(Data[i]))
            paragraph += ("<span>" + Data[i][0] + "</span>"); 
        else
            paragraph += ("<span>" + (Data[i]) + "</span>");
    }

    $(".DataPageText").append(paragraph + "</p>");


    for(let i = 1; i < Data.length; i++)
    {
        if($.isArray(Data[i])  && Data[i][2] !== "url" && Data[i][1] !== "img" ){
            ExpandDetails(i - 1, Data);
        }
    }
}

function ExpandDetails(index, Data)
{
    $(".DataPageText p span").eq(index).on('click', () => {
        $(".OPEN p").remove();
        $(".DataPageText p span").each(function(i) {
            if(i !== index){
                let updatedText = $(this).html().replace("▼", "►");
                $(this).html(updatedText);
                $(this).removeClass("OPEN");
            }
        });
        
        let paragraph = "<p>";

        for(let j = 1; j < Data[index + 1].length; j++)
            paragraph += PushExpandDetails($(".DataPageText p span").eq(index), Data[index + 1][j], index);

        paragraph += "</p>"

        if(paragraph !== "<p></p>")
            $(".DataPageText p span").eq(index).append(paragraph);

        if($(".DataPageText p span").eq(index).hasClass("OPEN")){
            let updatedText = $(".DataPageText p span").eq(index).html().replace("▼", "►");
            $(".DataPageText p span").eq(index).html(updatedText);
            $(".DataPageText p span").eq(index).removeClass("OPEN");
        }
        else{
            let updatedText = $(".DataPageText p span").eq(index).html().replace("►", "▼");
            $(".DataPageText p span").eq(index).html(updatedText);
            $(".DataPageText p span").eq(index).addClass("OPEN");
        }

        $(".DataPageContent").animate({
            scrollTop: 0
          }, 100); 
    })
}

function PushExpandDetails(WHO, WHAT, index)
{
    if(WHO.hasClass("OPEN")){
        $(".OPEN p").remove();
        return "";
    }
    else{
        let paragraph = "";
        if($.isArray(WHAT))
        {
            if(WHAT[2] === "url")
                paragraph += ('<span><a href="' + WHAT[1] + '">' + WHAT[0]+ '</a></span>');
            else if(WHAT[1] === "img")
                paragraph += ('<span><img src="' + WHAT[0] + '"></span>');
        }
        else
            paragraph += ("<span>" + WHAT + "</span>");

        return paragraph;
    }
}

function AddClass(nowPosition, Data)
{
    if(Data.DataClass){
        $(".DataPageTextContainer").addClass(Data.DataClass[nowPosition]);
    }
    else
        return;
}

function setClick()
{
    $(".StudentAssociationResources").on('click', () => {
        IncludeData("StudentAssociationResources");
        $(".DataPage").css("display", "flex");
        clearClick();
    })

    $(".InstructionsForNewStudents").on('click', () => {
        IncludeData("InstructionsForNewStudents");
        $(".DataPage").css("display", "flex");
        clearClick();
    })

    $(".AccommodationInformation").on('click', () => {
        IncludeData("AccommodationInformation");
        $(".DataPage").css("display", "flex");
        clearClick();
    })

    $(".CourseDescription").on('click', () => {
        IncludeData("CourseDescription");
        $(".DataPage").css("display", "flex");
        clearClick();
    })
    
    $(".OnlineResources").on('click', () => {
        IncludeData("OnlineResources");
        $(".DataPage").css("display", "flex");
        clearClick();
    })

    $(".FAQ").on('click', () => {
        IncludeData("FAQ");
        $(".DataPage").css("display", "flex");
        clearClick();
    })
}

function clearClick(){
    $(".FAQ, .OnlineResources, .CourseDescription, .AccommodationInformation, .InstructionsForNewStudents, .StudentAssociationResources").off();
}