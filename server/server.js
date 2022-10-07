const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
const PORT = 3000;
const server = require('./listen.js');
app.use(cors());
app.use(bodyParser.json());
const url = 'mongodb://localhost:27017';

/*
const docArray = [
  {
    groupId: 1,
    groupName: "group 1",
    channel:[
      {
        channelId: 1,
        chanelName: "channel 1",
      }
    ]
  },
  {
    groupId: 2,
    groupName: "group number 2",
    channel:[
      {
        channelId: 1,
        chanelName: "channel number 1",
      }
    ]
  }
]
*/

const groupArray = [
  {
    groupId: 1,
    groupName: "group 1",
    channel: [
      {
        channelName: "channel 1",
        user: [
          {
            user_id: "",
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
    ]
  },
  {
    groupId: 2,
    groupName: "group 2",
    channel: [
      {
        channelName: "channel 2",
        user: [
          {
            user_id: "",
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
    ]
  }
]


const channelArray = [
  {
    channelId: 1,
    channelName: "channel 01",
    groupID: 1,

  },
  {
    channelId: 3,
    channelName: "channel 03",
    groupID: 2,
  },
  {
    channelId: 4,
    channelName: "channel 04",
    groupID: 1,
  }
]


/*
const channelArray = [
  {
    channelId: 1,
    channelName: "channel 01",
    userId: [
      {
        id: '',
      },
    ]
  },
]
*/

const userArray = [
  {
    userId: 1,
    userName: 'a',
    userPwd: '1',
    userRole: 'Super Admin',
    goupId:[
      {
        id: null,
        channelId: null,
      }
    ]
  },
  {
    userId: 2,
    userName: 'b',
    userPwd: '2',
    userRole: 'Group Admin',
    goupId:[
      {
        id: null,
        channelId: null,
      }
    ]
  },
  {
    userId: 3,
    userName: 'c',
    userPwd: '3',
    userRole: 'Group Assis',
    goupId:[
      {
        id: null,
        channelId: null,
      }
    ]
  },
  {
    userId: 4,
    userName: 'd',
    userPwd: '4',
    userRole: 'member',
    goupId:[
      {
        id: null,
        channelId: null,
      }
    ]
  },
  {
    userId: 5,
    userName: 'e',
    userPwd: '5',
    userRole: 'member',
    goupId:[
      {
        id: 1,
        channelId: 1,
      }
    ]
  },
  {
    userId: 6,
    userName: 'h',
    userPwd: '6',
    userRole: 'member',
    goupId:[
      {
        id: 1,
        channelId: 1,
      },
      {
        id: 4,
        channelId: 4,
      },
    ]
  },
  {
    userId: 7,
    userName: 'g',
    userPwd: '7',
    userRole: 'member',
    goupId:[
      {
        id: 1,
        channelId: 1,
      },
      {
        id: 3,
        channelId: 3,
      },
    ]
  }

]

/*
const GCUArray = [
  {
    groupID:"dsdsa",
    channel:[
      {
        channelId:'das',
        user: [
          {
            userId:'427'
          },
          {
            userId:'5678'
          },
        ]
      },
      {
        channelId:'fgh',
        user: [
          {
            userId:'427fds'
          },
          {
            userId:'5678fds'
          },
        ]
      },
    ]
  },
  {
    groupID:"dsdsafsds",
    channel:[
      {
        channelId:'dak;ls',
        user: [
          {
            userId:'12'
          },
          {
            userId:'qsa'
          },
          {
            userId:'5464'
          }
        ]
      },
      {
        channelId:'dasvcvx',
        user: [
          {
            userId:'asdas'
          },
          {
            userId:'dasdas'
          },
          {
            userId:'dasfs'
          },
        ]
      },
      {
        channelId:'dasvcvx',
        user: [
          {
            userId:'asdas'
          },
          {
            userId:'dasdas'
          },
          {
            userId:'dasfs'
          },
        ]
      },
    ]
  },
]
*/

const GCUArray = [
  {
    groupId: 1,
    groupName: "group 1",
    channel: [
      {
        channelId: 1,
        channelName: "channel 01",
        user: [
          {
            userId: "",
            userName: "",
            userRole: "",
          },
          {
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
      {
        channelId: 4,
        channelName: "channel 04",
        user: [
          {
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
    ]
  },
  {
    groupId: 2,
    groupName: "group 2",
    channel: [
      {
        channelId: 3,
        channelName: "channel 03",
        user: [
          {
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
    ]
  }
]


const callbackUserHell = async function(client, myColU) {
  result = await myColU.insertMany(userArray);
}

const callbackGroupHell = async function(client, myCol) {
  result = await myCol.insertMany(groupArray);
 // console.log("Inserted");
 // console.log(docArray);
};

const callbackChannelHell = async function(client, myColC) {
  result = await myColC.insertMany(channelArray);
  //console.log("channel: ", result);
}

const callbackGCUHell = async function(client, myColGCU) {
  result = await myColGCU.insertMany(GCUArray);
  //console.log("channel: ", result);
}



MongoClient.connect(url, {maxPoolSize: 10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if (err) { return console.log(err)}
    const dbName = 'database';
    const db = client.db(dbName);
    db.dropDatabase();

    const dbG = client.db(dbName);

    const myCol = dbG.collection('groups');
    callbackGroupHell(client, myCol);

    const myColC = dbG.collection('channels');
    callbackChannelHell(client, myColC);

    const myColU = dbG.collection('users');
    callbackUserHell(client, myColU);

    const myColGCU = dbG.collection('GCUs');
    callbackGCUHell(client, myColGCU);

    const collect = dbG.listCollections().forEach(function(err, coll) {
     // console.log("cllect", coll);
    });


    require('./routes/api-getlist')(dbG, app);

    require('./routes/api-getGCU')(dbG, app);
    require('./routes/api-createUser')(dbG, app);
    require('./routes/api-addChannel')(dbG, app, ObjectID);
    require('./routes/api-addGroup')(dbG, app, ObjectID);
    require('./routes/api-testChannel')(dbG, app);
    require('./routes/api-deleteGroup')(dbG, app, ObjectID);
    require('./routes/api-deleteChannel')(dbG, app, ObjectID);
    require('./routes/api-getUser')(dbG, app);
    require('./routes/api-deleteUser')(dbG, app, ObjectID);
    require('./routes/api-updateUser')(dbG, app, ObjectID);
    require('./routes/api-login')(dbG, app, ObjectID);
    require('./routes/api-addUsertoGroupChannnel')(dbG, app, ObjectID);


    /*
    require('./routes/api-add.js')(db, app);
    require('./routes/api-prodcount.js')(db, app);
    require('./routes/api-validid.js')(db, app);
    require('./routes/api-getlist.js')(db, app);
    require('./routes/api-getitem.js')(db, app, ObjectID);
    require('./routes/api-update.js')(db, app, ObjectID);
    require('./routes/api-deleteitem.js')(db, app, ObjectID);
    */
    server.listen(http, PORT);


})




/*
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/../dist/Assignment1'));
*/


/*
var server = http.listen(3000, function(){
  console.log("Server listening on port: 3000");
});

app.post('/create', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var fs = require('fs');
  let uArray = [];
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    uArray = JSON.parse(data);
    console.log("uArray: ", uArray);
    console.log("number element: ", uArray.length);
    let newUser = {
      "id": uArray.length - 1,
      "username": req.body.username,
      "password": req.body.password,
      "email": req.body.email,
      "role": req.body.role
    }

    console.log("newUser: ", newUser);
    uArray.push(newUser);
    console.log(uArray);
    uArrayjson = JSON.stringify(uArray);
    console.log("uArrayjson: ", uArrayjson);
    fs.writeFileSync('./data/users.json', uArrayjson, 'utf8', function(err) {
      if (err) throw err;
      res.send(uArrayjson);
    })
  })
  res.send({"ok":uArrayjson});
});

app.post('/removeUsers', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var u = req.body.username;
  console.log("username: ", u);
  var fs = require('fs');
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    const userArray = JSON.parse(data);

    const i = userArray.findIndex(user =>((user.username == u)));
    console.log("i=", i);
    //console.log(userArray[i]);
      if (i==-1) {
        res.send({"ok": false });
      } else {
        delete userArray[i];

       var cleanArray = [];
       for (var j in userArray) {
        if (userArray[j] == null ) {

        } else {
          cleanArray.push(userArray[j]);
          console.log("clean= ", cleanArray);
        }
       }
       console.log("clean array: ", cleanArray);
        fs.writeFileSync('./data/users.json', JSON.stringify(cleanArray), 'utf-8');
        res.send({"ok": true});
      }
    });
});

app.post('/createGroup', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var fs = require('fs');
  let uArray = [];
  fs.readFile('./data/group.json', 'utf8', function(err, data) {
    if (err) throw err;
    uArray = JSON.parse(data);
    console.log("Group: ", uArray);
    let lastG = uArray.length - 1;
    console.log(uArray[lastG].group);
    let newNameG = uArray[lastG].group + 1;
    let newG = {
      "group": newNameG
    }
    console.log("new group: ", newG);
    uArray.push(newG);
    console.log("new Group Array: ", uArray);
    uArrayjson = JSON.stringify(uArray);
    console.log("uArrayjson: ", uArrayjson);
    fs.writeFileSync('./data/group.json', uArrayjson, 'utf8', function(err) {
      if (err) throw err;
      res.send({"ok":uArrayjson});
    })
  });
  res.send({"ok": true});
});

app.post('/addUser', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var g = req.body.group
  console.log("group name= ", g);
  var fs = require('fs');
  let uArray = [];
});

app.post('/createChannel', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var g = req.body.group
  console.log("group name= ", g);
  var fs = require('fs');
  let uArray = [];
    fs.readFile('./data/group.json', 'utf8', function(err, data) {
      if (err) throw err;
      const groupArray = JSON.parse(data);
      console.log("new array=", groupArray);
      const i = groupArray.findIndex(group =>((group.group == g)));
      console.log("i=", i);
      console.log("target group: ", groupArray[i]);
     // console.log("channel: ", groupArray[i].channel);

      if (groupArray[i].channel == undefined){
        let newChannel = {
          "nameChannel": 1,
        }
        groupArray[i].channel=[]
        groupArray[i].channel.push(newChannel);
        uArrayjson = JSON.stringify(groupArray);
        console.log("uArrayjson: ", uArrayjson);
        fs.writeFileSync('./data/group.json', uArrayjson, 'utf8', function(err) {
          if (err) throw err;
          res.send({"ok":uArrayjson});
        });
      } else {
        let lastC = groupArray[i].channel.length - 1;
        let newC = groupArray[i].channel[lastC].nameChannel + 1;
        console.log("lastC: ", newC);
        let newChannel = {
          "nameChannel": newC,
        }
        groupArray[i].channel.push(newChannel);
        console.log("new Channel array: ", groupArray[i]);
        uArrayjson = JSON.stringify(groupArray);
        console.log("uArrayjson: ", uArrayjson);
        fs.writeFileSync('./data/group.json', uArrayjson, 'utf8', function(err) {
          if (err) throw err;
          res.send({"ok":uArrayjson});
        });
      }
    })
    res.send({"ok": true});
});

app.post('/showGC', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var fs = require('fs');
  fs.readFile('./data/group.json', 'utf8', function(err, data) {
    if (err) throw err;
    const gc = JSON.parse(data);
    res.send({"ok":gc});
  });
});



app.post('/upgradeUsers', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var u = req.body.username;
  var r = req.body.newRole;
  console.log("username: ", u);
  console.log("new role: ", r);


  var fs = require('fs');
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    const userArray = JSON.parse(data);
    console.log("new array=", userArray);

    let json = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
    json = json.map(el => {
      if (el.username === u) {
        el.role = r;
      }
      return el;
    });
    fs.writeFileSync('./data/users.json', JSON.stringify(json), 'utf-8');
    res.send({ok:true});
  });

});

app.post('/getUsers', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var fs = require('fs');
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    const userArray = JSON.parse(data);
    //console.log("new array=", userArray);
    res.send({"ok": userArray});
  })
});

app.post('/logout', function(req, res) {
  res.send({ok:true});
});

app.post('/login', function(req, res){
  if (!req.body) {
      return res.sendStatus(400)
  }
  var u = req.body.username;
  var p = req.body.password;
  var fs = require('fs');
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    const userArray = JSON.parse(data);

    const i = userArray.findIndex(user =>((user.username == u) && (user.password == p)));
    console.log("i=", i);
    //console.log(userArray[i]);
      if (i==-1) {
        res.send({"ok": false });
      } else {
        console.log("get user:", userArray[i]);
        console.log("get role:", userArray[i].role);
        //sessionStorage.setItem('role', userArray[i].role);
        res.send({"ok": userArray[i].role});
      }
  })
});

app.post('/delGroup', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var g = req.body.group;
  console.log("group: ", g);
  var fs = require('fs');
  fs.readFile('./data/group.json', 'utf8', function(err, data) {
    if (err) throw err;
    const groupArray = JSON.parse(data);

    const i = groupArray.findIndex(group =>((group.group == g)));
    console.log("i=", i);
    console.log(groupArray[i]);
      if (i==-1) {
        res.send({"ok": false });
      } else {
        delete groupArray[i];
        console.log(groupArray);
       var cleanArray = [];
       for (var j in groupArray) {
        if (groupArray[j] == null ) {
        } else {
          cleanArray.push(groupArray[j]);
          console.log("clean= ", cleanArray);
        }
       }
       console.log("clean array: ", cleanArray);
        fs.writeFileSync('./data/group.json', JSON.stringify(cleanArray), 'utf-8');
        res.send({"ok": true});
      }
    });
});

app.post('/delChannel', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var g = req.body.group;
  var c = req.body.channel;
  console.log("group: ", g);
  console.log("channel: ", c);
  var fs = require('fs');
  fs.readFile('./data/group.json', 'utf8', function(err, data) {
    if (err) throw err;
    const groupArray = JSON.parse(data);

    const i = groupArray.findIndex(group =>((group.group == g)));
    console.log("i=", i);
    console.log(groupArray[i]);

      if (i==-1) {
        res.send({"ok": false });
      } else {
        const k = groupArray[i].channel.findIndex(channel =>((channel.nameChannel == c)));
        console.log("k: ", k);
        console.log("channel: ", groupArray[i].channel[k])
        delete groupArray[i].channel[k];
        console.log(groupArray[i]);
        console.log(groupArray);
        var cleanArray = [];

          for (var h in groupArray[i].channel) {
            console.log("c: ", groupArray[i].channel[h]);
            if (groupArray[i].channel[h] == null){

            } else {
              cleanArray.push(groupArray[i].channel[h]);
            }
          }
          groupArray[i].channel = cleanArray;


        console.log("channel: ", groupArray);

        fs.writeFileSync('./data/group.json', JSON.stringify(groupArray), 'utf-8');
      }
    });
    res.send({"ok": true});
});
*/
