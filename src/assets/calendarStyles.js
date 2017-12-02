import LatoBold from "./fonts/Lato-Bold.ttf";
import LatoRegular from "./fonts/Lato-Regular.ttf";
import LatoLight from "./fonts/Lato-Light.ttf";

export default [
    {   fonts : [
            {
                name : 'Latobold', 
                file : LatoBold, 
            },{ 
                name : 'Latolight', 
                file : LatoLight , 
            },{ 
                name : 'Lato', 
                file : LatoRegular
            }
        ],
        days : {
            font : "Lato",
            style : "",
            color : "#2E2E2E",
            size : 16,
            align : "center",
            x : 40,
            y : 424,
            width : 108,
            offsetX : 109
        },
        dates : {
            font : "Lato",
            style : "light",
            clearColor : "#DEDEDE",
            color : "#2E2E2E",
            size: 20,
            align : "center",
            x : 54,
            y : 472,
            width : 76,
            align : "left",
            offsetX : 109
        },
        eventsBoxes : {
            events : {
                radius : 3,
                width : '90%',
                height : 20,
                offsetY : 40,
                gutter : 4,
                text : {
                    font : "Lato",
                    size : 12,
                    color : "#FFFFFF",
                    style : "",
                    align : "center",
                    maxChar : 15,
                    offsetY : 2
                }
            },
            height : 685,
            width : 760,
            x : 40,
            y : 462,
            color : "#FFFFFF",
            columnsGutter : 0,
            rowsGutter : 0,
            radius : 0,
            borderWeight : 1,
            borderColor : "#2E2E2E",            
        },
        format : {
            width : 840,
            height: 1188
        },
        image : {
            x : 40,
            y : 40,
            height : 290,
            width : 760,
            radius : 8
        },
        title : {
            font : "Lato",
            style : "bold",
            size : 30,
            color : "#2E2E2E",
            align : "center",
            x : 76,
            y : 358,
            width : 688
        },
    },
    {   fonts : [
        {
            name : 'Latobold', 
            file : LatoBold, 
        },{ 
            name : 'Latolight', 
            file : LatoLight , 
        },{ 
            name : 'Lato', 
            file : LatoRegular
        }
    ],
    days : {
        font : "Lato",
        style : "",
        color : "#2E2E2E",
        size : 16,
        align : "center",
        x : 40,
        y : 424,
        width : 108,
        offsetX : 109
    },
    dates : {
        font : "Lato",
        style : "light",
        clearColor : "#DEDEDE",
        color : "#2E2E2E",
        size: 20,
        align : "center",
        x : 54,
        y : 472,
        width : 76,
        align : "left",
        offsetX : 109
    },
    eventsBoxes : {
        events : {
            radius : 0,
            width : '100%',
            height : 15,
            offsetY : 45,
            gutter : 4,
            text : {
                font : "Lato",
                size : 12,
                color : "#FFFFFF",
                style : "bold",
                align : "center",
                maxChar : 15,
                offsetY : 0
            }
        },
        height : 685,
        width : 760,
        x : 40,
        y : 462,
        color : "#F2F2F2",
        columnsGutter : 7,
        rowsGutter : 7,
        radius : 4,
        borderWeight : 0,
        borderColor : "#FFFFFF",            
    },
    format : {
        width : 840,
        height: 1188
    },
    image : {
        x : 40,
        y : 40,
        height : 354,
        width : 760,
        radius : 8
    },
    title : {
        font : "Lato",
        style : "bold",
        size : 50,
        color : "#FFFFFF",
        align : "left",
        x : 76,
        y : 320,
        width : 688
    },
}
]