var friendData = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });
    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        console.log(newFriend);

        var totalDifferenceArr = [];
        var matchIndexArr = [];

        /*  Looping through the imported friendData and finding the individual difference between 
            each respected score and adding it on top of the localDifferent variable. Finally, 
            pushing the sum of localDifference into the totalDifferenceArr.*/
        for (f = 0; f < friendData.length; f++) {
            let localDifference = 0;
            for (i = 0; i < newFriend.scores.length; i++) {
                localDifference += Math.abs(friendData[f].scores[i] - newFriend.scores[i]);
            };
            totalDifferenceArr.push(localDifference);
        };

        // Taking the totalDifferenceArr and setting its lowest value equal to min
        var min = Math.min(...totalDifferenceArr);
        console.log(min);

        // Looping through the totalDifferenceArr to find all the matches and pushing it into matchIndexArr
        for (i = 0; i < totalDifferenceArr.length; i++) {
            if (min === totalDifferenceArr[i]) {
                matchIndexArr.push(i);
            }
        }

        friendData.push(newFriend);

        // For simplicity's sake, we are just going to send the first match in the response body.
        let firstMatch = matchIndexArr[0];

        res.json(friendData[firstMatch]);
    });
}