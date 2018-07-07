
function User() {
    var userId='jjj';
    var userName='aaaa';
    var status=true;

    userId.setUserId=function (tmpUserId) {
        userId=tmpUserId;
    }

    userId.getUserId=function(){
        return userId;
    }

    userName.getUserName=function(){
        return userName;
    }

    userName.setUserName=function (tmpUserName) {
        userName=tmpUserName;
    }

    status.getStatus=function () {
        console.log(status);
    }

    status.setStatus=function () {
        if(status)
            status=false;
        else
            status=true;
    }

};

module.exports = User;