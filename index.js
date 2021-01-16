'use strict';
const core=require('@actions/core');
const Client=require('ssh2-sftp-client');
async function upload(host,user,key,pass,local,remoteDir){
    let remoteFile=local.replace(/.*\//,'');
    let sftp=new Client();
    var result= await sftp.connect({
        host:host,
        user:user,
        privateKey:key,
        password:pass
    }).then(()=>{
        return sftp.exists(remoteDir);
    })
    .then((exists)=>{
        if (! exists) {
            console.log("creating remote dir "+remoteDir);
            return sftp.mkdir(remoteDir,true);
        }
        return true;
    })
    .then(()=>{
        console.log("uploading "+local+" to "+remoteDir);
        return sftp.put(local,remoteDir+"/"+remoteFile);
    })
    .then(()=>sftp.end())
    .then(()=>'')
    .catch((error)=>{sftp.end().catch(()=>'');return error});
    console.log("upload returns: "+result);
    return result;
}

async function main(){
    try{
        const user=core.getInput('user')
        const server=core.getInput('server')
        const key=core.getInput('privateKey')
        const pass=core.getInput('password')
        if (! user || ! server){
            console.log("user or server not set, skip upload");
        }
        else{
            if (!key && ! pass){
                throw new Error("either privateKey or password must be set");
            }
            let result=await upload(server,user,key,pass,
                core.getInput('localFile'),
                core.getInput('remoteDir'));
            if (result !== ''){
                throw new Error(result);
            }
        }   

    }catch(e){
        core.setFailed(e.message)
    }
}

main();
