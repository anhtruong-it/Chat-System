import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommunicateService } from '../services/communicate.service';
import { group } from '../database/group';
import { channel } from '../database/channel';
import { user } from '../database/user';
import { GCU } from '../database/G-C-U';
import { newchannels } from '../database/channels';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'applicaiton/json'})
};



// for Angular http methods
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formOpenG = false
  formOpen = false;
  channelId: number;
  channelName: string;
  newChannel : channel;
  newChannels: newchannels;
  testChannels: channel[] = [];
  groupId: number;
  groupName: string;
  newGroup: GCU;

  formOpenU = false
  user_Id: number;
  user_Name: string;
  user_Pwd: string;
  user_Role: string;


  group: group[] = [];
  channel: channel[] = [];
  user: user[] = [];
  gcu: GCU[] = [];

  //add user:
  userId: number = null;
  userName: string = '';
  userPwd: string = '';
  userRole: string = '';
  newUser: user;
  userobjid: string = '';

  // end

  constructor(private router:Router, private httpClient: HttpClient, private proddata: CommunicateService) { }

  ngOnInit(): void {
    /*
    this.proddata.getlist().subscribe((data)=> {
      this.group = data.ok[0];
      this.channel = data.ok[1];
      this.user = data.ok[2];

    })
    */

  }

  GCU() {

    this.proddata.getGCU().subscribe((data)=> {
      this.gcu = data.ok;
    })
  }

  addChannel(groupd_id, channelId, channelName) {

    this.channelId = channelId;
    this.channelName = channelName;
    this.newChannel = new channel(this.channelId, this.channelName,groupd_id);

    this.proddata.addChannel(this.newChannel).subscribe((data)=> {
      if (data.ok=="ok") {
        alert("added");
        this.GCU();
        this.channelId=null;
        this.channelName="";
      } else {
        alert("false");
        this.GCU();
      }
    });
  }

  addGroup(group_id, groupName) {
    this.newGroup = new GCU(group_id, groupName, [{channelId:null, channelName:'',user:[{userId:null,userName:'',userRole:''}]}]);
    this.proddata.addGroup(this.newGroup).subscribe((data)=>{
        if (data.ok == 'ok') {
          this.GCU();
        } else {
          alert("duplicate group");
        }
    })
  }

  deleteGroup(groupId){
    if (confirm("Are you sure you want to delete this group")) {
      this.proddata.deleteGroup(groupId).subscribe((data)=> {
        //this.product = data;
        if(data) {
          this.GCU();
        }

      });
    }
  }

  deleteChannel(groupId, channelId){
    alert([groupId, channelId]);
    if (confirm("Are you sure you want to delete this channel")) {
      this.proddata.deleteChannel(groupId, channelId).subscribe((data)=> {
        //this.product = data;
        if(data.ok == "ok") {
          this.GCU();
        }

      });
    }
  }

  testChannel(){
    this.proddata.testChannel().subscribe((data)=> {
      this.testChannels = data.ok;

    })
  }

  openForm() {
    this.formOpen = true;
  }

  closeForm() {
    this.formOpen = false;
  }

  openFormG() {
    this.formOpenG = true;
  }

  closeFormG() {
    this.formOpenG = false;
  }

  openFormU() {
    this.formOpenU = true;
  }

  closeFormU() {
    this.formOpenU = false;
  }


  createUser(event) {
    event.preventDefault();
    if (this.userId == null) {
      alert("userId = null ");
    } else {
      //alert("ok");
      this.newUser = new user(this.userId, this.userName, this.userPwd, this.userRole);
      this.proddata.createUser(this.newUser).subscribe((data)=> {
        console.log(data);
        if (data.err == null) {
          alert('new User created');
        } else {
          alert(data.err);
        }
        this.userId = null;
        this.userName = "";
        this.userPwd = "";
        this.userRole = "";
        this.router.navigateByUrl('/login');

      })
    }
  }

  getUser() {
    this.proddata.getUser().subscribe((data)=> {
      this.user = data.ok;
    })
  }

  deleteUser(userId) {
    this.proddata.deleteUser(userId).subscribe((data)=>{
      if (data.ok=='ok'){
        this.getUser();
      }
    })
  }

  updateUser(user_Id, userId, userName, userPwd, userRole) {
    this.newUser = new user(userId, userName, userPwd, userRole.toString());
    this.proddata.updateUser(this.newUser).subscribe((data)=>{
      if (data.ok=="ok"){
        this.getUser();
      }
      else {
        alert("duplicate user");
      }
    })

  }

/*
  logIn(){
    this.httpClient.post(BACKEND_URL + '/login', this.user).subscribe((data:any)=>{
      if (data.ok != false) {
        this.user.valid = 'yes';
        sessionStorage.setItem('username', this.user.username);
        sessionStorage.setItem('role', data.ok);
        sessionStorage.setItem('valid', this.user.valid);
        let role = sessionStorage.getItem('role');
        alert(role);
        if (role == "Super Admin") {
          this.router.navigateByUrl("/super");
        } else if (role == "Group Admin") {
          this.router.navigateByUrl("/admin-user");
        } else if (role == "Group Assis") {
          this.router.navigateByUrl("/assistant");
        } else {
          this.router.navigateByUrl("/users");
        }
      } else {
        alert('Sorry, username or password is not valid');
      }
    });
  }

  delChannel(a:any, b:any) {
    this.groupDetail.group = a;
    this.groupDetail.channel = b;
    this.httpClient.post(BACKEND_URL + '/delChannel', this.groupDetail).subscribe((data:any)=>{
      if (data.ok != false) {
       alert("Channel deleted");
       this.showGC();
      } else {
        alert('show error');
      }
    });
  }

  showGC(){
    this.httpClient.post(BACKEND_URL + '/showGC','').subscribe((data:any)=>{
       if (data.ok != false) {
        this.userList = data.ok;
       } else {
         alert('show error');
       }
     });
  }

  createChannel(a:any) {
    this.groupDetail.group = a;
    this.httpClient.post(BACKEND_URL + '/createChannel', this.groupDetail).subscribe((data:any)=>{
      if (data.ok != false) {
        alert("channel created");
        this.showGC();
      } else {
        alert('show error');
      }
    });
  }

  createGroup() {
    this.httpClient.post(BACKEND_URL + '/createGroup','').subscribe((data:any)=>{
      if (data.ok != false) {
        alert("group created");
        this.showGC();
      } else {
        alert('show error');
      }
    });
  }

  delGroup(a:any) {
    this.groupDetail.group = a;
    this.httpClient.post(BACKEND_URL + '/delGroup',this.groupDetail).subscribe((data:any)=>{
      if (data.ok != false) {
       alert("group deleted");
       this.showGC();
      } else {
        alert('show error');
      }
    });
  }*/

}

