const jsonFile = require("./jsonFileMod");
console.log("start of code");

let numVowelsInNames = 0;
const vowels = ["a", "e","i","o","u"];

let readTeamFile = (file, callBack) =>{
    jsonFile.readJSON(file,callBack);
}

let computeVowels = (peopleData) => {
    let nameData = {};
    let names = peopleData.map(person => person.name.toLowerCase());

    names.forEach((name) =>{
        let currentName = name;
        let currentNameVowels = 0;

        name.split("").forEach((c) => {
            if(vowels.indexOf(c) >= 0){
                numVowelsInNames++;
                currentNameVowels++;
            }
        });
        nameData[currentName] = currentNameVowels;
    });
    return nameData;
};

let cTeamDataResult = jsonFile.readJSON("the-c-team.json");

cTeamDataResult.then((cTeamData) =>{
    return computeVowels(cTeamData);
}).catch((error) =>{
    console.error("There was an error parsing the original file");
    console.error(error);
    return{};
}).then((cTeamData) => {
    return jsonFile.readJSON("the-z-team.json").then((zData) => {
        let zTeamNameData = computeVowels(zData);

        let endResult = {};

        Object.keys(cTeamData).forEach((key) =>{
            endResult[key] = cTeamData[key];
        });
        Object.keys(zTeamNameData).forEach((key)=>{
            endResult[key] = zTeamNameData[key];
        });
        return endResult;
    });
}).then((allNameData) => {
    console.log(allNameData);

    return allNameData;
}).then((nameData) =>{
    return jsonFile.writeJSON("name-data.json",nameData);
}).then(() =>{
    console.log("Done writing results");
}).catch((error) =>{
    console.log(error);
});

console.log("End of file");