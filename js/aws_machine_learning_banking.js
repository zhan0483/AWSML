
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
            MLModelId:"ml-ExJCyJy2pZ0",
            PredictEndpoint:"https://realtime.machinelearning.us-east-1.amazonaws.com",
            Record: {
                    "age" : document.getElementById("age").value,
                    "job" : document.getElementById("job").value,
                    "marital" : document.getElementById("marital").value,
                    "education" : document.getElementById("education").value,
                    "default" : document.getElementById("default").value,
                    "housing" : document.getElementById("housing").value,
                    "loan" : document.getElementById("loan").value,
                    "contact" : document.getElementById("contact").value,
                    "month" : document.getElementById("month").value,
                    "day_of_week" : document.getElementById("day_of_week").value,
                    "duration" : document.getElementById("duration").value,
                    "campaign" : document.getElementById("campaign").value,
                    "pdays" : document.getElementById("pdays").value,
                    "previous" : document.getElementById("previous").value,
                    "poutcome" : document.getElementById("poutcome").value,
                    "emp_var_rate" : document.getElementById("emp_var_rate").value,
                    "cons_price_idx" : document.getElementById("cons_price_idx").value,
                    "cons_conf_idx" : document.getElementById("cons_conf_idx").value,
                    "euribor3m" : document.getElementById("euribor3m").value,
                    "nr_employed" : document.getElementById("nr_employed").value,
                    "y" : document.getElementById("y").value
                    }
        };

        machinelearning.predict(params, function(err, data){
            if(err) console.log(err, err.stack); //an error occurred
            else{
                let result = data.Prediction["predictedLabel"];
                document.getElementById("answer").textContent = result==1?"Yes":"No";
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




