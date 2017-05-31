
var symboling = document.getElementById('symboling');
var normalizedLosses = document.getElementById('normalized_losses');
var make = document.getElementById('make');
var fuelType = document.getElementById('fuel_type');
var aspiration = document.getElementById('aspiration');
var numOfDoors = document.getElementById('num_of_doors');
var bodyStyle = document.getElementById('body_style');
var driveWheels = document.getElementById('drive_wheels');
var engineLocation = document.getElementById('engine_location');
var wheelBase = document.getElementById('wheel_base');
var length = document.getElementById('length');
var width = document.getElementById('width');
var height = document.getElementById('height');
var curbWeight = document.getElementById('curb_weight');
var engineType = document.getElementById('engine_type');
var numOfCylinders = document.getElementById('num_of_cylinders');
var engineSize = document.getElementById('engine_size');
var fuelSystem = document.getElementById('fuel_system');
var bore = document.getElementById('bore');
var stroke = document.getElementById('stroke');
var compressionRatio = document.getElementById('compression_ratio');
var horsepower = document.getElementById('horsepower');
var peakRPM = document.getElementById('peak_rpm');
var cityMPG = document.getElementById('city_mpg');
var highwayMPG = document.getElementById('highway_mpg');
var price = document.getElementById('price');

let awsml = {
    submit : function( ev ){
        ev.preventDefault();

        //var AWS = require('aws-sdk');
        AWS.config.update({
            accessKeyId: "AKIAJZHTLNRDARWVPHXQ",
            secretAccessKey: "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",
            region: 'us-east-1',
            IdentityPoolId:'us-east-1-foo-bar',
            httpOptions: { timeout: 5000 },
            maxRetries: 10,
            retryDelayOptions: { base: 200 }
        });
        var machinelearning = new AWS.MachineLearning({apiVersion: "2014-12-12"});
        var params = {
            MLModelId:"ml-jjznDmfup3U",
            PredictEndpoint:"https://realtime.machinelearning.us-east-1.amazonaws.com",
            Record: {
                            'symboling': symboling.value,   
                            'normalized-losses': normalizedLosses.value,   
                            'make': make.value,   
                            'fuel-type':fuelType.value,   
                            'aspiration': aspiration.value,   
                            'num-of-doors': numOfDoors.value,   
                            'body-style': bodyStyle.value,   
                            'drive-wheels':driveWheels.value,   
                            'engine-location': engineLocation.value,   
                            'wheel-base': wheelBase.value,   
                            'length': length.value,   
                            'width': width.value,   
                            'height': height.value,   
                            'curb-weight': curbWeight.value,   
                            'engine-type': engineType.value,   
                            'num-of-cylinders': numOfCylinders.value,   
                            'engine-size': engineSize.value,   
                            'fuel-system':fuelSystem.value,   
                            'bore': bore.value,   
                            'stroke': stroke.value,   
                            'compression-ratio': compressionRatio.value,   
                            'horsepower': horsepower.value,   
                            'peak-rpm': peakRPM.value,   
                            'city-mpg': cityMPG.value,   
                            'highway-mpg': highwayMPG.value,   
                            'price': price.value,   
                    }
        };

        machinelearning.predict(params, function(err, data){
            if(err) console.log(err, err.stack); //an error occurred
            else{
                let result = parseFloat(data.Prediction["predictedValue"]).toFixed(2);
                document.querySelector("#result h2").textContent = "Predicted Price: " + result;
                document.querySelector("#result spam").textContent = JSON.stringify(data);
                console.log(data)
            }; //successful response
        });
        
        window.scrollTo(0, 0);
        document.getElementById("result").classList.remove("hidden");
        document.getElementById("home").classList.add("hidden");
        
    },
    new : function( ev ){
        ev.preventDefault();
        
        document.getElementById("result").classList.add("hidden");
        document.getElementById("home").classList.remove("hidden");
    },
    
    init : function(){
        document.getElementById("submit").addEventListener("click", awsml.submit );
        document.getElementById("return").addEventListener("click", awsml.new );
    }
}

awsml.init();




