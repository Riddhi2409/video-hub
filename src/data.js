// export const API_KEY = "AIzaSyAZzsE3a-gXHGeIkjDPxcw-jyT-4ZjQEAQ";   
 export const API_KEY = "AIzaSyAZzsE3a-gXHGeIkjDPxcw-jyT-4ZjQEAQ";   

// export const API_KEY = "AIzaSyAW7cbn0G2EQWKwkyB5XVNW5dylIA5oK3Q"
export const value_converter = (value) => {
    if(value>=1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+"K";
    }
    else
    {
        return value;
    }
}