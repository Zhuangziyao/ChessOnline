
function chess(){
    var id='1';
    var name='zhao';
    var master='sss';

    id.getId=function(){
        return id;
    };

    name.getName=function(){
        return name;
    };

    master.setMaster=function (nowMaster) {
        master=nowMaster;
    };

    master.getMaster=function () {
        return master;
    };

};

module.exports = chess;